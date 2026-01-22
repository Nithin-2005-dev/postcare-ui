import { motion } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Float,
  MeshDistortMaterial,
  Stars,
} from "@react-three/drei";
import {
  Activity,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Calendar,
  Plus,
} from "lucide-react";
import { useRef } from "react";

import Page from "../motion/page";
import {
  recoveryOverview,
  recoveryTimeline,
} from "../data/mockDashboardData";

/* ================= DESIGN CONSTANTS ================= */

const EASE = [0.22, 1, 0.36, 1];

/* ================= 3D RECOVERY CORE ================= */

function RecoveryCore() {
  const ref = useRef();

  useFrame(({ mouse }) => {
    if (!ref.current) return;
    ref.current.rotation.x += (mouse.y * 0.3 - ref.current.rotation.x) * 0.04;
    ref.current.rotation.y += (mouse.x * 0.3 - ref.current.rotation.y) * 0.04;
  });

  return (
    <Float speed={1.2} floatIntensity={1.1}>
      <mesh ref={ref}>
        <sphereGeometry args={[1.65, 96, 96]} />
        <MeshDistortMaterial
          color="#10B981"
          distort={0.28}
          speed={1.6}
          roughness={0.3}
          metalness={0.25}
        />
      </mesh>
    </Float>
  );
}

/* ================= MOTION ================= */

