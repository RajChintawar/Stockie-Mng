import { useState, useContext, useEffect } from "react";
import { PortfolioContext } from "../context/PortfolioContext";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Portfolio() {
  const navigate = useNavigate();

  const {
    portfolioResult,
    setPortfolioResult,
    portfolioStocks,
    setPortfolioStocks,
    totalAmount,
    setTotalAmount
  } = useContext(PortfolioContext);

  const { token } = useContext(AuthContext);

  const [error, setError] = useState("");
  const [username, setUsername] = useState("");

  // 🔥 NEW: STOCK LIST STATE (DON’T TOUCH)
  const [stockList, setStockList] = useState([]);
  const [stockLoading, setStockLoading] = useState(true);
  const [stockError, setStockError] = useState("");

  const [form, setForm] = useState({
    name: "",
    weightage: "",
    initialPrice: "",
    currentPrice: "",
    role: "regular",
  });

  // 🔥 FETCH STOCKS ONCE (STABLE)
  useEffect(() => {
    const fetchStocks = async () => {
      try {
        setStockLoading(true);
        const res = await fetch(
          "https://stockie-mng-backend.onrender.com/stocks/top"
        );
        if (!res.ok) throw new Error("API failed");
        const data = await res.json();
        setStockList(data);
      } catch (err) {
        console.error(err);
        setStockError("Failed to load stock list");
      } finally {
        setStockLoading(false);
      }
    };

    fetchStocks();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addStock = () => {
    if (!form.name || !form.weightage || !form.initialPrice || !form.currentPrice) {
      setError("Fill all fields dumbass 😭🔥");
      return;
    }

    const newStock = {
      name: form.name,
      weightage: Number(form.weightage),
      initialPrice: Number(form.initialPrice),
      currentPrice: Number(form.currentPrice),
      role: form.role,
    };

    setPortfolioStocks([...portfolioStocks, newStock]);
    setError("");

    setForm({
      name: "",
      weightage: "",
      initialPrice: "",
      currentPrice: "",
      role: "regular",
    });
  };

  const removeStock = (index) => {
    const updated = [...portfolioStocks];
    updated.splice(index, 1);
    setPortfolioStocks(updated);
  };

  const calculatePortfolio = () => {
    setError("");

    if (!username) {
      setError("Bro enter your name 😭🔥");
      return;
    }

    if (!totalAmount || totalAmount <= 0) {
      setError("Enter a valid investment amount 😭🔥");
      return;
    }

    if (portfolioStocks.length === 0) {
      setError("Add at least ONE mf stock 😭🔥");
      return;
    }

    fetch("https://stockie-mng-backend.onrender.com/save-portfolio", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: username,
        totalAmount: Number(totalAmount),
        stocks: portfolioStocks,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) setError(data.error);
        else setPortfolioResult(data.result);
      })
      .catch(() => setError("Backend exploded 💀 Try again later"));
  };

  const clearAll = () => {
    setPortfolioStocks([]);
    setPortfolioResult(null);
    setError("");
    setUsername("");
    setTotalAmount(0);

    localStorage.removeItem("portfolioStocks");
    localStorage.removeItem("portfolioResult");
    localStorage.removeItem("totalAmount");
  };

  return (
    <div className="p-8 max-w-6xl mx-auto text-white space-y-10">
      <h2 className="text-4xl font-bold tracking-tight mb-6">Portfolio</h2>

      {error && (
        <div className="bg-red-700/60 border border-red-500/40 p-4 rounded-xl">
          <p className="font-semibold">{error}</p>
        </div>
      )}

      <div className="p-6 rounded-2xl bg-[#151821]/70 border border-white/10 space-y-5">

        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter Your Name"
          className="p-3 rounded-xl bg-[#1b1f27] border border-white/10 w-full"
        />

        <input
          value={totalAmount}
          onChange={(e) => setTotalAmount(Number(e.target.value))}
          placeholder="Enter Total Amount (₹)"
          className="p-3 rounded-xl bg-[#1b1f27] border border-white/10 w-full"
        />

        <h3 className="text-2xl font-semibold">Add Stock</h3>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">

          {/* 🔥 STOCK SELECTOR (FIXED, STABLE) */}
          {stockLoading ? (
            <div className="p-3 rounded-xl bg-[#1b1f27] border border-white/10 text-gray-400">
              Loading stocks…
            </div>
          ) : stockError ? (
            <div className="p-3 rounded-xl bg-red-600/30 text-red-300">
              {stockError}
            </div>
          ) : (
            <select
              name="name"
              value={form.name}
              onChange={handleChange}
              className="p-3 rounded-xl bg-[#1b1f27] border border-white/10"
            >
              <option value="">Select Stock</option>
              {stockList.map((s) => (
                <option key={s.symbol} value={s.name}>
                  {s.name} ({s.symbol}) — {s.sector}
                </option>
              ))}
            </select>
          )}

          <input
            name="weightage"
            value={form.weightage}
            onChange={handleChange}
            placeholder="Weight %"
            className="p-3 rounded-xl bg-[#1b1f27] border border-white/10"
          />

          <input
            name="initialPrice"
            value={form.initialPrice}
            onChange={handleChange}
            placeholder="Initial Price"
            className="p-3 rounded-xl bg-[#1b1f27] border border-white/10"
          />

          <input
            name="currentPrice"
            value={form.currentPrice}
            onChange={handleChange}
            placeholder="Current Price"
            className="p-3 rounded-xl bg-[#1b1f27] border border-white/10"
          />

          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className="p-3 rounded-xl bg-[#1b1f27] border border-white/10"
          >
            <option value="regular">Regular</option>
            <option value="captain">Captain</option>
            <option value="vice">Vice-Captain</option>
          </select>
        </div>

        <button
          onClick={addStock}
          className="bg-blue-600 px-5 py-2 rounded-xl font-semibold"
        >
          Add Stock
        </button>
      </div>

      {/* EVERYTHING BELOW THIS IS UNTOUCHED */}
      {portfolioStocks.length > 0 && (
        <div className="p-6 rounded-2xl bg-[#151821]/70 border border-white/10">
          <h3 className="text-2xl font-semibold mb-4">Added Stocks</h3>

          <table className="w-full">
            <thead>
              <tr>
                <th>Remove</th>
                <th>Name</th>
                <th>Weight</th>
                <th>Initial</th>
                <th>Current</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {portfolioStocks.map((s, i) => (
                <tr key={i}>
                  <td>
                    <button onClick={() => removeStock(i)}>Remove</button>
                  </td>
                  <td>{s.name}</td>
                  <td>{s.weightage}%</td>
                  <td>₹{s.initialPrice}</td>
                  <td>₹{s.currentPrice}</td>
                  <td>{s.role}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex gap-4 mt-4">
            <button onClick={calculatePortfolio}>Calculate Portfolio</button>
            <button onClick={clearAll}>Clear</button>
          </div>
        </div>
      )}

    </div>
  );
}
