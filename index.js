const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// const merchants = [
//     {
//         id: "1",
//         name: "Amazon Seller",
//         status: "ACTIVE",
//         "monthlyVolume": 60000,
//         "chargebackRatio": 1.0,
//         "riskLevel": "low",
//         country: "India"
//     }, {
//         "id": "m7",
//         "name": "Alpha Services",
//         "country": "AU",
//         "status": "paused",
//         "monthlyVolume": 60000,
//         "chargebackRatio": 1.0,
//         "riskLevel": "low"
//     },
// ];

// app.get("/api/merchants", (req, res) => {
//     res.json(merchants);
// });
const pool = require("./db");

// app.get("/api/merchants", async (req, res) => {
//   try {
//     const result = await pool.query(`
//       SELECT
//         id,
//         name,
//         country,
//         status,
//         monthly_volume,
//         chargeback_ratio,
//         risk_level
//       FROM merchants
//     `);

//     const merchants = result.rows.map(row => ({
//       id: row.id,
//       name: row.name,
//       country: row.country,
//       status: row.status,
//       monthlyVolume: Number(row.monthly_volume),
//       chargebackRatio: Number(row.chargeback_ratio),
//       riskLevel: row.risk_level
//     }));

//     res.json(merchants);
//   } catch (err) {
//     console.error("REAL DB ERROR:", err);   // <-- critical
//     res.status(500).json({
//       error: err.message,                  // <-- expose it TEMPORARILY
//     });
//   }
// });

app.get("/api/db-test", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT current_user, current_database()"
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
