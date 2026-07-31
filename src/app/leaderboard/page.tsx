const rows = [
  { rank: 1, name: "Aarav S.", xp: 8420, streak: 21 },
  { rank: 2, name: "Mei L.", xp: 7910, streak: 18 },
  { rank: 3, name: "Tom B.", xp: 6540, streak: 14 },
  { rank: 4, name: "Priya K.", xp: 5120, streak: 9 },
  { rank: 5, name: "You", xp: 2480, streak: 7 },
];

export default function LeaderboardPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <h2 className="text-3xl font-bold">Leaderboard</h2>
      <p className="mt-2 text-gray-400">Top learners this week (sample data).</p>

      <div className="glass mt-6 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-white/5 text-left text-gray-400">
            <tr>
              <th className="px-5 py-3">Rank</th>
              <th className="px-5 py-3">Student</th>
              <th className="px-5 py-3">XP</th>
              <th className="px-5 py-3">Streak</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.rank} className="border-t border-white/5">
                <td className="px-5 py-3">
                  <span
                    className={`inline-grid h-7 w-7 place-items-center rounded-full text-xs font-bold ${
                      r.rank <= 3 ? "bg-gold/20 text-gold" : "bg-white/5 text-gray-300"
                    }`}
                  >
                    {r.rank}
                  </span>
                </td>
                <td className="px-5 py-3 font-medium text-gray-100">{r.name}</td>
                <td className="px-5 py-3 text-purple-light">{r.xp.toLocaleString()}</td>
                <td className="px-5 py-3 text-gray-300">{r.streak}d</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
