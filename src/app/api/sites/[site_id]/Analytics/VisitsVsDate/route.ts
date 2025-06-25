import { NextRequest, NextResponse } from "next/server";
import pool from "@/app/lib/db";


function getSiteIdFromRequest(req: NextRequest): string | null {
  const segments = new URL(req.url).pathname.split("/");
  return segments[3] ?? null;
}


export async function GET(req: NextRequest) {
   const site_id = getSiteIdFromRequest(req);
      if (!site_id) return NextResponse.json({ error: "Missing site_id" }, { status: 400 });
    
    const query = `
    SELECT 
      TO_CHAR(DATE(timestamp), 'Mon DD') AS date, 
      COUNT(*) AS visits
    FROM page_views
    WHERE site_id = $1
    GROUP BY date
    ORDER BY MIN(timestamp) ASC
    LIMIT 10;
  `;
  const { rows } = await pool.query(query, [site_id]);
  return Response.json(rows);
}