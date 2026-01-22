import { motion } from "framer-motion";
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
  patientProfile,
  recoveryOverview,
  medications,
  dailyInsights,
  riskSignals,
  educationalFeed,
  symptomTrends,
} from "../data/mockDashboardData";

/* ================= MOTION SYSTEM ================= */

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const stagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.12,
    },
  },
};

/* ================= PAGE ================= */

export default function Home() {
  return (
    <Page>
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="visible"
        className="space-y-24"
      >
        {/* ================= HERO ================= */}
        <motion.section
          variants={fadeUp}
          className="relative overflow-hidden rounded-4xl
          bg-linear-to-br from-neutral-900 via-neutral-900/95 to-neutral-950
          border border-white/10 backdrop-blur-xl p-14 shadow-2xl"
        >
          {/* layered glow */}
          <div className="absolute -top-40 -right-40 h-130 w-130 bg-blue-500/30 blur-[140px] rounded-full" />
          <div className="absolute top-1/3 -left-40 h-105 w-105 bg-purple-500/20 blur-[160px] rounded-full" />

          <p className="relative text-sm text-neutral-400">
            Good afternoon, {patientProfile.name}
          </p>

          <h1 className="relative mt-3 text-4xl md:text-5xl font-semibold leading-tight">
            Recovery day {recoveryOverview.currentDay}
            <span className="text-neutral-400 font-normal">
              {" "}
              of {recoveryOverview.expectedRecoveryDays}
            </span>
          </h1>

          <div className="relative mt-12 grid grid-cols-2 md:grid-cols-4 gap-10">
            <Stat label="Status" value="Recovering normally" accent />
            <Stat
              label="Confidence"
              value={`${recoveryOverview.confidenceScore}%`}
            />
            <Stat label="Condition" value={patientProfile.condition} />
            <Stat label="Hospital" value={patientProfile.hospital} />
          </div>
        </motion.section>

        {/* ================= SPOTLIGHT (WOW SECTION) ================= */}
        <motion.section
          variants={fadeUp}
          className="relative rounded-[28px] p-12
          bg-linear-to-r from-blue-600/20 via-cyan-500/10 to-transparent
          border border-white/10"
        >
          <p className="text-xs uppercase tracking-widest text-blue-400 mb-3">
            Recovery spotlight
          </p>

          <h2 className="text-3xl font-semibold mb-4">
            You are recovering faster than average
          </h2>

          <p className="text-sm text-neutral-300 max-w-3xl">
            Based on patients with similar conditions, your pain and
            energy trends indicate a smoother-than-expected recovery
            curve.
          </p>

          <div className="mt-8 flex gap-10">
            <Stat label="Avg recovery time" value="14 days" />
            <Stat label="Your projection" value="11 days" accent />
          </div>
        </motion.section>

        {/* ================= DAILY INSIGHTS ================= */}
        <Section title="Today’s insights">
          <MotionGrid cols="md:grid-cols-2 xl:grid-cols-3">
            {dailyInsights.map((item) => (
              <Card key={item.id}>
                <Tag>{item.type}</Tag>
                <h3 className="mt-4 text-lg font-medium">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-neutral-400">
                  {item.description}
                </p>
              </Card>
            ))}
          </MotionGrid>
        </Section>

        {/* ================= MEDICATION RAIL ================= */}
        <Section title="Medications">
          <motion.div
            variants={stagger}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4"
          >
            {medications.map((med) => (
              <Card key={med.id} className="min-w-[320px] snap-start">
                <h3 className="text-lg font-medium">{med.name}</h3>
                <p className="text-sm text-neutral-400">{med.category}</p>

                <div className="mt-6 space-y-2 text-sm">
                  <Row label="Dosage" value={med.dosage} />
                  <Row label="Frequency" value={med.frequency} />
                  <Row label="Remaining" value={`${med.daysRemaining} days`} />
                </div>
              </Card>
            ))}
          </motion.div>
        </Section>

        {/* ================= RISK SIGNALS ================= */}
        <Section title="Risk signals">
          <MotionGrid cols="md:grid-cols-2">
            {riskSignals.map((risk) => (
              <Card key={risk.id}>
                <Tag>{risk.level}</Tag>
                <h3 className="mt-4 text-lg font-medium">
                  {risk.title}
                </h3>
                <p className="mt-2 text-sm text-neutral-400">
                  {risk.description}
                </p>
              </Card>
            ))}
          </MotionGrid>
        </Section>

        {/* ================= SYMPTOM TRENDS ================= */}
        <Section title="Symptom trends">
          <MotionGrid cols="md:grid-cols-2 xl:grid-cols-3">
            {Object.entries(symptomTrends).map(([symptom, values]) => (
              <Card key={symptom}>
                <h3 className="font-medium mb-4">{symptom}</h3>

                <div className="relative h-44">
                  <div className="absolute inset-0 bg-blue-500/10 blur-2xl rounded-full" />
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={values.map((v, i) => ({
                        day: `Day ${i + 1}`,
                        severity: v,
                      }))}
                    >
                      <XAxis stroke="#6B7280" fontSize={12} dataKey="day" />
                      <YAxis stroke="#6B7280" fontSize={12} domain={[0, 5]} />
                      <Tooltip
                        contentStyle={{
                          background: "#0B0F14",
                          border: "1px solid #1F2937",
                          borderRadius: 12,
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="severity"
                        stroke="#3B82F6"
                        strokeWidth={2.5}
                        dot={false}
                        isAnimationActive
                        animationDuration={1200}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            ))}
          </MotionGrid>
        </Section>

        {/* ================= EDUCATIONAL FEED ================= */}
        <Section title="For you">
          <MotionGrid cols="md:grid-cols-2 xl:grid-cols-3">
            {educationalFeed.map((item) => (
              <Card key={item.id}>
                <Tag>{item.category}</Tag>
                <h3 className="mt-4 text-lg font-medium">
                  {item.title}
                </h3>
                <p className="mt-3 text-xs text-neutral-500">
                  {item.readTime} read
                </p>
              </Card>
            ))}
          </MotionGrid>
        </Section>
      </motion.div>
    </Page>
  );
}

/* ================= BUILDING BLOCKS ================= */

function Section({ title, children }) {
  return (
    <section>
      <h2 className="text-xl font-semibold mb-6">{title}</h2>
      {children}
    </section>
  );
}

function MotionGrid({ cols, children }) {
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-120px" }}
      className={`grid grid-cols-1 ${cols} gap-6`}
    >
      {children}
    </motion.div>
  );
}

function Card({ children, className = "" }) {
  return (
    <motion.div
      variants={fadeUp}
      whileHover={{
        y: -10,
        boxShadow: "0 40px 90px rgba(0,0,0,0.65)",
      }}
      transition={{ duration: 0.25 }}
      className={`relative overflow-hidden rounded-2xl
      bg-linear-to-br from-neutral-900 via-neutral-900 to-neutral-950
      border border-white/10 p-8 ${className}`}
    >
      <div className="absolute inset-0 pointer-events-none
      bg-linear-to-tr from-white/5 via-transparent to-transparent" />
      {children}
    </motion.div>
  );
}

function Stat({ label, value, accent }) {
  return (
    <div>
      <p className="text-xs text-neutral-400">{label}</p>
      <p
        className={`text-xl font-medium ${
          accent ? "text-emerald-400" : ""
        }`}
      >
        {value}
      </p>
    </div>
  );
}

function Tag({ children }) {
  return (
    <span className="inline-block text-xs px-2 py-1 rounded-full
    bg-neutral-800 text-neutral-300">
      {String(children).toUpperCase()}
    </span>
  );
}

function Row({ label, value }) {
  return (
    <p>
      <span className="text-neutral-400">{label}:</span> {value}
    </p>
  );
}
