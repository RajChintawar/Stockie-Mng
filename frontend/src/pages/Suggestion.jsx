import { useState } from "react";

export default function Suggestion() {
  const [form, setForm] = useState({
    age: "",
    risk: "medium",
    goal: "",
    years: ""
  });

  const [suggestion, setSuggestion] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const getSuggestion = () => {
    if (!form.age || !form.goal || !form.years) {
      alert("Fill all fields you lil goblin 😭🔥");
      return;
    }

    fetch("https://stockie-mng-backend.onrender.com/ai-suggestion", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
      .then((res) => res.json())
      .then((data) => setSuggestion(data))
      .catch(() => alert("Backend died 💀🔥"));
  };

  return (
    <div className="p-8 text-white max-w-4xl mx-auto space-y-8">

      <h2 className="text-4xl font-bold mb-4">AI Portfolio Suggestions</h2>

      {/* Input Card */}
      <div className="p-6 rounded-2xl bg-[#151821]/70 border border-white/10 shadow-xl space-y-4">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input
            name="age"
            value={form.age}
            onChange={handleChange}
            placeholder="Your Age"
            className="p-3 rounded-xl bg-[#1b1f27] border border-white/10"
            inputMode="numeric"
          />

          <select
            name="risk"
            value={form.risk}
            onChange={handleChange}
            className="p-3 rounded-xl bg-[#1b1f27] border border-white/10"
          >
            <option value="low">Low Risk</option>
            <option value="medium">Medium Risk</option>
            <option value="high">High Risk</option>
          </select>

          <input
            name="goal"
            value={form.goal}
            onChange={handleChange}
            placeholder="Financial Goal (e.g. 5 lakh)"
            className="p-3 rounded-xl bg-[#1b1f27] border border-white/10"
          />

          <input
            name="years"
            value={form.years}
            onChange={handleChange}
            placeholder="Years to Achieve Goal"
            className="p-3 rounded-xl bg-[#1b1f27] border border-white/10"
            inputMode="numeric"
          />
        </div>

        <button
          onClick={getSuggestion}
          className="mt-4 bg-blue-600 px-6 py-2 rounded-xl font-semibold hover:bg-blue-700"
        >
          Get AI Suggestion
        </button>
      </div>

      {/* Output Box */}
      {suggestion && (
        <div className="p-6 bg-[#151821]/70 rounded-xl border border-white/10 shadow-xl">
          <h3 className="text-2xl font-semibold mb-4">Suggested Allocation</h3>

          <ul className="space-y-2 text-lg">
            {Object.entries(suggestion.allocation).map(([key, value]) => (
              <li key={key}>
                <span className="font-bold">{key}: </span>
                {value}%
              </li>
            ))}
          </ul>

          <p className="mt-4 text-gray-300">{suggestion.message}</p>
        </div>
      )}

    </div>
  );
}
