import { NextRequest } from "next/server";
import pool from "@/app/lib/db";

export async function GET(req: NextRequest,  context: { params: Promise<{ site_id: string }> }) {
    const {site_id} = await context.params;
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