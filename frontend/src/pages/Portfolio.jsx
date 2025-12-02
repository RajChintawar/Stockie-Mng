import { useState, useContext } from "react";
import { PortfolioContext } from "../context/PortfolioContext";

export default function Portfolio() {
  const {
    portfolioResult,
    setPortfolioResult,
    portfolioStocks,
    setPortfolioStocks,
  } = useContext(PortfolioContext);

  const [error, setError] = useState("");
  const [username, setUsername] = useState("");

  const [form, setForm] = useState({
    name: "",
    weightage: "",
    initialPrice: "",
    currentPrice: "",
    role: "regular",
  });

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

    if (portfolioStocks.length === 0) {
      setError("Add at least ONE mf stock 😭🔥");
      return;
    }

    fetch("https://stockie-mng-backend.onrender.com/save-portfolio", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: username,
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

    localStorage.removeItem("portfolioStocks");
    localStorage.removeItem("portfolioResult");
  };

  return (
    <div className="p-8 max-w-6xl mx-auto text-white space-y-10">
      <h2 className="text-4xl font-bold tracking-tight mb-6">Portfolio</h2>

      {/* ERROR BOX */}
      {error && (
        <div className="bg-red-700/60 border border-red-500/40 p-4 rounded-xl backdrop-blur-md shadow-lg">
          <p className="text-white font-semibold">{error}</p>
        </div>
      )}

      {/* FORM CARD */}
      <div className="p-6 rounded-2xl bg-[#151821]/70 backdrop-blur-xl border border-white/10 shadow-xl space-y-5">

        {/* Username */}
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter Your Name"
          className="p-3 rounded-xl bg-[#1b1f27] border border-white/10 w-full focus:ring-2 focus:ring-purple-500 outline-none"
        />

        <h3 className="text-2xl font-semibold mb-4">Add Stock</h3>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Stock Name"
            className="p-3 rounded-xl bg-[#1b1f27] border border-white/10 focus:ring-2 focus:ring-blue-500 outline-none"
          />

          <input
            name="weightage"
            value={form.weightage}
            onChange={handleChange}
            placeholder="Weight %"
            inputMode="numeric"
            className="p-3 rounded-xl bg-[#1b1f27] border border-white/10 focus:ring-2 focus:ring-blue-500 outline-none"
          />

          <input
            name="initialPrice"
            value={form.initialPrice}
            onChange={handleChange}
            placeholder="Initial Price"
            inputMode="numeric"
            className="p-3 rounded-xl bg-[#1b1f27] border border-white/10 focus:ring-2 focus:ring-blue-500 outline-none"
          />

          <input
            name="currentPrice"
            value={form.currentPrice}
            onChange={handleChange}
            placeholder="Current Price"
            inputMode="numeric"
            className="p-3 rounded-xl bg-[#1b1f27] border border-white/10 focus:ring-2 focus:ring-blue-500 outline-none"
          />

          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className="p-3 rounded-xl bg-[#1b1f27] border border-white/10 focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="regular">Regular</option>
            <option value="captain">Captain</option>
            <option value="vice">Vice-Captain</option>
          </select>
        </div>

        <button
          onClick={addStock}
          className="mt-3 bg-blue-600 px-5 py-2 rounded-xl font-semibold hover:bg-blue-700 transition shadow-lg"
        >
          Add Stock
        </button>
      </div>

      {/* ADDED STOCKS TABLE */}
      {portfolioStocks.length > 0 && (
        <div className="p-6 rounded-2xl bg-[#151821]/70 backdrop-blur-xl border border-white/10 shadow-xl overflow-x-auto">
          <h3 className="text-2xl font-semibold mb-4">Added Stocks</h3>

          <div className="overflow-x-auto">
            <table className="min-w-[900px] w-full border-collapse table-auto">
              <thead className="text-gray-300 bg-white/5">
                <tr>
                  <th className="p-3 text-left">Remove</th>
                  <th className="p-3 text-left">Name</th>
                  <th className="p-3 text-left">Weight %</th>
                  <th className="p-3 text-left">Initial</th>
                  <th className="p-3 text-left">Current</th>
                  <th className="p-3 text-left">Role</th>
                </tr>
              </thead>

              <tbody>
                {portfolioStocks.map((s, idx) => (
                  <tr key={idx} className="border-b border-gray-800">
                    <td className="p-3">
                      <button
                        onClick={() => removeStock(idx)}
                        className="text-red-400 border border-red-500 px-3 py-1 rounded-lg hover:bg-red-600 hover:text-white transition"
                      >
                        Remove
                      </button>
                    </td>
                    <td className="p-3">{s.name}</td>
                    <td className="p-3">{s.weightage}%</td>
                    <td className="p-3">₹{s.initialPrice}</td>
                    <td className="p-3">₹{s.currentPrice}</td>
                    <td className="p-3">{s.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex gap-4 mt-6">
            <button
              onClick={calculatePortfolio}
              className="bg-green-600 px-6 py-2 rounded-xl font-semibold hover:bg-green-700 transition shadow-lg"
            >
              Calculate Portfolio
            </button>

            <button
              onClick={clearAll}
              className="bg-red-600 px-6 py-2 rounded-xl font-semibold hover:bg-red-700 transition shadow-lg"
            >
              Clear Data
            </button>
          </div>
        </div>
      )}

      {/* RESULT TABLE */}
      {portfolioResult && (
        <div className="p-6 mt-10 rounded-2xl bg-[#151821]/70 backdrop-blur-xl border border-white/10 shadow-xl overflow-x-auto">
          <h3 className="text-2xl font-semibold mb-4">Detailed Stock Breakdown</h3>

          <div className="overflow-x-auto">
            <table className="min-w-[900px] w-full border-collapse table-auto">
              <thead className="text-gray-300 bg-white/5">
                <tr>
                  <th className="p-3 text-left">Stock</th>
                  <th className="p-3 text-left">Investment</th>
                  <th className="p-3 text-left">Shares</th>
                  <th className="p-3 text-left">Current Value</th>
                  <th className="p-3 text-left">Price Change</th>
                  <th className="p-3 text-left">Final Return</th>
                </tr>
              </thead>

              <tbody>
                {portfolioResult.stockResults.map((s, i) => (
                  <tr key={i} className="border-b border-gray-800">
                    <td className="p-3">{portfolioStocks[i]?.name}</td>
                    <td className="p-3">₹{s.investmentAmount.toFixed(2)}</td>
                    <td className="p-3">{s.sharesBought.toFixed(2)}</td>
                    <td className="p-3">₹{s.currentValue.toFixed(2)}</td>
                    <td className="p-3">{s.priceChangePercent.toFixed(2)}%</td>
                    <td className="p-3 text-green-400">₹{s.finalReturn.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
}
