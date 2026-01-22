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
import { Heart, Activity, Calendar, ShieldCheck } from "lucide-react";

import Page from "../motion/page";
import {
  patientProfile,
  recoveryOverview,
  medications,
  dailyInsights,
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

/* ================= 3D CORE (Desktop Only) ================= */

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
        <sphereGeometry args={[1.7, 96, 96]} />
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
  function getGreeting() {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    if (hour < 21) return "Good evening";
    return "Good night";
  }

  return (
    <Page>
      <div className="relative min-h-screen overflow-x-hidden bg-black text-white">
        {/* 🌌 BACKGROUND BLUR (Consistent with Insights) */}
        <div className="absolute inset-0 bg-linear-to-br from-blue-900/20 via-black to-black pointer-events-none" />

        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="relative z-10 space-y-10 sm:space-y-20 pb-20 px-6 sm:px-12 max-w-7xl mx-auto"
        >
          {/* ================= HERO ================= */}
          <motion.section
            variants={fadeUp}
            className="
              relative overflow-hidden min-h-[400px] sm:min-h-[600px]
              rounded-[2.5rem] sm:rounded-[4rem]
              bg-neutral-900/40 border border-white/10
              flex flex-col justify-end
            "
          >
            {/* Canvas: Guarded for Desktop Only */}
            <div className="absolute inset-0 z-0 hidden sm:block pointer-events-none">
              <Canvas camera={{ position: [0, 0, 5] }} dpr={[1, 2]}>
                <ambientLight intensity={0.6} />
                <directionalLight position={[6, 6, 6]} />
                <Stars radius={60} depth={40} count={400} factor={2} fade />
                <HealthCore />
              </Canvas>
            </div>

            {/* Mobile Fallback: Subtle Pulse for Visual Interest */}
            <div className="absolute inset-0 flex items-center justify-center sm:hidden pointer-events-none">
              <div className="w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
            </div>

            <div className="relative z-10 p-8 sm:p-14 lg:p-20 bg-linear-to-t from-black via-black/20 to-transparent">
              <div className="flex items-center gap-2 mb-4">
                <ShieldCheck size={16} className="text-blue-400" />
                <p className="text-[10px] sm:text-xs font-bold tracking-[0.2em] text-blue-400 uppercase">
                  {getGreeting()}, {patientProfile.name}
                </p>
              </div>

              <h1 className="font-bold leading-[1.1] text-4xl sm:text-6xl lg:text-7xl tracking-tight">
                Recovery day {recoveryOverview.currentDay}
                <span className="text-neutral-500 font-light block">
                  of {recoveryOverview.expectedRecoveryDays}
                </span>
              </h1>

              {/* Grid 2x2 for readability on small screens */}
              <div className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
                <Stat label="Status" value="On Track" icon={Activity} accent />
                <Stat label="Confidence" value={`${recoveryOverview.confidenceScore}%`} icon={Heart} />
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
                  <h3 className="mt-6 text-xl font-bold leading-tight">{item.title}</h3>
                  <p className="mt-3 text-sm text-neutral-400 leading-relaxed">{item.description}</p>
                </Card>
              ))}
            </MotionGrid>
          </Section>

          {/* ================= MEDICATIONS ================= */}
          <Section title="Active Medications">
            <div className="
              flex gap-5 overflow-x-auto snap-x snap-mandatory pb-8 
              -mx-6 px-6 sm:mx-0 sm:px-0 
              scrollbar-hide
            ">
              {medications.map((med) => (
                <Card
                  key={med.id}
                  className="min-w-[85vw] sm:min-w-[340px] snap-center flex-shrink-0"
                >
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="text-xl font-bold">{med.name}</h3>
                      <p className="text-[10px] text-blue-400 font-bold uppercase tracking-widest mt-1">{med.category}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <Row label="Dosage" value={med.dosage} />
                    <Row label="Frequency" value={med.frequency} />
                    <div className="pt-5 border-t border-white/5 mt-5">
                      <p className="text-[10px] text-neutral-500 font-bold uppercase tracking-tighter">Inventory Status</p>
                      <p className="text-lg font-bold">{med.daysRemaining} days remaining</p>
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
                  <div className="flex items-center justify-between mb-8">
                    <h3 className="font-bold text-lg capitalize tracking-tight">{symptom}</h3>
                    <div className="px-2 py-1 rounded bg-blue-500/10 border border-blue-500/20 text-[10px] font-bold text-blue-400">
                      Live
                    </div>
                  </div>
                  <div className="h-44 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={values.map((v, i) => ({ day: i + 1, v }))}>
                        <Line 
                          type="monotone" 
                          dataKey="v" 
                          stroke="#3B82F6" 
                          strokeWidth={4} 
                          dot={false} 
                          animationDuration={2000}
                        />
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#000', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px' }} 
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </Card>
              ))}
            </MotionGrid>
          </Section>
        </motion.div>
      </div>
    </Page>
  );
}

/* ================= REUSABLE UI ================= */

function Section({ title, children }) {
  return (
    <section>
      <h2 className="text-2xl sm:text-4xl font-bold mb-10 tracking-tight">{title}</h2>
      {children} section
    </section>
  );
}

function MotionGrid({ cols, children }) {
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
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
      className={`
        relative rounded-[2.5rem] p-8 sm:p-10 border border-white/10
        ${glass ? 'bg-black/40 backdrop-blur-2xl' : 'bg-neutral-900/60'}
        hover:border-blue-500/40 transition-all duration-500
        ${className}
      `}
    >
      {children}
    </motion.div>
  );
}

function Stat({ label, value, icon: Icon, accent }) {
  return (
    <div className="min-w-0">
      <div className="flex items-center gap-2 mb-2">
        {Icon && <Icon size={12} className="text-neutral-500" />}
        <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">{label}</p>
      </div>
      <p className={`text-sm sm:text-2xl font-bold truncate ${accent ? "text-emerald-400" : "text-white"}`}>
        {value}
      </p>
    </div>
  );
}

function Tag({ children }) {
  return (
    <span className="inline-block text-[10px] font-bold px-4 py-1.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 uppercase tracking-tighter">
      {children}
    </span>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex justify-between items-center text-sm">
      <span className="text-neutral-500 font-medium">{label}</span>
      <span className="text-white font-bold">{value}</span>
    </div>
  );
}