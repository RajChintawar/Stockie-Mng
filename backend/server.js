const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

// --------------------
// 1. CONNECT TO DB
// --------------------
mongoose
  .connect(process.env.DB_URI, {
    dbName: "StockieDB",
  })
  .then(() => console.log("MongoDB connected ✔"))
  .catch((err) => console.log("DB Error ❌", err));

// --------------------
// 2. USER SCHEMA
// --------------------
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  totalValue: { type: Number, required: true },
});

const User = mongoose.model("User", userSchema);

// --------------------
// 3. CALCULATION LOGIC
// --------------------
const { calculatePortfolio } = require("./portfolio");
const { rankingUsers } = require("./ranking");

// --------------------
// 4. SAVE USER PORTFOLIO
// --------------------
app.post("/save-portfolio", async (req, res) => {
  try {
    const { name, stocks } = req.body;

    if (!name || !stocks)
      return res.json({ error: "Name and stocks are required" });

    const result = calculatePortfolio(stocks);

    // save/update user
    await User.findOneAndUpdate(
      { name },
      { totalValue: result.totalValue },
      { upsert: true, new: true }
    );

    res.json({ success: true, result });
  } catch (err) {
    console.log(err);
    res.json({ error: "Failed to save portfolio" });
  }
});

// --------------------
// 5. GET REAL RANKINGS
// --------------------
app.get("/get-rankings", async (req, res) => {
  try {
    const users = await User.find({});

    const ranked = rankingUsers(users);

    res.json(ranked);
  } catch (err) {
    console.log(err);
    res.json({ error: "Failed to fetch rankings" });
  }
});

// --------------------
// 6. TEST ROUTE
// --------------------
app.get("/", (req, res) => {
  res.send("Backend is LIVE 🚀");
});

// --------------------
app.listen(3000, () => console.log("Server running on 3000 ✔"));

