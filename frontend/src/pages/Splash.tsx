import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Dna, Leaf } from "lucide-react";

export default function Splash() {
  const [, setLocation] = useLocation();
  const [stage, setStage] = useState(0);

  useEffect(() => {
    // Stage 1: DNA Animation
    const timer1 = setTimeout(() => setStage(1), 2000);
    // Stage 2: Logo Reveal
    const timer2 = setTimeout(() => setStage(2), 3500);
    // Stage 3: Exit
    const timer3 = setTimeout(() => {
      setStage(3);
      setTimeout(() => setLocation("/home"), 800);
    }, 5500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [setLocation]);

  return (
    <div className="fixed inset-0 bg-background flex flex-col items-center justify-center z-50 overflow-hidden">
      {/* Organic Background Blobs */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], rotate: [0, 10, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-emerald-200/20 rounded-full blur-[100px]"
      />
      <motion.div
        animate={{ scale: [1, 1.2, 1], rotate: [0, -10, 0] }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        className="absolute bottom-[-20%] right-[-10%] w-[700px] h-[700px] bg-teal-200/20 rounded-full blur-[100px]"
      />

      <AnimatePresence mode="wait">
        {stage === 0 && (
          <motion.div
            key="dna"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.5, filter: "blur(10px)" }}
            className="flex flex-col items-center gap-8"
          >
            <div className="relative">
              {/* Spinning DNA Effect */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="w-24 h-24 rounded-full border-2 border-dashed border-emerald-400 opacity-50"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 w-24 h-24 rounded-full border-2 border-dashed border-teal-400 opacity-50 scale-75"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <Dna className="w-10 h-10 text-emerald-600 animate-pulse" />
              </div>
            </div>
            <p className="text-emerald-800/60 text-xs font-bold tracking-[0.3em] uppercase animate-pulse">
              Sequencing Data
            </p>
          </motion.div>
        )}

        {stage === 1 && (
          <motion.div
            key="connect"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.5, filter: "blur(20px)" }}
            className="flex flex-col items-center gap-4"
          >
            <div className="flex gap-2">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  initial={{ height: 10 }}
                  animate={{ height: [10, 40, 10] }}
                  transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                  className="w-3 bg-gradient-to-b from-emerald-400 to-teal-600 rounded-full"
                />
              ))}
            </div>
            <p className="text-emerald-800/60 text-xs font-bold tracking-[0.3em] uppercase">
              Establishing Secure Link
            </p>
          </motion.div>
        )}

        {stage === 2 && (
          <motion.div
            key="logo"
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="flex flex-col items-center relative z-10"
          >
            <div className="relative mb-8">
              <div className="absolute inset-0 bg-emerald-400/30 blur-3xl rounded-full" />
              <div className="bg-white p-8 rounded-[2rem] shadow-2xl shadow-emerald-900/10 relative z-10 border border-emerald-100">
                <Leaf className="h-24 w-24 text-emerald-600 drop-shadow-sm" />
              </div>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-4 border border-emerald-200/50 rounded-full border-dashed"
              />
            </div>

            <h1 className="text-5xl md:text-7xl font-heading font-bold text-foreground tracking-tight mb-3">
              BioScan
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">
                .ai
              </span>
            </h1>

            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "100%", opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="h-1 bg-gradient-to-r from-transparent via-emerald-200 to-transparent w-full my-4 rounded-full"
            />

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-lg text-emerald-900/60 font-medium"
            >
              Nature's Intelligence, Digitized.
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
