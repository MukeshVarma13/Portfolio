import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  helpCommands,
  welcomeMessage,
  FILE_SYSTEM,
  ABOUT_DATA,
} from "../data/terminalData";

export default function TerminalContent({ onOpenWindow }) {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  // Track current path as an array. Start at home ['~']
  const [currentPath, setCurrentPath] = useState(["~"]);

  const scrollRef = useRef(null);
  const inputRef = useRef(null);

  // Scroll to bottom on history change
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  // Initial Welcome Message
  useEffect(() => {
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
  }, []);

  // --- Helper: Get Current Directory Node ---
  const getCurrentNode = () => {
    let node = FILE_SYSTEM["~"];
    // Iterate through path skipping the first '~'
    for (let i = 1; i < currentPath.length; i++) {
      if (node.children && node.children[currentPath[i]]) {
        node = node.children[currentPath[i]];
      } else {
        return null; // Should not happen if logic is correct
      }
    }
    return node;
  };

  // --- Command Handlers ---

  const handleCommand = (cmdString) => {
    const originalCmd = cmdString.trim();
    if (!originalCmd) return;

    // Add to history
    const newHistory = [
      ...history,
      {
        type: "input",
        content: originalCmd,
        path: currentPath.join("/"),
      },
    ];

    // Parse command: "cat about.txt" -> cmd="cat", args=["about.txt"]
    const [cmd, ...args] = originalCmd.split(/\s+/);
    const arg = args[0]; // Simple single argument support

    let output = null;

    switch (cmd.toLowerCase()) {
      case "help":
        output = (
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
                        <span className="text-white/60">{cmd.description}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            }
          </AnimatePresence>
        );
        break;

      case "clear":
        setHistory([]);
        setInput("");
        return; // Early return to avoid adding "clear" to history logs

      case "pwd":
        output = <div className="text-zinc-300">{currentPath.join("/")}</div>;
        break;

      case "ls":
        const node = getCurrentNode();
        if (node && node.children) {
          output = (
            <div className="flex flex-col gap-1">
              {Object.entries(node.children).map(([name, data]) => (
                <div key={name}>
                  {data.type === "file" ? (
                    <span>📄 {name}</span>
                  ) : (
                    <span>📁 {name}</span>
                  )}
                </div>
              ))}
            </div>
          );
        } else {
          output = <div className="text-red-400">Error reading directory</div>;
        }
        break;

      case "cd":
        if (!arg || arg === "~") {
          setCurrentPath(["~"]);
        } else if (arg === "..") {
          if (currentPath.length > 1) {
            setCurrentPath((prev) => prev.slice(0, -1));
          }
        } else {
          const currNode = getCurrentNode();
          if (currNode.children && currNode.children[arg]) {
            if (currNode.children[arg].type === "dir") {
              setCurrentPath((prev) => [...prev, arg]);
            } else {
              output = (
                <div className="text-red-400">
                  bash: cd: {arg}: Not a directory
                </div>
              );
            }
          } else {
            output = (
              <div className="text-red-400">
                bash: cd: {arg}: No such file or directory
              </div>
            );
          }
        }
        break;

      case "echo":
        if (args.length > 0 && args[0].toLowerCase() === "$role") {
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
            </div>
          );
        } else {
          // Standard echo behavior (echo back whatever is typed)
          output = <div className="text-zinc-100">{args.join(" ")}</div>;
        }
        break;

      case "mail":
        // Check if the full argument string matches "--to dev"
        if (args.join(" ") === "--to dev") {
          output = <p className="text-emerald-400">Opening contact form...</p>;
          onOpenWindow("contact", "Contact");
        } else {
          output = <div className="text-red-400">Usage: mail --to dev</div>;
        }
        break;

      case "cat":
        if (!arg) {
          output = <div className="text-red-400">usage: cat [file]</div>;
        } else {
          const currNode = getCurrentNode();
          if (currNode.children && currNode.children[arg]) {
            if (currNode.children[arg].type === "file") {
              if (currNode.children[arg].parent === "contact") {
                output = (
                  <div className="my-2 space-y-1 text-sm">
                    <p>
                      📧 Email:{" "}
                      <span className="text-blue-400">
                        <a
                          href="mailto:mukeshvarma7676@gmail.com"
                          target="_blank"
                        >
                          mukeshvarma7676@gmail.com
                        </a>
                      </span>
                    </p>
                    <p>
                      🐙 GitHub:{" "}
                      <span className="text-blue-400">
                        <a
                          href="https://github.com/MukeshVarma13"
                          target="_blank"
                        >
                          github.com/MukeshVarma13
                        </a>
                      </span>
                    </p>
                    <p>
                      🔗 LinkedIn:{" "}
                      <span className="text-blue-400">
                        <a
                          href="https://www.linkedin.com/in/mukesh-varma-b9749330a"
                          target="_blank"
                        >
                          linkedin.com/in/mukesh-varma-b9749330a
                        </a>
                      </span>
                    </p>
                    <div className="flex flex-col gap-1 pt-5">
                      <p>
                        Feel free to reach out! I'm always open to interesting
                        projects and collaborations.
                      </p>
                      <p>Type 'mail --to dev' to send me a message directly.</p>
                    </div>
                  </div>
                );
              } else if (currNode.children[arg].parent === "about") {
                output = (
                  <div className="flex flex-col gap-5 mb-2">
                    <p>#About Me</p>
                    <h3>
                      Hi! I'm {ABOUT_DATA.name}. A {ABOUT_DATA.title} passionate
                      about React, Spring Boot, and Live Streaming tech.
                    </h3>
                    <p>{ABOUT_DATA.bio}</p>
                    <div className="flex gap-1 flex-wrap">
                      Skills:
                      {ABOUT_DATA.stack
                        .map((skill, index) => (
                          <span key={index}>{skill},</span>
                        ))
                        .slice(0, 6)}
                      and more...
                    </div>
                    <p>
                      Type 'open skills' to explore my technical expertise
                      interactively.
                    </p>
                  </div>
                );
              } else {
                output = (
                  <div className="whitespace-pre-wrap text-zinc-300 mt-2">
                    <p>{currNode.children[arg].content}</p>
                    {currNode.children[arg]?.tech && (
                      <div className="flex gap-2 items-baseline mt-3">
                        <p className="text-pink-600">Tech:</p>
                        <span className="flex gap-1 flex-wrap">
                          {currNode?.children[arg]?.tech.map((tec, index) => (
                            <span key={index}>{tec},</span>
                          ))}
                        </span>
                      </div>
                    )}
                  </div>
                );
              }
            } else {
              output = (
                <div className="text-red-400">cat: {arg}: Is a directory</div>
              );
            }
          } else {
            output = (
              <div className="text-red-400">
                cat: {arg}: No such file or directory
              </div>
            );
          }
        }
        break;

      case "open":
        const appMap = {
          skills: "Skills",
          projects: "Projects",
          about: "About",
        };
        if (appMap[arg]) {
          onOpenWindow(arg, appMap[arg]);
          output = <div className="text-green-400">Opening {arg}...</div>;
        } else {
          output = (
            <div className="text-red-400">
              Application not found. Try: skills, projects, about
            </div>
          );
        }
        break;

      case "mkdir":
        output = (
          <div className="text-red-400">
            Permission denied: Read-only file system
          </div>
        );
        break;

      case "whoami":
        output = (
          <p className="text-pink-500 text-xl font-extrabold">Mukesh Varma</p>
        );
        break;

      default:
        output = <div className="text-red-400">Command not found: {cmd}</div>;
    }

    if (output) {
      newHistory.push({ type: "output", content: output });
    } else if (cmd !== "cd") {
      // If cd was successful, no output needed usually, but we update state
    }

    setHistory(newHistory);
    setCommandHistory((prev) => [originalCmd, ...prev]);
    setHistoryIndex(-1);
    setInput("");
  };

  // --- Input Handling ---

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
    } else if (e.key === "Tab") {
      e.preventDefault();
      // Simple autocomplete logic could go here
      const node = getCurrentNode();
      const args = input.split(" ");
      const partial = args[args.length - 1];
      if (node && node.children && partial) {
        const matches = Object.keys(node.children).filter((k) =>
          k.startsWith(partial)
        );
        if (matches.length === 1) {
          const completed = [...args.slice(0, -1), matches[0]].join(" ");
          setInput(completed);
        }
      }
    }
  };

  return (
    <div
      className="h-full flex flex-col font-mono text-sm"
      onClick={() => inputRef.current?.focus()}
    >
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 custom-scrollbar"
      >
        {history.map((line, i) => (
          <div key={i} className="mb-1 break-words">
            {line.type === "input" ? (
              <div className="flex gap-2">
                <span className="text-blue-400 font-bold shrink-0">
                  mukesh@portfolio:
                  {line.path === "~" ? "~" : line.path.replace("~/", "")}$
                </span>
                <span className="text-zinc-100">{line.content}</span>
              </div>
            ) : (
              <div className="ml-0">{line.content}</div>
            )}
          </div>
        ))}

        <div className="flex gap-2 items-center mt-2">
          <span className="text-blue-400 font-bold shrink-0">
            mukesh@portfolio:
            {currentPath.length === 1 ? "~" : currentPath.slice(1).join("/")}$
          </span>
          <div className="relative flex-1">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full bg-transparent border-none outline-none text-zinc-100 caret-zinc-100"
              autoFocus
              spellCheck={false}
              autoComplete="off"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
