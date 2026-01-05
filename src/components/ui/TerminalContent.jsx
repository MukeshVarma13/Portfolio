import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { helpCommands, welcomeMessage } from "../data/terminalData";

export default function TerminalContent({ onOpenWindow }) {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isTypingWelcome, setIsTypingWelcome] = useState(true);
  const scrollRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setHistory([
        {
          type: "output",
          content: (
            <div className="mb-2">
              <pre className="text-zinc-300 font-bold ">{welcomeMessage}</pre>
              <p className="text-zinc-200 italic text-sm mt-1">
                Type 'help' to see available commands.
              </p>
              <p className="text-zinc-200 italic text-sm mt-1">
                Type 'ls' to list files and directories.
              </p>
            </div>
          ),
        },
      ]);
      setIsTypingWelcome(false);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (cmd) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    const newHistory = [...history, { type: "input", content: cmd }];

    if (trimmedCmd) {
      setCommandHistory([cmd, ...commandHistory]);
      setHistoryIndex(-1);
    }

    let output = null;

    if (trimmedCmd.startsWith("open ")) {
      const app = trimmedCmd.replace("open ", "").trim();
      if (["skills", "projects", "about"].includes(app)) {
        onOpenWindow(app, app.charAt(0).toUpperCase() + app.slice(1));
        output = <p className="text-emerald-400">Opening {app}...</p>;
      } else {
        output = (
          <p className="text-red-400">
            Unknown app: {app}. Try: skills, projects, about
          </p>
        );
      }
    } else {
      switch (trimmedCmd) {
        case "help":
          output = (
            <div>
              {/* <div className="grid grid-cols-2 gap-x-8 gap-y-1 my-2 text-sm">
                {[
                  ["open skills", "Launch skills window"],
                  ["open projects", "Launch projects window"],
                  ["open about", "Launch about window"],
                  ["contact", "Get in touch"],
                  ["ls", "List virtual files"],
                  ["clear", "Clear the terminal"],
                  ["whoami", "Display current user"],
                ].map(([c, d]) => (
                  <React.Fragment key={c}>
                    <span className="text-yellow-400 font-medium">{c}</span>
                    <span className="text-zinc-500">{d}</span>
                  </React.Fragment>
                ))}
              </div> */}
              <AnimatePresence>
                {
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.2 }}
                    className="mb-6"
                  >
                    <div className="bg-[#1A1D23]/80 backdrop-blur-md border border-white/10 rounded-lg p-4 w-full">
                      <div className="space-y-2">
                        {helpCommands.map((cmd, index) => (
                          <motion.div
                            key={cmd.command}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.03 }}
                            className="grid grid-cols-2"
                          >
                            <span className="font-bold min-w-[200px] text-[#00ffcc]">
                              {cmd.command}
                            </span>
                            <span className="text-white/60">
                              {cmd.description}
                            </span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                }
              </AnimatePresence>
            </div>
          );
          break;
        case "projects":
          output = <p>Opening...</p>;
          onOpenWindow("projects");
          break;
        case "contact":
          output = (
            <div className="my-2 space-y-1 text-sm">
              <p>
                Email:{" "}
                <span className="text-blue-400">
                  <a href="mailto:mukeshvarma7676@gmail.com" target="_blank">
                    mukeshvarma7676@gmail.com
                  </a>
                </span>
              </p>
              <p>
                GitHub:{" "}
                <span className="text-blue-400">
                  <a href="https://github.com/MukeshVarma13" target="_blank">
                    github.com/MukeshVarma13
                  </a>
                </span>
              </p>
              <p>
                LinkedIn:{" "}
                <span className="text-blue-400">
                  <a
                    href="https://www.linkedin.com/in/mukesh-varma-b9749330a"
                    target="_blank"
                  >
                    linkedin.com/in/mukesh-varma-b9749330a
                  </a>
                </span>
              </p>
            </div>
          );
          break;
        case "mail --to dev":
          output = <p className="text-emerald-400">Open contact form..</p>;
          onOpenWindow("contact");
          break;
        case "clear":
          setHistory([]);
          setInput("");
          return;
        case "ls":
          output = (
            <div className="flex flex-wrap gap-4 my-1 text-sm">
              <span className="text-blue-400">about.app</span>
              <span className="text-blue-400">projects.app</span>
              <span className="text-blue-400">skills.app</span>
              <span className="text-zinc-500">contact.url</span>
            </div>
          );
          break;
        case "whoami":
          output = (
            <p className="text-pink-500 text-xl font-extrabold">Mukesh Varma</p>
          );
          break;
        case "echo $role":
          output = (
            <div>
              <p className="text-pink-500 text-xl">Full Stack Java Developer</p>
              <p>
                <span className="text-pink-500">&gt;</span> Crafting elegant
                solutions with modern web technologies
              </p>
              <p>
                <span className="text-pink-500">&gt;</span> Specializing in
                React, Spring Boot, and cloud architecture
              </p>
              <p>
                <span className="text-pink-500">&gt;</span> Passionate about
                clean code and exceptional user experiences
              </p>
            </div>
          );
          break;
        case "":
          break;
        default:
          output = (
            <p className="text-red-400 text-sm">
              Command not found: {trimmedCmd}. Type `help` for assistance.
            </p>
          );
      }
    }

    if (output) {
      setHistory([...newHistory, { type: "output", content: output }]);
    } else if (trimmedCmd !== "clear") {
      setHistory(newHistory);
    }
    setInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleCommand(input);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        const nextIndex = historyIndex + 1;
        setHistoryIndex(nextIndex);
        setInput(commandHistory[nextIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIndex = historyIndex - 1;
        setHistoryIndex(nextIndex);
        setInput(commandHistory[nextIndex]);
      } else {
        setHistoryIndex(-1);
        setInput("");
      }
    }
  };

  return (
    <div
      className="h-full flex flex-col"
      onClick={() => inputRef.current?.focus()}
    >
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 custom-scrollbar"
      >
        <AnimatePresence initial={false}>
          {history.map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -5 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.1 }}
              className="mb-1"
            >
              {line.type === "input" ? (
                <div className="flex gap-2 text-sm">
                  {/* <span className="text-emerald-400">➜</span> */}
                  <span className="text-cyan-400">$</span>
                  <span className="text-zinc-100">{line.content}</span>
                </div>
              ) : (
                <div className="text-zinc-100">{line.content}</div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {!isTypingWelcome && (
          <div className="flex gap-2 items-center text-sm">
            {/* <span className="text-emerald-400 shrink-0">➜  </span> */}
            <span className="text-cyan-400 shrink-0">$</span>
            <div className="relative flex-1 flex items-center">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full bg-transparent border-none outline-none text-zinc-100 caret-cyan-400"
                autoFocus
                spellCheck={false}
                autoComplete="off"
              />
              <div
                className="absolute pointer-events-none text-zinc-100"
                style={{
                  left: `${input.length}ch`,
                  transition: "left 0.05s ease-out",
                }}
              >
                {/* <span className="w-2 h-4 bg-cyan-400 cursor-blink block" /> */}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
