import { AnimatePresence } from "framer-motion";
import useWindowManager from "./ui/useWindowManager";
import TerminalContent from "./ui/TerminalContent";
import DraggableWindow from "./ui/DraggableWindow";
import SkillsContent from "./ui/SkillsContent";
import MenuBar from "./ui/MenuBar";
import Dock from "./ui/Dock";
import AboutContent from "./ui/AboutContent";
import ProjectsContent from "./ui/ProjectsContent";
import ContactContent from "./ui/ContactContent";

export default function MacDesktop() {
  const {
    windows,
    activeWindow,
    openWindow,
    closeWindow,
    minimizeWindow,
    maximizeWindow,
    focusWindow,
    updateWindowPosition,
  } = useWindowManager();

  const renderWindowContent = (win) => {
    switch (win.type) {
      case "terminal":
        return <TerminalContent onOpenWindow={openWindow} />;
      case "skills":
        return <SkillsContent />;
      case "projects":
        return <ProjectsContent />;
      case "about":
        return <AboutContent />;
      case "contact":
        return <ContactContent onClose={() => closeWindow(win.id)} />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full h-screen overflow-hidden relative">
      <div
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(135deg, #1a1a2e 0%, #16213e 25%, #0f3460 50%, #1a1a2e 75%, #16213e 100%),
            radial-gradient(ellipse at 20% 80%, rgba(120, 0, 255, 0.3) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 20%, rgba(0, 150, 255, 0.3) 0%, transparent 50%),
            radial-gradient(ellipse at 50% 50%, rgba(0, 100, 150, 0.2) 0%, transparent 70%)
          `,
          backgroundSize: "cover",
        }}
      />
      <div
        className="absolute inset-0
       bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0ibm9uZSIvPjxjaXJjbGUgY3g9IjUwIiBjeT0iNTAiIHI9IjAuNSIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjEpIi8+PC9zdmc+')] opacity-50"
      />

      {/* <MenuBar /> */}

      <AnimatePresence>
        {windows.map((win) => (
          <DraggableWindow
            key={win.id}
            window={win}
            isActive={activeWindow === win.id}
            onClose={() => closeWindow(win.id)}
            onMinimize={() => minimizeWindow(win.id)}
            onMaximize={() => maximizeWindow(win.id)}
            onFocus={() => focusWindow(win.id)}
            onUpdatePosition={updateWindowPosition}
          >
            {renderWindowContent(win)}
          </DraggableWindow>
        ))}
      </AnimatePresence>

      <Dock
        windows={windows}
        onOpenWindow={openWindow}
        onFocusWindow={focusWindow}
      />
    </div>
  );
}
