import { useState, useContext, useEffect } from "react";
import { PortfolioContext } from "../context/PortfolioContext";
import { AuthContext } from "../context/AuthContext";

export default function Portfolio() {
  const {
    portfolioResult,
    setPortfolioResult,
    portfolioStocks,
    setPortfolioStocks,
    totalAmount,
    setTotalAmount,
  } = useContext(PortfolioContext);

  const { token } = useContext(AuthContext);

  const [availableStocks, setAvailableStocks] = useState([]);
  const [error, setError] = useState("");
  const [username, setUsername] = useState("");

  const [form, setForm] = useState({
    symbol: "",
    name: "",
    weightage: "",
    initialPrice: "",
    currentPrice: "",
    role: "regular",
  });

  // 🔥 FETCH TOP 50 INDIAN STOCKS
  useEffect(() => {
    fetch("https://stockie-mng-backend.onrender.com/stocks/top")
      .then((res) => res.json())
      .then((data) => setAvailableStocks(data))
      .catch(() => setError("Failed to load stock list 💀"));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addStock = () => {
    if (
      !form.symbol ||
      !form.weightage ||
      !form.initialPrice ||
      !form.currentPrice
    ) {
      setError("Fill all fields dumbass 😭🔥");
      return;
    }

    const newStock = {
      symbol: form.symbol,
      name: form.name,
      weightage: Number(form.weightage),
      initialPrice: Number(form.initialPrice),
      currentPrice: Number(form.currentPrice),
      role: form.role,
    };

    setPortfolioStocks([...portfolioStocks, newStock]);
    setError("");

    setForm({
      symbol: "",
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
        ...(token && { Authorization: `Bearer ${token}` }),
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
      <h2 className="text-4xl font-bold tracking-tight">Portfolio</h2>

      {error && (
        <div className="bg-red-700/60 p-4 rounded-xl">
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
          placeholder="Total Investment Amount (₹)"
          className="p-3 rounded-xl bg-[#1b1f27] border border-white/10 w-full"
        />

        <h3 className="text-2xl font-semibold">Add Stock</h3>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">

          {/* 🔥 STOCK DROPDOWN */}
          <select
            value={form.symbol}
            onChange={(e) => {
              const selected = availableStocks.find(
                (s) => s.symbol === e.target.value
              );
              setForm({
                ...form,
                symbol: selected?.symbol || "",
                name: selected?.name || "",
              });
            }}
            className="p-3 rounded-xl bg-[#1b1f27] border border-white/10"
          >
            <option value="">Select Stock</option>
            {availableStocks.map((stock) => (
              <option key={stock.symbol} value={stock.symbol}>
                {stock.name} ({stock.symbol})
              </option>
            ))}
          </select>

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
          className="bg-blue-600 px-6 py-2 rounded-xl font-semibold hover:bg-blue-700"
        >
          Add Stock
        </button>
      </div>

      {portfolioStocks.length > 0 && (
        <div className="p-6 rounded-2xl bg-[#151821]/70 border border-white/10">
          <h3 className="text-2xl font-semibold mb-4">Added Stocks</h3>

          <table className="w-full">
            <thead className="text-gray-300">
              <tr>
                <th>Remove</th>
                <th>Stock</th>
                <th>Weight</th>
                <th>Initial</th>
                <th>Current</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {portfolioStocks.map((s, idx) => (
                <tr key={idx} className="border-t border-gray-700">
                  <td>
                    <button
                      onClick={() => removeStock(idx)}
                      className="text-red-400"
                    >
                      Remove
                    </button>
                  </td>
                  <td>
                    {s.name} <span className="text-gray-400">({s.symbol})</span>
                  </td>
                  <td>{s.weightage}%</td>
                  <td>₹{s.initialPrice}</td>
                  <td>₹{s.currentPrice}</td>
                  <td>{s.role}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex gap-4 mt-6">
            <button
              onClick={calculatePortfolio}
              className="bg-green-600 px-6 py-2 rounded-xl font-semibold"
            >
              Calculate Portfolio
            </button>

            <button
              onClick={clearAll}
              className="bg-red-600 px-6 py-2 rounded-xl font-semibold"
            >
              Clear Data
            </button>
          </div>
        </div>
      )}

      {portfolioResult && (
        <div className="p-6 rounded-2xl bg-[#151821]/70 border border-white/10">
          <h3 className="text-2xl font-semibold mb-4">
            Detailed Stock Breakdown
          </h3>

          <table className="w-full">
            <thead className="text-gray-300">
              <tr>
                <th>Stock</th>
                <th>Investment</th>
                <th>Shares</th>
                <th>Current Value</th>
                <th>Change</th>
                <th>Return</th>
              </tr>
            </thead>
            <tbody>
              {portfolioResult.stockResults.map((s, i) => (
                <tr key={i} className="border-t border-gray-700">
                  <td>{portfolioStocks[i]?.name}</td>
                  <td>₹{s.investmentAmount.toFixed(2)}</td>
                  <td>{s.sharesBought.toFixed(2)}</td>
                  <td>₹{s.currentValue.toFixed(2)}</td>
                  <td>{s.priceChangePercent.toFixed(2)}%</td>
                  <td className="text-green-400">
                    ₹{s.finalReturn.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
