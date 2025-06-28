import { NextRequest, NextResponse } from "next/server";
import pool from '@/app/lib/db';
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/AuthOptions";

export async function GET() {
  const session = await getServerSession(authOptions);
 
  if (!session || !session.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
    const email = session.user.email;
    console.log(email);
    try {
    const result = await pool.query(
      `SELECT * FROM sites WHERE email = $1`,
      [email]
    );
  

    return NextResponse.json(result.rows);
  } catch (err) {
    console.error("Error fetching sites", err);
    return NextResponse.json({ error: "Failed to fetch sites" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const {
      email, // fallback to session email
      site_url,
      site_name,
      description,
      tracking_type = 'visits',
      domain_verified = false,
      tracking_script_injected = false,
      geo_tracking_enabled = false,
      logo_url = null,
      tags = [],
      status = 'active',
      is_public = false,
    } = body;

    if (!site_url) {
      return NextResponse.json({ error: 'Site URL is required.' }, { status: 400 });
    }

    // Sanitize tags into an array
    const tagsArray =
      typeof tags === 'string'
        ? tags.split(',').map((tag: string) => tag.trim()).filter(Boolean)
        : Array.isArray(tags) ? tags : [];

    const result = await pool.query(
      `INSERT INTO sites (
        email, site_url, site_name, description, tracking_type,
        domain_verified, tracking_script_injected, geo_tracking_enabled,
        logo_url, tags, status, is_public
      ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12) RETURNING *`,
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
        status,
        is_public
      ]
    );

    return NextResponse.json(
      {
        message: 'Site created successfully',
        site: result.rows[0],
        siteId: result.rows[0].site_id,
      },
      { status: 201 }
    );
  } catch (err) {
    console.error('POST /api/sites error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}