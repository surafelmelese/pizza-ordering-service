const { Client } = require('pg');
require('dotenv').config();

const client = new Client({
  host: process.env.DATABASE_HOST,
  database: process.env.DATABASE_NAME,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  port: process.env.DATABASE_PORT || 5432,
  ssl: {
    rejectUnauthorized: false,
  },
});

client.connect()
  .then(() => {
    console.log('Connected to Supabase PostgreSQL database');
    return client.query('SELECT NOW()');
  })
  .then(res => {
    console.log('Database current time:', res.rows[0].now);
    client.end();
  })
  .catch(err => {
    console.error('Connection error:', err);
    client.end();
  });
