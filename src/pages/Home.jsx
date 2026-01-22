import { motion } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { useRef, useState, useEffect } from "react";

import Page from "../motion/page";
import {
  patientProfile,
  recoveryOverview,
  medications,
  dailyInsights,
  educationalFeed,
  symptomTrends,
} from "../data/mockDashboardData";

/* ================= ANIMATION ================= */

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

/* ================= 3D CORE (DESKTOP ONLY) ================= */

function HealthCore() {
  const ref = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useFrame(({ mouse }) => {
    if (!ref.current || isMobile) return;
    ref.current.rotation.x += mouse.y * 0.02;
    ref.current.rotation.y += mouse.x * 0.02;
  });

  return (
    <Float speed={0.7} floatIntensity={0.4}>
      <mesh ref={ref}>
        <sphereGeometry args={[1.1, 48, 48]} />
        <MeshDistortMaterial
          color="#3b82f6"
          distort={0.12}
          speed={1}
          opacity={0.9}
        />
      </mesh>
    </Float>
  );
}

/* ================= PAGE ================= */

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  function getGreeting() {
    const h = new Date().getHours();
    if (h < 12) return "Good morning";
    if (h < 17) return "Good afternoon";
    if (h < 21) return "Good evening";
    return "Good night";
  }

  return (
    <Page>
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="space-y-4 md:space-y-6 px-2 sm:px-4 py-4"
      >
        {/* ================= HERO ================= */}
        <motion.section
          variants={fadeUp}
          className="relative rounded-xl md:rounded-2xl bg-neutral-900 border border-white/10 overflow-hidden"
        >
          {/* Desktop visual only */}
          <div className="absolute inset-0 hidden lg:block">
            <Canvas camera={{ position: [0, 0, 5] }}>
              <ambientLight intensity={0.6} />
              <HealthCore />
            </Canvas>
          </div>

          <div className="relative p-3 sm:p-4 md:p-6 space-y-3 sm:space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <p className="text-xs sm:text-sm text-neutral-400">
                {getGreeting()}, {patientProfile.name}
              </p>
              <div className="hidden sm:block">
                <Tag>Day {recoveryOverview.currentDay}</Tag>
              </div>
            </div>

            <h1 className="text-lg sm:text-xl md:text-2xl font-semibold leading-tight">
              Recovery day {recoveryOverview.currentDay}
              <span className="text-neutral-400 font-normal">
                {" "}
                of {recoveryOverview.expectedRecoveryDays}
              </span>
            </h1>

            {/* Mobile-first stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              <Stat label="Status" value="Recovering normally" accent />
              <Stat
                label="Confidence"
                value={`${recoveryOverview.confidenceScore}%`}
              />
              <Stat
                label="Condition"
                value={patientProfile.condition}
              />
              <Stat
                label="Hospital"
                value={patientProfile.hospital}
              />
            </div>

            {/* Mobile-only progress bar */}
            <div className="sm:hidden mt-2">
              <div className="flex justify-between text-xs text-neutral-400 mb-1">
                <span>Progress</span>
                <span>{Math.round((recoveryOverview.currentDay / recoveryOverview.expectedRecoveryDays) * 100)}%</span>
              </div>
              <div className="h-1 bg-neutral-800 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${(recoveryOverview.currentDay / recoveryOverview.expectedRecoveryDays) * 100}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="h-full bg-emerald-400"
                />
              </div>
            </div>
          </div>
        </motion.section>

        {/* ================= TWO COLUMN LAYOUT ON DESKTOP ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          {/* LEFT COLUMN */}
          <div className="space-y-4 md:space-y-6">
            {/* ================= INSIGHTS ================= */}
            <Section title="Today's insights">
              <motion.div 
                variants={staggerContainer}
                className="space-y-3"
              >
                {dailyInsights.map((item) => (
                  <Card key={item.id}>
                    <Tag>{item.type}</Tag>
                    <h3 className="mt-2 text-sm font-medium">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-sm text-neutral-400">
                      {item.description}
                    </p>
                    <div className="mt-3 flex items-center gap-2">
                      <div className="flex items-center gap-1 text-xs text-neutral-500">
                        <ClockIcon />
                        <span>{item.time}</span>
                      </div>
                      {item.priority && (
                        <span className={`px-2 py-0.5 rounded-full text-xs ${
                          item.priority === 'high' 
                            ? 'bg-red-900/30 text-red-400' 
                            : 'bg-blue-900/30 text-blue-400'
                        }`}>
                          {item.priority}
                        </span>
                      )}
                    </div>
                  </Card>
                ))}
              </motion.div>
            </Section>

            {/* ================= EDUCATION ================= */}
            <Section title="For you">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
                {educationalFeed.map((item) => (
                  <Card key={item.id}>
                    <div className="flex items-start justify-between gap-2">
                      <Tag>{item.category}</Tag>
                      <BookmarkButton />
                    </div>
                    <h3 className="mt-2 text-sm font-medium">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-sm text-neutral-400 line-clamp-2">
                      {item.description}
                    </p>
                    <div className="mt-3 flex items-center justify-between">
                      <p className="text-xs text-neutral-500">
                        {item.readTime} read
                      </p>
                      <button className="text-xs text-blue-400 hover:text-blue-300 transition-colors">
                        Read more →
                      </button>
                    </div>
                  </Card>
                ))}
              </div>
            </Section>
          </div>

          {/* RIGHT COLUMN */}
          <div className="space-y-4 md:space-y-6">
            {/* ================= MEDICATIONS ================= */}
            <Section title="Medications">
              <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                {medications.map((med) => (
                  <Card
                    key={med.id}
                    className="w-64 sm:w-72 flex-shrink-0"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-sm font-medium">{med.name}</h3>
                        <p className="text-xs text-neutral-400">
                          {med.category}
                        </p>
                      </div>
                      <PillIcon />
                    </div>

                    <div className="mt-4 space-y-2 text-sm">
                      <Row label="Dosage" value={med.dosage} />
                      <Row label="Frequency" value={med.frequency} />
                      <Row
                        label="Remaining"
                        value={`${med.daysRemaining} days`}
                      />
                    </div>

                    <div className="mt-4 pt-3 border-t border-white/10">
                      <div className="flex items-center gap-2">
                        <div className="h-2 flex-1 bg-neutral-800 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-emerald-400"
                            style={{ width: `${(med.daysRemaining / 30) * 100}%` }}
                          />
                        </div>
                        <span className="text-xs text-neutral-400">
                          Supply
                        </span>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </Section>

            {/* ================= SYMPTOM TRENDS ================= */}
            <Section title="Symptom trends">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {Object.entries(symptomTrends).map(
                  ([symptom, values]) => (
                    <Card key={symptom}>
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-sm font-medium">
                          {symptom}
                        </h3>
                        <div className="flex items-center gap-1 text-xs text-neutral-400">
                          <TrendIcon value={values[values.length - 1] - values[0]} />
                          <span>
                            {values[values.length - 1] > values[0] ? '↑' : 
                             values[values.length - 1] < values[0] ? '↓' : '→'}
                          </span>
                        </div>
                      </div>

                      <div className="h-32 sm:h-28">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart
                            data={values.map((v, i) => ({
                              day: i + 1,
                              severity: v,
                            }))}
                            margin={{ top: 5, right: 5, left: -20, bottom: 5 }}
                          >
                            <XAxis 
                              dataKey="day" 
                              tickLine={false}
                              axisLine={false}
                              tick={{ fontSize: 10 }}
                            />
                            <YAxis 
                              domain={[0, 5]} 
                              tickLine={false}
                              axisLine={false}
                              tick={{ fontSize: 10 }}
                            />
                            <Tooltip 
                              contentStyle={{ 
                                backgroundColor: '#262626',
                                border: '1px solid #404040',
                                borderRadius: '8px',
                                fontSize: '12px'
                              }}
                            />
                            <Line
                              dataKey="severity"
                              stroke="#3b82f6"
                              strokeWidth={2}
                              dot={{ r: 2 }}
                              activeDot={{ r: 4 }}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>

                      <div className="mt-2 flex justify-center">
                        <div className="flex items-center gap-4 text-xs text-neutral-400">
                          <span>Day 1</span>
                          <span>•</span>
                          <span>Today</span>
                        </div>
                      </div>
                    </Card>
                  )
                )}
              </div>
            </Section>

            {/* ================= QUICK ACTIONS (MOBILE ONLY) ================= */}
            <div className="lg:hidden">
              <Section title="Quick actions">
                <div className="grid grid-cols-2 gap-3">
                  <QuickAction 
                    icon={<MessageIcon />}
                    label="Message Doctor"
                    color="blue"
                  />
                  <QuickAction 
                    icon={<CalendarIcon />}
                    label="Schedule Visit"
                    color="emerald"
                  />
                  <QuickAction 
                    icon={<DocumentIcon />}
                    label="View Reports"
                    color="violet"
                  />
                  <QuickAction 
                    icon={<AlertIcon />}
                    label="Emergency"
                    color="red"
                  />
                </div>
              </Section>
            </div>
          </div>
        </div>
      </motion.div>
    </Page>
  );
}

/* ================= UI PRIMITIVES ================= */

function Section({ title, children }) {
  return (
    <section>
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-base font-semibold">
          {title}
        </h2>
        <button className="text-xs text-neutral-400 hover:text-neutral-300 transition-colors">
          View all →
        </button>
      </div>
      {children}
    </section>
  );
}

function Card({ children, className = "" }) {
  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -2, transition: { duration: 0.2 } }}
      className={`rounded-xl bg-neutral-900 border border-white/10 p-3 sm:p-4 hover:border-white/20 transition-all ${className}`}
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
        className={`text-sm sm:text-base font-medium truncate ${
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
    <span className="inline-block rounded-full bg-neutral-800 px-2.5 py-1 text-xs font-medium text-neutral-300">
      {String(children).toUpperCase()}
    </span>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-sm text-neutral-400">{label}</span>
      <span className="text-sm font-medium">{value}</span>
    </div>
  );
}

function QuickAction({ icon, label, color = "blue" }) {
  const colorClasses = {
    blue: "bg-blue-900/20 text-blue-400 border-blue-800/30",
    emerald: "bg-emerald-900/20 text-emerald-400 border-emerald-800/30",
    violet: "bg-violet-900/20 text-violet-400 border-violet-800/30",
    red: "bg-red-900/20 text-red-400 border-red-800/30",
  };

  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      className={`flex flex-col items-center justify-center gap-2 p-3 rounded-xl border ${colorClasses[color]} hover:opacity-90 transition-all`}
    >
      <div className="text-lg">
        {icon}
      </div>
      <span className="text-xs font-medium">{label}</span>
    </motion.button>
  );
}

/* ================= ICONS ================= */

function ClockIcon() {
  return (
    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function BookmarkButton() {
  const [bookmarked, setBookmarked] = useState(false);
  
  return (
    <button 
      onClick={() => setBookmarked(!bookmarked)}
      className="p-1 hover:bg-neutral-800 rounded transition-colors"
    >
      <svg 
        className={`w-4 h-4 ${bookmarked ? 'text-yellow-400 fill-yellow-400' : 'text-neutral-400'}`} 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" 
        />
      </svg>
    </button>
  );
}

function PillIcon() {
  return (
    <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
    </svg>
  );
}

function TrendIcon({ value }) {
  if (value > 0) {
    return (
      <svg className="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    );
  } else if (value < 0) {
    return (
      <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
      </svg>
    );
  }
  return (
    <svg className="w-4 h-4 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14" />
    </svg>
  );
}

function MessageIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  );
}

function DocumentIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  );
}

function AlertIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.998-.833-2.732 0L4.07 16.5c-.77.833.192 2.5 1.732 2.5z" />
    </svg>
  );
}

/* ================= TAILWIND CSS CONFIG (add to your global CSS) ================= */
/*
Add to your global CSS file:

@layer utilities {
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
  
  .line-clamp-2 {
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }
}
*/