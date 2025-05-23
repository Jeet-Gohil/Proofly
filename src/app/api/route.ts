import { NextRequest, NextResponse } from "next/server";
import pool from "@/app/lib/db";
import { authOptions } from "./auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
export async function GET() {
    const data = await pool.query('SELECT * from users');
    return NextResponse.json({
        Data : data.rows[0]
    });
}

export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions);
    const body = req.json();
    const {name, url} = body;
    if (!url) {
        return NextResponse.json({ error: 'URL is required' }, { status: 400 });
      }
      try {
        const userRes = await pool.query('SELECT id FROM users WHERE email = $1', [session.user.email]);
        const userId = userRes.rows[0]?.id;
    
        if (!userId) {
          return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }
    
        await pool.query(
          'INSERT INTO sites (user_id, url, name) VALUES ($1, $2, $3)',
          [userId, url, name]
        );
    
        return NextResponse.json({ success: true });
      } catch (error) {
        console.error('Error adding site:', error);
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
      }    
}