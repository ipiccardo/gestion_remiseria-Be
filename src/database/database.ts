import pg from 'pg'
import { config } from '../utils/types'
const { Pool } = pg
import "dotenv/config";


const config: config = {
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    password: process.env.PG_PASS,
    port: process.env.PG_PORT,
    database: process.env.PG_DATABASE
} 


const pool = new Pool(config)

export default pool

 