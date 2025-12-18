const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const merchants = [
    {
        id: "1",
        name: "Amazon Seller",
        status: "ACTIVE",
        "monthlyVolume": 60000,
        "chargebackRatio": 1.0,
        "riskLevel": "low",
        country: "India"
    }, {
        "id": "m7",
        "name": "Alpha Services",
        "country": "AU",
        "status": "paused",
        "monthlyVolume": 60000,
        "chargebackRatio": 1.0,
        "riskLevel": "low"
    },
];

app.get("/api/merchants", (req, res) => {
    res.json(merchants);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
