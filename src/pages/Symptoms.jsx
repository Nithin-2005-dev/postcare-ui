import {
  symptomHistory,
  symptomTrends,
} from "../data/mockDashboardData";

export default function Symptoms() {
  return (
    <div className="space-y-10">
      {/* PAGE HEADER */}
      <section>
        <h1 className="text-2xl font-semibold mb-1">
          Symptoms
        </h1>
        <p className="text-sm text-neutral-400">
          Track how your symptoms change over time
        </p>
      </section>

      {/* SYMPTOM TRENDS */}
      <section>
        <h2 className="text-lg font-semibold mb-4">
          Severity trends
        </h2>

        <div className="grid grid-cols-3 gap-4">
          {Object.entries(symptomTrends).map(
            ([symptom, values]) => (
              <div
                key={symptom}
                className="rounded-xl bg-neutral-900 border border-neutral-800 p-5"
              >
                <p className="font-medium mb-3">
                  {symptom}
                </p>

                <div className="flex items-end gap-1 h-24">
                  {values.map((v, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-sm bg-blue-500/40"
                      style={{ height: `${v * 16 + 6}px` }}
                    />
                  ))}
                </div>

                <p className="mt-3 text-xs text-neutral-500">
                  Last {values.length} days
                </p>
              </div>
            )
          )}
        </div>
      </section>

      {/* DAILY HISTORY */}
      <section>
        <h2 className="text-lg font-semibold mb-4">
          Daily symptom log
        </h2>

        <div className="space-y-4">
          {symptomHistory.map((day) => (
            <div
              key={day.day}
              className="rounded-xl bg-neutral-900 border border-neutral-800 p-6"
            >
              <p className="text-sm text-neutral-400 mb-4">
                Day {day.day}
              </p>

              <div className="grid grid-cols-3 gap-4">
                {day.symptoms.map((s) => (
                  <div
                    key={s.type}
                    className="rounded-lg bg-neutral-950 border border-neutral-800 p-4"
                  >
                    <p className="font-medium mb-1">
                      {s.type}
                    </p>
                    <p className="text-sm text-neutral-400">
                      Severity: {s.severity} / 5
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PATTERN INSIGHT */}
      <section className="rounded-2xl bg-neutral-900 border border-neutral-800 p-6">
        <h2 className="text-lg font-semibold mb-2">
          Pattern insight
        </h2>
        <p className="text-sm text-neutral-400">
          Pain and nausea levels are trending downward over the
          last few days, which aligns with expected recovery
          patterns for your condition.
        </p>
      </section>
    </div>
  );
}
