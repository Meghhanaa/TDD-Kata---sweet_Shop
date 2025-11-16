// src/routes/orders.js
const express = require('express');
const db = require('../db');
const { v4: uuidv4 } = require('uuid');
const { auth } = require('../middleware/auth'); // reuse your auth middleware
const router = express.Router();

// Create order (protected)
router.post('/', auth, async (req, res) => {
  const { items, address } = req.body; // items: [{ id, qty }]
  const userId = req.user.id;

  if (!Array.isArray(items) || items.length === 0) return res.status(400).json({ error: 'No items' });

  const client = await db.pool.connect();
  try {
    await client.query('BEGIN');

    // lock selected sweets rows FOR UPDATE
    const ids = items.map(it => it.id);
    // fetch current sweets info
    const r = await client.query(`SELECT id, price, quantity FROM sweets WHERE id = ANY($1::text[]) FOR UPDATE`, [ids]);
    const sweetsById = {};
    for (const row of r.rows) sweetsById[row.id] = row;

    // validate availability & calculate total
    let total = 0;
    for (const it of items) {
      const s = sweetsById[it.id];
      if (!s) throw new Error(`Sweet not found: ${it.id}`);
      if (s.quantity < it.qty) throw new Error(`Insufficient stock for ${it.id}`);
      total += Number(s.price) * Number(it.qty);
    }

    // create order
    const orderId = uuidv4();
    await client.query(
      `INSERT INTO orders(id, user_id, total_amount, address) VALUES($1,$2,$3,$4)`,
      [orderId, userId, total, address || null]
    );

    // insert order_items and decrement sweets quantities
    for (const it of items) {
      const s = sweetsById[it.id];
      await client.query(
        `INSERT INTO order_items(order_id, sweet_id, price, qty) VALUES($1,$2,$3,$4)`,
        [orderId, it.id, s.price, it.qty]
      );
      await client.query(
        `UPDATE sweets SET quantity = quantity - $1 WHERE id = $2`,
        [it.qty, it.id]
      );
    }

    await client.query('COMMIT');

    // load order to return
    const or = await db.query('SELECT * FROM orders WHERE id=$1', [orderId]);
    res.status(201).json({ order: or.rows[0] });
  } catch (err) {
    await client.query('ROLLBACK');
    console.error(err);
    if (err.message && err.message.startsWith('Insufficient')) return res.status(400).json({ error: err.message });
    return res.status(500).json({ error: err.message || 'Order creation failed' });
  } finally {
    client.release();
  }
});

// List orders (admin only could be added; for now admin + user see appropriate results)
// GET /api/orders?mine=true  -> user's orders
router.get('/', auth, async (req, res) => {
  const isMine = req.query.mine === 'true';
  try {
    if (isMine) {
      const r = await db.query('SELECT * FROM orders WHERE user_id=$1 ORDER BY created_at DESC', [req.user.id]);
      return res.json(r.rows);
    } else {
      // admin only
      if (req.user.role !== 'admin') return res.status(403).json({ error: 'Admin only' });
      const r = await db.query('SELECT * FROM orders ORDER BY created_at DESC');
      return res.json(r.rows);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Cannot fetch orders' });
  }
});

// Get order details
router.get('/:id', auth, async (req, res) => {
  const { id } = req.params;
  try {
    const r = await db.query('SELECT * FROM orders WHERE id=$1', [id]);
    if (!r.rowCount) return res.status(404).json({ error: 'Not found' });
    const order = r.rows[0];
    // if not admin and not owner -> forbidden
    if (req.user.role !== 'admin' && order.user_id !== req.user.id) return res.status(403).json({ error: 'Forbidden' });
    const items = await db.query('SELECT oi.*, s.name FROM order_items oi LEFT JOIN sweets s ON s.id = oi.sweet_id WHERE oi.order_id=$1', [id]);
    order.items = items.rows;
    res.json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Cannot fetch order' });
  }
});

// Stats for admin
// GET /api/orders/stats
router.get('/stats/all', auth, async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ error: 'Admin only' });
  try {
    // total revenue
    const rev = await db.query(`SELECT COALESCE(SUM(total_amount),0) AS total_revenue FROM orders`);
    const totalRevenue = Number(rev.rows[0].total_revenue);

    // total orders
    const ord = await db.query(`SELECT COUNT(*) AS total_orders FROM orders`);
    const totalOrders = Number(ord.rows[0].total_orders);

    // total items sold
    const items = await db.query(`SELECT COALESCE(SUM(qty),0) AS total_items FROM order_items`);
    const totalItems = Number(items.rows[0].total_items);

    // top selling sweets
    const top = await db.query(`
      SELECT s.id, s.name, SUM(oi.qty) AS sold_qty, SUM(oi.qty * oi.price) AS revenue
      FROM order_items oi
      LEFT JOIN sweets s ON s.id = oi.sweet_id
      GROUP BY s.id, s.name
      ORDER BY sold_qty DESC
      LIMIT 6
    `);

    // revenue by day (last 14 days)
    const daily = await db.query(`
      SELECT to_char(date_trunc('day', created_at), 'YYYY-MM-DD') as day,
             COALESCE(SUM(total_amount),0) as revenue
      FROM orders
      WHERE created_at >= now() - interval '13 days'
      GROUP BY day
      ORDER BY day
    `);

    res.json({
      totalRevenue,
      totalOrders,
      totalItems,
      top: top.rows,
      daily: daily.rows
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Cannot compute stats' });
  }
});

module.exports = router;
