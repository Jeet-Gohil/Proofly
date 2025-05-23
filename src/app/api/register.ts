// pages/api/register.ts
import bcrypt from "bcrypt";
import pool from "@/app/lib/db";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { name, email, password } = req.body;

  const existing = await pool.query(`SELECT * FROM users WHERE email = $1`, [email]);
  if (existing.rows.length) return res.status(409).json({ error: "User already exists" });

  const hashed = await bcrypt.hash(password, 10);

  await pool.query(
    `INSERT INTO users (name, email, password, provider) VALUES ($1, $2, $3, $4)`,
    [name, email, hashed, "credentials"]
  );

  res.status(201).json({ message: "User created" });
}
