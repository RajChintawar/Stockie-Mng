const express = require("express");
const cors = require("cors");

const { calculatePortfolio } = require("./portfolio");
const { rankingUsers } = require("./ranking");

const app = express();
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

// Calculate portfolio
app.post("/calculate-portfolio", (req, res) => {
  try {
    const result = calculatePortfolio(req.body.stocks);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Ranking route
app.post("/rank-users", (req, res) => {
  try {
    const ranked = rankingUsers(req.body.users);
    res.json(ranked);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
