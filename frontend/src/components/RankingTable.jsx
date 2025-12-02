export default function RankingTable() {
  const rankings = [
    { name: "User1", totalValue: 120000, rank: 1 },
    { name: "User2", totalValue: 118000, rank: 2 },
    { name: "User3", totalValue: 118000, rank: 2 },
    { name: "User4", totalValue: 110000, rank: 3 },
  ];

  return (
    <div className="bg-gray-900 text-white p-6 rounded-xl shadow-md mt-6">
      <h3 className="text-xl font-semibold mb-4">Rankings</h3>

      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-gray-700 text-gray-300">
            <th className="p-3">Rank</th>
            <th className="p-3">Name</th>
            <th className="p-3">Portfolio Value</th>
          </tr>
        </thead>

        <tbody>
          {rankings.map((user, index) => (
            <tr key={index} className="border-b border-gray-700">
              <td className="p-3 font-bold">{user.rank}</td>
              <td className="p-3">{user.name}</td>
              <td className="p-3">₹{user.totalValue.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
