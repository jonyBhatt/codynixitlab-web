import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import gsap from "gsap";
import { Github, Linkedin, Twitter } from "lucide-react";
import CEO from "@/assets/ceo.jpeg";
import CTO from "@/assets/cto.jpeg";
import COO from "@/assets/lead.jpeg";
import ProductManager from "@/assets/productmanager.jpeg";
import Intern from "@/assets/intern.jpeg";

// ---------------------------------------------------------------------------
// Data — strictly untouched
// ---------------------------------------------------------------------------
type Accent = "blue" | "green" | "amber";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  file: string;
  bio: string;
  image: string;
  accent: Accent;
  socials: { github?: string; linkedin?: string; twitter?: string };
}

const team: TeamMember[] = [
  {
    id: "01",
    name: "Biplob Deb Nath",
    role: "FOUNDER & CEO",
    file: "biplob.ceo.ts",
    bio: "Leads the vision, steers company strategy, and ensures every product decision aligns with customer impact.",
    image: CEO,
    accent: "blue",
    socials: { linkedin: "#", twitter: "#" },
  },
  {
    id: "02",
    name: "Jony Bhattacharjee",
    role: "CO-FOUNDER & CTO",
    file: "jony.cto.ts",
    bio: "Sets the technical vision, scales engineering systems, and ensures every product is built with long-term reliability in mind.",
    image: CTO,
    accent: "green",
    socials: { twitter: "#", linkedin: "#" },
  },
  {
    id: "03",
    name: "Pritom Dam Rahul",
    role: "CO-FOUNDER & COO",
    file: "pritom.coo.js",
    bio: "Aligns operations, growth, and execution so teams move fast without losing focus.",
    image: COO,
    accent: "amber",
    socials: {
      twitter: "#",
      linkedin: "https://www.linkedin.com/in/pritom-dam",
    },
  },
  {
    id: "04",
    name: "Bilasi Deb Nath",
    role: "Product Manager & UI/UX Researcher",
    file: "bilasi.design.fig",
    bio: "Starts with the user's problem, not the pattern library — every screen earns its place.",
    image: ProductManager,
    accent: "blue",
    socials: { linkedin: "#", twitter: "#" },
  },
  {
    id: "05",
    name: "Anando Das Utso",
    role: "Backend Developer",
    file: "anondo.api.py",
    bio: "Builds scalable APIs, optimizes server-side performance, and keeps services running smoothly under load.",
    image: Intern,
    accent: "green",
    socials: {
      linkedin:
        "https://www.linkedin.com/in/anando-das-b26145294?utm_source=share_via&utm_content=profile&utm_medium=member_android",
    },
  },
];

// ---------------------------------------------------------------------------
// Design Tokens
// ---------------------------------------------------------------------------
const accentTheme: Record<
  Accent,
  { text: string; glow: string; border: string; bg: string }
> = {
  blue: {
    text: "text-blue-400",
    glow: "rgba(91,156,255,0.4)",
    border: "border-blue-500/30",
    bg: "bg-blue-500/10",
  },
  green: {
    text: "text-emerald-400",
    glow: "rgba(62,217,163,0.4)",
    border: "border-emerald-500/30",
    bg: "bg-emerald-500/10",
  },
  amber: {
    text: "text-amber-400",
    glow: "rgba(245,167,66,0.4)",
    border: "border-amber-500/30",
    bg: "bg-amber-500/10",
  },
};

