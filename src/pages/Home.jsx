import { motion } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Stars } from "@react-three/drei";
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

/* ================= MOTION ================= */

const EASE = [0.22, 1, 0.36, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE },
  },
};

const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

/* ================= 3D CORE (DESKTOP ONLY) ================= */

function HealthCore() {
  const ref = useRef();

  useFrame(({ mouse }) => {
    if (!ref.current) return;
    ref.current.rotation.x += (mouse.y * 0.25 - ref.current.rotation.x) * 0.05;
    ref.current.rotation.y += (mouse.x * 0.25 - ref.current.rotation.y) * 0.05;
  });

  return (
    <Float speed={1} floatIntensity={1.2}>
      <mesh ref={ref}>
        <sphereGeometry args={[1.5, 80, 80]} />
        <MeshDistortMaterial
          color="#3B82F6"
          distort={0.22}
          speed={1.4}
          roughness={0.35}
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
        className="space-y-20 md:space-y-28"
      >
        {/* ================= HERO ================= */}
        <motion.section
          variants={fadeUp}
          className="relative overflow-hidden rounded-3xl md:rounded-[48px]
          bg-gradient-to-br from-neutral-900 via-neutral-900/90 to-black
          border border-white/10"
        >
          {/* 3D ONLY ON DESKTOP */}
          <div className="absolute inset-0 hidden md:block">
            <Canvas camera={{ position: [0, 0, 5] }}>
              <ambientLight intensity={0.6} />
              <directionalLight position={[6, 6, 6]} />
              <Stars radius={50} depth={40} count={400} factor={2} fade />
              <HealthCore />
            </Canvas>
          </div>

          <div className="relative z-10 px-6 py-10 md:px-16 md:py-20">
            <p className="text-sm text-neutral-400">
              Good afternoon, {patientProfile.name}
            </p>

            <h1 className="mt-3 text-3xl md:text-5xl font-semibold leading-tight">
              Recovery day {recoveryOverview.currentDay}
              <span className="text-neutral-400 font-normal">
                {" "}
                of {recoveryOverview.expectedRecoveryDays}
              </span>
            </h1>

            <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12">
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

        {/* ================= SPOTLIGHT ================= */}
        <motion.section
          variants={fadeUp}
          className="rounded-3xl md:rounded-[36px]
          px-6 py-10 md:px-14 md:py-14
          bg-gradient-to-r from-blue-600/20 via-cyan-500/10 to-transparent
          border border-white/10"
        >
          <p className="text-xs uppercase tracking-widest text-blue-400 mb-3">
            Recovery spotlight
          </p>

          <h2 className="text-2xl md:text-4xl font-semibold mb-4">
            You are recovering faster than average
          </h2>

          <p className="text-sm md:text-lg text-neutral-300 max-w-3xl">
            Based on similar patients, your symptom trends indicate
            a smoother-than-expected recovery curve.
          </p>

          <div className="mt-8 flex gap-10">
            <Stat label="Avg recovery time" value="14 days" />
            <Stat label="Your projection" value="11 days" accent />
          </div>
        </motion.section>

        {/* ================= INSIGHTS ================= */}
        <Section title="Today’s insights">
          <Grid>
            {dailyInsights.map((item) => (
              <Card key={item.id}>
                <Tag>{item.type}</Tag>
                <h3 className="mt-4 text-lg font-medium">{item.title}</h3>
                <p className="mt-2 text-sm text-neutral-400">
                  {item.description}
                </p>
              </Card>
            ))}
          </Grid>
        </Section>

        {/* ================= MEDICATIONS ================= */}
        <Section title="Medications">
          <div className="flex gap-5 overflow-x-auto pb-4">
            {medications.map((med) => (
              <Card key={med.id} className="min-w-[280px]">
                <h3 className="font-medium">{med.name}</h3>
                <p className="text-sm text-neutral-400">{med.category}</p>
                <div className="mt-4 space-y-1 text-sm">
                  <Row label="Dosage" value={med.dosage} />
                  <Row label="Frequency" value={med.frequency} />
                  <Row label="Remaining" value={`${med.daysRemaining} days`} />
                </div>
              </Card>
            ))}
          </div>
        </Section>

        {/* ================= SYMPTOMS ================= */}
        <Section title="Symptom trends">
          <Grid>
            {Object.entries(symptomTrends).map(([symptom, values]) => (
              <Card key={symptom}>
                <h3 className="font-medium mb-3">{symptom}</h3>
                <div className="h-40">
                  <ResponsiveContainer>
                    <LineChart
                      data={values.map((v, i) => ({
                        day: i + 1,
                        severity: v,
                      }))}
                    >
                      <XAxis hide />
                      <YAxis hide domain={[0, 5]} />
                      <Tooltip />
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
              </Card>
            ))}
          </Grid>
        </Section>

        {/* ================= EDUCATION ================= */}
        <Section title="For you">
          <Grid>
            {educationalFeed.map((item) => (
              <Card key={item.id}>
                <Tag>{item.category}</Tag>
                <h3 className="mt-4 font-medium">{item.title}</h3>
                <p className="mt-2 text-xs text-neutral-500">
                  {item.readTime} read
                </p>
              </Card>
            ))}
          </Grid>
        </Section>
      </motion.div>
    </Page>
  );
}

/* ================= UI PRIMITIVES ================= */

function Section({ title, children }) {
  return (
    <section>
      <h2 className="text-xl md:text-2xl font-semibold mb-6">{title}</h2>
      {children}
    </section>
  );
}

function Grid({ children }) {
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
    >
      {children}
    </motion.div>
  );
}

function Card({ children, className = "" }) {
  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -8 }}
      className={`rounded-2xl bg-neutral-900 border border-white/10 p-6 ${className}`}
    >
      {children}
    </motion.div>
  );
}

function Stat({ label, value, accent }) {
  return (
    <div>
      <p className="text-xs text-neutral-400">{label}</p>
      <p className={`text-lg font-medium ${accent ? "text-emerald-400" : ""}`}>
        {value}
      </p>
    </div>
  );
}

function Tag({ children }) {
  return (
    <span className="inline-block text-xs px-2 py-1 rounded-full bg-neutral-800">
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
