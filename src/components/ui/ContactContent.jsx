import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  Loader2,
  CheckCircle,
  X,
  Github,
  Linkedin,
  Mail,
  Twitter,
} from "lucide-react";

// You can move these to your data file later
const SOCIALS = [
  {
    name: "GitHub",
    icon: <Github size={20} />,
    url: "https://github.com/MukeshVarma13",
    color: "hover:text-white",
  },
  {
    name: "LinkedIn",
    icon: <Linkedin size={20} />,
    url: "https://www.linkedin.com/in/mukesh-varma-b9749330a",
    color: "hover:text-blue-400",
  },
  {
    name: "Twitter",
    icon: <Twitter size={20} />,
    url: "https://x.com/Mukesh_Varma13",
    color: "hover:text-sky-400",
  },
  {
    name: "Email",
    icon: <Mail size={20} />,
    url: "mailto:mukeshvarma7676@gmail.com",
    color: "hover:text-emerald-400",
  },
];

export default function ContactContent({ onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | loading | success

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.message.trim()) newErrors.message = "Message is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("loading");

    // Simulate API Call (Replace with EmailJS or your backend)
    setTimeout(() => {
      console.log("Form Data:", formData);
      setStatus("success");
      setFormData({ name: "", email: "", message: "" });

      // Reset status after 3 seconds
      setTimeout(() => setStatus("idle"), 3000);
    }, 2000);
  };

  const handleOpenUrl = (url) => {
    window.open(url, "_blank");
  };

  return (
    <div className="h-full flex flex-col bg-neutral-950/50 backdrop-blur-md relative overflow-y-auto custom-scrollbar">
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-emerald-500/10 to-transparent pointer-events-none" />

      <div className="p-8 max-w-4xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* LEFT SIDE: Info & Socials */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col gap-6"
          >
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">
                Let's Connect
              </h2>
              <p className="text-zinc-400 text-sm leading-relaxed">
                I'm currently looking for new opportunities. Whether you have a
                question, a project idea, or just want to say hi, I'll try my
                best to get back to you!
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                Socials
              </span>
              <div className="grid grid-cols-2 gap-3">
                {SOCIALS.map((social, idx) => (
                  <motion.button
                    key={social.name}
                    onClick={() => handleOpenUrl(social.url)}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    whileHover={{
                      scale: 1.02,
                      backgroundColor: "rgba(255,255,255,0.05)",
                    }}
                    whileTap={{ scale: 0.98 }}
                    className={`flex items-center gap-3 p-3 rounded-xl border border-white/5 bg-white/5 text-zinc-400 transition-colors group ${social.color}`}
                  >
                    <span className="opacity-70 group-hover:opacity-100 transition-opacity">
                      {social.icon}
                    </span>
                    <span className="text-sm font-medium">{social.name}</span>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* RIGHT SIDE: The Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative"
          >
            {/* Form Container */}
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-4 bg-white/5 p-6 rounded-2xl border border-white/10 relative overflow-hidden"
            >
              {/* Success Overlay */}
              <AnimatePresence>
                {status === "success" && (
                  <motion.div
                    initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
                    animate={{ opacity: 1, backdropFilter: "blur(4px)" }}
                    exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
                    className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/60 text-center p-6"
                  >
                    <motion.div
                      initial={{ scale: 0.5 }}
                      animate={{ scale: 1 }}
                      className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mb-4 border border-emerald-500/50"
                    >
                      <CheckCircle size={32} />
                    </motion.div>
                    <h3 className="text-xl font-bold text-white mb-1">
                      Message Sent!
                    </h3>
                    <p className="text-zinc-400 text-sm">
                      I'll get back to you as soon as possible.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Name Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-zinc-400 ml-1">
                  Name
                </label>
                <div className="relative group">
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => {
                      setFormData({ ...formData, name: e.target.value });
                      if (errors.name) setErrors({ ...errors, name: null });
                    }}
                    className={`w-full bg-black/20 border ${
                      errors.name
                        ? "border-red-500/50 focus:border-red-500"
                        : "border-white/10 focus:border-emerald-500/50"
                    } rounded-xl px-4 py-3 text-white placeholder-white/20 outline-none transition-all focus:bg-black/40 focus:shadow-[0_0_15px_rgba(16,185,129,0.1)]`}
                    placeholder="John Doe"
                  />
                </div>
                {errors.name && (
                  <p className="text-red-400 text-xs ml-1">{errors.name}</p>
                )}
              </div>

              {/* Email Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-zinc-400 ml-1">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => {
                    setFormData({ ...formData, email: e.target.value });
                    if (errors.email) setErrors({ ...errors, email: null });
                  }}
                  className={`w-full bg-black/20 border ${
                    errors.email
                      ? "border-red-500/50 focus:border-red-500"
                      : "border-white/10 focus:border-emerald-500/50"
                  } rounded-xl px-4 py-3 text-white placeholder-white/20 outline-none transition-all focus:bg-black/40 focus:shadow-[0_0_15px_rgba(16,185,129,0.1)]`}
                  placeholder="john@example.com"
                />
                {errors.email && (
                  <p className="text-red-400 text-xs ml-1">{errors.email}</p>
                )}
              </div>

              {/* Message Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-zinc-400 ml-1">
                  Message
                </label>
                <textarea
                  rows={4}
                  value={formData.message}
                  onChange={(e) => {
                    setFormData({ ...formData, message: e.target.value });
                    if (errors.message) setErrors({ ...errors, message: null });
                  }}
                  className={`w-full bg-black/20 border ${
                    errors.message
                      ? "border-red-500/50 focus:border-red-500"
                      : "border-white/10 focus:border-emerald-500/50"
                  } rounded-xl px-4 py-3 text-white placeholder-white/20 outline-none transition-all focus:bg-black/40 focus:shadow-[0_0_15px_rgba(16,185,129,0.1)] resize-none`}
                  placeholder="Tell me about your project..."
                />
                {errors.message && (
                  <p className="text-red-400 text-xs ml-1">{errors.message}</p>
                )}
              </div>

              {/* Buttons */}
              <div className="flex gap-3 mt-2">
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-black font-semibold py-3 rounded-xl transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20"
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      <span>Send Message</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onClose();
                  }}
                  className="px-5 py-3 rounded-xl border border-white/10 text-white/70 hover:bg-white/5 hover:text-white transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
