console.log("🔥 DEPLOYED INDEX.JS VERSION 2025-RESET 🔥");

const express = require("express");
const app = express();
const pool = require("./db");

app.get("/ping", (req, res) => {
  res.send("pong");
});

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

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
