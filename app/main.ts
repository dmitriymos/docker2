import * as http from 'http'
import { Pool } from 'pg';

require('dotenv').config();


const port = 4000;

// Create a connection pool to the PostgreSQL database
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: Number.parseInt(process.env.DB_PORT as string),
});
const server = new http.Server(async (req, res)=>{
    try {
        const result = await pool.query("SELECT 'Hello, World!'");
        console.log(JSON.stringify(result))

        res.write(`Answer: ${result.rows[0]['?column?']}`);
        res.end();
    } catch (err) {
        console.error(err);
        res.statusCode = 500;
        res.end('Error connecting to the database');
    }
})
server.listen(port, ()=>{
    console.log(`Server's listening on ${port}`)
})