const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: EASE },
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
      <div className="space-y-1.5">
        {/* ======================================================
           HERO — CALM, TRUST, CONFIDENCE
        ====================================================== */}
        <motion.section
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="relative overflow-hidden rounded-[48px]
          bg-linear-to-br from-neutral-900 via-neutral-900/90 to-black
          border border-white/10"
        >
          {/* 3D ATMOSPHERE */}
          <div className="absolute inset-0">
            <Canvas camera={{ position: [0, 0, 5] }}>
              <ambientLight intensity={0.7} />
              <directionalLight position={[6, 6, 6]} />
              <Stars
                radius={60}
                depth={40}
                count={420}
                factor={2}
                fade
              />
              <RecoveryCore />
            </Canvas>
          </div>

          {/* CONTENT */}
          <div className="relative z-10 p-12 md:p-20 grid grid-cols-1 lg:grid-cols-3 gap-16">
            <div className="lg:col-span-2">
              <p className="flex items-center gap-2 text-sm text-neutral-400">
                <Calendar size={14} />
                Recovery overview
              </p>

              <h1 className="mt-6 text-5xl font-semibold leading-tight">
                Your recovery is
                <span className="text-emerald-400"> on track</span>
              </h1>

              <p className="mt-8 max-w-xl text-neutral-300 text-lg leading-relaxed">
                This system continuously monitors your recovery
                progress and highlights meaningful changes — so you
                never have to guess.
              </p>

              {/* PROGRESS */}
              <div className="mt-12">
                <div className="flex justify-between text-xs text-neutral-400 mb-3">
                  <span>Day {recoveryOverview.currentDay}</span>
                  <span>
                    {recoveryOverview.expectedRecoveryDays} days total
                  </span>
                </div>

                <div className="h-3 rounded-full bg-neutral-800 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 1.6, ease: EASE }}
                    className="h-full bg-linear-to-r from-blue-500 to-emerald-400"
                  />
                </div>
              </div>
            </div>

            {/* CONFIDENCE */}
            <div className="flex items-center justify-center">
              <ConfidenceRing value={recoveryOverview.confidenceScore} />
            </div>
          </div>
        </motion.section>

        {/* ======================================================
           SIGNAL SNAPSHOT
        ====================================================== */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-10">
          <Snapshot
            icon={Activity}
            label="Current phase"
            value={recoveryTimeline[1]?.phase}
          />
          <Snapshot
            icon={TrendingUp}
            label="Recovery trend"
            value="Improving"
          />
          <Snapshot
            icon={AlertTriangle}
            label="Risk level"
            value="Low"
          />
        </section>

        {/* ======================================================
           RECOVERY JOURNEY — CORE UX
        ====================================================== */}
        <section>
          <h2 className="text-4xl font-semibold mb-24">
            Your recovery journey
          </h2>

          <div className="space-y-28">
            {recoveryTimeline.map((phase) => {
              const isActive =
                recoveryOverview.currentDay >= phase.startDay &&
                recoveryOverview.currentDay <= phase.endDay;

              return (
                <motion.div
                  key={phase.phase}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="relative"
                >
                  <div
                    className={`absolute left-0 top-6 h-4 w-4 rounded-full
                    ${
                      isActive
                        ? "bg-emerald-400 shadow-[0_0_40px_rgba(16,185,129,1)]"
                        : "bg-neutral-600"
                    }`}
                  />

                  <div className="ml-10 rounded-[36px]
                  bg-neutral-900/60 backdrop-blur-xl
                  border border-white/10 p-12">
                    <div className="flex justify-between items-center mb-8">
                      <div>
                        <h3 className="text-2xl font-semibold">
                          {phase.phase}
                        </h3>
                        <p className="text-sm text-neutral-400 mt-1">
                          {phase.range}
                        </p>
                      </div>

                      {isActive && (
                        <span className="px-3 py-1 text-xs rounded-full
                        bg-emerald-500/20 text-emerald-300">
                          Current phase
                        </span>
                      )}
                    </div>

                    <div className="grid md:grid-cols-2 gap-12">
                      <FeatureList
                        title="What’s normal"
                        items={phase.normal}
                        icon={CheckCircle2}
                        color="emerald"
                      />
                      <FeatureList
                        title="Watch out for"
                        items={phase.redFlags}
                        icon={AlertTriangle}
                        color="amber"
                      />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* ======================================================
           DAILY CHECK-IN — HUMAN INTERACTION
        ====================================================== */}
        <section className="rounded-[48px]
        bg-neutral-900/60 backdrop-blur-xl
        border border-white/10 p-14">
          <h2 className="text-3xl font-semibold mb-10">
            Daily check-in
          </h2>

          <div className="grid md:grid-cols-3 gap-10">
            <Slider label="Pain" />
            <Slider label="Energy" />
            <Slider label="Mood" />
          </div>

          <button className="mt-14 flex items-center gap-2 px-8 py-4
          rounded-2xl bg-white text-black font-medium text-sm
          hover:scale-[1.02] transition">
            <Plus size={18} />
            Save today’s check-in
          </button>
        </section>

        {/* ======================================================
           GUIDANCE
        ====================================================== */}
        <motion.section
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="rounded-[48px]
          bg-linear-to-br from-emerald-500/20 via-transparent to-transparent
          border border-white/10 p-16"
        >
          <h2 className="text-4xl font-semibold mb-6">
            What to expect next
          </h2>
          <p className="max-w-xl text-neutral-300 text-lg leading-relaxed">
            Fatigue and pain should continue to decrease. If symptoms
            stop improving or worsen, reaching out to your healthcare
            provider would be appropriate.
          </p>
        </motion.section>
      </div>
    </Page>
  );
}

/* ================= COMPONENTS ================= */

function ConfidenceRing({ value }) {
  return (
    <div className="relative h-40 w-40">
      <svg viewBox="0 0 36 36" className="w-full h-full">
        <path
          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831"
          fill="none"
          stroke="#1F2937"
          strokeWidth="3"
        />
        <path
          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831"
          fill="none"
          stroke="#10B981"
          strokeWidth="3"
          strokeDasharray={`${value}, 100`}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-4xl font-semibold">{value}%</span>
        <span className="text-xs text-neutral-400 tracking-wide">
          confidence
        </span>
      </div>
    </div>
  );
}

function Snapshot({ icon: Icon, label, value }) {
  return (
    <div className="rounded-3xl border border-white/10
    bg-neutral-900/60 backdrop-blur-xl p-8">
      <Icon size={22} className="text-blue-400 mb-4" />
      <p className="text-xs text-neutral-400">{label}</p>
      <p className="text-xl font-medium mt-1">{value}</p>
    </div>
  );
}

function FeatureList({ title, items, icon: Icon, color }) {
  return (
    <div>
      <p className="text-xs text-neutral-400 mb-4 tracking-wide">
        {title}
      </p>
      <ul className="space-y-4">
        {items.map((item) => (
          <li key={item} className="flex gap-3">
            <Icon size={16} className={`text-${color}-400 mt-1`} />
            <span className="text-sm text-neutral-300">
              {item}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Slider({ label }) {
  return (
    <div>
      <p className="text-sm text-neutral-300 mb-3">{label}</p>
      <input
        type="range"
        min="0"
        max="10"
        className="w-full accent-emerald-500"
      />
    </div>
  );
}
