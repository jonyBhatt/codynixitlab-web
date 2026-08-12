import { useEffect, useRef, useState, type FC } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Search,
  PenTool,
  Rocket,
  LifeBuoy,
  CalendarClock,
  Milestone,
  Users,
  type LucideIcon,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

/**
 * ---------------------------------------------------------------------------
 * DATA
 * ---------------------------------------------------------------------------
 * Placeholder copy — swap in your real process language. Kept intentionally
 * concrete (what the client sees/gets at each stage) rather than generic
 * agency-speak, per the "transparency" brief.
 */

interface ProcessStep {
  id: string;
  number: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

const PROCESS_STEPS: ProcessStep[] = [
  {
    id: "discovery",
    number: "01",
    title: "Discovery",
    description:
      "We map your goals, users, and constraints into a scoped plan — you approve it before a line of code is written.",
    icon: Search,
  },
  {
    id: "build",
    number: "02",
    title: "Design & Build",
    description:
      "Work happens in the open on a shared board, with a working demo every week — not a black box until launch.",
    icon: PenTool,
  },
  {
    id: "review",
    number: "03",
    title: "Review",
    description:
      "You test real builds at every milestone. Nothing moves to the next stage without your sign-off.",
    icon: Milestone,
  },
  {
    id: "launch",
    number: "04",
    title: "Launch & Support",
    description:
      "We hand off clean documentation and source access, then stay on for support — not a goodbye email.",
    icon: Rocket,
  },
];

interface TrustPillarData {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

const TRUST_PILLARS: TrustPillarData[] = [
  {
    id: "cadence",
    title: "Weekly demos, not monthly reports",
    description: "See working software every week, on a fixed schedule you can rely on.",
    icon: CalendarClock,
  },
  {
    id: "pricing",
    title: "Fixed milestones, fixed pricing",
    description: "Scope and cost are locked per phase — no surprise invoices mid-project.",
    icon: Milestone,
  },
  {
    id: "access",
    title: "Direct line to your dev team",
    description: "You talk to the people building your product, not an account-manager relay.",
    icon: Users,
  },
  {
    id: "support",
    title: "Support that outlasts launch",
    description: "Post-launch fixes and updates are part of the partnership, not a new sales call.",
    icon: LifeBuoy,
  },
];

/**
 * ---------------------------------------------------------------------------
 * TRACE LINE — the signature element.
 * Draws an SVG path (schematic/PCB-trace style) as the section scrolls into
 * view, and reports progress so step nodes can "light up" in sync.
 * ---------------------------------------------------------------------------
 */

interface Geometry {
  width: number;
  height: number;
  horizontal: { x1: number; y: number; x2: number };
  vertical: { x: number; y1: number; y2: number };
}

interface TraceLineProps {
  sectionRef: React.RefObject<HTMLDivElement | null>;
  containerRef: React.RefObject<HTMLDivElement | null>;
  nodeRefs: React.MutableRefObject<(HTMLDivElement | null)[]>;
  onProgress: (index: number) => void;
  stepCount: number;
}

/**
 * Measures the *actual* rendered position of the first and last node markers
 * (relative to the wrapping container) so the trace always starts/ends
 * exactly centered on the first/last icon — instead of a guessed coordinate
 * that drifts out of sync with real layout (padding, gaps, breakpoints).
 */
const TraceLine: FC<TraceLineProps> = ({
  sectionRef,
  containerRef,
  nodeRefs,
  onProgress,
  stepCount,
}) => {
  const desktopPathRef = useRef<SVGPathElement>(null);
  const mobilePathRef = useRef<SVGPathElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [geometry, setGeometry] = useState<Geometry | null>(null);

  useEffect(() => {
    const measure = () => {
      const container = containerRef.current;
      const first = nodeRefs.current[0];
      const last = nodeRefs.current[stepCount - 1];
      if (!container || !first || !last) return;

      const containerBox = container.getBoundingClientRect();
      const firstBox = first.getBoundingClientRect();
      const lastBox = last.getBoundingClientRect();

      const firstCenterX = firstBox.left + firstBox.width / 2 - containerBox.left;
      const lastCenterX = lastBox.left + lastBox.width / 2 - containerBox.left;
      const firstCenterY = firstBox.top + firstBox.height / 2 - containerBox.top;
      const lastCenterY = lastBox.top + lastBox.height / 2 - containerBox.top;

      setGeometry({
        width: containerBox.width,
        height: containerBox.height,
        horizontal: { x1: firstCenterX, y: firstCenterY, x2: lastCenterX },
        vertical: { x: firstCenterX, y1: firstCenterY, y2: lastCenterY },
      });
    };

    measure();

    const observer = new ResizeObserver(measure);
    if (containerRef.current) observer.observe(containerRef.current);
    window.addEventListener("resize", measure);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [containerRef, nodeRefs, stepCount]);

  useEffect(() => {
    if (!geometry) return;
    const section = sectionRef.current;
    if (!section) return;

    // Whichever path is actually visible at the current breakpoint drives
    // the scroll animation; both are kept in sync to the same progress.
    const paths = [desktopPathRef.current, mobilePathRef.current].filter(
      (p): p is SVGPathElement => Boolean(p)
    );
    if (paths.length === 0) return;

    const lengths = paths.map((p) => p.getTotalLength());

    if (prefersReducedMotion) {
      paths.forEach((p, i) => {
        p.style.strokeDasharray = `${lengths[i]}`;
        p.style.strokeDashoffset = "0";
      });
      onProgress(stepCount - 1);
      return;
    }

    paths.forEach((p, i) => {
      p.style.strokeDasharray = `${lengths[i]}`;
      p.style.strokeDashoffset = `${lengths[i]}`;
    });

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: "top 40%",
      end: "bottom 85%",
      scrub: 0.6,
      onUpdate: (self) => {
        paths.forEach((p, i) => {
          const drawn = lengths[i] - lengths[i] * self.progress;
          p.style.strokeDashoffset = `${drawn}`;
        });
        const activeIndex = Math.min(
          stepCount - 1,
          Math.floor(self.progress * stepCount)
        );
        onProgress(activeIndex);
      },
    });

    return () => {
      trigger.kill();
    };
  }, [geometry, sectionRef, onProgress, stepCount, prefersReducedMotion]);

