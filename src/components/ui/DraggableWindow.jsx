import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Terminal as TerminalIcon, X, Minus, Maximize2 } from "lucide-react";

export default function DraggableWindow({
  window,
  isActive,
  onClose,
  onMinimize,
  onMaximize,
  onFocus,
  onUpdatePosition,
  children,
}) {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e) => {
    if (
      e.target.closest("button") ||
      e.target.closest("input") ||
      e.target.closest("a")
    )
      return;
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - window.x,
      y: e.clientY - window.y,
    });
    onFocus();
  };

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e) => {
      const newX = Math.max(
        0,
        Math.min(e.clientX - dragOffset.x, globalThis.innerWidth - 100)
      );
      const newY = Math.max(
        28,
        Math.min(e.clientY - dragOffset.y, globalThis.innerHeight - 100)
      );
      onUpdatePosition(window.id, newX, newY);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, dragOffset, window.id, onUpdatePosition]);

  if (window.minimized) return null;

  const style = window.maximized
    ? {
        top: 28,
        left: 0,
        width: "100%",
        height: "calc(100% - 28px - 80px)",
        zIndex: window.zIndex,
      }
    : {
        top: window.y,
        left: window.x,
        width: window.width,
        height: window.height,
        zIndex: window.zIndex,
      };

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.9, opacity: 0 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      className={`absolute rounded-xl overflow-hidden flex flex-col font-mono text-sm shadow-2xl ${
        isActive ? "ring-1 ring-white/20" : ""
      }`}
      style={style}
      onClick={onFocus}
    >
      <div
        className={`h-12 flex items-center justify-between px-4 select-none cursor-grab active:cursor-grabbing ${
          isActive ? "bg-zinc-800/95" : "bg-zinc-900/95"
        }`}
        onMouseDown={handleMouseDown}
      >
        <div className="flex gap-2">
          <motion.div
            whileHover={{
              scale: 1.1,
              boxShadow: "0 0 8px rgba(255, 95, 86, 0.8)",
            }}
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="w-3 h-3 rounded-full bg-[#ff5f56] cursor-pointer flex justify-center items-center"
          >
            <X
              size={10}
              className="text-red-900 opacity-0 hover:opacity-100 transition-opacity"
            />
          </motion.div>
          <motion.div
            whileHover={{
              scale: 1.1,
              boxShadow: "0 0 8px rgba(255, 189, 46, 0.8)",
            }}
            onClick={(e) => {
              e.stopPropagation();
              onMinimize();
            }}
            className="w-3 h-3 rounded-full bg-[#ffbd2e] cursor-pointer flex justify-center items-center"
          >
            <Minus
              size={10}
              className="text-yellow-900 opacity-0 hover:opacity-100 transition-opacity"
            />
          </motion.div>
          <motion.div
            whileHover={{
              scale: 1.1,
              boxShadow: "0 0 8px rgba(39, 201, 63, 0.8)",
            }}
            onClick={(e) => {
              e.stopPropagation();
              onMaximize();
            }}
            className="w-3 h-3 rounded-full bg-[#27c93f] cursor-pointer flex justify-center items-center"
          >
            <Maximize2
              size={10}
              className="text-yellow-900 opacity-0 hover:opacity-100 transition-opacity"
            />
          </motion.div>
        </div>
        <div className="flex items-center gap-2 text-zinc-400 text-xs font-medium">
          <TerminalIcon size={14} />
          <span>{window.title}</span>
        </div>
        <div className="w-16" />
      </div>
      <div className="flex-1 bg-zinc-950/95 backdrop-blur-sm overflow-hidden">
        {children}
      </div>
    </motion.div>
  );
}
