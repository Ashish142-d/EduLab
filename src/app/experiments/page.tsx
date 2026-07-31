import { prisma } from "@/lib/prisma";
import ExperimentsExplorer, { ExpItem } from "@/components/ExperimentsExplorer";

export const dynamic = "force-dynamic";

const subjectColor: Record<string, string> = {
  Physics: "text-electric-bright border-electric/30",
  Chemistry: "text-emerald-bright border-emerald/30",
  Biology: "text-emerald border-emerald/30",
  Mathematics: "text-purple-light border-purple/30",
  Astronomy: "text-indigo border-indigo/30",
};

export default async function ExperimentsPage() {
  let items: ExpItem[] = [];
  let dbConnected = true;

  try {
    const rows = await prisma.experiment.findMany({
      take: 20,
      include: { subject: true },
    });
    items = rows.map((e) => {
      const subj = e.subject?.name ?? "General";
      const cls = subjectColor[subj] ?? "text-gray-300 border-white/10";
      return {
        id: e.id,
        title: e.title,
        description: e.description,
        subject: subj,
        cls,
      };
    });
  } catch {
    dbConnected = false;
  }

  return (
    <div className="mx-auto max-w-6xl px-6">
      <h2 className="text-3xl font-bold">Experiments</h2>
      <p className="mt-2 text-gray-400">
        {dbConnected
          ? "Loaded live from your Supabase database."
          : "Add DATABASE_URL and run `prisma db push` to see live data."}
      </p>
      {items.length === 0 ? (
        <p className="mt-6 text-gray-500">
          No experiments loaded{dbConnected ? "" : " (database not connected)"} —
          seed with <code className="text-purple-light">node prisma/seed.cjs</code>.
        </p>
      ) : (
        <div className="mt-6">
          <ExperimentsExplorer items={items} />
        </div>
      )}
    </div>
  );
}
