// import { Pool } from 'pg';
import pkg from 'pg';
import 'dotenv/config'

const { Pool } = pkg;   
const user = process.env.DB_USER;
const password = process.env.PASSWORD;

const pool = new Pool({
    user: user,
    host: 'localhost',
    database: 'postgres',
    password: password,
    port: 5432,
});

export default pool;