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
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

/* ================= 3D CORE ================= */

function HealthCore() {
  const ref = useRef(null);
  const isMobile = window.innerWidth < 640;

  useFrame(({ mouse }) => {
    if (!ref.current) return;
    ref.current.rotation.x +=
      (mouse.y * 0.25 - ref.current.rotation.x) * 0.05;
    ref.current.rotation.y +=
      (mouse.x * 0.25 - ref.current.rotation.y) * 0.05;
  });

  return (
    <Float speed={1} floatIntensity={isMobile ? 0.6 : 1.2}>
      <mesh ref={ref}>
        <sphereGeometry args={[1.7, isMobile ? 48 : 96, isMobile ? 48 : 96]} />
        <MeshDistortMaterial
          color="#3B82F6"
          distort={0.22}
          speed={1.4}
          roughness={0.35}
          metalness={0.2}
        />
      </mesh>
    </Float>
  );
}

/* ================= PAGE ================= */

export default function Home() {
  const isMobile = window.innerWidth < 640;

  function getGreeting() {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    if (hour < 21) return "Good evening";
    return "Good night";
  }

  return (
    <Page>
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="visible"
        className="space-y-6 sm:space-y-10"
      >
        {/* ================= HERO ================= */}
        <motion.section
          variants={fadeUp}
          className="
            relative overflow-hidden
            rounded-3xl sm:rounded-[36px] lg:rounded-[48px]
            bg-linear-to-br from-neutral-900 via-neutral-900/90 to-black
            border border-white/10
          "
        >
          <div className="absolute inset-0">
            <Canvas camera={{ position: [0, 0, 5] }} dpr={[1, 1.5]}>
              <ambientLight intensity={0.6} />
              <directionalLight position={[6, 6, 6]} />
              {!isMobile && (
                <Stars radius={60} depth={40} count={400} factor={2} fade />
              )}
              <HealthCore />
            </Canvas>
          </div>

          <div className="relative z-10 p-6 sm:p-10 lg:p-20">
            <p className="text-xs sm:text-sm text-neutral-400">
              {getGreeting()}, {patientProfile.name}
            </p>

            <h1 className="mt-4 font-semibold leading-tight text-3xl sm:text-4xl lg:text-5xl">
              Recovery day {recoveryOverview.currentDay}
              <span className="text-neutral-400 font-normal">
                {" "}
                of {recoveryOverview.expectedRecoveryDays}
              </span>
            </h1>

            <div className="mt-8 sm:mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-10">
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

        {/* ================= DAILY INSIGHTS ================= */}
        <Section title="Today’s insights">
          <MotionGrid cols="md:grid-cols-2 xl:grid-cols-3">
            {dailyInsights.map((item) => (
              <Card key={item.id}>
                <Tag>{item.type}</Tag>
                <h3 className="mt-4 text-lg sm:text-xl font-medium">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-neutral-400">
                  {item.description}
                </p>
              </Card>
            ))}
          </MotionGrid>
        </Section>

        {/* ================= MEDICATIONS ================= */}
        <Section title="Medications">
          <div className="flex gap-4 sm:gap-8 overflow-x-auto snap-x snap-mandatory pb-4 sm:pb-6">
            {medications.map((med) => (
              <Card
                key={med.id}
                className="min-w-[260px] sm:min-w-[320px] snap-start"
              >
                <h3 className="text-lg sm:text-xl font-medium">{med.name}</h3>
                <p className="text-sm text-neutral-400">{med.category}</p>

                <div className="mt-4 space-y-2 text-sm">
                  <Row label="Dosage" value={med.dosage} />
                  <Row label="Frequency" value={med.frequency} />
                  <Row
                    label="Remaining"
                    value={`${med.daysRemaining} days`}
                  />
                </div>
              </Card>
            ))}
          </div>
        </Section>

        {/* ================= SYMPTOM TRENDS ================= */}
        <Section title="Symptom trends">
          <MotionGrid cols="md:grid-cols-2 xl:grid-cols-3">
            {Object.entries(symptomTrends).map(([symptom, values]) => (
              <Card key={symptom}>
                <h3 className="font-medium mb-4">{symptom}</h3>

                <div className="relative h-32 sm:h-44">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={values.map((v, i) => ({
                        day: `Day ${i + 1}`,
                        severity: v,
                      }))}
                    >
                      <XAxis hide={isMobile} dataKey="day" />
                      <YAxis domain={[0, 5]} />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="severity"
                        stroke="#3B82F6"
                        strokeWidth={2.5}
                        dot={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            ))}
          </MotionGrid>
        </Section>

        {/* ================= EDUCATION ================= */}
        <Section title="For you">
          <MotionGrid cols="md:grid-cols-2 xl:grid-cols-3">
            {educationalFeed.map((item) => (
              <Card key={item.id}>
                <Tag>{item.category}</Tag>
                <h3 className="mt-4 text-lg sm:text-xl font-medium">
                  {item.title}
                </h3>
                <p className="mt-2 text-xs text-neutral-500">
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

/* ================= COMPONENTS ================= */

function Section({ title, children }) {
  return (
    <section>
      <h2 className="text-xl sm:text-2xl font-semibold mb-6 sm:mb-8">
        {title}
      </h2>
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
      viewport={{ once: true, margin: "-80px" }}
      className={`grid grid-cols-1 ${cols} gap-6 sm:gap-8`}
    >
      {children}
    </motion.div>
  );
}

function Card({ children, className = "" }) {
  return (
    <motion.div
      variants={fadeUp}
      className={`
        relative overflow-hidden rounded-3xl
        bg-linear-to-br from-neutral-900 via-neutral-900 to-neutral-950
        border border-white/10 p-6 sm:p-10
        transition-transform md:hover:-translate-y-3
        ${className}
      `}
    >
      {children}
    </motion.div>
  );
}

function Stat({ label, value, accent }) {
  return (
    <div>
      <p className="text-xs text-neutral-400">{label}</p>
      <p
        className={`text-xl sm:text-2xl font-medium ${
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
    <span className="inline-block text-xs px-2 py-1 rounded-full bg-neutral-800 text-neutral-300">
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
