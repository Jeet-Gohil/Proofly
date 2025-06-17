import { NextRequest, NextResponse } from "next/server";
import pool from "@/app/lib/db";
import { console } from "inspector";

export async function POST(req : NextRequest) {
  const data = await req.json();
  console.log(data);
   const {
    userId,
    siteId,
    sessionId,
    path,
    referrer,
    timestamp,
    user_agent,
    ip_address
  } = data;
  console.log(data);
   const ip = req.headers.get('x-forwarded-for') || 'unknown';
  const userAgent = req.headers.get('user-agent') || 'unknown';
  const res = pool.query('INSERT INTO page_views (site_id, user_id, session_id, ip_address, user_agent, path, referrer, timestamp) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING*', [
    siteId,
    userId,
    sessionId,
    ip_address,
    user_agent,
    path,
    referrer,
    timestamp,
  ]);
  return new Response('ok', { status: 200 });
}

export async function GET(req: NextRequest, context: { params: Promise<{ siteId: string }> }) {
   const { siteId } = await context.params; 
  try {
    const total_visits = await pool.query('SELECT COUNT(*) FROM page_views WHERE site_id = ${siteId}');
    const total_users = await pool.query('SELECT COUNT(DISTINCT user_id) FROM page_views WHERE site_id = ${siteId}');
    const active_users = await pool.query(`SELECT COUNT (DISTINCT session_id) FROM page_views WHERE site_id = ${siteId} AND timestamp >= NOW() - INTERVAL '5 minutes'`);
    console.log(total_users.rows[0].count);
     return NextResponse.json({
      totalVisits: Number(total_visits.rows[0].count),
      totalUsers: Number(total_users.rows[0].count),
      activeUsers: Number(active_users.rows[0].count),
    });
  }
  catch(err) {
    console.error('Analytics error:', err);
    return NextResponse.json({ error: 'Failed to fetch analytics' }, { status: 500 });
  }
}