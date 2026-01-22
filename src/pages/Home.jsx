import { motion } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Stars } from "@react-three/drei";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  Tooltip,
} from "recharts";
import { useRef } from "react";
import { Heart, Activity, ShieldCheck } from "lucide-react";

import Page from "../motion/page";
import {
  patientProfile,
  recoveryOverview,
  medications,
  dailyInsights,
  symptomTrends,
} from "../data/mockDashboardData";

/* ================= ANIMATION ================= */

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

/* ================= 3D CORE ================= */

function HealthCore() {
  const ref = useRef(null);

  useFrame(({ mouse }) => {
    if (!ref.current) return;
    ref.current.rotation.x += (mouse.y * 0.25 - ref.current.rotation.x) * 0.05;
    ref.current.rotation.y += (mouse.x * 0.25 - ref.current.rotation.y) * 0.05;
  });

  return (
    <Float speed={1} floatIntensity={1.2}>
      <mesh ref={ref}>
        <sphereGeometry args={[1.6, 96, 96]} />
        <MeshDistortMaterial
          color="#3B82F6"
          distort={0.25}
          speed={1.4}
          roughness={0.3}
          metalness={0.2}
        />
      </mesh>
    </Float>
  );
}

/* ================= PAGE ================= */

export default function Home() {
  const isMobile =
    typeof window !== "undefined" && window.innerWidth < 640;

  function getGreeting() {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    if (hour < 21) return "Good evening";
    return "Good night";
  }

  return (
    <Page>
      <div className="relative min-h-screen bg-black text-white overflow-x-hidden">
        {/* BACKGROUND */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom right, rgba(30,58,138,0.2), #000, #000)",
          }}
        />

        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="relative z-10 max-w-7xl mx-auto px-4 sm:px-12 pb-20 space-y-12 sm:space-y-20"
        >
          {/* ================= HERO ================= */}
          <motion.section
            variants={fadeUp}
            className="hero-section relative overflow-hidden bg-neutral-900/50 border border-white/10 rounded-3xl flex flex-col justify-end"
            style={{
              minHeight: isMobile ? "320px" : "600px",
            }}
          >
            {/* Desktop Canvas */}
            <div className="absolute inset-0 hidden sm:block pointer-events-none">
              <Canvas camera={{ position: [0, 0, 5] }} dpr={[1, 2]}>
                <ambientLight intensity={0.6} />
                <directionalLight position={[6, 6, 6]} />
                <Stars radius={60} depth={40} count={400} factor={2} fade />
                <HealthCore />
              </Canvas>
            </div>

            {/* Mobile fallback */}
            <div className="absolute inset-0 flex sm:hidden items-center justify-center pointer-events-none">
              <div className="w-52 h-52 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
            </div>

            <div
              className="relative z-10 p-6 sm:p-14"
              style={{
                background:
                  "linear-gradient(to top, rgba(0,0,0,1), rgba(0,0,0,0.6), rgba(0,0,0,0))",
              }}
            >
              <div className="flex items-center gap-2 mb-4">
                <ShieldCheck size={14} className="text-blue-400" />
                <p
                  className="text-xs font-bold uppercase text-blue-400"
                  style={{ letterSpacing: "0.2em" }}
                >
                  {getGreeting()}, {patientProfile.name}
                </p>
              </div>

              <h1 className="font-bold tracking-tight leading-tight text-3xl sm:text-5xl lg:text-7xl">
                Recovery day {recoveryOverview.currentDay}
                <span className="block font-light text-neutral-400">
                  of {recoveryOverview.expectedRecoveryDays}
                </span>
              </h1>

              <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-6">
                <Stat label="Status" value="On Track" icon={Activity} accent />
                <Stat
                  label="Confidence"
                  value={`${recoveryOverview.confidenceScore}%`}
                  icon={Heart}
                />
                <Stat label="Condition" value={patientProfile.condition} />
                <Stat label="Hospital" value={patientProfile.hospital} />
              </div>
            </div>
          </motion.section>

          {/* ================= INSIGHTS ================= */}
          <Section title="Clinical Insights">
            <MotionGrid cols="md:grid-cols-2 xl:grid-cols-3">
              {dailyInsights.map((item) => (
                <Card key={item.id} glass>
                  <Tag>{item.type}</Tag>
                  <h3 className="mt-5 text-lg sm:text-xl font-bold">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm text-neutral-400 leading-relaxed">
                    {item.description}
                  </p>
                </Card>
              ))}
            </MotionGrid>
          </Section>

          {/* ================= MEDICATIONS ================= */}
          <Section title="Active Medications">
            <div className="flex gap-5 overflow-x-auto snap-x snap-mandatory pb-6">
              {medications.map((med) => (
                <Card
                  key={med.id}
                  className="med-card min-w-70 sm:min-w-85 snap-center shrink-0"
                >
                  <h3 className="text-lg font-bold">{med.name}</h3>
                  <p className="text-xs text-blue-400 font-bold uppercase tracking-widest mb-6">
                    {med.category}
                  </p>

                  <div className="space-y-4">
                    <Row label="Dosage" value={med.dosage} />
                    <Row label="Frequency" value={med.frequency} />
                    <div className="pt-4 border-t border-white/10">
                      <p className="text-xs uppercase text-neutral-500 font-bold">
                        Inventory
                      </p>
                      <p className="text-lg font-bold">
                        {med.daysRemaining} days left
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </Section>

          {/* ================= TRENDS ================= */}
          <Section title="Biometric Trends">
            <MotionGrid cols="md:grid-cols-2 xl:grid-cols-3">
              {Object.entries(symptomTrends).map(([symptom, values]) => (
                <Card key={symptom}>
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="font-bold capitalize">{symptom}</h3>
                    <span className="text-xs px-2 py-1 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20 font-bold">
                      Live
                    </span>
                  </div>

                  <div className="chart-container h-40">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={values.map((v, i) => ({ day: i + 1, v }))}
                      >
                        <Line
                          type="monotone"
                          dataKey="v"
                          stroke="#3B82F6"
                          strokeWidth={isMobile ? 2.5 : 4}
                          dot={false}
                        />
                        <Tooltip
                          wrapperStyle={{ outline: "none" }}
                          contentStyle={{
                            backgroundColor: "#000",
                            border: "1px solid rgba(255,255,255,0.1)",
                            borderRadius: "12px",
                            fontSize: "12px",
                          }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </Card>
              ))}
            </MotionGrid>
          </Section>
        </motion.div>

        {/* ================= RESPONSIVE FIXES ================= */}
        <style>
          {`
            @media (max-width: 640px) {
              .hero-section {
                min-height: 320px !important;
              }

              .med-card {
                min-width: 75vw !important;
              }

              .chart-container {
                height: 160px !important;
              }

              .wrap-break-word {
                word-break: break-word;
                overflow-wrap: break-word;
              }
            }

            @media (min-width: 641px) and (max-width: 1024px) {
              .med-card {
                min-width: 320px !important;
              }
            }
          `}
        </style>
      </div>
    </Page>
  );
}

/* ================= UI HELPERS ================= */

function Section({ title, children }) {
  return (
    <section>
      <h2 className="text-2xl sm:text-4xl font-bold mb-6 sm:mb-10">
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
      viewport={{ once: true }}
      className={`grid grid-cols-1 ${cols} gap-6 sm:gap-10`}
    >
      {children}
    </motion.div>
  );
}

function Card({ children, className = "", glass = false }) {
  return (
    <motion.div
      variants={fadeUp}
      className={`rounded-3xl p-6 sm:p-10 border border-white/10 ${
        glass ? "bg-black/40 backdrop-blur-xl" : "bg-neutral-900/60"
      } hover:border-blue-500/40 transition ${className}`}
    >
      {children}
    </motion.div>
  );
}

function Stat({ label, value, icon: Icon, accent }) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-1">
        {Icon && <Icon size={12} className="text-neutral-500" />}
        <p className="text-xs uppercase tracking-widest text-neutral-500 font-bold">
          {label}
        </p>
      </div>
      <p
        className={`text-base sm:text-2xl font-bold wrap-break-word ${
          accent ? "text-emerald-400" : "text-white"
        }`}
      >
        {value}
      </p>
    </div>
  );
}

function Tag({ children }) {
  return (
    <span className="inline-block text-xs px-4 py-1.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 font-bold uppercase">
      {children}
    </span>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex justify-between text-sm">
      <span className="text-neutral-500 font-medium">{label}</span>
      <span className="font-bold">{value}</span>
    </div>
  );
}
