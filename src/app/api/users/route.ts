import pool from "@/app/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
    const data = await pool.query('SELECT * FROM users');
    return NextResponse.json({
        data: data.rows[0]
    });
}