const express = require("express");
const app = express();

app.get("/ping", (req, res) => {
  res.send("pong");
});

app.get("/api/merchants", (req, res) => {
  res.json([
    {
      id: 1,
      name: "Test Merchant",
      country: "AU",
      status: "paused",
      monthlyVolume: 60000,
      chargebackRatio: 1.0,
      riskLevel: "low",
    },
  ]);
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
