import { image } from "framer-motion/client";

export const PROJECTS = [
  {
    name: "Nexus AI",
    tech: ["Next.js", "OpenAI", "Supabase"],
    description:
      "An AI-powered project management tool with real-time collaboration features.",
    liveDemo: "https://nexus-ai.example.com",
    github: "https://github.com/developer/nexus-ai",
    color: "from-violet-500 to-purple-600",
    image: "",
  },
  {
    name: "EtherFlow",
    tech: ["React", "Node.js", "Ethereum"],
    description:
      "Decentralized finance dashboard for tracking multi-chain assets.",
    liveDemo: "https://etherflow.example.com",
    github: "https://github.com/developer/etherflow",
    color: "from-cyan-500 to-blue-600",
  },
  {
    name: "SaaS Starter Kit",
    tech: ["TypeScript", "Prisma", "Tailwind"],
    description:
      "A comprehensive boilerplate for building scalable SaaS applications.",
    liveDemo: "https://saas-starter.example.com",
    github: "https://github.com/developer/saas-starter",
    color: "from-emerald-500 to-teal-600",
  },
];

export const SKILLS = [
  { name: "HTML", icon: "html.png", category: "Frontend" },
  { name: "CSS", icon: "css.png", category: "Frontend" },
  { name: "JavaScript", icon: "javascript.png", category: "Frontend" },
  { name: "React", icon: "react.png", category: "Frontend" },
  { name: "Tailwind", icon: "tailwind.png", category: "Frontend" },
  { name: "Git", icon: "git.png", category: "Others" },
  { name: "Github", icon: "github.png", category: "Others" },
  { name: "JAVA", icon: "java.png", category: "Backend" },
  { name: "Python", icon: "python.png", category: "Backend" },
  { name: "Spring", icon: "spring.png", category: "Backend" },
  { name: "MYSQL", icon: "mysql.png", category: "Backend" },
  { name: "MongoDB", icon: "mongodb.png", category: "Backend" },
  { name: "Docker", icon: "docker.png", category: "Others" },
  { name: "NGINX", icon: "nginx.png", category: "Others" },
  { name: "POSTMAN", icon: "postman.png", category: "Others" },
  { name: "LINUX", icon: "linux.png", category: "Others" },
  { name: "Ffmpeg", icon: "ffmpeg.png", category: "Others" },
  { name: "INTELLIJI", icon: "intellij.png", category: "Others" },
  { name: "VS Code", icon: "vs code.png", category: "Others" },
  { name: "Windows", icon: "windows.png", category: "Others" },
];

export const ABOUT_DATA = {
  name: "Mukesh Varma",
  title: "Full Stack Java Developer",
  location: "Bangaluru, Karnataka",
  bio: "Backend-focused Full Stack Developer with experience in building scalable, secure applications using Spring Boot, ReactJS, and MySQL. Skilled in REST API design, JWT authentication, backend architecture, and comfortable working in Linux environments with Git and agile practices. Actively developing a live-streaming platform using RTMP, FFmpeg, and HLS.",
  contact: "+91-7676847839, mukeshvarma7676@gmail.com",
  stack: ["React", "TypeScript", "Next.js", "Node.js", "TailwindCSS", "PostgreSQL", "AWS", "Docker"],
  stats: [
    { label: "Years Experience", value: "Fresher" },
    { label: "Projects Completed", value: "10+" },
    { label: "Happy Clients", value: "30+" },
  ],
};

export const welcomeMessage = `
██╗    ██╗███████╗██╗      ██████╗ ██████╗ ███╗   ███╗███████╗
██║    ██║██╔════╝██║     ██╔════╝██╔═══██╗████╗ ████║██╔════╝
██║ █╗ ██║█████╗  ██║     ██║     ██║   ██║██╔████╔██║█████╗  
██║███╗██║██╔══╝  ██║     ██║     ██║   ██║██║╚██╔╝██║██╔══╝  
╚███╔███╔╝███████╗███████╗╚██████╗╚██████╔╝██║ ╚═╝ ██║███████╗
 ╚══╝╚══╝ ╚══════╝╚══════╝ ╚═════╝ ╚═════╝ ╚═╝     ╚═╝╚══════╝
`;

export const helpCommands = [
  { command: "help", description: "Show this help menu" },
  { command: "ls [path]", description: "List directory contents" },
  { command: "cd <path>", description: "Change directory" },
  { command: "contact", description: "Get in touch" },
  { command: "cat <file>", description: "Display file contents" },
  {
    command: "open <file>",
    description: "Launch skills, about and projects window",
  },
  { command: "echo $Role", description: "Display user role" },
  { command: "pwd", description: "Print working directory" },
  { command: "clear", description: "Clear terminal screen" },
  { command: "whoami", description: "Display user information" },
  { command: "projects", description: "List all projects" },
  { command: "mail --to dev", description: "Send me a message" },
  { command: "coffee", description: "☕ Get some coffee" },
];
