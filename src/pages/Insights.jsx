import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  Float,
  MeshDistortMaterial,
  Stars,
} from "@react-three/drei";
import { motion } from "framer-motion";
import {
  ResponsiveContainer,
  RadialBarChart,
  RadialBar,
} from "recharts";
import {
  Brain,
  Activity,
  AlertTriangle,
  Sparkles,
} from "lucide-react";
import { useRef } from "react";

import Page from "../motion/page";
import { dailyInsights } from "../data/mockDashboardData";

/* ================= AI DATA ================= */

const aiScore = [{ name: "Recovery Intelligence", value: 86 }];

const signals = [
  { label: "Symptom Stability", value: "High", icon: Activity },
  { label: "Risk Level", value: "Low", icon: AlertTriangle },
  { label: "AI Confidence", value: "Strong", icon: Sparkles },
];

/* ================= 3D CORE ================= */

function IntelligenceOrb() {
  const mesh = useRef();

  useFrame(({ mouse }) => {
    mesh.current.rotation.x = mouse.y * 0.6;
    mesh.current.rotation.y = mouse.x * 0.6;
  });

  return (
    <Float speed={2} rotationIntensity={1.4} floatIntensity={1.6}>
      <mesh ref={mesh}>
        <sphereGeometry args={[1.7, 96, 96]} />
        <MeshDistortMaterial
          color="#3B82F6"
          distort={0.4}
          speed={2.5}
          roughness={0.15}
          metalness={0.4}
        />
      </mesh>
    </Float>
  );
}

/* ================= PAGE ================= */

export default function Insights() {
  return (
    <Page>
      <div className="relative min-h-screen overflow-hidden bg-black">
        {/* 🌌 BACKGROUND */}
        <div className="absolute inset-0 bg-linear-to-br from-blue-900/30 via-black to-black" />

        {/* ================= HERO ================= */}
        <section className="relative z-10 grid grid-cols-1 xl:grid-cols-2 gap-20 px-12 py-24">
          {/* LEFT – AI CORE */}
          <div className="relative h-115 rounded-4xl
          border border-white/10 bg-black/40 backdrop-blur-xl
          shadow-[0_0_120px_rgba(59,130,246,0.25)]">
            <Canvas camera={{ position: [0, 0, 5] }}>
              <ambientLight intensity={0.7} />
              <directionalLight position={[6, 6, 6]} />
              <Stars radius={60} depth={40} count={800} factor={2} />
              <IntelligenceOrb />
              <OrbitControls enableZoom={false} />
            </Canvas>

            <div className="absolute bottom-6 left-6 text-sm text-neutral-300">
              AI Recovery Core
            </div>
          </div>

          {/* RIGHT – SUMMARY */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col justify-center"
          >
            <div className="flex items-center gap-3 mb-5">
              <Brain size={36} className="text-blue-400" />
              <h1 className="text-5xl font-semibold">
                Recovery Intelligence
              </h1>
            </div>

            <p className="text-neutral-300 max-w-xl text-lg leading-relaxed">
              A living visualization of post-discharge recovery
              signals, risks, and confidence — interpreted by an
              AI health intelligence layer.
            </p>

            {/* RADIAL SCORE */}
            <div className="mt-12 h-56 max-w-sm">
              <ResponsiveContainer>
                <RadialBarChart
                  innerRadius="70%"
                  outerRadius="100%"
                  data={aiScore}
                  startAngle={90}
                  endAngle={-270}
                >
                  <RadialBar
                    dataKey="value"
                    cornerRadius={12}
                    fill="#3B82F6"
                    animationDuration={1500}
                  />
                </RadialBarChart>
              </ResponsiveContainer>

              <p className="text-center text-sm text-neutral-400 mt-2">
                AI Recovery Confidence: 86%
              </p>
            </div>
          </motion.div>
        </section>

        {/* ================= SIGNAL PULSES ================= */}
        <section className="relative z-10 px-12 pb-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          {signals.map((s) => (
            <motion.div
              key={s.label}
              whileHover={{ y: -10, scale: 1.02 }}
              className="relative overflow-hidden rounded-3xl
              border border-white/10
              bg-linear-to-br from-neutral-900 to-neutral-950
              p-10"
            >
              <div className="absolute inset-0 bg-blue-500/10 blur-3xl animate-pulse" />
              <s.icon className="text-blue-400 mb-5" size={30} />
              <p className="text-sm text-neutral-400">{s.label}</p>
              <p className="text-3xl font-semibold mt-1">
                {s.value}
              </p>
            </motion.div>
          ))}
        </section>

        {/* ================= AI OBSERVATIONS ================= */}
        <section className="relative z-10 px-12 pb-32">
          <h2 className="text-4xl font-semibold mb-14">
            AI-Generated Observations
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
            {dailyInsights.map((item) => (
              <motion.div
                key={item.id}
                whileHover={{ y: -12 }}
                className="rounded-[28px]
                border border-white/10
                bg-black/60 backdrop-blur-xl
                shadow-[0_0_80px_rgba(0,0,0,0.6)]
                p-10"
              >
                <p className="text-xs uppercase tracking-widest text-blue-400 mb-4">
                  {item.type}
                </p>
                <h3 className="text-xl font-medium mb-4">
                  {item.title}
                </h3>
                <p className="text-sm text-neutral-400 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </Page>
  );
}
