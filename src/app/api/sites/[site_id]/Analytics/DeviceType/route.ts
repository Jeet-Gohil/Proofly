import { NextRequest, NextResponse } from "next/server";
import pool from "@/app/lib/db";

function detectDevice(userAgent: string): 'Mobile' | 'Tablet' | 'Desktop' {
  const ua = userAgent.toLowerCase();

  if (/mobi|iphone|android.*mobile|blackberry/.test(ua)) return 'Mobile';
  if (/tablet|ipad|nexus 7|kindle|android(?!.*mobile)/.test(ua)) return 'Tablet';
  return 'Desktop';
}



function getSiteIdFromRequest(req: NextRequest): string | null {
  const segments = new URL(req.url).pathname.split("/");
  return segments[3] ?? null;
}



export async function GET(
  req: NextRequest
) {
    const site_id = getSiteIdFromRequest(req);
    if (!site_id) return NextResponse.json({ error: "Missing site_id" }, { status: 400 });

    console.log(site_id);


  if (!site_id) {
    return NextResponse.json({ error: 'Missing site_id' }, { status: 400 });
  }

  try {
    const result = await pool.query(
      `SELECT user_agent FROM page_views WHERE site_id = $1`,
      [site_id]
    );

    const devices = {
      Desktop: 0,
      Mobile: 0,
      Tablet: 0,
    };

    result.rows.forEach((row) => {
      const device = detectDevice(row.user_agent || '');
      devices[device]++;
    });

    const total = devices.Desktop + devices.Mobile + devices.Tablet;

    const data = Object.entries(devices).map(([device, count]) => ({
      device,
      percentage: total === 0 ? 0 : Math.round((count / total) * 100),
    }));

    return NextResponse.json(data);
  } catch (err) {
    console.error('Error fetching device analytics:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
