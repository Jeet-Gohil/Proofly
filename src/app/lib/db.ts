import { Pool } from "pg";

const pool = new Pool({
    connectionString : "postgresql://postgres:iconjeet172004@db.iiwlukmccjowosaqxopg.supabase.co:5432/postgres",
});

export default pool;