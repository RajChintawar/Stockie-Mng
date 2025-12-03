import { useContext } from "react";
import { PortfolioContext } from "../context/PortfolioContext";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  LineChart,
  Line,
} from "recharts";

export default function Dashboard() {
  const { portfolioResult, portfolioStocks } = useContext(PortfolioContext);

  if (!portfolioResult) {
    return (
      <div className="p-8 max-w-6xl mx-auto text-white">
        <h2 className="text-4xl font-bold mb-4">Dashboard</h2>
        <p className="text-gray-400 text-lg">
          Add stocks in the Portfolio page to view analytics.
        </p>
      </div>
    );
  }

  const result = portfolioResult;

  // NEW METRICS
  const invested = result.totalInvested;
  const current = result.totalValue;
  const growth = result.netGrowth;
  const percent = ((growth / invested) * 100).toFixed(2);
  const isProfit = growth >= 0;

  return (
    <div className="p-4 sm:p-6 md:p-8 max-w-6xl mx-auto text-white space-y-10">
      {/* MAIN HEADING */}
      <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Dashboard</h2>

      {/* STATS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* TOTAL INVESTED */}
        <div className="p-6 rounded-2xl bg-[#151821] hover:bg-[#1d2030]
        border border-white/10 shadow-lg transition">
          <h3 className="text-lg text-gray-300">Total Invested</h3>
          <p className="text-3xl font-bold mt-2">₹{invested.toLocaleString()}</p>
        </div>

        {/* CURRENT VALUE */}
        <div className="p-6 rounded-2xl bg-[#151821] hover:bg-[#1d2030]
        border border-white/10 shadow-lg transition">
          <h3 className="text-lg text-gray-300">Current Value</h3>
          <p className="text-3xl font-bold mt-2">₹{current.toLocaleString()}</p>
        </div>

        {/* NET RETURN */}
        <div className="p-6 rounded-2xl bg-[#151821] hover:bg-[#1d2030]
        border border-white/10 shadow-lg transition">
          <h3 className="text-lg text-gray-300">Net {isProfit ? "Profit" : "Loss"}</h3>

          <p className={`text-3xl font-bold mt-2 ${isProfit ? "text-green-400" : "text-red-400"}`}>
            {isProfit ? "+" : "-"}₹{Math.abs(growth).toLocaleString()}
          </p>

          <p className={`text-xl mt-1 ${isProfit ? "text-green-400" : "text-red-400"}`}>
            {percent}%
          </p>
        </div>

      </div>

      {/* PIE CHART */}
      <div className="bg-[#151821] p-6 rounded-2xl border border-white/10 shadow-xl">
        <h3 className="text-2xl font-semibold mb-4 text-gray-300">
          Weightage Distribution
        </h3>

        <div style={{ width: "100%", height: 350 }}>
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={result.stockResults.map((s, i) => ({
                  name: portfolioStocks[i]?.name,
                  value: s.investmentAmount,
                }))}
                dataKey="value"
                nameKey="name"
                outerRadius={120}
                label
              >
                {result.stockResults.map((_, index) => (
                  <Cell
                    key={index}
                    fill={[
                      "#4ade80",
                      "#60a5fa",
                      "#fbbf24",
                      "#f87171",
                      "#c084fc",
                    ][index % 5]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* BAR CHART */}
      <div className="bg-[#151821] p-6 rounded-2xl border border-white/10 shadow-xl">
        <h3 className="text-2xl font-semibold mb-4 text-gray-300">
          Stock-wise Final Returns
        </h3>

        <div style={{ width: "100%", height: 350 }}>
          <ResponsiveContainer>
            <BarChart
              data={result.stockResults.map((s, i) => ({
                name: portfolioStocks[i]?.name,
                finalReturn: s.finalReturn,
              }))}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#2a2e3f" />
              <XAxis dataKey="name" stroke="#9aa0b5" />
              <YAxis stroke="#9aa0b5" />
              <Tooltip />
              <Legend />
              <Bar dataKey="finalReturn" fill="#4ade80" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* LINE CHART */}
      <div className="bg-[#151821] p-6 rounded-2xl border border-white/10 shadow-xl mt-10">
        <h3 className="text-2xl font-semibold mb-4 text-gray-300">
          Portfolio Performance (Simulated Growth)
        </h3>

        <div style={{ width: "100%", height: 350 }}>
          <ResponsiveContainer>
            <LineChart
              data={[
                { day: "Day 1", value: current * 0.92 },
                { day: "Day 2", value: current * 0.95 },
                { day: "Day 3", value: current * 1.01 },
                { day: "Day 4", value: current * 1.03 },
                { day: "Day 5", value: current * 1.08 },
                { day: "Today", value: current },
              ]}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#2a2e3f" />
              <XAxis dataKey="day" stroke="#9aa0b5" />
              <YAxis stroke="#9aa0b5" />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#4ade80"
                strokeWidth={3}
                dot={{ r: 6, fill: "#22c55e" }}
                activeDot={{ r: 10 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

