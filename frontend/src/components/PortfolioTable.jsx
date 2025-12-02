import { useEffect, useState } from "react";

export default function PortfolioTable() {
  const [result, setResult] = useState(null);

  useEffect(() => {
    fetch("https://stockie-mng-backend.onrender.com/calculate-portfolio", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        stocks: [
          { name: "TCS", weightage: 30, initialPrice: 3500, currentPrice: 3800, role: "captain" },
          { name: "Infosys", weightage: 25, initialPrice: 1500, currentPrice: 1600, role: "vice" },
          { name: "HDFC", weightage: 25, initialPrice: 1600, currentPrice: 1550, role: "regular" },
          { name: "Reliance", weightage: 20, initialPrice: 2400, currentPrice: 2500, role: "regular" }
        ]
      })
    })
      .then(res => res.json())
      .then(data => setResult(data))
      .catch(err => console.error(err));
  }, []);

  if (!result) return <h3 className="text-white p-4">Loading portfolio...</h3>;

  return (
    <div className="bg-gray-900 text-white p-6 rounded-xl shadow-md mt-6">
      <h3 className="text-xl font-semibold mb-4">Your Portfolio</h3>

      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-gray-700 text-gray-300">
            <th className="p-3">Stock</th>
            <th className="p-3">Weight</th>
            <th className="p-3">Investment</th>
            <th className="p-3">Shares</th>
            <th className="p-3">Current Value</th>
            <th className="p-3">Return (%)</th>
            <th className="p-3">Final Return</th>
          </tr>
        </thead>

        <tbody>
          {result.stockResults.map((stock, i) => (
            <tr key={i} className="border-b border-gray-700">
              <td className="p-3">{stock.name}</td>
              <td className="p-3">{stock.weightage}%</td>
              <td className="p-3">₹{stock.investmentAmount.toFixed(2)}</td>
              <td className="p-3">{stock.sharesBought.toFixed(2)}</td>
              <td className="p-3">₹{stock.currentValue.toFixed(2)}</td>
              <td className="p-3">{stock.priceChangePercent.toFixed(2)}%</td>
              <td className="p-3 text-green-400">₹{stock.finalReturn.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
