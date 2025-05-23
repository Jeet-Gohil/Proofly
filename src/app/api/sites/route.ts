import { NextRequest, NextResponse } from "next/server";
import pool from '@/app/lib/db';

export async function GET() {
    const data = await pool.query('SELECT * FROM sites');
    return NextResponse.json({
        data: data.rows[0]
    });
}

export  async function POST (req : NextRequest, res : NextResponse) {
    try 
    {
        const data = await req.json();
        const {
            email,
            site_url,
            site_name,
            description,
            tracking_type = 'visits',
            domain_verified = false,
            tracking_script_injected = false,
            geo_tracking_enabled = false,
            logo_url = null,
            tags = [],
            status = 'active'
          } = data;
          if (!email || !site_url) {
            return NextResponse.json({ error: 'user_id and site_url are required.' }, { status: 400 });
          }
          const tagsArray = typeof tags === 'string'
  ? tags.split(',').map(t => t.trim()).filter(t => t.length > 0)
  : tags; // assume it's already an array

     const pg_data = await pool.query(
    'INSERT INTO sites (email, site_url, site_name, description, tracking_type, domain_verified, tracking_script_injected, geo_tracking_enabled, logo_url, tags, status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *',
    [
      email,  
      site_url,
      site_name,
      description,
      tracking_type,
      domain_verified,
      tracking_script_injected,
      geo_tracking_enabled,
      logo_url,
      tagsArray,
      status
    ]
  );
  const site_id = pg_data.rows[0].site_id;
          return (
            NextResponse.json({
                message : "site created successfully",
                site : pg_data.rows[0],
                siteId : site_id,
            }, {
                status : 201
            })
          );
    }
    catch(err) {
        console.error('POST /api/sites error:', err);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}