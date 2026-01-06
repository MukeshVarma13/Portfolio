import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { PROJECTS } from "../data/terminalData";
import { ExternalLink, Github, Star, Radio } from "lucide-react";

export default function ProjectsContent() {
  const handleOpenUrl = (url) => {
    // if (typeof window !== "undefined" && window.parent) {
    //   window.parent.postMessage(
    //     { type: "OPEN_EXTERNAL_URL", data: { url } },
    //     "*"
    //   );
    // } else {
      window.open(url, "_blank");
    // }
  };

  return (
    <div className="h-full flex flex-col bg-neutral-950/50 backdrop-blur-md relative overflow-hidden">
      {/* Ambient Background */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />

      {/* Scrollable Area */}
      <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-10">
          {PROJECTS.map((project, idx) => (
            <ProjectCard
              key={project.name}
              project={project}
              index={idx}
              onOpen={handleOpenUrl}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// --- Sub-Component: Project Card ---
function ProjectCard({ project, index, onOpen }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      className="group relative rounded-xl bg-white/5 border border-white/10 overflow-hidden flex flex-col h-full"
    >
      {/* 1. Spotlight Overlay */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100 z-30"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              600px circle at ${mouseX}px ${mouseY}px,
              rgba(255, 255, 255, 0.1),
              transparent 80%
            )
          `,
        }}
      />

      {/* 2. Spotlight Border */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100 z-30"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              400px circle at ${mouseX}px ${mouseY}px,
              rgba(255, 255, 255, 0.3),
              transparent 40%
            )
          `,
        }}
      />

      {/* 3. Card Content */}

      {/* Image / Banner Section */}
      <div className="relative h-40 w-full overflow-hidden bg-black/50 border-b border-white/5 group">
        {project.image ? (
          <img
            src={project.image}
            alt={project.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          // Fallback gradient if no image
          <div
            className={`w-full h-full bg-gradient-to-br ${
              project.color || "from-zinc-800 to-zinc-900"
            } opacity-50`}
          />
        )}

        {/* Overlay Badge (Live/Featured) */}
        <div className="absolute top-3 right-3 z-20">
          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-black/60 backdrop-blur-md rounded-full border border-white/10">
            <div
              className={`w-1.5 h-1.5 rounded-full ${
                project.liveDemo
                  ? "bg-emerald-400 animate-pulse"
                  : "bg-amber-400"
              }`}
            />
            <span className="text-[10px] font-medium text-white/90">
              {project.liveDemo ? "Live" : "In Dev"}
            </span>
          </div>
        </div>
      </div>

      {/* Text Content */}
      <div className="p-5 flex flex-col flex-1 z-20 relative">
        <div className="flex items-center gap-3 mb-2">
          <h3 className="text-lg font-semibold text-white tracking-tight">
            {project.name}
          </h3>
        </div>

        <p className="text-zinc-400 text-xs leading-relaxed mb-4 line-clamp-3">
          {project.description}
        </p>

        {/* Tech Stack Pills */}
        <div className="flex flex-wrap gap-1.5 mb-6 mt-auto">
          {project.tech.map((t) => (
            <span
              key={t}
              className="px-2 py-1 bg-white/5 rounded text-[10px] font-medium text-zinc-300 border border-white/5"
            >
              {t}
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 pt-4 border-t border-white/5">
          {project.liveDemo && (
            <button
              onClick={() => onOpen(project.liveDemo)}
              className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-medium transition-all"
            >
              <ExternalLink size={14} />
              <span>Visit</span>
            </button>
          )}
          <button
            onClick={() => onOpen(project.github)}
            className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg border border-white/10 hover:bg-white/5 text-zinc-300 text-xs font-medium transition-all ${
              !project.liveDemo ? "w-full" : ""
            }`}
          >
            <Github size={14} />
            <span>Source</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}
