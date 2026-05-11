import "dotenv/config";
import { Pool } from "pg";

const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  max: 10, // max connections in the pool
  idleTimeoutMillis: 30000, // close idle connections after 30s
});

export default pool;