// ---------------------------------------------------------------------------
// Interactive 3D Spotlight Card Component
// ---------------------------------------------------------------------------
const SpotlightCard: React.FC<{ member: TeamMember; index: number }> = ({
  member,
  index,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const theme = accentTheme[member.accent];

  // Framer motion values for 3D tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["8deg", "-8deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-8deg", "8deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    setMousePosition({ x: mouseX, y: mouseY });

    // Normalize coordinates for 3D rotation (-0.5 to 0.5)
    x.set(mouseX / rect.width - 0.5);
    y.set(mouseY / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    x.set(0);
    y.set(0);
  };

  // Toggle state on click for mobile devices
  const handleInteraction = () => {
    const nextHoverState = !isHovering;
    setIsHovering(nextHoverState);

    // If it's a mobile tap, center the spotlight visually
    if (nextHoverState && cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      setMousePosition({ x: rect.width / 2, y: rect.height / 2 });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay: index * 0.15, ease: "easeOut" }}
      style={{ perspective: 1000 }}
      className="relative h-full"
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={handleMouseLeave}
        onClick={handleInteraction} // Handles mobile touch/tap
        style={{ rotateX, rotateY }}
        className={`relative h-full flex flex-col overflow-hidden rounded-2xl bg-[#0D1017] border transition-colors duration-500 cursor-pointer ${
          isHovering ? theme.border : "border-white/5"
        }`}
      >
        {/* Dynamic Hover Spotlight */}
        <div
          className={`pointer-events-none absolute inset-0 z-10 transition-opacity duration-500 ${
            isHovering ? "opacity-100" : "opacity-0"
          }`}
          style={{
            background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, ${theme.glow}, transparent 40%)`,
            mixBlendMode: "screen",
          }}
        />

        {/* Image Container with Glitch/Zoom reveal */}
        <div className="relative h-80 w-full overflow-hidden bg-black">
          <motion.img
            src={member.image}
            alt={member.name}
            className={`h-full w-full object-cover object-center transition-all duration-700 ease-in-out ${
              isHovering
                ? "scale-110 opacity-100 grayscale-0"
                : "scale-100 opacity-60 grayscale"
            }`}
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D1017] via-[#0D1017]/40 to-transparent" />
        </div>

        {/* Content Body */}
        <div className="relative z-20 flex flex-grow flex-col p-6 -mt-10">
          <div className="mb-2">
            <h3 className="font-[Space_Grotesk,sans-serif] text-2xl font-bold tracking-tight text-white drop-shadow-md">
              {member.name}
            </h3>
            <p
              className={`mt-1 font-[JetBrains_Mono,monospace] text-sm font-semibold uppercase tracking-wider ${theme.text}`}
            >
              {member.role}
            </p>
          </div>

          {/* Expandable Terminal Bio */}
          <div
            className={`grid transition-all duration-500 ease-in-out ${
              isHovering
                ? "grid-rows-[1fr] opacity-100 mt-4"
                : "grid-rows-[0fr] opacity-0 mt-0"
            }`}
          >
            <div className="overflow-hidden">
              <div
                className={`rounded-lg ${theme.bg} p-4 border border-white/5`}
              >
                <p className="font-[JetBrains_Mono,monospace] text-sm leading-relaxed text-[#A1A9BB]">
                  <span className={theme.text}>$ </span>
                  {member.bio}
                  <span
                    className={`inline-block w-2 h-4 ml-1 align-middle animate-pulse ${theme.bg} border-l border-${theme.text.split("-")[1]}-500`}
                  />
                </p>
              </div>
            </div>
          </div>

          {/* Footer Socials */}
          <div className="mt-auto pt-6 flex items-center justify-between">
            <div className="flex gap-4">
              {member.socials.github && (
                <a
                  href={member.socials.github}
                  className="text-white/40 transition-colors hover:text-white z-30"
                  onClick={(e) => e.stopPropagation()} // Prevents the card toggle when clicking link
                >
                  <Github size={18} />
                </a>
              )}
              {member.socials.linkedin && (
                <a
                  href={member.socials.linkedin}
                  className="text-white/40 transition-colors hover:text-white z-30"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Linkedin size={18} />
                </a>
              )}
              {member.socials.twitter && (
                <a
                  href={member.socials.twitter}
                  className="text-white/40 transition-colors hover:text-white z-30"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Twitter size={18} />
                </a>
              )}
            </div>

            {/* Minimalist interactive line */}
            <div
              className={`h-[2px] bg-gradient-to-r from-transparent via-white/50 to-transparent transition-all duration-500 ${
                isHovering ? "w-16" : "w-0"
              }`}
            />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// ---------------------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------------------
const TeamSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  // GSAP Ambient Geometric Background Animation
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      // Animate the background grid perspective
      gsap.to(".cyber-grid", {
        backgroundPosition: "0 40px",
        duration: 2,
        repeat: -1,
        ease: "none",
      });

      // Floating geometric orbs
      gsap.utils.toArray<HTMLElement>(".floating-orb").forEach((orb, i) => {
        gsap.to(orb, {
          y: "random(-60, 60)",
          x: "random(-60, 60)",
          rotation: "random(-90, 90)",
          duration: "random(10, 20)",
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          delay: i * -2,
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="team"
      className="relative overflow-hidden bg-[#050505] px-6 py-28 sm:px-10 lg:px-16"
    >
      {/* Dynamic Cyberpunk Grid Background */}
      <div
        className="cyber-grid absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
          transform: "perspective(1000px) rotateX(60deg) scale(2.5)",
          transformOrigin: "top center",
        }}
      />

      {/* Ambient Gradient Orbs */}
      <div className="floating-orb pointer-events-none absolute -left-[10%] top-[10%] h-[500px] w-[500px] rounded-full bg-blue-600/10 blur-[120px]" />
      <div className="floating-orb pointer-events-none absolute -right-[10%] top-[40%] h-[400px] w-[400px] rounded-full bg-emerald-600/10 blur-[120px]" />
      <div className="floating-orb pointer-events-none absolute left-[30%] -bottom-[20%] h-[600px] w-[600px] rounded-full bg-amber-600/10 blur-[150px]" />

      <div className="relative mx-auto max-w-7xl">
        {/* Header Section */}
        <div className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-2xl"
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-500" />
              </span>
              <span className="font-[JetBrains_Mono,monospace] text-xs font-semibold uppercase tracking-widest text-white/70">
                System Architects
              </span>
            </div>
            <h2 className="font-[Space_Grotesk,sans-serif] text-5xl font-bold leading-tight text-white sm:text-6xl lg:text-7xl">
              The humans behind
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-emerald-400 to-amber-400">
                the system.
              </span>
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="max-w-md font-[Inter,sans-serif] text-lg leading-relaxed text-[#8B93A7] border-l border-white/10 pl-6"
          >
            Five engineers and designers who ship, review, and refactor the
            products Codynix IT Lab is known for—one commit at a time.
          </motion.p>
        </div>

        {/* Masonry-style / Flex Grid Layout */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {team.map((member, i) => (
            <SpotlightCard key={member.id} member={member} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
