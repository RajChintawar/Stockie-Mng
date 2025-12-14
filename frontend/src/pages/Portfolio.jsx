import { useState, useContext, useEffect } from "react";
import { PortfolioContext } from "../context/PortfolioContext";

export default function Portfolio() {
  const {
    portfolioStocks,
    setPortfolioStocks,
    totalAmount,
    setTotalAmount,
  } = useContext(PortfolioContext);

  const [error, setError] = useState("");
const [username, setUsername] = useState(
  () => localStorage.getItem("pf_username") || ""
);
  const [locked, setLocked] = useState(false); // 🔒 lock name & amount


  const [stockList, setStockList] = useState([]);
  const [stockLoading, setStockLoading] = useState(true);

  const [result, setResult] = useState(null);

  const [form, setForm] = useState({
    name: "",
    weightage: "",
    initialPrice: "",
    currentPrice: "",
    role: "regular",
  });

  // 🔥 Fetch stocks
useEffect(() => {
  localStorage.setItem("pf_username", username);
}, [username]);



  useEffect(() => {
    fetch("https://stockie-mng-backend.onrender.com/stocks/top")
      .then((res) => res.json())
      .then(setStockList)
      .catch(() => {})
      .finally(() => setStockLoading(false));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addStock = () => {
    if (!form.name || !form.weightage || !form.initialPrice || !form.currentPrice) {
      setError("Fill all fields dumbass 😭🔥");
      return;
    }

    setPortfolioStocks([
      ...portfolioStocks,
      {
        ...form,
        weightage: Number(form.weightage),
        initialPrice: Number(form.initialPrice),
        currentPrice: Number(form.currentPrice),
      },
    ]);

    setForm({
      name: "",
      weightage: "",
      initialPrice: "",
      currentPrice: "",
      role: "regular",
    });

    setError("");
  };

  const removeStock = (i) => {
    const updated = [...portfolioStocks];
    updated.splice(i, 1);
    setPortfolioStocks(updated);
  };

  const calculatePortfolio = () => {
    if (!username || !totalAmount || portfolioStocks.length === 0) {
      setError("Fill everything first 🤡");
      return;
    }

    setLocked(true);

    const stockResults = portfolioStocks.map((s) => {
      const investment = totalAmount * (s.weightage / 100);
      const shares = investment / s.initialPrice;
      const currentValue = shares * s.currentPrice;
      const profit = currentValue - investment;

      return {
        ...s,
        investment,
        shares,
        currentValue,
        profit,
      };
    });

    setResult(stockResults);
    setError("");
  };

  const clearAll = () => {
    setPortfolioStocks([]);
    setResult(null);
    setUsername("");
    setTotalAmount(0);
    setLocked(false);
    setError("");
localStorage.removeItem("pf_username");
  localStorage.removeItem("pf_totalAmount");


  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto text-white space-y-10">
      <h2 className="text-4xl font-bold">Portfolio</h2>

      {error && <div className="bg-red-700/60 p-4 rounded-xl">{error}</div>}

      {/* ================= ADD STOCK FORM ================= */}
      <div className="p-6 rounded-2xl bg-[#151821]/70 border border-white/10 space-y-5">
        <input
          disabled={locked}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Your Name"
          className="w-full p-3 rounded-xl bg-[#1b1f27] disabled:opacity-50"
        />

        <input
          disabled={locked}
          value={totalAmount}
          onChange={(e) => setTotalAmount(Number(e.target.value))}
          placeholder="Total Amount (₹)"
          className="w-full p-3 rounded-xl bg-[#1b1f27] disabled:opacity-50"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {stockLoading ? (
            <div className="p-3 bg-[#1b1f27] rounded-xl">Loading…</div>
          ) : (
            <select
              name="name"
              value={form.name}
              onChange={handleChange}
              className="p-3 rounded-xl bg-[#1b1f27]"
            >
              <option value="">Select Stock</option>
              {stockList.map((s) => (
                <option key={s.symbol} value={s.name}>
                  {s.name} ({s.symbol})
                </option>
              ))}
            </select>
          )}

          <input name="weightage" value={form.weightage} onChange={handleChange}
            placeholder="Weight %" className="p-3 rounded-xl bg-[#1b1f27]" />

          <input name="initialPrice" value={form.initialPrice} onChange={handleChange}
            placeholder="Initial Price" className="p-3 rounded-xl bg-[#1b1f27]" />

          <input name="currentPrice" value={form.currentPrice} onChange={handleChange}
            placeholder="Current Price" className="p-3 rounded-xl bg-[#1b1f27]" />

          <select name="role" value={form.role} onChange={handleChange}
            className="p-3 rounded-xl bg-[#1b1f27]">
            <option value="regular">Regular</option>
            <option value="captain">Captain</option>
            <option value="vice">Vice</option>
          </select>
        </div>

        <button onClick={addStock}
          className="bg-blue-600 px-6 py-2 rounded-xl font-semibold">
          Add Stock
        </button>
      </div>

      {/* ================= ADDED STOCKS ================= */}
      {portfolioStocks.length > 0 && (
        <>
          {/* Desktop Table */}
          <div className="hidden md:block p-6 bg-[#151821]/70 rounded-2xl border border-white/10">
            <table className="w-full">
              <thead className="text-gray-400">
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
                  <tr key={i} className="border-t border-gray-700">
                    <td><button onClick={() => removeStock(i)} className="text-red-400">Remove</button></td>
                    <td>{s.name}</td>
                    <td>{s.weightage}%</td>
                    <td>₹{s.initialPrice}</td>
                    <td>₹{s.currentPrice}</td>
                    <td>{s.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex gap-4 mt-6">
              <button onClick={calculatePortfolio} className="bg-green-600 px-6 py-2 rounded-xl">Calculate</button>
              <button onClick={clearAll} className="bg-red-600 px-6 py-2 rounded-xl">Clear</button>
            </div>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden space-y-4">
            {portfolioStocks.map((s, i) => (
              <div key={i} className="p-4 bg-[#151821] rounded-xl border border-white/10">
                <div className="flex justify-between">
                  <h3 className="font-bold">{s.name}</h3>
                  <button onClick={() => removeStock(i)} className="text-red-400">✕</button>
                </div>
                <p>Weight: {s.weightage}%</p>
                <p>Initial: ₹{s.initialPrice}</p>
                <p>Current: ₹{s.currentPrice}</p>
                <p className="text-gray-400">Role: {s.role}</p>
              </div>
            ))}

            <div className="flex gap-3">
              <button onClick={calculatePortfolio} className="flex-1 bg-green-600 py-2 rounded-xl">Calculate</button>
              <button onClick={clearAll} className="flex-1 bg-red-600 py-2 rounded-xl">Clear</button>
            </div>
          </div>
        </>
      )}

      {/* ================= RESULT ================= */}
      {result && (
        <div className="p-6 bg-[#151821]/70 rounded-2xl border border-white/10">
          <h3 className="text-2xl font-semibold mb-4">Calculated Portfolio</h3>

          <div className="hidden md:block">
            <table className="w-full">
              <thead className="text-gray-400">
                <tr>
                  <th>Stock</th>
                  <th>Investment</th>
                  <th>Shares</th>
                  <th>Current Value</th>
                  <th>Profit</th>
                </tr>
              </thead>
              <tbody>
                {result.map((s, i) => (
                  <tr key={i} className="border-t border-gray-700">
                    <td>{s.name}</td>
                    <td>₹{s.investment.toFixed(2)}</td>
                    <td>{s.shares.toFixed(2)}</td>
                    <td>₹{s.currentValue.toFixed(2)}</td>
                    <td className={s.profit >= 0 ? "text-green-400" : "text-red-400"}>
                      ₹{s.profit.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="md:hidden space-y-4">
            {result.map((s, i) => (
              <div key={i} className="p-4 bg-[#1b1f27] rounded-xl">
                <h4 className="font-bold">{s.name}</h4>
                <p>Invested: ₹{s.investment.toFixed(2)}</p>
                <p>Current: ₹{s.currentValue.toFixed(2)}</p>
                <p className={s.profit >= 0 ? "text-green-400" : "text-red-400"}>
                  Profit: ₹{s.profit.toFixed(2)}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
