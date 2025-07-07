import { NextRequest, NextResponse } from "next/server";
import pool from "@/app/lib/db";

function getSiteIdFromRequest(req: NextRequest): string | null {
  const segments = new URL(req.url).pathname.split("/");

  return segments[3] ?? null;
}


export async function GET(req: NextRequest) {
    const siteId = getSiteIdFromRequest(req);

    if (!siteId) {
    return NextResponse.json(
      { error: 'Missing site_id query parameter' },
      { status: 400 }
    );
  }

  try {
    const result = await pool.query(` SELECT id, type, config
      FROM widgets
      WHERE site_id = $1`, [siteId]);
    
        return NextResponse.json(result.rows);
  }
  catch(error){
     console.error('Error fetching widgets:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
    try {
          const body = await req.json();
          const {siteId, type, config} = body;
          
    if (!siteId || !type || !config) {
      return NextResponse.json(
        { error: 'Missing siteId, type or config in request body' },
        { status: 400 }
      );
    }
    const result = await pool.query(`INSERT INTO widgets (site_id, type, config) VALUES ($1, $2, $3) RETURNING*`, [siteId, type, config]);
     return NextResponse.json(result.rows[0]);
    }
    catch(error) {
        console.error('Error creating widget:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export const dynamic = 'force-dynamic'; 


