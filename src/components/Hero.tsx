import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  motion,
  useInView,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  type Variants,
} from "framer-motion";
import gsap from "gsap";
import { Layers, Network } from "lucide-react";
import { PopupModal } from "react-calendly";

/**
 * ---------------------------------------------------------------------------
 * PREFERS-REDUCED-MOTION
 * ---------------------------------------------------------------------------
 * Shared check so every ambient/looping effect below (starfield, glow pulse,
 * card float, cursor spotlight, tilt) can bail out cleanly.
 */
function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(() =>
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );  
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const listener = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", listener);
    return () => mq.removeEventListener("change", listener);
  }, []);
  return reduced;
}

function deterministicRandom(seed: number) {
  const value = Math.sin(seed) * 10000;
  return value - Math.floor(value);
}

/**
 * ---------------------------------------------------------------------------
 * STARFIELD — small ambient twinkle layer that reinforces the "deep space"
 * background instead of leaving it static. Kept restrained: low opacity,
 * small dots, gentle random stagger.
 * ---------------------------------------------------------------------------
 */
function Starfield({ count = 60 }: { count?: number }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  const stars = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        top: deterministicRandom(i * 3 + 1) * 100,
        left: deterministicRandom(i * 3 + 2) * 100,
        size: deterministicRandom(i * 3 + 3) * 1.4 + 0.6,
      })),
    [count]
  );

  useEffect(() => {
    if (prefersReducedMotion) return;
    const ctx = gsap.context(() => {
      gsap.to(".star-dot", {
        opacity: () => gsap.utils.random(0.15, 0.85),
        duration: () => gsap.utils.random(1.8, 3.6),
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: { each: 0.04, from: "random" },
      });
    }, containerRef);
    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <div ref={containerRef} className="pointer-events-none absolute inset-0">
      {stars.map((star) => (
        <span
          key={star.id}
          className="star-dot absolute rounded-full bg-white"
          style={{
            top: `${star.top}%`,
            left: `${star.left}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: 0.4,
          }}
        />
      ))}
    </div>
  );
}

/**
 * ---------------------------------------------------------------------------
 * REVEAL LINE — masked line-by-line headline reveal (translate + blur),
 * more elegant than a flat fade/slide for the hero's single most important
 * line of copy.
 * ---------------------------------------------------------------------------
 */
function RevealLine({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <span className="block overflow-hidden">
      <motion.span
        className="block"
        initial={{ y: "110%", filter: "blur(8px)" }}
        animate={{ y: "0%", filter: "blur(0px)" }}
        transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.span>
    </span>
  );
}

/**
 * ---------------------------------------------------------------------------
 * TILT CARD — subtle cursor-driven 3D tilt on hover, layered on top of the
 * GSAP ambient float (which lives on the parent DOM node, so the two never
 * fight over the same `transform`).
 * ---------------------------------------------------------------------------
 */
function TiltCard({
  children,
  className,
  variants,
}: {
  children: React.ReactNode;
  className?: string;
  variants?: Variants;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springRotateX = useSpring(rotateX, { stiffness: 220, damping: 22 });
  const springRotateY = useSpring(rotateY, { stiffness: 220, damping: 22 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    rotateY.set(px * 10);
    rotateX.set(py * -10);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      variants={variants}
      whileHover={prefersReducedMotion ? undefined : { scale: 1.03 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: springRotateX,
        rotateY: springRotateY,
        transformPerspective: 800,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * ---------------------------------------------------------------------------
 * COUNT UP — animates the stat number from 0 once it scrolls into view,
 * instead of appearing as static text.
 * ---------------------------------------------------------------------------
 */
function CountUp({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const prefersReducedMotion = usePrefersReducedMotion();
  const [value, setValue] = useState(prefersReducedMotion ? target : 0);

  useEffect(() => {
    if (!inView || prefersReducedMotion) return;
    const duration = 1400;
    const start = performance.now();
    let frame: number;

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, target, prefersReducedMotion]);

  return (
    <span ref={ref}>
      {value}
      {suffix}
    </span>
  );
}

/**
 * ---------------------------------------------------------------------------
 * MAGNETIC BUTTON — the CTA nudges toward the cursor within its bounds and
 * sweeps a light sheen on hover. A small, tasteful moment on the single most
 * important click target in the hero.
 * ---------------------------------------------------------------------------
 */
function MagneticButton({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });

  const handleMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (prefersReducedMotion) return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left - rect.width / 2) * 0.3);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.3);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      type="button"
      onClick={onClick}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ x: springX, y: springY }}
      whileTap={{ scale: 0.96 }}
      className="group relative cursor-pointer overflow-hidden rounded-lg bg-primary px-6 py-4 font-medium text-primary-foreground shadow-lg shadow-primary/20 transition-colors hover:bg-primary/90"
    >
      <span className="relative z-10">{children}</span>
      <motion.span
        aria-hidden="true"
        className="absolute inset-0 z-0 bg-white/10"
        initial={{ x: "-100%" }}
        whileHover={{ x: "100%" }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      />
    </motion.button>
  );
}

/**
 * ---------------------------------------------------------------------------
 * HERO
 * ---------------------------------------------------------------------------
 */

export default function Hero() {
  const [isOpen, setIsOpen] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  // Refs for GSAP ambient floating animations (outer wrappers only — the
  // inner TiltCard owns rotateX/rotateY so the two never touch the same
  // `transform` at once).
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  // Cursor-reactive spotlight, smoothed with a spring so it trails the
  // pointer rather than snapping to it.
  const spotlightX = useMotionValue(0);
  const spotlightY = useMotionValue(0);
  const springSpotlightX = useSpring(spotlightX, { stiffness: 60, damping: 20 });
  const springSpotlightY = useSpring(spotlightY, { stiffness: 60, damping: 20 });
  const spotlightBackground = useMotionTemplate`radial-gradient(600px circle at ${springSpotlightX}px ${springSpotlightY}px, rgba(245,158,11,0.08), transparent 70%)`;

  const handleSectionMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (prefersReducedMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    spotlightX.set(e.clientX - rect.left);
    spotlightY.set(e.clientY - rect.top);
  };

  useEffect(() => {
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const floatAnimation = (
        el: React.RefObject<HTMLDivElement | null>,
        yDelta: number,
        duration: number,
        delay: number
      ) => {
        if (!el.current) return;
        gsap.to(el.current, {
          y: yDelta,
          duration,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          delay,
        });
      };

      floatAnimation(card1Ref, -8, 4, 0);
      floatAnimation(card2Ref, 6, 5, 0.5);
      floatAnimation(card3Ref, -10, 4.5, 1);

      if (glowRef.current) {
        gsap.to(glowRef.current, {
          opacity: 0.25,
          scale: 1.1,
          duration: 8,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  // Framer Motion Variants for Staggered Children Entries
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 60, damping: 15 },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, x: 40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: "spring", stiffness: 50, damping: 14 },
    },
  };

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleSectionMouseMove}
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#030712] px-6 py-20 text-white md:px-16"
    >
      {/* Deep Space Background Glows / Nebula Effects */}
      <div
        ref={glowRef}
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(29,78,216,0.15),transparent_50%)]"
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_40%_80%,rgba(17,24,39,1),transparent_70%)]" />

      {/* Ambient twinkling starfield */}
      <Starfield />

      {/* Cursor-reactive spotlight */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 hidden md:block"
        style={{ background: spotlightBackground }}
      />

      {/* Subtle Grid Mask */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

      {/* Keyframes for the headline gradient shimmer, scoped to this component */}
      <style>{`
        @keyframes hero-shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>

      <motion.div
        className="relative z-10 grid w-full max-w-7xl grid-cols-1 items-center gap-12 lg:grid-cols-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Left Content Column */}
        <div className="flex flex-col justify-center space-y-6 md:space-y-8 lg:col-span-7">
          <h1 className="text-4xl font-bold leading-[1.15] tracking-tight text-white sm:text-5xl md:text-6xl">
            <RevealLine delay={0.1}>Build Reliable</RevealLine>
            <RevealLine delay={0.25}>
              Software,{" "}
              <span
                className="bg-gradient-to-r from-amber-200 via-white to-amber-200 bg-clip-text text-transparent [background-size:200%_100%] [animation:hero-shimmer_4s_linear_infinite]"
                style={prefersReducedMotion ? { animation: "none" } : undefined}
              >
                Faster.
              </span>
            </RevealLine>
          </h1>

          <motion.p
            className="max-w-lg text-sm font-light leading-relaxed text-gray-400 md:text-base"
            variants={itemVariants}
          >
            Structured process from consultation to deployment, with quality
            assurance, security testing, and long-term maintenance.
          </motion.p>

          <motion.div
            className="flex flex-col items-start gap-6 pt-4 sm:flex-row sm:items-center"
            variants={itemVariants}
          >
            <MagneticButton onClick={() => setIsOpen(true)}>
              Get a Quote
            </MagneticButton>

            {/* Interactive Connected Pointer Feature */}
            <div className="relative mt-4 flex flex-col border-l border-dashed border-gray-700 pl-4 sm:mt-0 sm:border-none sm:pl-0">
              <motion.div
                className="absolute -top-8 left-[110px] hidden h-[1px] bg-gradient-to-r from-gray-600 to-gray-400 sm:block"
                initial={{ width: 0 }}
                animate={{ width: 96 }}
                transition={{ delay: 1, duration: 0.8, ease: "easeOut" }}
              >
                <div className="absolute -right-2 -top-[7px] flex h-4 w-4 animate-pulse items-center justify-center rounded-full bg-white/10">
                  <div className="h-2 w-2 rounded-full bg-white" />
                </div>
              </motion.div>

              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-white" />
                <span className="text-sm font-semibold tracking-wide text-white">
                  Web & Apps
                </span>
              </div>
              <p className="mt-1 max-w-[200px] text-xs font-light text-gray-500">
                High-performance platforms for web and mobile.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Right Floating Cards Column */}
        <div className="flex flex-col space-y-6 lg:col-span-5 lg:pl-8">
          {/* Card 1: Active Clients */}
          <div ref={card1Ref} className="w-full max-w-[280px] self-end">
            <TiltCard
              variants={cardVariants}
              className="flex cursor-pointer items-center justify-between rounded-2xl border border-gray-800/60 bg-[#0b1329]/60 p-4 shadow-2xl backdrop-blur-md"
            >
              <div className="flex -space-x-2 overflow-hidden">
                <img
                  className="inline-block h-8 w-8 rounded-full ring-2 ring-[#0b1329]"
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
                  alt="Client"
                />
                <img
                  className="inline-block h-8 w-8 rounded-full ring-2 ring-[#0b1329]"
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80"
                  alt="Client"
                />
                <img
                  className="inline-block h-8 w-8 rounded-full ring-2 ring-[#0b1329]"
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80"
                  alt="Client"
                />
              </div>
              <div className="text-right">
                <div className="text-sm font-bold text-white">
                  <CountUp target={578} suffix="M+" />
                </div>
                <div className="text-[10px] font-light tracking-wider text-gray-400">
                  Clients Active
                </div>
              </div>
            </TiltCard>
          </div>

          {/* Card 2: Custom Software */}
          <div ref={card2Ref} className="w-full max-w-[320px] self-center">
            <TiltCard
              variants={cardVariants}
              className="flex cursor-pointer items-start justify-between gap-4 rounded-2xl border border-gray-800/60 bg-[#0b1329]/60 p-5 shadow-2xl backdrop-blur-md"
            >
              <div className="space-y-1">
                <h4 className="text-sm font-semibold text-white">
                  Custom Software
                </h4>
                <p className="text-xs font-light leading-relaxed text-gray-400">
                  Tailored solutions built to solve real business problems.
                </p>
              </div>
              <div className="flex-shrink-0 rounded-lg border border-[#f59e0b]/30 bg-[#f59e0b]/20 p-2 text-[#f59e0b]">
                <Layers className="h-4 w-4" />
              </div>
            </TiltCard>
          </div>

          {/* Card 3: Automation */}
          <div ref={card3Ref} className="w-full max-w-[320px] self-end">
            <TiltCard
              variants={cardVariants}
              className="flex cursor-pointer items-start gap-4 rounded-2xl border border-gray-800/60 bg-[#0b1329]/60 p-5 shadow-2xl backdrop-blur-md"
            >
              <div className="mt-0.5 flex-shrink-0 rounded-lg border border-[#f59e0b]/30 bg-[#f59e0b]/20 p-2 text-[#f59e0b]">
                <Network className="h-4 w-4" />
              </div>
              <div className="space-y-1">
                <p className="text-xs font-normal leading-relaxed text-gray-300">
                  <span className="font-semibold text-white">
                    Automation & intelligence
                  </span>{" "}
                  that accelerate performance.
                </p>
              </div>
            </TiltCard>
          </div>
        </div>
      </motion.div>

      <PopupModal
        url="https://calendly.com/biplobdebnath168/30min"
        onModalClose={() => setIsOpen(false)}
        open={isOpen}
        rootElement={document.getElementById("root")!}
      />
    </section>
  );
}