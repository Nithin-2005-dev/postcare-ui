import { motion } from "framer-motion";
import {
  Activity,
  AlertTriangle,
  CheckCircle2,
  Target,
} from "lucide-react";

import Page from "../motion/Page";
import {
  recoveryOverview,
  recoveryTimeline,
} from "../data/mockDashboardData";

/* ================= MOTION ================= */

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

/* ================= PAGE ================= */

export default function Recovery() {
  const progress =
    (recoveryOverview.currentDay /
      recoveryOverview.expectedRecoveryDays) *
    100;

  return (
    <Page>
      <div className="space-y-24">
        {/* ================= HERO ================= */}
        <motion.section
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="relative overflow-hidden rounded-[32px]
          bg-gradient-to-br from-neutral-900 via-neutral-900/95 to-black
          border border-white/10 p-14"
        >
          <div className="absolute -top-40 -right-40 h-[520px] w-[520px] bg-emerald-500/25 blur-[160px]" />

          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-400">
                Recovery status
              </p>
              <h1 className="mt-2 text-4xl font-semibold text-emerald-400">
                Progressing normally
              </h1>
            </div>

            {/* CONFIDENCE RING */}
            <div className="relative h-28 w-28">
              <svg viewBox="0 0 36 36" className="w-full h-full">
                <path
                  d="M18 2.0845
                     a 15.9155 15.9155 0 0 1 0 31.831
                     a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#1F2937"
                  strokeWidth="3"
                />
                <path
                  d="M18 2.0845
                     a 15.9155 15.9155 0 0 1 0 31.831"
                  fill="none"
                  stroke="#10B981"
                  strokeWidth="3"
                  strokeDasharray={`${recoveryOverview.confidenceScore}, 100`}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center text-xl font-semibold">
                {recoveryOverview.confidenceScore}%
              </div>
            </div>
          </div>

          {/* PROGRESS BAR */}
          <div className="mt-12">
            <p className="text-sm text-neutral-400 mb-3">
              Recovery progress
            </p>
            <div className="relative h-3 rounded-full bg-neutral-800 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-500 to-emerald-400"
              />
            </div>
            <p className="mt-3 text-xs text-neutral-500">
              Day {recoveryOverview.currentDay} of{" "}
              {recoveryOverview.expectedRecoveryDays}
            </p>
          </div>
        </motion.section>

        {/* ================= TIMELINE ================= */}
        <section>
          <h2 className="text-3xl font-semibold mb-14">
            Recovery journey
          </h2>

          <div className="relative border-l border-white/10 pl-10 space-y-16">
            {recoveryTimeline.map((phase, i) => {
              const isCurrent =
                phase.range.includes(
                  recoveryOverview.currentDay
                );

              return (
                <motion.div
                  key={phase.phase}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="relative"
                >
                  {/* DOT */}
                  <div
                    className={`absolute -left-[22px] top-2 h-5 w-5 rounded-full
                    ${
                      isCurrent
                        ? "bg-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.8)]"
                        : "bg-neutral-600"
                    }`}
                  />

                  <div className="rounded-3xl border border-white/10
                  bg-neutral-900/60 backdrop-blur-xl p-8">
                    <div className="flex items-center gap-3 mb-3">
                      <Target
                        size={18}
                        className="text-blue-400"
                      />
                      <h3 className="text-xl font-semibold">
                        {phase.phase}
                      </h3>
                    </div>

                    <p className="text-sm text-neutral-400 mb-6">
                      {phase.range}
                    </p>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <p className="text-xs text-neutral-500 mb-2">
                          What’s normal
                        </p>
                        <ul className="space-y-2">
                          {phase.normal.map((n) => (
                            <li
                              key={n}
                              className="flex items-center gap-2 text-sm"
                            >
                              <CheckCircle2
                                size={16}
                                className="text-emerald-400"
                              />
                              {n}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <p className="text-xs text-neutral-500 mb-2">
                          Watch out for
                        </p>
                        <ul className="space-y-2">
                          {phase.redFlags.map((r) => (
                            <li
                              key={r}
                              className="flex items-center gap-2 text-sm"
                            >
                              <AlertTriangle
                                size={16}
                                className="text-amber-400"
                              />
                              {r}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* ================= WHAT’S NEXT ================= */}
        <motion.section
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="rounded-[28px] border border-white/10
          bg-gradient-to-br from-blue-600/20 via-transparent to-transparent
          p-10"
        >
          <h2 className="text-2xl font-semibold mb-4">
            What’s next
          </h2>
          <p className="text-sm text-neutral-300 max-w-2xl leading-relaxed">
            Over the next few days, pain and fatigue should
            continue to decrease. If symptoms plateau or worsen
            beyond Day 4, it may be appropriate to consult your
            healthcare provider.
          </p>
        </motion.section>
      </div>
    </Page>
  );
}
