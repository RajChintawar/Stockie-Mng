import { useState, useContext } from "react";
import { PortfolioContext } from "../context/PortfolioContext";

export default function Suggestion() {
  const { portfolioStocks } = useContext(PortfolioContext);
  const [suggestion, setSuggestion] = useState(null);
  const [loading, setLoading] = useState(false);


  const getSuggestion = () => {
  if (portfolioStocks.length === 0) {
    alert("Add some stocks first you goblin 😭🔥");
    return;
  }

  setLoading(true);

  fetch("https://stockie-mng-backend.onrender.com/ai-suggest", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ stocks: portfolioStocks }),
  })
    .then((res) => res.json())
    .then((data) => setSuggestion(data.suggestion))
    .catch(() => alert("Backend died 💀🔥"))
    .finally(() => setLoading(false));
};


  return (
    <div className="p-8 text-white max-w-4xl mx-auto space-y-8">
      <h2 className="text-4xl font-bold mb-4">AI Portfolio Analysis</h2>

      <button
        onClick={getSuggestion}
        className="mt-4 bg-blue-600 px-6 py-2 rounded-xl font-semibold hover:bg-blue-700 transition shadow-lg"
      >
        Get AI Suggestion
      </button>

      {loading && (
  <div className="mt-6 flex flex-col items-center gap-4">
    <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    <p className="text-gray-400">Analyzing your portfolio… sit tight u dumbass </p>
  </div>
)}


      {!loading && suggestion && (
  <div className="mt-6 p-8 rounded-2xl bg-gradient-to-br from-[#181c24] to-[#111419] border border-white/10 shadow-2xl backdrop-blur-xl">
    <h3 className="text-3xl font-bold mb-4 text-blue-400">
      📊 AI Portfolio Recommendation
    </h3>

    <div className="text-gray-300 whitespace-pre-line leading-relaxed text-lg">
      {suggestion}
    </div>

    <div className="mt-6 p-4 rounded-xl bg-[#0f1115]/80 border border-white/5">
      <p className="text-sm text-gray-400 italic">
        ⚠️ This is AI-generated advice. Consider your risk before investing.
      </p>
    </div>
  </div>
)}


    </div>
  );
}

