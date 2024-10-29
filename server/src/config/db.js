import pkg from 'pg'; // Import the default export from 'pg'
import 'dotenv/config';

const { Client } = pkg; // Destructure Client from the imported package

const dbClient = new Client({
  host: process.env.DATABASE_HOST,
  database: process.env.DATABASE_NAME,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  port: process.env.DATABASE_PORT || 5432,
  ssl: {
    rejectUnauthorized: false,
  },
});

dbClient.connect()
  .then(() => {
    console.log('Connected to Supabase PostgreSQL database');
  })
  .catch(err => {
    console.error('Connection error:', err);
  });

export default dbClient;