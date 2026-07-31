const stats = [
  { label: "Students", value: "32", color: "text-purple-light" },
  { label: "Avg Score", value: "78%", color: "text-emerald-bright" },
  { label: "Pending Reviews", value: "5", color: "text-gold" },
  { label: "Active Labs", value: "4", color: "text-cyan" },
];

const students = [
  { name: "Aarav S.", progress: 92, status: "On track" },
  { name: "Mei L.", progress: 81, status: "On track" },
  { name: "Tom B.", progress: 64, status: "Needs help" },
  { name: "Priya K.", progress: 58, status: "Needs help" },
];

export default function TeacherPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <h2 className="text-3xl font-bold">Teacher Dashboard</h2>
      <p className="mt-2 text-gray-400">Class overview (sample data).</p>

      <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="glass hover-lift p-5">
            <p className="text-xs uppercase tracking-wide text-gray-400">{s.label}</p>
            <p className={`mt-1 text-2xl font-bold ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      <div className="glass mt-6 p-6">
        <h3 className="font-semibold text-gray-100">Students</h3>
        <div className="mt-4 space-y-3">
          {students.map((s) => (
            <div key={s.name} className="flex items-center gap-4 rounded-xl border border-white/5 bg-white/5 p-3">
              <div className="flex-1">
                <p className="font-medium text-gray-100">{s.name}</p>
                <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-white/10">
                  <div className="h-full rounded-full bg-gradient-to-r from-purple to-cyan" style={{ width: `${s.progress}%` }} />
                </div>
              </div>
              <span
                className={`rounded-full px-3 py-1 text-xs ${
                  s.status === "Needs help" ? "bg-red-500/15 text-red-300" : "bg-emerald/15 text-emerald-bright"
                }`}
              >
                {s.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
