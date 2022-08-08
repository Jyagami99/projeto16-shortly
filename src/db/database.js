import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pg;
const databaseConfig = {
  host: "localhost",
  port: 5432,
  user: "postgres",
  password: "pass@1010",
  database: "shortly",
  // connectionString: process.env.DATABASE_URL,
  // ssl: {
  //   rejectUnauthorized: false,
  // },
};

const db = new Pool(databaseConfig);
export default db;
