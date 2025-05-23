import { NextResponse } from "next/server";
import pool from "@/app/lib/db";
export async function GET() {
    const data = await pool.query('SELECT * from users');
    return NextResponse.json({
        Data : data.rows[0]
    });
}

