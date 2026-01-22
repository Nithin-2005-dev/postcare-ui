import { motion } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Float,
  MeshDistortMaterial,
  Stars,
} from "@react-three/drei";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { useRef } from "react";

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

/* ================= DESIGN SYSTEM ================= */

const EASE = [0.22, 1, 0.36, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: EASE },
  },
};

const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.12 },
  },
};

/* ================= 3D CORE ================= */

function HealthCore() {
  const ref = useRef();

  useFrame(({ mouse }) => {
    if (!ref.current) return;
    ref.current.rotation.x += (mouse.y * 0.25 - ref.current.rotation.x) * 0.05;
    ref.current.rotation.y += (mouse.x * 0.25 - ref.current.rotation.y) * 0.05;
  });

  return (
    <Float speed={1.1} floatIntensity={1.2}>
      <mesh ref={ref}>
        <sphereGeometry args={[1.7, 96, 96]} />
        <MeshDistortMaterial
          color="#3B82F6"
          distort={0.25}
          speed={1.6}
          roughness={0.35}
          metalness={0.2}
        />
      </mesh>
    </Float>
  );
}

/* ================= PAGE ================= */

export default function Home() {
  return (
    <Page>
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="visible"
        className="space-y-1.5"
      >
        {/* ======================================================
           HERO — INTELLIGENCE CORE
        ====================================================== */}
        <motion.section
          variants={fadeUp}
          className="relative overflow-hidden rounded-[48px]
          bg-linear-to-br from-neutral-900 via-neutral-900/90 to-black
          border border-white/10"
        >
          {/* 3D ATMOSPHERE */}
          <div className="absolute inset-0">
            <Canvas camera={{ position: [0, 0, 5] }}>
              <ambientLight intensity={0.7} />
              <directionalLight position={[6, 6, 6]} />
              <Stars radius={60} depth={40} count={500} factor={2} fade />
              <HealthCore />
            </Canvas>
          </div>

          {/* CONTENT */}
          <div className="relative z-10 p-14 md:p-20">
            <p className="text-sm text-neutral-400">
              Good afternoon, {patientProfile.name}
            </p>

            <h1 className="mt-4 text-5xl font-semibold leading-tight">
              Recovery day {recoveryOverview.currentDay}
              <span className="text-neutral-400 font-normal">
                {" "}
                of {recoveryOverview.expectedRecoveryDays}
              </span>
            </h1>

            <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-12">
              <Stat label="Status" value="Recovering normally" accent />
              <Stat
                label="Confidence"
                value={`${recoveryOverview.confidenceScore}%`}
              />
              <Stat label="Condition" value={patientProfile.condition} />
              <Stat label="Hospital" value={patientProfile.hospital} />
            </div>
          </div>
        </motion.section>

        {/* ======================================================
           SPOTLIGHT — STORY MOMENT
        ====================================================== */}
        <motion.section
          variants={fadeUp}
          className="relative rounded-[36px] p-14
          bg-linear-to-r from-blue-600/20 via-cyan-500/10 to-transparent
          border border-white/10"
        >
          <p className="text-xs uppercase tracking-widest text-blue-400 mb-4">
            Recovery spotlight
          </p>

          <h2 className="text-4xl font-semibold mb-6">
            You are recovering faster than average
          </h2>

          <p className="text-lg text-neutral-300 max-w-3xl">
            Based on patients with similar conditions, your symptom
            trends indicate a smoother-than-expected recovery curve.
          </p>

          <div className="mt-10 flex gap-16">
            <Stat label="Avg recovery time" value="14 days" />
            <Stat label="Your projection" value="11 days" accent />
          </div>
        </motion.section>

        {/* ======================================================
           DAILY INSIGHTS
        ====================================================== */}
        <Section title="Today’s insights">
          <MotionGrid cols="md:grid-cols-2 xl:grid-cols-3">
            {dailyInsights.map((item) => (
              <Card key={item.id}>
                <Tag>{item.type}</Tag>
                <h3 className="mt-5 text-xl font-medium">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm text-neutral-400">
                  {item.description}
                </p>
              </Card>
            ))}
          </MotionGrid>
        </Section>

        {/* ======================================================
           MEDICATIONS
        ====================================================== */}
        <Section title="Medications">
          <motion.div
            variants={stagger}
            className="flex gap-8 overflow-x-auto snap-x snap-mandatory pb-6"
          >
            {medications.map((med) => (
              <Card key={med.id} className="min-w-85 snap-start">
                <h3 className="text-xl font-medium">{med.name}</h3>
                <p className="text-sm text-neutral-400">{med.category}</p>

                <div className="mt-6 space-y-2 text-sm">
                  <Row label="Dosage" value={med.dosage} />
                  <Row label="Frequency" value={med.frequency} />
                  <Row
                    label="Remaining"
                    value={`${med.daysRemaining} days`}
                  />
                </div>
              </Card>
            ))}
          </motion.div>
        </Section>

        {/* ======================================================
           RISK SIGNALS
        ====================================================== */}
        <Section title="Risk signals">
          <MotionGrid cols="md:grid-cols-2">
            {riskSignals.map((risk) => (
              <Card key={risk.id}>
                <Tag>{risk.level}</Tag>
                <h3 className="mt-5 text-xl font-medium">
                  {risk.title}
                </h3>
                <p className="mt-3 text-sm text-neutral-400">
                  {risk.description}
                </p>
              </Card>
            ))}
          </MotionGrid>
        </Section>

        {/* ======================================================
           SYMPTOM TRENDS
        ====================================================== */}
        <Section title="Symptom trends">
          <MotionGrid cols="md:grid-cols-2 xl:grid-cols-3">
            {Object.entries(symptomTrends).map(([symptom, values]) => (
              <Card key={symptom}>
                <h3 className="font-medium mb-5">{symptom}</h3>

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
                        animationDuration={1400}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            ))}
          </MotionGrid>
        </Section>

        {/* ======================================================
           EDUCATION
        ====================================================== */}
        <Section title="For you">
          <MotionGrid cols="md:grid-cols-2 xl:grid-cols-3">
            {educationalFeed.map((item) => (
              <Card key={item.id}>
                <Tag>{item.category}</Tag>
                <h3 className="mt-5 text-xl font-medium">
                  {item.title}
                </h3>
                <p className="mt-4 text-xs text-neutral-500">
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
      <h2 className="text-2xl font-semibold mb-8">{title}</h2>
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
      viewport={{ once: true, margin: "-140px" }}
      className={`grid grid-cols-1 ${cols} gap-8`}
    >
      {children}
    </motion.div>
  );
}

function Card({ children, className = "" }) {
  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -12 }}
      transition={{ duration: 0.3 }}
      className={`relative overflow-hidden rounded-3xl
      bg-linear-to-br from-neutral-900 via-neutral-900 to-neutral-950
      border border-white/10 p-10 ${className}`}
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
        className={`text-2xl font-medium ${
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
