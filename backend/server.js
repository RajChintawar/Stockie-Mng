



require("dotenv").config();


const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const OpenAI = require("openai");

console.log("OPENAI LOADED?", process.env.OPENAI_API_KEY ? "YES" : "NO");

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
   const users = await User.find().sort({ totalValue: -1 });

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

 //--------------------
 // 7. AI SUGGESTION
 //-------------------
 // Backend
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.post("/ai-suggest", async (req, res) => {
  try {
    const { stocks } = req.body;

    if (!stocks || stocks.length === 0) {
      return res.status(400).json({ error: "No portfolio data received." });
    }

    const prompt = `
Analyze the following stock portfolio:

${stocks.map(s => `${s.name} - Weight: ${s.weightage}%, Initial: ₹${s.initialPrice}, Current: ₹${s.currentPrice}`).join("\n")}

Provide:
1. Strengths of this portfolio
2. Weaknesses
3. Risk level
4. Suggested improvements
5. Recommended asset allocation (Equity %, Debt %, Gold %, Cash %)
`;

    const response = await client.responses.create({
      model: "gpt-4o-mini",
      input: [
        {
          role: "user",
          content: prompt
        }
      ]
    });

    const suggestion =
      response.output_text ||
      response.output?.[0]?.content?.[0]?.text ||
      "No suggestion available.";

    res.json({ suggestion });

  } catch (err) {
    console.error("AI ERROR:", err);
    res.status(500).json({ error: "AI Suggestion failed." });
  }
});




app.listen(3000, () => console.log("Server running on 3000 ✔"));
