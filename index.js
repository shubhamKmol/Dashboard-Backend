// console.log("🔥 DEPLOYED INDEX.JS VERSION 2025-RESET 🔥");

const express = require("express");
const cors = require("cors");
const pool = require("./db");
// app.use(express.json());

const app = express();

/**
 * CORS CONFIG
 * - Allow localhost for development
 * - Add Netlify URL later when deploying frontend
 */
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      // "https://your-netlify-site.netlify.app"
      "https://merchant-ops-dashboard.netlify.app"
    ],
  })
);

app.use(express.json());

/**
 * Health check
 */
app.get("/ping", (req, res) => {
  res.send("pong");
});

/**
 * DB sanity check
 */
app.get("/api/db-test", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT current_user, current_database()"
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error("DB TEST ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});

/**
 * GET merchants (REAL DATA)
 */
app.get("/api/merchants", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        id,
        name,
        country,
        status,
        monthly_volume,
        chargeback_ratio,
        risk_level
      FROM merchants
      ORDER BY id ASC
    `);

    const merchants = result.rows.map(row => ({
      id: row.id,
      name: row.name,
      country: row.country,
      status: row.status,
      monthlyVolume: Number(row.monthly_volume),
      chargebackRatio: Number(row.chargeback_ratio),
      riskLevel: row.risk_level,
    }));

    res.json(merchants);
  } catch (err) {
    console.error("MERCHANT QUERY ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});
app.post("/api/merchants", async (req, res) => {
  try {
    const {
      name,
      country,
      status,
      monthlyVolume,
      chargebackRatio,
      riskLevel,
    } = req.body;

    // Basic validation (minimum required)
    if (
      !name ||
      !country ||
      !status ||
      monthlyVolume == null ||
      chargebackRatio == null ||
      !riskLevel
    ) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const result = await pool.query(
      `
      INSERT INTO merchants
        (name, country, status, monthly_volume, chargeback_ratio, risk_level)
      VALUES
        ($1, $2, $3, $4, $5, $6)
      RETURNING
        id, name, country, status,
        monthly_volume, chargeback_ratio, risk_level
      `,
      [
        name,
        country,
        status,
        monthlyVolume,
        chargebackRatio,
        riskLevel,
      ]
    );

    const row = result.rows[0];

    res.status(201).json({
      id: row.id,
      name: row.name,
      country: row.country,
      status: row.status,
      monthlyVolume: Number(row.monthly_volume),
      chargebackRatio: Number(row.chargeback_ratio),
      riskLevel: row.risk_level,
    });
  } catch (err) {
    console.error("CREATE MERCHANT ERROR:", err);
    res.status(500).json({ error: "Failed to create merchant" });
  }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
