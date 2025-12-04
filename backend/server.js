



require("dotenv").config();




const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const OpenAI = require("openai");

console.log("OPENAI LOADED?", process.env.OPENAI_API_KEY ? "YES" : "NO");

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://stockiemng.vercel.app",
    ],
    methods: ["GET", "POST"],
    credentials: false
  })
);

//testing

app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true }));

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
    const { name, stocks, totalAmount } = req.body;

        console.log("REQ BODY:", req.body);


    if (!totalAmount || totalAmount <= 0) {
      return res.json({ error: "Total investment amount is required" });
    }

    const result = calculatePortfolio(stocks, totalAmount);

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
    const { stocks, totalAmount } = req.body;

    const prompt = `
User investment amount: ₹${totalAmount}

User Portfolio:
${JSON.stringify(stocks, null, 2)}

Give:
- Risk analysis
- Allocation suggestions
- Improvements
- Warning signs
- Sector diversification
- Final clear action plan
`;

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
    });

    res.json({ suggestion: completion.choices[0].message.content });

  } catch (err) {
    console.error("AI ERROR:", err);
    res.status(500).json({ error: "AI Suggestion failed." });
  }
});




app.listen(3000, () => console.log("Server running on 3000 ✔"));
