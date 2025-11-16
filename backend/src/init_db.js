// src/init_db.js
require('dotenv').config();
const db = require('./db');

async function run() {
  // users table (existing)
  await db.query(`CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(100) PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'user'
  )`);

  // sweets table (existing)
  await db.query(`CREATE TABLE IF NOT EXISTS sweets (
    id VARCHAR(100) PRIMARY KEY,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    price NUMERIC NOT NULL,
    quantity INTEGER NOT NULL DEFAULT 0,
    image TEXT
  )`);

  // orders table (new)
  await db.query(`CREATE TABLE IF NOT EXISTS orders (
    id VARCHAR(100) PRIMARY KEY,
    user_id VARCHAR(100) REFERENCES users(id) ON DELETE SET NULL,
    total_amount NUMERIC NOT NULL,
    address TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
  )`);

  // order_items table (new)
  await db.query(`CREATE TABLE IF NOT EXISTS order_items (
    id SERIAL PRIMARY KEY,
    order_id VARCHAR(100) REFERENCES orders(id) ON DELETE CASCADE,
    sweet_id VARCHAR(100) REFERENCES sweets(id),
    price NUMERIC NOT NULL,
    qty INTEGER NOT NULL
  )`);

  console.log('OK');
  process.exit(0);
}

run().catch(e=>{ console.error(e); process.exit(1); });


// /*
// Run this script to create tables (requires DATABASE_URL set).
// node src/init_db.js
// */
// require('dotenv').config();
// const db = require('./db');

// async function run(){
//   await db.query(`CREATE TABLE IF NOT EXISTS users (
//     id VARCHAR(100) PRIMARY KEY,
//     name TEXT NOT NULL,
//     email TEXT UNIQUE NOT NULL,
//     password TEXT NOT NULL,
//     role TEXT NOT NULL DEFAULT 'user'
//   )`);
//   await db.query(`CREATE TABLE IF NOT EXISTS sweets (
//     id VARCHAR(100) PRIMARY KEY,
//     name TEXT NOT NULL,
//     category TEXT NOT NULL,
//     price NUMERIC NOT NULL,
//     quantity INTEGER NOT NULL DEFAULT 0
//   )`);
//   console.log('OK');
//   process.exit(0);
// }

// run().catch(e=>{ console.error(e); process.exit(1); });
