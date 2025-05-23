import { Pool } from "pg";

const pool = new Pool({
    connectionString : "postgresql://postgres:iconjeet172004@localhost:5432/proofly",
});

export default pool;