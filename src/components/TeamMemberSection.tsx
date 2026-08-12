

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import gsap from "gsap";
import { Github, Linkedin, Twitter } from "lucide-react";
import CEO from "@/assets/ceo.jpeg";
import CTO from "@/assets/cto.jpeg";
import COO from '@/assets/lead.jpeg'
import ProductManager from "@/assets/productmanager.jpeg"
import Intern from "@/assets/intern.jpeg"

// ---------------------------------------------------------------------------
// Data — swap in your real team members / photos / links
// ---------------------------------------------------------------------------

type Accent = "blue" | "green" | "amber";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  file: string; // shown in the "tab" like a filename
  bio: string; // revealed on hover, like terminal output
  image: string;
  accent: Accent;
  socials: { github?: string; linkedin?: string; twitter?: string };
}

const team: TeamMember[] = [
  {
    id: "01",
    name: "Biplob Debonath",
    role: "CO-FOUNDER & CEO",
    file: "biplob.ceo.ts",
    bio: "Leads the vision, steers company strategy, and ensures every product decision aligns with customer impact.",
    image: CEO,
    accent: "blue",
    socials: {  linkedin: "#", twitter: "#" },
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
    socials: { twitter: "#", linkedin: "#" },
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
    name: "Anondo",
    role: "Backend Developer",
    file: "anondo.api.py",  
    bio: "Builds scalable APIs, optimizes server-side performance, and keeps services running smoothly under load.",
    image: Intern,
    accent: "green",
    socials: {  linkedin: "#" },
  },

];

// ---------------------------------------------------------------------------
// Accent tokens
// ---------------------------------------------------------------------------

const accentMap: Record<
  Accent,
  { text: string; ring: string; glow: string; dot: string; bar: string }
> = {
  blue: {
    text: "text-[#5B9CFF]",
    ring: "group-hover:ring-[#5B9CFF]/40",
    glow: "group-hover:shadow-[0_0_40px_-8px_rgba(91,156,255,0.45)]",
    dot: "bg-[#5B9CFF]",
    bar: "from-[#5B9CFF]",
  },
  green: {
    text: "text-[#3ED9A3]",
    ring: "group-hover:ring-[#3ED9A3]/40",
    glow: "group-hover:shadow-[0_0_40px_-8px_rgba(62,217,163,0.45)]",
    dot: "bg-[#3ED9A3]",
    bar: "from-[#3ED9A3]",
  },
  amber: {
    text: "text-[#F5A742]",
    ring: "group-hover:ring-[#F5A742]/40",
    glow: "group-hover:shadow-[0_0_40px_-8px_rgba(245,167,66,0.45)]",
    dot: "bg-[#F5A742]",
    bar: "from-[#F5A742]",
  },
};

// ---------------------------------------------------------------------------
// Motion variants
// ---------------------------------------------------------------------------

const gridVariants: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 36, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

const TeamSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const orbRefs = useRef<(HTMLDivElement | null)[]>([]);

  // GSAP — ambient drifting background orbs (subtle, respects reduced motion)
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      orbRefs.current.forEach((orb, i) => {
        if (!orb) return;
        gsap.to(orb, {
          x: i % 2 === 0 ? 60 : -50,
          y: i % 2 === 0 ? -40 : 50,
          duration: 8 + i * 2,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="team"
      className="relative overflow-hidden bg-[#0A0D12] px-6 py-28 sm:px-10 lg:px-16"
    >
      {/* Ambient background: grid + drifting gradient orbs */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(#8B93A7 1px, transparent 1px), linear-gradient(90deg, #8B93A7 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />
      <div
        ref={(el) => {
          orbRefs.current[0] = el;
        }}
        className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-[#5B9CFF]/20 blur-[100px]"
      />
      <div
        ref={(el) => {
          orbRefs.current[1] = el;
        }}
        className="pointer-events-none absolute right-0 top-1/3 h-80 w-80 rounded-full bg-[#3ED9A3]/10 blur-[110px]"
      />
      <div
        ref={(el) => {
          orbRefs.current[2] = el;
        }}
        className="pointer-events-none absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-[#F5A742]/10 blur-[100px]"
      />

      <div className="relative mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-16 max-w-2xl"
        >
          
          <h2 className="font-[Space_Grotesk,sans-serif] text-4xl font-semibold leading-tight text-[#E7EBF2] sm:text-5xl">
            The humans behind
            <br />
            the system.
          </h2>
          <p className="mt-4 font-[Inter,sans-serif] text-base leading-relaxed text-[#8B93A7]">
            Five engineers and designers who ship, review, and refactor the
            products Codynix IT Lab is known for one commit at a time.
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={gridVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {team.map((member) => {
            const accent = accentMap[member.accent];
            return (
              <motion.div
                key={member.id}
                variants={cardVariants}
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                className={`group relative rounded-xl border border-[#1F2733] bg-[#10141C] ring-1 ring-transparent transition-shadow duration-300 ${accent.ring} ${accent.glow}`}
              >
                {/* Tab bar */}
                <div className="flex items-center justify-between rounded-t-xl border-b border-[#1F2733] bg-[#0D1017] px-4 py-2.5">
                  <div className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]/70" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]/70" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]/70" />
                  </div>
                  <span className="font-[JetBrains_Mono,monospace] text-[11px] text-[#5C6577]">
                    {member.file}
                  </span>
                </div>

                {/* Body */}
                <div className="p-5">
                  <div className="mb-4 flex items-center gap-4">
                    <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border border-[#232936]">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="h-full w-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0"
                        loading="lazy"
                      />
                    </div>
                    <div className="min-w-0">
                      <h3 className="truncate font-[Space_Grotesk,sans-serif] text-lg font-semibold text-[#E7EBF2]">
                        {member.name}
                      </h3>
                      <p
                        className={`mt-0.5 flex items-center gap-1.5 font-[JetBrains_Mono,monospace] text-[12.5px] ${accent.text}`}
                      >
                        <span className="text-[#5C6577]">//</span>
                        {member.role}
                        <span
                          className={`ml-0.5 inline-block h-3.5 w-[2px] ${accent.dot} animate-[blink_1.1s_steps(1)_infinite]`}
                        />
                      </p>
                    </div>
                  </div>

                  {/* Hover-revealed terminal output */}
                  <div className="grid transition-all duration-300 grid-rows-[0fr] group-hover:grid-rows-[1fr]">
                    <div className="overflow-hidden">
                      <p className="rounded-md border border-[#1F2733] bg-[#0D1017] p-3 font-[JetBrains_Mono,monospace] text-[12px] leading-relaxed text-[#8B93A7]">
                        <span className={accent.text}>$</span> {member.bio}
                      </p>
                    </div>
                  </div>

                  {/* Socials */}
                  <div className="mt-4 flex items-center gap-3 border-t border-[#1F2733] pt-4">
                    {member.socials.github && (
                      <a
                        href={member.socials.github}
                        aria-label={`${member.name} on GitHub`}
                        className="text-[#5C6577] transition-colors hover:text-[#E7EBF2]"
                      >
                        <Github size={16} />
                      </a>
                    )}
                    {member.socials.linkedin && (
                      <a
                        href={member.socials.linkedin}
                        aria-label={`${member.name} on LinkedIn`}
                        className="text-[#5C6577] transition-colors hover:text-[#E7EBF2]"
                      >
                        <Linkedin size={16} />
                      </a>
                    )}
                    {member.socials.twitter && (
                      <a
                        href={member.socials.twitter}
                        aria-label={`${member.name} on Twitter`}
                        className="text-[#5C6577] transition-colors hover:text-[#E7EBF2]"
                      >
                        <Twitter size={16} />
                      </a>
                    )}
                  </div>
                </div>

                {/* Bottom accent bar */}
                <div
                  className={`h-[3px] w-0 rounded-b-xl bg-gradient-to-r ${accent.bar} to-transparent transition-all duration-500 group-hover:w-full`}
                />
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Local keyframes for the blinking cursor */}
      <style>{`
        @keyframes blink {
          0%, 50% { opacity: 1; }
          50.01%, 100% { opacity: 0; }
        }
      `}</style>
    </section>
  );
};

export default TeamSection;