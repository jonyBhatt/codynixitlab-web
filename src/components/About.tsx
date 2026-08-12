
import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import gsap from "gsap";



const paragraphs: string[] = [
  "Founded on the principles of innovation and integrity, Codynix IT Lab is more than just a software agency. We are a team of passionate technologists, designers, and strategists dedicated to empowering businesses through digital transformation.",
  "Our mission is simple: to bridge the gap between complex technology and real-world business problems. Whether you're a startup looking to disrupt the market or an enterprise seeking scalability, we provide the technical foundation you need to succeed.",
  "We pride ourselves on our collaborative approach, transparent communication, and unwavering commitment to quality. At Codynix, your success is our success.",
];

const values: string[] = ["Innovation", "Integrity", "Excellence", "Collaboration"];

// ---------------------------------------------------------------------------
// Motion variants
// ---------------------------------------------------------------------------

const staggerParent: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.25 } },
};

const tagVariants: Variants = {
  hidden: { opacity: 0, y: 14, scale: 0.9 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

const About: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const orbOneRef = useRef<HTMLDivElement>(null);
  const orbTwoRef = useRef<HTMLDivElement>(null);
  const orbThreeRef = useRef<HTMLDivElement>(null);

  // GSAP — slow-drifting glow orbs that form the blue gradient atmosphere
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      gsap.to(orbOneRef.current, {
        x: 80,
        y: -50,
        duration: 11,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
      gsap.to(orbTwoRef.current, {
        x: -70,
        y: 60,
        duration: 14,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
      gsap.to(orbThreeRef.current, {
        x: 40,
        y: 40,
        duration: 9,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative overflow-hidden bg-[radial-gradient(ellipse_at_top,_#0B1B36_0%,_#060A12_60%)] px-6 py-28 sm:px-10 lg:px-16"
    >
      {/* Blue gradient atmosphere — drifting glow orbs, no grid */}
      <div
        ref={orbOneRef}
        className="pointer-events-none absolute -left-32 -top-16 h-[26rem] w-[26rem] rounded-full bg-[#2E6BFF]/25 blur-[130px]"
      />
      <div
        ref={orbTwoRef}
        className="pointer-events-none absolute right-[-8rem] top-1/4 h-[24rem] w-[24rem] rounded-full bg-[#1CA8FF]/15 blur-[130px]"
      />
      <div
        ref={orbThreeRef}
        className="pointer-events-none absolute bottom-[-6rem] left-1/3 h-[22rem] w-[22rem] rounded-full bg-[#4F46E5]/20 blur-[130px]"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#060A12]" />

      <div className="relative mx-auto max-w-4xl text-center">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mx-auto mb-5 flex w-fit items-center gap-2 rounded-full border border-[#2E6BFF]/30 bg-[#2E6BFF]/10 px-4 py-1.5 font-[Inter,sans-serif] text-xs font-medium uppercase tracking-wider text-[#8FB4FF] backdrop-blur-sm"
        >
          Who we are
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.05 }}
          className="font-[Space_Grotesk,sans-serif] text-3xl font-bold text-white md:text-4xl"
        >
          About Codynix IT Lab
        </motion.h2>

        {/* Body copy — sits directly on the gradient, no window chrome */}
        <div className="mx-auto mt-8 max-w-3xl">
          {paragraphs.map((p, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.55, ease: "easeOut", delay: 0.15 + i * 0.12 }}
              className={`font-[Inter,sans-serif] text-[16px] leading-relaxed text-[#AEB9CC] ${
                i < paragraphs.length - 1 ? "mb-6" : ""
              }`}
            >
              {i === 0 ? (
                <>
                  Founded on the principles of innovation and integrity,{" "}
                  <strong className="font-semibold text-white">
                    Codynix IT Lab
                  </strong>{" "}
                  is more than just a software agency. We are a team of
                  passionate technologists, designers, and strategists
                  dedicated to empowering businesses through digital
                  transformation.
                </>
              ) : (
                p
              )}
            </motion.p>
          ))}
        </div>

        {/* Core values — glassy chips over the gradient */}
        <motion.div
          variants={staggerParent}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          className="mt-12 flex flex-wrap justify-center gap-4"
        >
          {values.map((value) => (
            <motion.span
              key={value}
              variants={tagVariants}
              whileHover={{ y: -4, scale: 1.03 }}
              transition={{ type: "spring", stiffness: 320, damping: 20 }}
              className="rounded-full border border-white/10 bg-white/5 px-6 py-2 font-[Inter,sans-serif] text-sm font-medium text-white backdrop-blur-md transition-colors duration-300 hover:border-[#2E6BFF]/50 hover:bg-[#2E6BFF]/10 hover:shadow-[0_0_30px_-10px_rgba(46,107,255,0.6)]"
            >
              {value}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default About;