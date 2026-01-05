import { useCallback, useRef, useState } from "react";

export default function useWindowManager() {
  const [windows, setWindows] = useState([
    {
      id: "main",
      type: "terminal",
      title: "Terminal",
      x: 100,
      y: 80,
      width: 700,
      height: 450,
      minimized: false,
      maximized: false,
      zIndex: 1,
    },
  ]);
  const [activeWindow, setActiveWindow] = useState("main");
  const nextZIndex = useRef(2);

  const openWindow = useCallback(
    (type, title) => {
      const existingWindow = windows.find((w) => w.type === type);
      if (existingWindow) {
        setActiveWindow(existingWindow.id);
        // if (existingWindow.minimized) {
          setWindows((prev) =>
            prev.map((w) =>
              w.id === existingWindow.id
                ? { ...w, minimized: false, zIndex: nextZIndex.current++ }
                : w
            )
          );
        // }
        setActiveWindow(existingWindow.id);
        setWindows((prev) =>
          prev.map((w) =>
            w.id === existingWindow.id
              ? { ...w, zIndex: nextZIndex.current++ }
              : w
          )
        );
        return;
      }

      const newWindow = {
        id: `${type}-${Date.now()}`,
        type,
        title,
        x: 150 + windows.length * 30,
        y: 100 + windows.length * 30,
        width: type === "skills" ? 500 : type === "projects" ? 750 : 700,
        height: type === "skills" ? 420 : type === "projects" ? 550 : 450,
        minimized: false,
        maximized: false,
        zIndex: nextZIndex.current++,
      };
      setWindows((prev) => [...prev, newWindow]);
      setActiveWindow(newWindow.id);
    },
    [windows]
  );

  const closeWindow = useCallback((id) => {
    // if (id === "main") return;
    setWindows((prev) => prev.filter((w) => w.id !== id));
  }, []);

  const minimizeWindow = useCallback((id) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, minimized: true } : w))
    );
  }, []);

  const maximizeWindow = useCallback((id) => {
    setWindows((prev) =>
      prev.map((w) =>
        w.id === id
          ? { ...w, maximized: !w.maximized, zIndex: nextZIndex.current++ }
          : w
      )
    );
  }, []);

  const focusWindow = useCallback((id) => {
    setActiveWindow(id);
    setWindows((prev) =>
      prev.map((w) =>
        w.id === id ? { ...w, zIndex: nextZIndex.current++ } : w
      )
    );
  }, []);

  const updateWindowPosition = useCallback((id, x, y) => {
    setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, x, y } : w)));
  }, []);

  return {
    windows,
    activeWindow,
    openWindow,
    closeWindow,
    minimizeWindow,
    maximizeWindow,
    focusWindow,
    updateWindowPosition,
  };
}