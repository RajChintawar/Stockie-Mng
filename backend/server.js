require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const OpenAI = require("openai");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

console.log("OPENAI LOADED?", process.env.OPENAI_API_KEY ? "YES" : "NO");

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: ["https://stockie-mng.vercel.app", "http://localhost:5173","https://hoppscotch.io"],
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);


app.get("/test", (req, res) => {
  res.json({ ok: true, message: "API working" });
});








// ----------------------------------------------------------------
// 1️⃣ MAIN DB — For Portfolio & Rankings
// ----------------------------------------------------------------
mongoose
  .connect(process.env.DB_URI, { dbName: "StockieDB" })
  .then(() => console.log("StockieDB connected ✔"))
  .catch((err) => console.log("DB Error ❌", err));

const rankingSchema = new mongoose.Schema({
  name: String,
  totalValue: Number,
});
const RankingUser = mongoose.model("RankingUser", rankingSchema);

// ----------------------------------------------------------------
// 2️⃣ AUTH DB — Separate Database For Login
// ----------------------------------------------------------------
const usersDB = mongoose.createConnection(process.env.USER_DB_URI, {
  dbName: "UsersDB",
});

usersDB.on("connected", () => console.log("UsersDB connected ✔"));
usersDB.on("error", (err) => console.log("UsersDB Error ❌", err));

const AuthUser = require("./models/AuthUser")(usersDB);

// ----------------------------------------------------------------
// 3️⃣ AUTH MIDDLEWARE
// ----------------------------------------------------------------
function auth(req, res, next) {
  const header = req.headers.authorization;
  if (!header) return res.status(401).json({ error: "No token" });

  const token = header.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
}

// ----------------------------------------------------------------
// 4️⃣ IMPORT CALC + RANKING LOGIC
// ----------------------------------------------------------------
const { calculatePortfolio } = require("./portfolio");
const { rankingUsers } = require("./ranking");

// ----------------------------------------------------------------
// 5️⃣ SAVE PORTFOLIO — DOES NOT REQUIRE LOGIN
// ----------------------------------------------------------------
app.post("/save-portfolio", async (req, res) => {
  try {
    const { name, stocks, totalAmount } = req.body;

    if (!totalAmount || totalAmount <= 0)
      return res.json({ error: "Total investment amount is required" });

    const result = calculatePortfolio(stocks, totalAmount);

    await RankingUser.findOneAndUpdate(
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

// ----------------------------------------------------------------
// 6️⃣ GET RANKINGS — LOGIN REQUIRED
// ----------------------------------------------------------------
app.get("/get-rankings", auth, async (req, res) => {
  try {
    const users = await RankingUser.find().sort({ totalValue: -1 });
    const ranked = rankingUsers(users);
    res.json(ranked);
  } catch (err) {
    console.log(err);
    res.json({ error: "Failed to fetch rankings" });
  }
});

// ----------------------------------------------------------------
// 7️⃣ AI Suggestion — LOGIN REQUIRED
// ----------------------------------------------------------------
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.post("/ai-suggest", auth, async (req, res) => {
  try {
    const { stocks, totalAmount } = req.body;

    const prompt = `
Investment Amount: ₹${totalAmount}
User Portfolio: ${JSON.stringify(stocks, null, 2)}

Give risk analysis, improvements, diversification and final clear action plan.
`;

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
    });

    res.json({ suggestion: completion.choices[0].message.content });
  } catch (err) {
    console.log("AI ERROR:", err);
    res.status(500).json({ error: "AI Suggestion failed" });
  }
});

// ----------------------------------------------------------------
// 8️⃣ AUTH — REGISTER
// ----------------------------------------------------------------
app.post("/auth/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const exists = await AuthUser.findOne({ email });
    if (exists) return res.json({ error: "User already exists" });

    const user = new AuthUser({ name, email, password });
    await user.save();

    res.json({ success: true, message: "Account created!" });
  } catch (err) {
    console.log(err);
    res.json({ error: "Registration failed" });
  }
});

// ----------------------------------------------------------------
// 9️⃣ AUTH — LOGIN
// ----------------------------------------------------------------
app.post("/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await AuthUser.findOne({ email });
    if (!user) return res.json({ error: "User not found" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.json({ error: "Incorrect password" });

    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({ success: true, token, name: user.name });
  } catch (err) {
    console.log(err);
    res.json({ error: "Login failed" });
  }
});

// ----------------------------------------------------------------
// 10️⃣ ROOT TEST
// ----------------------------------------------------------------
app.get("/", (req, res) => {
  res.send("Backend is LIVE 🚀");
});


const indianStocks = require("./data/indianStocks");

app.get("/stocks/top", (req, res) => {
  res.json(indianStocks);
});









app.listen(3000, () => console.log("Server running on 3000 ✔"));

