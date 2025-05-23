import pool from '@/app/lib/db';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const site_url = searchParams.get('site_url');
  console.log(site_url);

  if (!site_url) {
    return NextResponse.json({ error: 'Missing site_url parameter' }, { status: 400 });
  }

  try {
    const result = await pool.query(
      `
      SELECT 
  s.site_id,
  s.site_url,
  s.site_name,
  s.description,
  s.tracking_type,
  s.domain_verified,
  s.tracking_script_injected,
  s.geo_tracking_enabled,
  s.logo_url,
  s.tags,
  s.status,
  u.id AS user_id,
  u.name AS user_name,
  u.email,
  u.image AS user_image,
  u.provider,
  u.created_at
FROM sites s
JOIN users u ON s.email = u.email
where s.site_url = $1 LIMIT 1

      `, [site_url]
    );

    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'Site not found' }, { status: 404 });
    }

    const { site_id, user_id } = result.rows[0];
    return NextResponse.json({ site_id, user_id });
  } catch (error) {
    console.error('[TRACK_INFO_API_ERROR]', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
