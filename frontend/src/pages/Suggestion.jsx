import { useState, useContext } from "react";
import { PortfolioContext } from "../context/PortfolioContext";
import { AuthContext } from "../context/AuthContext"; // 🔥 REQUIRED FOR TOKEN

export default function Suggestion() {
  const { portfolioStocks, totalAmount } = useContext(PortfolioContext);
  const { token } = useContext(AuthContext); // 🔥 GET TOKEN FROM AUTH
  const [suggestion, setSuggestion] = useState(null);
  const [loading, setLoading] = useState(false);

  const getSuggestion = () => {
    if (!token) {
      alert("Login first dumbass 😭🔥");
      return;
    }

    if (portfolioStocks.length === 0) {
      alert("Add some stocks first you goblin 😭🔥");
      return;
    }

    setLoading(true);

    fetch("https://stockie-mng-backend.onrender.com/ai-suggest", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // 🔥 FIXED TOKEN
      },
      body: JSON.stringify({
        stocks: portfolioStocks,
        totalAmount,
      }),
    })
      .then((res) => res.json())
      .then((data) => setSuggestion(data.suggestion))
      .catch(() => alert("Backend died 💀🔥"))
      .finally(() => setLoading(false));
  };

  return (
    <div className="w-full min-h-screen p-4 sm:p-6 md:p-10 
                    max-w-3xl mx-auto text-white space-y-8">

      {/* Title */}
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-center">
        AI Portfolio Analysis
      </h2>

      {/* Button */}
      <div className="flex justify-center">
        <button
          onClick={getSuggestion}
          className="w-full sm:w-auto bg-blue-600 px-6 py-3 rounded-xl 
                     font-semibold hover:bg-blue-700 transition shadow-lg"
        >
          Get AI Suggestion
        </button>
      </div>

      {/* Loading */}
      {loading && (
        <div className="mt-6 flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent 
                          rounded-full animate-spin"></div>
          <p className="text-gray-400 text-sm sm:text-base">
            Analyzing your portfolio… hold on clown 😭🔥
          </p>
        </div>
      )}

      {/* Suggestion Box */}
      {!loading && suggestion && (
        <div
          className="mt-6 p-4 sm:p-6 md:p-8 rounded-2xl 
                     bg-gradient-to-br from-[#181c24] to-[#111419] 
                     border border-white/10 shadow-2xl backdrop-blur-xl"
        >
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 text-blue-400">
            📊 AI Portfolio Recommendation
          </h3>

          <div className="text-gray-300 whitespace-pre-line leading-relaxed 
                          text-sm sm:text-base md:text-lg">
            {suggestion}
          </div>

          <div className="mt-6 p-4 rounded-xl bg-[#0f1115]/80 border border-white/5">
            <p className="text-xs sm:text-sm text-gray-400 italic">
              ⚠️ This is AI-generated advice. Consider your risk before investing.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
