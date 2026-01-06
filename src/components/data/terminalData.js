export const PROJECTS = [
  {
    name: "Live Streaming Platform (Twitch-like)",
    type: "FLAGSHIP • SYSTEM DESIGN",
    tech: [
      "React",
      "Tailwind CSS",
      "Spring Boot",
      "NGINX RTMP",
      "FFmpeg",
      "HLS",
      "Docker",
      "MySQL",
      "Redis",
      "Elasticsearch",
    ],
    description:
      "A production-style live streaming platform with RTMP ingestion, adaptive HLS playback, stream recording, and complete stream lifecycle management. Built with a scalable media pipeline using NGINX RTMP and FFmpeg workers, along with user authentication, live chat, follow system, and streamer dashboards.",
    github: "https://github.com/MukeshVarma13/Streaming-Platform",
    color: "from-red-500 to-orange-600",
    liveDemo: "",
    image: "",
  },
  {
    name: "Food Ordering Application",
    type: "FULL STACK",
    tech: ["React", "Tailwind CSS", "Spring Boot", "MongoDB"],
    description:
      "A full-stack food ordering application featuring user authentication, menu management, cart handling, and order processing through RESTful APIs with a Spring Boot backend.",
    github: "https://github.com/MukeshVarma13/FoodOrderApp",
    color: "from-yellow-500 to-orange-600",
    liveDemo: "",
    image: "foodies.png",
  },
  {
    name: "Sri Elumalai Andavar Dairy Machineries",
    type: "CLIENT PROJECT",
    tech: ["HTML", "CSS", "JavaScript", "Responsive Design"],
    description:
      "Collaborated with upperclassmen to develop a full-stack web application for a dairy machinery business using Java (Spring Boot) and MySQL",
    github:
      "https://github.com/MukeshVarma13/Sri-Elumalai-Andavar-Dairy-Machineries-",
    color: "from-green-500 to-teal-600",
    liveDemo: "",
    image: "farmers.png",
  },
  {
    name: "Anime Streaming UI",
    type: "FRONTEND SHOWCASE",
    tech: ["React", "Tailwind CSS"],
    description:
      "A visually rich frontend-only anime streaming interface focused on UI design, animations, and responsive layouts.",
    github: "https://github.com/MukeshVarma13/MiSFit-Anime",
    color: "from-pink-500 to-rose-600",
    liveDemo: "https://anime-website-nu-eight.vercel.app",
    image: "misfit-anime.png",
  },
];

export const NOW_BUILDING = {
  title: "Currently Building",
  items: [
    "Scalable live streaming platform",
    "HLS adaptive bitrate optimization",
    "Stream recording & post-processing pipeline",
    "Dockerized media workers",
  ],
};

export const FILE_SYSTEM = {
  "~": {
    type: "dir",
    children: {
      "about.txt": {
        type: "file",
        parent: "about",
      },
      "contact.txt": {
        type: "file",
        parent: "contact",
      },
      projects: {
        type: "dir",
        children: {
          "Live-Streaming-Platform-(Twitch-like).txt": {
            type: "file",
            content: PROJECTS[0].description,
            tech: PROJECTS[0].tech,
          },
          "Food-Ordering-Application.txt": {
            type: "file",
            content: PROJECTS[1].description,
            tech: PROJECTS[1].tech,
          },
          "Sri-Elumalai-Andavar-Dairy-Machineries.txt": {
            type: "file",
            content: PROJECTS[2].description,
            tech: PROJECTS[2].tech,
          },
        },
      },
      skills: {
        type: "dir",
        children: {
          "frontend.md": {
            type: "file",
            content: "- </> HTML\n- 🎨 CSS\n- 🚀 Javascript\n- ⚛️ React.js\n- 🌐 Tailwind CSS",
          },
          "backend.md": {
            type: "file",
            content:
              "- ♨️ Java\n- 🌿 Spring Boot\n- 🐬 MySQL\n- 🛢 MongoDB\n- #️⃣ Elasticsearch",
          },
          "devops.md": {
            type: "file",
            content: "- ⚓ Docker\n- 🆖 NGINX\n- 🟥 Redis",
          },
        },
      },
    },
  },
};

export const SKILLS = [
  { name: "HTML", icon: "html.png", category: "Frontend" },
  { name: "CSS", icon: "css.png", category: "Frontend" },
  { name: "JavaScript", icon: "javascript.png", category: "Frontend" },
  { name: "React", icon: "react.png", category: "Frontend" },
  { name: "Tailwind CSS", icon: "tailwind.png", category: "Frontend" },

  { name: "Java", icon: "java.png", category: "Backend" },
  { name: "Spring Boot", icon: "spring.png", category: "Backend" },
  { name: "Python", icon: "python.png", category: "Backend" },
  { name: "MySQL", icon: "mysql.png", category: "Backend" },
  { name: "MongoDB", icon: "mongodb.png", category: "Backend" },

  { name: "Docker", icon: "docker.png", category: "Others" },
  { name: "NGINX", icon: "nginx.png", category: "Others" },
  { name: "Redis", icon: "redis.png", category: "Others" },
  { name: "Elasticsearch", icon: "elasticsearch.png", category: "Others" },
  { name: "FFmpeg", icon: "ffmpeg.png", category: "Others" },

  { name: "Git", icon: "git.png", category: "Others" },
  { name: "GitHub", icon: "github.png", category: "Others" },
  { name: "Postman", icon: "postman.png", category: "Others" },
  { name: "Linux", icon: "linux.png", category: "Others" },
  { name: "IntelliJ IDEA", icon: "intellij.png", category: "Others" },
  { name: "VS Code", icon: "vs code.png", category: "Others" },
  { name: "Windows", icon: "windows.png", category: "Others" },
];

export const ABOUT_DATA = {
  name: "Mukesh Varma",
  title: "Full Stack Java Developer",
  location: "Bengaluru, Karnataka",
  bio: "Backend-focused Full Stack Developer with experience in building scalable, secure applications using Spring Boot, ReactJS, and MySQL. Skilled in REST API design, JWT authentication, backend architecture, and comfortable working in Linux environments with Git and agile practices. Actively developing a live-streaming platform using RTMP, FFmpeg, and HLS.",
  contact: "+91-7676847839, mukeshvarma7676@gmail.com",
  stack: [
    "React",
    "TailwindCSS",
    "Spring Boot",
    "MySQL",
    "NGINX",
    "Github",
    "Docker",
    "Redis",
    "Elasticsearch",
  ],
  stats: [
    { label: "Years Experience", value: "Fresher" },
    { label: "Projects Completed", value: "10+" },
    { label: "Major Projects", value: "3" },
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
  // { command: "contact", description: "Get in touch" },
  { command: "cat <file>", description: "Display file contents" },
  {
    command: "open <file>",
    description: "Launch skills, about and projects window",
  },
  { command: "echo $Role", description: "Display user role" },
  { command: "pwd", description: "Print working directory" },
  { command: "clear", description: "Clear terminal screen" },
  { command: "whoami", description: "Display user information" },
  // { command: "projects", description: "List all projects" },
  { command: "mail --to dev", description: "Send me a message" },
  // { command: "coffee", description: "☕ Get some coffee" },
];
