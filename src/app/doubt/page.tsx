import AITutor from "@/components/AITutor";

export default function DoubtPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-10">
      <h2 className="text-3xl font-bold">Doubt Solver</h2>
      <p className="mt-2 text-gray-400">
        Stuck on a concept or experiment? Describe your doubt and get a clear, encouraging resolution.
      </p>
      <div className="mt-8">
        <AITutor
          endpoint="/api/doubt"
          title="Doubt Solver"
          subtitle="Clarifying concepts"
          placeholder="Describe your doubt…"
        />
      </div>
    </div>
  );
}
