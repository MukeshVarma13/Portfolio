import { Battery, Search, Wifi } from "lucide-react";
import { useEffect, useState } from "react";

export default function MenuBar() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-7 bg-black/40 backdrop-blur-xl border-b border-white/10 flex items-center justify-between px-4 text-white text-xs font-medium">
      <div className="flex items-center gap-5">
        <span className="text-base"></span>
        <span className="font-semibold">Finder</span>
        <span className="text-white/70">File</span>
        <span className="text-white/70">Edit</span>
        <span className="text-white/70">View</span>
        <span className="text-white/70">Window</span>
        <span className="text-white/70">Help</span>
      </div>
      <div className="flex items-center gap-4 text-white/80">
        <Wifi size={14} />
        <Battery size={14} />
        <Search size={14} />
        <span>{time}</span>
      </div>
    </div>
  );
}
