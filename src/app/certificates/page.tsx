const certs = [
  { title: "Intro to Physics", issuer: "EduLab", date: "Jul 2025", gold: false },
  { title: "Mastery: Projectile Motion", issuer: "EduLab", date: "Jul 2025", gold: true },
  { title: "Chemistry Foundations", issuer: "EduLab", date: "Jun 2025", gold: false },
];

export default function CertificatesPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-10">
      <h2 className="text-3xl font-bold">Certificates</h2>
      <p className="mt-2 text-gray-400">Achievements you&apos;ve earned (sample data).</p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {certs.map((c) => (
          <div
            key={c.title}
            className={`relative overflow-hidden rounded-2xl border p-6 ${
              c.gold ? "border-gold/40 bg-gradient-to-br from-gold/10 to-purple/5 shadow-glow-gold" : "border-purple/30 bg-purple/5"
            }`}
          >
            <div className="text-xs uppercase tracking-wide text-gray-400">Certificate of Completion</div>
            <h3 className="mt-3 text-lg font-bold text-gray-100">{c.title}</h3>
            <p className="mt-2 text-sm text-gray-400">Issued by {c.issuer} · {c.date}</p>
            <div
              className={`mt-5 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs ${
                c.gold ? "bg-gold/20 text-gold" : "bg-purple/20 text-purple-light"
              }`}
            >
              Verified
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
