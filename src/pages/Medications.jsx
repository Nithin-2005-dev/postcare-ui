import { motion } from "framer-motion";
import {
  Activity,
  TrendingDown,
  TrendingUp,
  Calendar,
} from "lucide-react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

import Page from "../motion/page";
import {
  symptomHistory,
  symptomTrends,
} from "../data/mockDashboardData";

/* ================= MOTION ================= */

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

/* ================= PAGE ================= */

export default function Symptoms() {
  return (
    <Page>
      <div className="space-y-32">
        {/* ======================================================
           HERO — CONTEXT
        ====================================================== */}
        <motion.section
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="relative overflow-hidden rounded-[36px]
          bg-linear-to-br from-neutral-900 via-neutral-900/95 to-black
          border border-white/10 p-10 md:p-16"
        >
          <div className="absolute -top-40 -right-40 h-130 w-130 bg-blue-500/25 blur-[160px]" />

          <p className="text-sm text-neutral-400 flex items-center gap-2">
            <Activity size={14} /> Symptom monitoring
          </p>

          <h1 className="mt-4 text-4xl md:text-5xl font-semibold">
            How your body is responding
          </h1>

          <p className="mt-6 max-w-xl text-neutral-300 leading-relaxed">
            This view tracks symptom severity over time, highlights
            trends, and helps identify when action may be needed.
          </p>
        </motion.section>

        {/* ======================================================
           SYMPTOM TRENDS — CHARTS
        ====================================================== */}
        <section>
          <h2 className="text-3xl font-semibold mb-12">
            Symptom trends
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
            {Object.entries(symptomTrends).map(
              ([symptom, values]) => {
                const improving =
                  values[values.length - 1] <
                  values[0];

                const chartData = values.map((v, i) => ({
                  day: `Day ${i + 1}`,
                  severity: v,
                }));

                return (
                  <motion.div
                    key={symptom}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="rounded-[28px]
                    bg-neutral-900/60 backdrop-blur-xl
                    border border-white/10 p-8"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <p className="text-lg font-medium">
                        {symptom}
                      </p>

                      <div
                        className={`flex items-center gap-1 text-sm
                        ${
                          improving
                            ? "text-emerald-400"
                            : "text-amber-400"
                        }`}
                      >
                        {improving ? (
                          <TrendingDown size={16} />
                        ) : (
                          <TrendingUp size={16} />
                        )}
                        {improving ? "Improving" : "Fluctuating"}
                      </div>
                    </div>

                    <div className="h-40">
                      <ResponsiveContainer>
                        <LineChart data={chartData}>
                          <XAxis
                            dataKey="day"
                            stroke="#6B7280"
                            fontSize={12}
                          />
                          <YAxis
                            domain={[0, 5]}
                            stroke="#6B7280"
                            fontSize={12}
                          />
                          <Tooltip
                            contentStyle={{
                              background: "#0B0F14",
                              border: "1px solid #1F2937",
                              borderRadius: 8,
                            }}
                          />
                          <Line
                            type="monotone"
                            dataKey="severity"
                            stroke="#3B82F6"
                            strokeWidth={2}
                            dot={false}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>

                    <p className="mt-3 text-xs text-neutral-500">
                      Last {values.length} days
                    </p>
                  </motion.div>
                );
              }
            )}
          </div>
        </section>

        {/* ======================================================
           DAILY LOG — TIMELINE
        ====================================================== */}
        <section>
          <h2 className="text-3xl font-semibold mb-12">
            Daily symptom log
          </h2>

          <div className="space-y-12">
            {symptomHistory.map((day) => (
              <motion.div
                key={day.day}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="rounded-[28px]
                bg-neutral-900/60 backdrop-blur-xl
                border border-white/10 p-8"
              >
                <div className="flex items-center gap-2 mb-6 text-neutral-400">
                  <Calendar size={14} />
                  Day {day.day}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {day.symptoms.map((s) => (
                    <div
                      key={s.type}
                      className="rounded-xl bg-neutral-950
                      border border-neutral-800 p-5"
                    >
                      <p className="font-medium mb-1">
                        {s.type}
                      </p>
                      <p className="text-sm text-neutral-400">
                        Severity: {s.severity} / 5
                      </p>

                      <div className="mt-3 h-2 rounded-full bg-neutral-800 overflow-hidden">
                        <div
                          className="h-full bg-blue-500"
                          style={{
                            width: `${(s.severity / 5) * 100}%`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ======================================================
           PATTERN INSIGHT
        ====================================================== */}
        <motion.section
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="rounded-[36px] border border-white/10
          bg-linear-to-br from-emerald-500/20 via-transparent to-transparent
          p-12"
        >
          <h2 className="text-3xl font-semibold mb-4">
            Pattern insight
          </h2>
          <p className="max-w-xl text-neutral-300 leading-relaxed">
            Pain and nausea are trending downward over recent days.
            This aligns with expected recovery patterns for your
            condition and suggests steady improvement.
          </p>
        </motion.section>
      </div>
    </Page>
  );
}
