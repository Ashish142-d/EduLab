import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import AITutor from "@/components/AITutor";

export const dynamic = "force-dynamic";

const subjectColor: Record<string, string> = {
  Physics: "text-electric-bright",
  Chemistry: "text-emerald-bright",
  Biology: "text-emerald",
  Mathematics: "text-purple-light",
  Astronomy: "text-indigo",
};

export default async function ExperimentPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  let experiment: any = null;
  let dbConnected = true;
  try {
    experiment = await prisma.experiment.findUnique({
      where: { id },
      include: { subject: true },
    });
  } catch {
    dbConnected = false;
  }

  if (!experiment) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-16 text-center">
        <h2 className="text-2xl font-bold">Experiment not found</h2>
        <p className="mt-2 text-gray-400">
          This experiment isn&apos;t available
          {dbConnected ? "" : " (database not connected)"}.
        </p>
        <Link href="/experiments" className="btn-ghost mt-6 px-4 py-2 text-sm">
          Back to Experiments
        </Link>
      </div>
    );
  }

  const subj = experiment.subject?.name ?? "General";
  const cls = subjectColor[subj] ?? "text-gray-300";

  return (
    <div className="mx-auto max-w-4xl px-6 py-10">
      <Link
        href="/experiments"
        className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-purple-light"
      >
        <ArrowLeft className="h-4 w-4" /> Experiments
      </Link>
      <span className={`mt-4 inline-block text-xs font-semibold uppercase tracking-wide ${cls}`}>
        {subj}
      </span>
      <h2 className="mt-2 text-3xl font-bold">{experiment.title}</h2>
      <p className="mt-3 text-gray-300">{experiment.description}</p>

      <div className="glass mt-6 p-6">
        <h3 className="font-semibold text-gray-100">Theory</h3>
        <p className="mt-3 text-sm text-gray-400">
          Detailed theory for this CBSE Class 11 topic will appear here. Use the AI
          tutor below to explore concepts, derivations, and solved examples.
        </p>
      </div>

      <section id="ai" className="mt-8 scroll-mt-28">
        <h3 className="mb-4 text-xl font-bold">Ask the AI Tutor</h3>
        <AITutor />
      </section>
    </div>
  );
}
