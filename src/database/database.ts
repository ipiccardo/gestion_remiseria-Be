import pg from "pg";
const { Pool } = pg;
import "dotenv/config";

const config: { [key: string]: string } = {
  connectionString: process.env.DATABASE_URL || "",
};

const pool = new Pool(config);

export default pool;
