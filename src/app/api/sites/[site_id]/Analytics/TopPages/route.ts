import { NextRequest, NextResponse } from "next/server";
import pool from "@/app/lib/db";

function getSiteIdFromRequest(req: NextRequest): string | null {
  const segments = new URL(req.url).pathname.split("/");
  return segments[3] ?? null;
}


export async function GET(req : NextRequest) {
    const site_id = getSiteIdFromRequest(req);
          if (!site_id) return NextResponse.json({ error: "Missing site_id" }, { status: 400 });

    
        const res = await pool.query(`
            SELECT path, COUNT(*) as views
      FROM page_views
      WHERE site_id = $1
      GROUP BY path
      ORDER BY views DESC
      LIMIT 10;`, [site_id]);

      const formatted = res.rows.map(row => ({
      page: row.path,
      views: Number(row.views)
    }));
    console.log(formatted);
    return NextResponse.json(formatted);
    
       
}