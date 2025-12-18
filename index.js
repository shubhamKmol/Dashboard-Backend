console.log("🔥 DEPLOYED INDEX.JS VERSION 2025-RESET 🔥");

const express = require("express");
const app = express();
const pool = require("./db");

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
      riskLevel: row.risk_level
    }));

    res.json(merchants);
  } catch (err) {
    console.error("MERCHANT QUERY ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});


const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
