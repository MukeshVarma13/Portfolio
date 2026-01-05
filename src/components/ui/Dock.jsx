import { motion } from "framer-motion";
import { Code2, Folder, Mail, TerminalIcon, User } from "lucide-react";

export default function Dock({ windows, onOpenWindow, onFocusWindow }) {
  const dockItems = [
    {
      id: "terminal",
      icon: TerminalIcon,
      label: "Terminal",
      color: "from-zinc-700 to-zinc-900",
    },
    {
      id: "about",
      icon: User,
      label: "About",
      color: "from-violet-500 to-purple-600",
    },
    {
      id: "projects",
      icon: Folder,
      label: "Projects",
      color: "from-blue-500 to-cyan-600",
    },
    {
      id: "skills",
      icon: Code2,
      label: "Skills",
      color: "from-emerald-500 to-teal-600",
    },
    {
      id: "contact",
      icon: Mail,
      label: "Contact",
      color: "from-rose-500 to-pink-600",
    },
  ];

  const handleClick = (item) => {
    // if (item.id === "terminal") {
    //   const terminalWindow = windows.find((w) => w.type === "terminal");
    //   if (terminalWindow) {
    //     onFocusWindow(terminalWindow.id);
    //   }
    // } else {
      onOpenWindow(item.id, item.label);
    // }
  };

  return (
    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-50">
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, type: "spring", stiffness: 300, damping: 25 }}
        className="flex items-end gap-2 px-3 py-2 bg-white/10 backdrop-blur-2xl rounded-2xl border border-white/20"
      >
        {dockItems.map((item) => {
          const Icon = item.icon;
          const isOpen = windows.some(
            (w) =>
              w.type === item.id ||
              (item.id === "terminal" && w.type === "terminal")
          );
          return (
            <motion.button
              key={item.id}
              whileHover={{ y: -8, scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleClick(item)}
              className="relative group"
            >
              <div
                className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center shadow-lg`}
              >
                <Icon size={24} className="text-white" />
              </div>
              {isOpen && (
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-white/80" />
              )}
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-zinc-800/90 rounded text-white text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                {item.label}
              </div>
            </motion.button>
          );
        })}
      </motion.div>
    </div>
  );
}
