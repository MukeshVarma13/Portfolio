import { useState, useMemo } from "react";
import { SKILLS } from "../data/terminalData";
import { motion, AnimatePresence } from "framer-motion";

export default function SkillsContent() {
  const [activeTab, setActiveTab] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Hardcoded categories as requested
  const categories = ["All", "Frontend", "Backend", "Others"];

  // Filter Logic
  const filteredSkills = useMemo(() => {
    return SKILLS.filter((skill) => {
      // Normalize category to prevent case sensitivity issues
      const category = skill.category ? skill.category : "Others";
      
      // Determine if skill matches the active tab
      let matchesTab = false;

      if (activeTab === "All") {
        matchesTab = true;
      } else if (activeTab === "Frontend") {
        matchesTab = category === "Frontend";
      } else if (activeTab === "Backend") {
        matchesTab = category === "Backend";
      } else if (activeTab === "Others") {
        // "Others" acts as a catch-all for "Tools", "DevOps", or anything else
        matchesTab = category !== "Frontend" && category !== "Backend";
      }

      // Check search query
      const matchesSearch = skill.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      return matchesTab && matchesSearch;
    });
  }, [activeTab, searchQuery]);

  return (
    <div className="h-full flex flex-col bg-neutral-950/50 backdrop-blur-md relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
      
      {/* --- Controls Header --- */}
      <div className="p-6 pb-2 shrink-0 z-10 flex flex-col gap-4">
        {/* Search Bar */}
        <div className="relative group">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-white/40 group-focus-within:text-white/80 transition-colors">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search skills..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white placeholder-white/30 focus:outline-none focus:bg-white/10 focus:border-white/20 transition-all"
          />
        </div>

        {/* Category Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
                activeTab === tab
                  ? "bg-white text-black shadow-lg shadow-white/20 scale-105"
                  : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* --- Grid Content --- */}
      <div className="flex-1 overflow-y-auto p-6 pt-2 custom-scrollbar">
        <motion.div
          layout
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3"
        >
          <AnimatePresence mode="popLayout">
            {filteredSkills.length > 0 ? (
              filteredSkills.map((skill, index) => (
                <motion.div
                  key={skill.name || index}
                  layout
                  initial={{ opacity: 0, scale: 0.9, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{
                    opacity: 0,
                    scale: 0.9,
                    transition: { duration: 0.2 },
                  }}
                  whileHover={{ scale: 1.05 }}
                  className="group relative rounded-xl bg-white/5 border border-white/5 hover:border-white/20 hover:bg-white/10 transition-colors overflow-hidden cursor-default flex items-center justify-center flex-col p-4 gap-3"
                >
                  <img
                    src={skill.icon}
                    alt={skill.name}
                    className="h-12 w-12 object-contain drop-shadow-md"
                  />
                  <p className="text-zinc-200 text-xs font-medium uppercase tracking-wider">
                    {skill.name}
                  </p>
                </motion.div>
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full py-10 text-center text-white/30 text-sm"
              >
                No skills found in "{activeTab}" matching "{searchQuery}"
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}