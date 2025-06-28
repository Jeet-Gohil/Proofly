import pool from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";

interface SiteMetricsData {
  site_name: string;
  site_url: string;
  description: string;
  logo_url: string;
  total_visits: number;
  unique_visitors: number;
}

interface VisitCount {
  total_visits: string; // PostgreSQL returns COUNT as text
  unique_visitors: string;
}

export async function POST(req: NextRequest) {
  try {
    const { query } = await req.json();

    if (!query || typeof query !== "string") {
      return NextResponse.json({ error: "Query is required" }, { status: 400 });
    }

    // ✅ Use parameterized query to avoid SQL injection
    const sitesQuery = `
      SELECT 
        site_id,
        site_name,
        site_url,
        description,
        logo_url
      FROM sites
      WHERE is_public = true
        AND (site_name ILIKE $1 OR site_url ILIKE $1)
    `;
    const { rows: sites } = await pool.query(sitesQuery, [`%${query}%`]);

    const results: SiteMetricsData[] = [];

    for (const site of sites) {
      // ✅ Parameterized again — $1 for site_id
      const visitsQuery = `
        SELECT 
          COUNT(*) AS total_visits,
          COUNT(DISTINCT session_id) AS unique_visitors
        FROM page_views
        WHERE site_id = $1
      `;
      const { rows } = await pool.query<VisitCount>(visitsQuery, [site.site_id]);

      results.push({
        site_name: site.site_name,
        site_url: site.site_url,
        description: site.description,
        logo_url: site.logo_url,
        total_visits: Number(rows[0]?.total_visits || 0),
        unique_visitors: Number(rows[0]?.unique_visitors || 0),
      });
    }

    return NextResponse.json(results);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}


export async function GET() {
  try {
    const sitesQuery = `
      SELECT 
        s.site_id,
        s.site_name,
        s.site_url,
        s.description,
        s.logo_url,
        COUNT(pv.*) AS total_visits,
        COUNT(DISTINCT pv.session_id) AS unique_visitors
      FROM sites s
      LEFT JOIN page_views pv ON s.site_id = pv.site_id
      WHERE s.is_public = true
      GROUP BY s.site_id
      ORDER BY total_visits DESC
      LIMIT 10;
    `;

    const { rows } = await pool.query(sitesQuery);

    const results = rows.map((row) => ({
      site_name: row.site_name,
      site_url: row.site_url,
      description: row.description,
      logo_url: row.logo_url,
      total_visits: Number(row.total_visits || 0),
      unique_visitors: Number(row.unique_visitors || 0),
    }));

    return NextResponse.json(results);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
