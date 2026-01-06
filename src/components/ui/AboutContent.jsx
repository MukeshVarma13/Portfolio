import { useState, useEffect } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { ABOUT_DATA, NOW_BUILDING } from "../data/terminalData";
import {
  User,
  MapPin,
  Calendar,
  Code2,
  Coffee,
  Globe,
  DotIcon,
} from "lucide-react";

export default function AboutContent() {
  const [showMore, setShowMore] = useState(false);
  const handleShowMore = () => {
    setShowMore(!showMore);
  };
  return (
    <div className="h-full flex flex-col bg-neutral-950/50 backdrop-blur-md relative overflow-y-auto custom-scrollbar">
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-violet-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="p-6 max-w-5xl mx-auto w-full">
        {/* BENTO GRID LAYOUT */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* 1. HERO CARD (Span 2 cols) */}
          <BentoCard className="md:col-span-2 flex flex-col justify-center p-8 min-h-[240px]">
            <div className="flex items-start gap-6">
              <div className="w-20 h-20 shrink-0 rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-600 flex items-center justify-center shadow-lg shadow-violet-500/20">
                <User size={40} className="text-white" />
              </div>
              <div>
                <motion.h1
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-3xl font-bold text-white mb-2"
                >
                  {ABOUT_DATA.name}
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-violet-300 font-medium text-lg mb-4"
                >
                  {ABOUT_DATA.title}
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  onClick={handleShowMore}
                  className="text-zinc-400 text-sm leading-relaxed max-w-lg cursor-pointer"
                >
                  {ABOUT_DATA.bio.length > 140
                    ? !showMore
                      ? ABOUT_DATA.bio.substring(0, 140) + "..."
                      : ABOUT_DATA.bio
                    : ABOUT_DATA.bio}
                </motion.p>
              </div>
            </div>
          </BentoCard>

          {/* 2. LOCATION & TIME CARD */}
          <BentoCard className="flex flex-col justify-between p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-white/5 rounded-lg">
                <Globe size={20} className="text-blue-400" />
              </div>
              <div className="flex items-center gap-2 px-2 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-medium text-emerald-400 uppercase tracking-wide">
                  Open to Work
                </span>
              </div>
            </div>

            <div>
              <div className="text-zinc-500 text-xs font-medium uppercase tracking-wider mb-1">
                Location
              </div>
              <div className="flex items-center gap-2 text-white font-medium">
                <MapPin size={16} className="text-violet-400" />
                {ABOUT_DATA.location}
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-white/5">
              <CurrentTime />
            </div>
          </BentoCard>

          {/* 3. STATS ROW (Span full width or separated) */}
          <div className="md:col-span-3 grid grid-cols-2 md:grid-cols-4 gap-4">
            {ABOUT_DATA.stats.map((stat, idx) => (
              <BentoCard
                key={stat.label}
                className="p-4 flex flex-col items-center justify-center gap-2 group hover:bg-white/5 transition-colors"
              >
                <div className="text-3xl font-bold text-white group-hover:scale-110 transition-transform duration-300 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60">
                  {stat.value}
                </div>
                <div className="text-xs font-medium text-zinc-500 uppercase tracking-wider group-hover:text-violet-400 transition-colors">
                  {stat.label}
                </div>
              </BentoCard>
            ))}
          </div>

          {/* 4. TECH STACK / INTERESTS (Span 2) */}
          <BentoCard className="md:col-span-2 p-6">
            <div className="flex items-center gap-3 mb-4">
              <Code2 size={20} className="text-pink-400" />
              <h3 className="text-white font-semibold">Core Stack</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {/* Assuming ABOUT_DATA has a 'stack' array, otherwise using fallback */}
              {(
                ABOUT_DATA.stack || [
                  "React",
                  "TypeScript",
                  "Node.js",
                  "Next.js",
                  "Tailwind",
                  "AWS",
                ]
              ).map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 text-zinc-300 text-sm hover:border-violet-500/30 hover:bg-violet-500/10 transition-all cursor-default"
                >
                  {tech}
                </span>
              ))}
            </div>
          </BentoCard>

          {/* 5. FUN FACT / HOBBY */}
          <BentoCard className="p-6 flex flex-col justify-center">
            <div className="flex gap-2">
              <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center mb-3 text-amber-500 shrink-0">
                <Coffee size={20} />
              </div>
              <div className="text-zinc-200 font-medium">
                {NOW_BUILDING.title}
              </div>
            </div>
            <div className="grid flex-col">
              {NOW_BUILDING.items.map((item, index) => (
                <span className="flex" key={index}>
                  <DotIcon size={25} className="shrink-0" />
                  <p className="text-zinc-500 text-xs mt-1">{item}</p>
                </span>
              ))}
            </div>
          </BentoCard>
        </div>
      </div>
    </div>
  );
}

// --- HELPER 1: Spotlight Bento Card ---
function BentoCard({ children, className = "" }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      onMouseMove={handleMouseMove}
      className={`group relative rounded-2xl bg-neutral-900/40 border border-white/10 overflow-hidden ${className}`}
    >
      {/* Spotlight Overlay */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-300 group-hover:opacity-100 z-10"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              600px circle at ${mouseX}px ${mouseY}px,
              rgba(139, 92, 246, 0.1),
              transparent 80%
            )
          `,
        }}
      />

      {/* Content */}
      <div className="relative z-20 h-full">{children}</div>
    </motion.div>
  );
}

// --- HELPER 2: Live Time Display ---
function CurrentTime() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div>
      <div className="text-zinc-500 text-xs font-medium uppercase tracking-wider mb-1">
        Local Time
      </div>
      <div className="text-2xl font-mono text-white tracking-widest">
        {time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
      </div>
      <div className="text-zinc-500 text-[10px]">
        {time.toLocaleDateString([], {
          weekday: "long",
          month: "long",
          day: "numeric",
        })}
      </div>
    </div>
  );
}
