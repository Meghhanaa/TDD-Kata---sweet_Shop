const request = require("supertest");
const app = require("../index");
const db = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");

const JWT_SECRET = process.env.JWT_SECRET || "secret";

describe("Purchase API", () => {
  let userToken, sweetId;

  beforeAll(async () => {
    await db.query(`CREATE TABLE IF NOT EXISTS users (
      id VARCHAR(100) PRIMARY KEY,
      name TEXT,
      email TEXT UNIQUE,
      password TEXT,
      role TEXT
    )`);

    await db.query(`CREATE TABLE IF NOT EXISTS sweets (
      id VARCHAR(100) PRIMARY KEY,
      name TEXT,
      category TEXT,
      price NUMERIC,
      quantity INTEGER
    )`);

    await db.query("DELETE FROM users");
    await db.query("DELETE FROM order_items");
await db.query("DELETE FROM orders");
await db.query("DELETE FROM sweets");
await db.query("DELETE FROM users");

    await db.query("DELETE FROM sweets");

    // Create user
    const uid = uuidv4();
    const hashed = await bcrypt.hash("pass123", 10);
    await db.query(
      "INSERT INTO users(id,name,email,password,role) VALUES($1,$2,$3,$4,$5)",
      [uid, "User", "u@u.com", hashed, "user"]
    );
    userToken = jwt.sign({ id: uid, role: "user" }, JWT_SECRET);

    // Create sweet
    sweetId = uuidv4();
    await db.query(
      "INSERT INTO sweets(id,name,category,price,quantity) VALUES($1,$2,$3,$4,$5)",
      [sweetId, "Ladoo", "Traditional", 20, 2]
    );
  });

  afterAll(async () => {
    await db.pool.end();
  });

  test("purchase reduces quantity", async () => {
    const res = await request(app)
      .post(`/api/sweets/${sweetId}/purchase`)
      .set("Authorization", "Bearer " + userToken)
      .send({ qty: 1 });

    expect(res.statusCode).toBe(200);

    const r2 = await db.query("SELECT quantity FROM sweets WHERE id=$1", [
      sweetId,
    ]);
    expect(Number(r2.rows[0].quantity)).toBe(1);
  });

  test("purchase fails on insufficient stock", async () => {
    const res = await request(app)
      .post(`/api/sweets/${sweetId}/purchase`)
      .set("Authorization", "Bearer " + userToken)
      .send({ qty: 5 });

    expect(res.statusCode).toBe(400);
    expect(res.body.error).toMatch(/Insufficient stock/i);
  });

  test("purchase fails without token", async () => {
    const res = await request(app)
      .post(`/api/sweets/${sweetId}/purchase`)
      .send({ qty: 1 });

    expect(res.statusCode).toBe(401);
  });

  test("purchase fails with invalid token", async () => {
    const res = await request(app)
      .post(`/api/sweets/${sweetId}/purchase`)
      .set("Authorization", "Bearer WRONGTOKEN")
      .send({ qty: 1 });

    expect(res.statusCode).toBe(401);
  });
});
