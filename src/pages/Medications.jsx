import { medications } from "../data/mockDashboardData";

export default function Medications() {
  return (
    <div className="space-y-10">
      {/* PAGE HEADER */}
      <section>
        <h1 className="text-2xl font-semibold mb-1">
          Medications
        </h1>
        <p className="text-sm text-neutral-400">
          Adherence, side effects, and risk signals
        </p>
      </section>

      {/* MEDICATION OVERVIEW RAIL */}
      <section>
        <h2 className="text-lg font-semibold mb-4">
          Active prescriptions
        </h2>

        <div className="flex gap-4 overflow-x-auto pb-2">
          {medications.map((med) => (
            <div
              key={med.id}
              className="min-w-75 rounded-xl bg-neutral-900 border border-neutral-800 p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-lg font-medium">
                    {med.name}
                  </p>
                  <p className="text-sm text-neutral-400">
                    {med.category}
                  </p>
                </div>

                <span
                  className={`text-xs px-2 py-1 rounded-full
                    ${
                      med.riskLevel === "low"
                        ? "bg-emerald-500/20 text-emerald-400"
                        : med.riskLevel === "medium"
                        ? "bg-amber-500/20 text-amber-400"
                        : "bg-rose-500/20 text-rose-400"
                    }`}
                >
                  {med.riskLevel.toUpperCase()} RISK
                </span>
              </div>

              <div className="space-y-2 text-sm">
                <p>
                  <span className="text-neutral-400">Dosage:</span>{" "}
                  {med.dosage}
                </p>
                <p>
                  <span className="text-neutral-400">Frequency:</span>{" "}
                  {med.frequency}
                </p>
                <p>
                  <span className="text-neutral-400">Remaining:</span>{" "}
                  {med.daysRemaining} days
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ADHERENCE INTELLIGENCE */}
      <section>
        <h2 className="text-lg font-semibold mb-4">
          Adherence tracking
        </h2>

        <div className="grid grid-cols-2 gap-4">
          {medications.map((med) => (
            <div
              key={med.id}
              className="rounded-xl bg-neutral-900 border border-neutral-800 p-6"
            >
              <p className="font-medium mb-3">
                {med.name}
              </p>

              <div className="flex gap-2">
                {med.adherence.map((a, index) => (
                  <div
                    key={index}
                    className={`flex-1 h-10 rounded-lg flex items-center justify-center text-xs
                      ${
                        a.taken
                          ? "bg-emerald-500/20 text-emerald-400"
                          : "bg-rose-500/20 text-rose-400"
                      }`}
                  >
                    Day {a.day}
                  </div>
                ))}
              </div>

              <p className="mt-3 text-xs text-neutral-500">
                Green = taken · Red = missed
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* SIDE EFFECT INTELLIGENCE */}
      <section>
        <h2 className="text-lg font-semibold mb-4">
          Common side effects
        </h2>

        <div className="grid grid-cols-3 gap-4">
          {medications.map((med) => (
            <div
              key={med.id}
              className="rounded-xl bg-neutral-900 border border-neutral-800 p-5"
            >
              <p className="font-medium mb-2">
                {med.name}
              </p>

              <div className="flex flex-wrap gap-2">
                {med.commonSideEffects.map((effect) => (
                  <span
                    key={effect}
                    className="text-xs px-2 py-1 rounded-full bg-neutral-800 text-neutral-300"
                  >
                    {effect}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* INTELLIGENT INSIGHT */}
      <section className="rounded-2xl bg-neutral-900 border border-neutral-800 p-6">
        <h2 className="text-lg font-semibold mb-2">
          Medication insight
        </h2>
        <p className="text-sm text-neutral-400">
          One antibiotic dose was missed recently. Maintaining
          consistent intake improves recovery outcomes and
          reduces complication risks.
        </p>
      </section>
    </div>
  );
}
