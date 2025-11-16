const request = require("supertest");
const app = require("../index");
const db = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");

const JWT_SECRET = process.env.JWT_SECRET || "secret";

describe("Admin-only access", () => {
  let adminToken, userToken;

  beforeAll(async () => {
    await db.query(`CREATE TABLE IF NOT EXISTS users (
      id VARCHAR(100) PRIMARY KEY,
      name TEXT, email TEXT UNIQUE, password TEXT, role TEXT
    )`);

    await db.query(`CREATE TABLE IF NOT EXISTS sweets (
      id VARCHAR(100) PRIMARY KEY,
      name TEXT, category TEXT, price NUMERIC, quantity INTEGER
    )`);

    await db.query("DELETE FROM users");
    await db.query("DELETE FROM order_items");
    await db.query("DELETE FROM orders");
    await db.query("DELETE FROM sweets");
    await db.query("DELETE FROM users");
    await db.query("DELETE FROM sweets");

    // Admin
    const aid = uuidv4();
    const ah = await bcrypt.hash("adminpass", 10);
    await db.query(
      "INSERT INTO users VALUES($1,$2,$3,$4,$5)",
      [aid, "Admin", "admin@x.com", ah, "admin"]
    );
    adminToken = jwt.sign({ id: aid, role: "admin" }, JWT_SECRET);

    // User
    const uid = uuidv4();
    const uh = await bcrypt.hash("pass123", 10);
    await db.query(
      "INSERT INTO users VALUES($1,$2,$3,$4,$5)",
      [uid, "User", "user@x.com", uh, "user"]
    );
    userToken = jwt.sign({ id: uid, role: "user" }, JWT_SECRET);
  });

  afterAll(async () => {
    await db.pool.end();
  });

  test("admin can create sweet", async () => {
    const res = await request(app)
      .post("/api/sweets")
      .set("Authorization", "Bearer " + adminToken)
      .send({ name: "Test", category: "Milk", price: 10, quantity: 5 });

    expect(res.statusCode).toBe(201);
  });

  test("user cannot create sweet", async () => {
    const res = await request(app)
      .post("/api/sweets")
      .set("Authorization", "Bearer " + userToken)
      .send({ name: "Test2", category: "Milk", price: 10, quantity: 5 });

    expect(res.statusCode).toBe(403);
  });

  test("missing token → 401", async () => {
    const res = await request(app)
      .post("/api/sweets")
      .send({ name: "Test3", category: "Milk", price: 10, quantity: 5 });

    expect(res.statusCode).toBe(401);
  });

  test("invalid token → 401", async () => {
    const res = await request(app)
      .post("/api/sweets")
      .set("Authorization", "Bearer WRONGTOKEN")
      .send({ name: "Test3", category: "Milk", price: 10, quantity: 5 });

    expect(res.statusCode).toBe(401);
  });
});