  if (!geometry) return null;

  const { horizontal, vertical } = geometry;

  return (
    <>
      {/* Desktop: horizontal trace, centered exactly on the first and last node */}
      <svg
        className="pointer-events-none absolute left-0 -top-3 hidden w-full md:block"
        height={horizontal.y + 4}
        viewBox={`0 0 ${geometry.width} ${horizontal.y + 4}`}
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d={`M ${horizontal.x1} ${horizontal.y} L ${horizontal.x2} ${horizontal.y}`}
          stroke="#2A3F5F"
          strokeWidth="2"
          fill="none"
        />
        <path
          ref={desktopPathRef}
          d={`M ${horizontal.x1} ${horizontal.y} L ${horizontal.x2} ${horizontal.y}`}
          stroke="#FF8A3D"
          strokeWidth="2"
          fill="none"
        />
      </svg>

      {/* Mobile: vertical trace, centered exactly on the first and last node */}
      <svg
        className="pointer-events-none absolute left-0 top-0 block h-full md:hidden"
        width={vertical.x + 4}
        viewBox={`0 0 ${vertical.x + 4} ${geometry.height}`}
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d={`M ${vertical.x} ${vertical.y1} L ${vertical.x} ${vertical.y2}`}
          stroke="#2A3F5F"
          strokeWidth="2"
          fill="none"
        />
        <path
          ref={mobilePathRef}
          d={`M ${vertical.x} ${vertical.y1} L ${vertical.x} ${vertical.y2}`}
          stroke="#FF8A3D"
          strokeWidth="2"
          fill="none"
        />
      </svg>
    </>
  );
};

/**
 * ---------------------------------------------------------------------------
 * PROCESS STEP CARD
 * ---------------------------------------------------------------------------
 */

interface ProcessStepCardProps {
  step: ProcessStep;
  index: number;
  isActive: boolean;
  markerRef: (el: HTMLDivElement | null) => void;
}

const ProcessStepCard: FC<ProcessStepCardProps> = ({
  step,
  index,
  isActive,
  markerRef,
}) => {
  const Icon = step.icon;

  return (
    <motion.li
      className="relative flex flex-col gap-4 pl-12 md:pl-0"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay: index * 0.2, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Node marker — measured by TraceLine to anchor the trace exactly here */}
      <div
        ref={markerRef}
        className={[
          "absolute left-0 top-0 flex h-14 w-14 items-center justify-center rounded-full border transition-colors duration-500 md:static md:mb-2",
          isActive
            ? "border-[#FF8A3D] bg-[#1B2A44] text-[#FF8A3D]"
            : "border-[#2A3F5F] bg-[#142642] text-[#5A7099]",
        ].join(" ")}
        aria-hidden="true"
      >
        <Icon className="h-6 w-6" strokeWidth={1.75} />
      </div>

      <motion.div
        whileHover={{ y: -4 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="rounded-2xl border border-[#2A3F5F]/60 bg-[#142642] p-5 shadow-[0_1px_0_0_rgba(255,255,255,0.03)_inset]"
      >
        <span className="font-mono text-xs tracking-widest text-[#5A7099]">
          {step.number}
        </span>
        <h3 className="mt-1 font-display text-lg font-medium text-[#EAF0FA]">
          {step.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-[#8CA0C4]">
          {step.description}
        </p>
      </motion.div>
    </motion.li>
  );
};

/**
 * ---------------------------------------------------------------------------
 * TRUST PILLAR
 * ---------------------------------------------------------------------------
 */

const TrustPillar: FC<{ pillar: TrustPillarData; index: number }> = ({
  pillar,
  index,
}) => {
  const Icon = pillar.icon;
  return (
    <motion.div
      className="flex items-start gap-3 border-t border-[#2A3F5F]/60 pt-4 first:border-t-0 first:pt-0 md:border-t-0 md:border-l md:border-t-0 md:pl-5 md:pt-0 md:first:border-l-0 md:first:pl-0"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
    >
      <Icon className="mt-0.5 h-5 w-5 shrink-0 text-[#FF8A3D]" strokeWidth={1.75} aria-hidden="true" />
      <div>
        <p className="text-sm font-medium text-[#EAF0FA]">{pillar.title}</p>
        <p className="mt-1 text-sm leading-relaxed text-[#8CA0C4]">
          {pillar.description}
        </p>
      </div>
    </motion.div>
  );
};

/**
 * ---------------------------------------------------------------------------
 * MAIN SECTION
 * ---------------------------------------------------------------------------
 */

const WhyPartnerSection: FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const traceContainerRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(-1);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="why-partner-heading"
      className="relative overflow-hidden bg-[#0E1B2E] px-6 py-24 md:px-10 lg:py-32"
    >
      {/* faint blueprint grid backdrop */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(#2A3F5F 1px, transparent 1px), linear-gradient(90deg, #2A3F5F 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-6xl">
        {/* Header */}
        <div className="max-w-2xl">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#FF8A3D]">
            Why partner with Codynix
          </span>
          <h2
            id="why-partner-heading"
            className="mt-4 font-display text-3xl font-medium leading-tight text-[#EAF0FA] sm:text-4xl lg:text-5xl"
          >
            Every project, fully traceable.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[#8CA0C4] sm:text-lg">
            No black boxes. You see the plan, the progress, and the people
            building it  from kickoff to launch.
          </p>
        </div>

        {/* Process trace */}
        <div ref={traceContainerRef} className="relative mt-16">
          <TraceLine
            sectionRef={sectionRef}
            containerRef={traceContainerRef}
            nodeRefs={nodeRefs}
            onProgress={setActiveIndex}
            stepCount={PROCESS_STEPS.length}
          />
          <ol className="relative grid grid-cols-1 gap-10 md:grid-cols-4 md:gap-6">
            {PROCESS_STEPS.map((step, index) => (
              <ProcessStepCard
                key={step.id}
                step={step}
                index={index}
                isActive={index <= activeIndex}
                markerRef={(el) => {
                  nodeRefs.current[index] = el;
                }}
              />
            ))}
          </ol>
        </div>

        {/* Transparency pillars */}
        <div className="mt-20 rounded-2xl border border-[#2A3F5F]/60 bg-[#0F1E33] p-6 sm:p-8">
          <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-[#5A7099]">
            How we keep it transparent
          </h3>
          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4">
            {TRUST_PILLARS.map((pillar, index) => (
              <TrustPillar key={pillar.id} pillar={pillar} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyPartnerSection;