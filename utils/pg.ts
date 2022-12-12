import pg from 'pg';

const Pool = pg.Pool;

// Instantiate a connection to Kudoku Postgresql on digital ocean
const pool = new Pool({
  user: process.env.DB_USERNAME as string,
  password: process.env.DB_PASSWORD as string,
  host: process.env.DB_HOST as string,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_DATABASE as string,
  ssl: {
    rejectUnauthorized: false,
    ca: process.env.DB_PGCACERT as string,
  },
});

export default pool;
