import { motion } from "framer-motion";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
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
  // useThree allows the 3D object to respond to canvas resize events
  const { viewport } = useThree();
  const isMobile = viewport.width < 3; 

  useFrame(({ mouse }) => {
    if (!ref.current) return;
    ref.current.rotation.x += (mouse.y * 0.25 - ref.current.rotation.x) * 0.05;
    ref.current.rotation.y += (mouse.x * 0.25 - ref.current.rotation.y) * 0.05;
  });

  return (
    <Float speed={1} floatIntensity={isMobile ? 0.5 : 1}>
      <mesh ref={ref} scale={isMobile ? 0.8 : 1.1}>
        <sphereGeometry args={[1.5, 64, 64]} />
        <MeshDistortMaterial
          color="#3B82F6"
          distort={0.3}
          speed={1.5}
          roughness={0.4}
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
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="visible"
        className="space-y-8 sm:space-y-12 pb-10"
      >
        {/* ================= HERO ================= */}
        <motion.section
          variants={fadeUp}
          className="
            relative overflow-hidden
            rounded-[2rem] sm:rounded-[3rem] lg:rounded-[4rem]
            bg-linear-to-br from-neutral-900 via-neutral-900/95 to-black
            border border-white/10
          "
        >
          {/* 3D Background */}
          <div className="absolute inset-0 z-0">
            <Canvas camera={{ position: [0, 0, 5] }} dpr={[1, 2]}>
              <ambientLight intensity={0.7} />
              <pointLight position={[10, 10, 10]} />
              <Stars radius={50} depth={50} count={500} factor={4} fade />
              <HealthCore />
            </Canvas>
          </div>

          <div className="relative z-10 p-8 sm:p-12 lg:p-20">
            <p className="text-xs sm:text-sm font-medium tracking-wider text-blue-400 uppercase">
              {getGreeting()}, {patientProfile.name}
            </p>

            <h1 className="mt-4 font-bold leading-[1.1] text-3xl sm:text-5xl lg:text-6xl max-w-2xl">
              Recovery day {recoveryOverview.currentDay}
              <span className="text-neutral-500 font-light block sm:inline">
                {" "}of {recoveryOverview.expectedRecoveryDays}
              </span>
            </h1>

            <div className="mt-10 sm:mt-16 grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-10">
              <Stat label="Status" value="On Track" accent />
              <Stat
                label="Confidence"
                value={`${recoveryOverview.confidenceScore}%`}
              />
              <Stat label="Condition" value={patientProfile.condition} />
              <Stat label="Hospital" value={patientProfile.hospital} />
            </div>
          </div>
        </motion.section>

        {/* ================= DAILY INSIGHT ================= */}
        <Section title="Today’s insights">
          <MotionGrid cols="md:grid-cols-2 xl:grid-cols-3">
            {dailyInsights.map((item) => (
              <Card key={item.id}>
                <Tag>{item.type}</Tag>
                <h3 className="mt-4 text-xl font-semibold leading-tight">
                  {item.title}
                </h3>
                <p className="mt-3 text-neutral-400 leading-relaxed">
                  {item.description}
                </p>
              </Card>
            ))}
          </MotionGrid>
        </Section>

        {/* ================= MEDICATIONS ================= */}
        <Section title="Medications">
          {/* Added horizontal scroll padding and snap alignment */}
          <div className="flex gap-5 overflow-x-auto snap-x snap-mandatory pb-6 -mx-4 px-4 sm:mx-0 sm:px-0 no-scrollbar">
            {medications.map((med) => (
              <Card
                key={med.id}
                className="min-w-[85vw] sm:min-w-[350px] snap-center"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold">{med.name}</h3>
                    <p className="text-sm text-blue-400 font-medium">{med.category}</p>
                  </div>
                  <div className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
                </div>

                <div className="mt-8 space-y-4">
                  <Row label="Dosage" value={med.dosage} />
                  <Row label="Frequency" value={med.frequency} />
                  <div className="pt-4 border-t border-white/5">
                    <p className="text-xs text-neutral-500 uppercase tracking-widest mb-1">Stock</p>
                    <p className="text-lg font-medium">{med.daysRemaining} days left</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Section>

        {/* ================= SYMPTOMS ================= */}
        <Section title="Symptom trends">
          <MotionGrid cols="md:grid-cols-2 xl:grid-cols-3">
            {Object.entries(symptomTrends).map(([symptom, values]) => (
              <Card key={symptom} className="flex flex-col">
                <h3 className="font-semibold text-lg mb-6 capitalize">{symptom}</h3>
                <div className="h-40 w-full mt-auto">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={values.map((v, i) => ({
                        day: i + 1,
                        severity: v,
                      }))}
                    >
                      <Line
                        type="monotone"
                        dataKey="severity"
                        stroke="#3B82F6"
                        strokeWidth={3}
                        dot={{ r: 0 }}
                        activeDot={{ r: 6, fill: "#3B82F6" }}
                      />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#171717', border: 'none', borderRadius: '12px' }}
                        itemStyle={{ color: '#fff' }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            ))}
          </MotionGrid>
        </Section>

        {/* ================= EDUCATION ================= */}
        <Section title="Recommended for you">
          <MotionGrid cols="md:grid-cols-2 xl:grid-cols-3">
            {educationalFeed.map((item) => (
              <Card key={item.id} className="group cursor-pointer">
                <Tag>{item.category}</Tag>
                <h3 className="mt-4 text-xl font-medium group-hover:text-blue-400 transition-colors">
                  {item.title}
                </h3>
                <div className="mt-6 flex items-center text-xs text-neutral-500 font-medium">
                  <span className="mr-2">⏱</span>
                  {item.readTime} read
                </div>
              </Card>
            ))}
          </MotionGrid>
        </Section>
      </motion.div>
    </Page>
  );
}

/* ================= REUSABLE UI ================= */

function Section({ title, children }) {
  return (
    <section className="px-1">
      <h2 className="text-2xl sm:text-3xl font-bold mb-8 tracking-tight">
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
      viewport={{ once: true, margin: "-50px" }}
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
        relative overflow-hidden rounded-[2rem]
        bg-neutral-900/50 backdrop-blur-md
        border border-white/10 p-8 sm:p-10
        hover:border-blue-500/30 transition-all duration-500
        ${className}
      `}
    >
      {children}
    </motion.div>
  );
}

function Stat({ label, value, accent }) {
  return (
    <div className="space-y-1">
      <p className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-neutral-500">
        {label}
      </p>
      <p className={`text-lg sm:text-2xl font-semibold truncate ${accent ? "text-emerald-400" : "text-white"}`}>
        {value}
      </p>
    </div>
  );
}

function Tag({ children }) {
  return (
    <span className="inline-block text-[10px] font-bold tracking-widest px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
      {String(children).toUpperCase()}
    </span>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex justify-between items-center text-sm">
      <span className="text-neutral-500 font-medium">{label}</span>
      <span className="text-white font-semibold">{value}</span>
    </div>
  );
}