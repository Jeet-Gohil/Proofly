// app/api/sites/[site_id]/route.ts

import { NextRequest, NextResponse } from 'next/server';
import pool from '@/app/lib/db';

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ site_id: string }> }
) {
  const {site_id} = await context.params;
  console.log(site_id);

  try {
    const siteResult = await pool.query('SELECT * FROM sites WHERE site_id = $1', [site_id]);
    if (siteResult.rows.length === 0) {
      return NextResponse.json({ error: 'Site not found' }, { status: 404 });
    }

    const visitsResult = await pool.query(
      'SELECT COUNT(*) AS total_visits FROM page_views WHERE site_id = $1',
      [site_id]
    );

    const usersResult = await pool.query(
      'SELECT COUNT(DISTINCT user_id) AS total_users FROM page_views WHERE site_id = $1',
      [site_id]
    );

    const activeUsersResult = await pool.query(
      `SELECT COUNT(DISTINCT session_id) AS active_users 
       FROM page_views 
       WHERE site_id = $1 AND timestamp >= NOW() - INTERVAL '5 minutes'`,
      [site_id]
    );

    return NextResponse.json({
      site: siteResult.rows[0],
      total_visits: parseInt(visitsResult.rows[0].total_visits, 10),
      total_users: parseInt(usersResult.rows[0].total_users, 10),
      active_users: parseInt(activeUsersResult.rows[0].active_users, 10),
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

function getSiteIdFromRequest(req: NextRequest): string | null {
  const segments = new URL(req.url).pathname.split("/");
  return segments[3] ?? null;
}

export async function DELETE(req: NextRequest) {
  const site_id = getSiteIdFromRequest(req);
  if (!site_id) {
    return NextResponse.json({ error: 'Missing site_id' }, { status: 400 });
  }
  try {
    const result = await pool.query(`DELETE FROM sites WHERE site_id = $1`, [site_id]);
    
    if (result.rowCount === 0) {
      return NextResponse.json({ error: 'Site not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Site deleted successfully' });
  }
  catch(error) {
    console.error('Error deleting site:', error);
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
}}
