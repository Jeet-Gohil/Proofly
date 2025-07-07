import pool from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";
import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey : process.env.OPENAI_API_KEY
});

function getSiteIdFromRequest(req: NextRequest): string | null {
  const segments = new URL(req.url).pathname.split("/");
  return segments[3] ?? null;
}


export async function POST(req: NextRequest) {
    const siteId = getSiteIdFromRequest(req);
    try {
    const body = await req.json();
    const { position, botName, welcomeMessage, persona, themeColor, faq } = body;

    if (!position || !botName) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
}
        await pool.query(
  `INSERT INTO widgets (site_id, type, config)
   VALUES ($1, $2, $3::jsonb)
   ON CONFLICT (site_id, type)
   DO UPDATE SET config = $3::jsonb, updated_at = NOW()`,
  [siteId, 'chatbot', body]
);
    }
    catch(err : any) {
        console.error(err);
    return NextResponse.json({ error: "DB error" }, { status: 500 });
    }
}

export async function GET(req: NextRequest) {
  const siteId = getSiteIdFromRequest(req);

  try {
    const result = await pool.query(`
      SELECT config FROM widgets
      WHERE site_id = $1 AND type = $2
      LIMIT 1;
    `, [siteId, 'ai-chatbot']);

    if (result.rows.length === 0) {
      return NextResponse.json({ error: "No config found" }, { status: 404 });
    }

    return NextResponse.json(result.rows[0].config);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "DB error" }, { status: 500 });
  }
}

export const dynamic = "force-dynamic";

export async function PUT(req: NextRequest) {
  const siteId = getSiteIdFromRequest(req);
  const body = await req.json();
  const { message, history } = body;

  if (!message) {
    return NextResponse.json({ error: "Missing message" }, { status: 400 });
  }

  try {
    // Load the config to customize the prompt
    const result = await pool.query(`
      SELECT config FROM widgets
      WHERE site_id = $1 AND type = $2
      LIMIT 1;
    `, [siteId, 'chatbot']);
    if (result.rows.length === 0) {
        console.log('error found');
      return NextResponse.json({ error: "No config found" }, { status: 404 });
    }

    const config = result.rows[0].config;
    const { persona, faq } = config;

    const systemPrompt = `You are ${persona || "a helpful assistant"}.
FAQs: ${faq || "None provided."}`;

    const chatCompletion = await openai.chat.completions.create({
      model: "chatgpt-4o-latest",
      messages: [
        { role: "system", content: systemPrompt },
        ...(history || []),
        { role: "user", content: message },
      ],
    });

    const answer = chatCompletion.choices[0].message;

    return NextResponse.json({ answer });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "OpenAI API error" }, { status: 500 });
  }
}