import { motion } from "framer-motion";

export default function Page({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{
        duration: 0.4,
        ease: "easeOut",
      }}
      className="min-h-screen w-full overflow-x-hidden bg-black text-white"
    >
      {/* App container */}
      <div className="mx-auto w-full max-w-md px-4 pb-20">
        {children}
      </div>
    </motion.div>
  );
}
