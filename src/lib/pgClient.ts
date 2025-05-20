import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL_SIKERJA,
});

export const pgClient = {
  query: (text: string, params?: any[]) => pool.query(text, params),
};
