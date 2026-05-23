import {
  useEffect,
  useState,
  useContext,
} from "react";

import { AuthContext }
from "../context/AuthContext";

export default function Rankings() {

  /* ---------------- AUTH ---------------- */

  const { user } =
    useContext(AuthContext);

  /* ---------------- STATE ---------------- */

  const [rankings, setRankings] =
    useState([]);

  /* ---------------- FETCH RANKINGS ---------------- */

  useEffect(() => {

    /* Stop if not logged in */
    if (!user) return;

    fetch(
      "https://stockie-mng-backend.onrender.com/get-rankings"
    )
      .then((res) => res.json())
.then((data) => {

  console.log(data);

  setRankings(data);

})      .catch((err) =>
        console.error(
          "Rankings fetch error:",
          err
        )
      );

  }, [user]);

  /* ---------------- LOGIN CHECK ---------------- */

  if (!user) {
    return (
      <h2 className="text-white p-6 text-center text-xl">
        Login first dumbass 😭🔥
      </h2>
    );
  }

  /* ---------------- LOADING ---------------- */

  if (!rankings.length) {
    return (
      <h2 className="text-white p-6 text-center text-xl">
        Loading rankings...
      </h2>
    );
  }

  /* ---------------- SORT + RANK ---------------- */

  const sorted = [...rankings]
    .sort(
      (a, b) =>
        b.totalValue - a.totalValue
    )
    .map((u, i) => ({
      ...u,
      rank: i + 1,
    }));

  /* ---------------- RANK STYLES ---------------- */

  const getRankStyle = (rank) => {
    switch (rank) {

      case 1:
        return "text-yellow-300 drop-shadow-[0_0_8px_rgba(255,215,0,0.8)]";

      case 2:
        return "text-gray-300 drop-shadow-[0_0_8px_rgba(200,200,200,0.6)]";

      case 3:
        return "text-orange-400 drop-shadow-[0_0_8px_rgba(255,150,0,0.6)]";

      default:
        return "text-white";
    }
  };

  const getRowGlow = (rank) => {

    switch (rank) {

      case 1:
        return "bg-yellow-500/10 hover:bg-yellow-500/20";

      case 2:
        return "bg-gray-400/10 hover:bg-gray-400/20";

      case 3:
        return "bg-orange-400/10 hover:bg-orange-400/20";

      default:
        return "hover:bg-white/5";
    }
  };

  /* ---------------- CLEAR LOCAL ---------------- */

  const clearLocalRankings = () => {
    setRankings([]);
  };

  /* ---------------- UI ---------------- */

  return (
    <div className="p-8 max-w-6xl mx-auto text-white">

      <h2 className="text-4xl font-bold tracking-tight mb-6">
        Leaderboard
      </h2>

      <div className="p-6 rounded-2xl bg-[#151821]/70 backdrop-blur-xl border border-white/10 shadow-xl overflow-x-auto">

        <table className="min-w-[700px] w-full border-collapse">

          <thead className="bg-white/5 text-gray-300">

            <tr>

              <th className="p-4 text-left w-[15%]">
                Rank
              </th>

              <th className="p-4 text-left w-[40%]">
                Name
              </th>

              <th className="p-4 text-left w-[45%]">
                Portfolio Value
              </th>

            </tr>

          </thead>

          <tbody>

            {sorted.map((user, idx) => (

              <tr
                key={idx}
                className={`border-b border-gray-700 transition ${getRowGlow(
                  user.rank
                )}`}
              >

                <td
                  className={`p-4 font-extrabold text-xl ${getRankStyle(
                    user.rank
                  )}`}
                >

                  {user.rank === 1 && "🥇 "}
                  {user.rank === 2 && "🥈 "}
                  {user.rank === 3 && "🥉 "}

                  {user.rank}

                </td>

                <td className="p-4 text-lg">
                  {user.name}
                </td>

                <td className="p-4 text-lg font-semibold text-green-400">

                  ₹{user.totalValue.toLocaleString()}

                </td>

              </tr>

            ))}

          </tbody>

        </table>

        <div className="mt-6 text-center">

          <button
            onClick={clearLocalRankings}
            className="bg-red-600 px-6 py-2 rounded-xl font-semibold hover:bg-red-700 transition shadow-lg"
          >

            Clear Local Ranking Data

          </button>

        </div>

      </div>

    </div>
  );
}