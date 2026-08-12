import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import gsap from 'gsap';

interface ServiceItem {
  id: string;
  title: string;
  description: React.ReactNode;
  image: string;
  tags: string[];
}

const servicesData: ServiceItem[] = [
  {
    id: '[01]',
    title: 'Software development',
    description: (
      <>
        Transforming concepts into <span className="text-white font-medium">seamless and future-ready</span> digital products.
      </>
    ),
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80', // Replace with macro dial image
    tags: ['TECHNOLOGY', 'ARCHITECTURE', 'COLLABORATION', 'PERFORMANCE']
  },
  {
    id: '[02]',
    title: 'Web app development',
    description: (
      <>
        Elegant, high-speed web <span className="text-white font-medium">experiences that feel effortless</span> and refined.
      </>
    ),
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=600&q=80', // Replace with tablet mock image
    tags: ['FRONTEND', 'BACKEND', 'INTERACTIONS', 'USABILITY', 'MOTION']
  },
  {
    id: '[03]',
    title: 'Mobile app development',
    description: (
      <>
        Designing fluid mobile <span className="text-white font-medium">experiences that inspire</span> creativity.
      </>
    ),
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=600&q=80', // Replace with vertical mobile phone image
    tags: ['INTERFACE', 'GESTURE', 'ANIMATION', 'PRODUCT DESIGN']
  },
  {
    id: '[04]',
    title: 'UI/UX design',
    description: (
      <>
        Blending clarity and emotion into <span className="text-white font-medium">experiences that feel beautifully</span> simple.
      </>
    ),
    image: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?auto=format&fit=crop&w=600&q=80', // Replace with profile holding phone image
    tags: ['PROTOTYPE', 'LAYOUT', 'TYPOGRAPHY', 'INTERACTION', 'USER FLOW']
  },
  {
    id: '[05]',
    title: 'Software testing',
    description: (
      <>
        Perfecting every detail to ensure <span className="text-white font-medium">precision, stability, and</span> confidence in every click.
      </>
    ),
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80', // Replace with dark tunnel architecture image
    tags: ['QUALITY', 'AUTOMATION', 'RELIABILITY', 'REFINEMENT']
  },
  {
    id: '[06]',
    title: 'Generative AI development',
    description: (
      <>
        Merging creativity and <span className="text-white font-medium">intelligence to build systems that</span> imagine and evolve.
      </>
    ),
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80', // Replace with glitch/chromatic AI artwork
    tags: ['MACHINE LEARNING', 'INNOVATION', 'NEURAL NETWORKS', 'AUTOMATION', 'FUTURE TECH']
  },
  {
    id: '[07]',
    title: 'Data engineering',
    description: (
      <>
        Raw information to clear, <span className="text-white font-medium">powerful insights that drive smart</span> decisions.
      </>
    ),
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=600&q=80', // Replace with 3D monochrome geometric staircase image
    tags: ['ANALYTICS', 'PIPELINES', 'CLOUD', 'VISUALIZATION', 'STRUCTURE']
  }
];

export default function ServicesSection() {
  return (
    <section id="services" className="w-full bg-[#080808] text-[#8a8a8a] font-sans overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16">
        <div className="pt-16 pb-12 text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-primary/80 mb-3">Services</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
            Our Services
          </h2>
          <p className="max-w-3xl mx-auto mt-4 text-base text-[#8a8a8a]">
            Explore the services we craft to build elegant digital products, immersive apps, and intelligent solutions.
          </p>
        </div>
        {servicesData.map((service, index) => (
          <ServiceRow key={service.id} service={service} index={index} />
        ))}
      </div>
    </section>
  );
}

/* Individual Row Component for Encapsulated Scroll Anims and GSAP Hover Hooks */
function ServiceRow({ service }: { service: ServiceItem; index: number }) {
  const rowRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  // Adjusted offsets for your sticky navbar:
  // "start end" -> Starts animating in when the top of the row enters the bottom of the screen.
  // "end 90px"  -> Completes the exit animation exactly 90px from the top of the screen (just below your navbar).
  const { scrollYProgress } = useScroll({
    target: rowRef,
    offset: ["start end", "end 270px"] 
  });

  // Smooth out the animation steps:
  // 0.0 -> Enters bottom of viewport (Invisible)
  // 0.3 -> Fully visible in the center area
  // 0.8 -> Starts fading out as it climbs close to the navbar
  // 1.0 -> Fully hidden right before it touches/slides under the sticky navbar
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.3, 0.8, 1], [40, 0, 0, -30]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.8, 1], [0.98, 1, 1, 0.95]);

  // GSAP 3D Hover Interactions
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current) return;
    const { clientX, clientY, currentTarget } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const x = (clientX - left) / width - 0.5;
    const y = (clientY - top) / height - 0.5;

    gsap.to(imageRef.current, {
      rotationY: x * 15,
      rotationX: -y * 15,
      scale: 1.04,
      ease: 'power2.out',
      duration: 0.4,
    });
  };

  const handleMouseLeave = () => {
    if (!imageRef.current) return;
    gsap.to(imageRef.current, {
      rotationY: 0,
      rotationX: 0,
      scale: 1,
      ease: 'power2.out',
      duration: 0.6,
    });
  };

  return (
     <motion.div 
      ref={rowRef}
      style={{ opacity, y, scale }}
      className="grid grid-cols-1 md:grid-cols-12 border-b border-gray-900/60 py-16 lg:py-24 items-center gap-8 md:gap-4 will-change-transform origin-center"
    >
      {/* 1. Left Identification Details */}
      <div className="md:col-span-4 flex flex-col justify-between h-full space-y-8 md:space-y-16">
        <span className="text-xs font-mono text-gray-600 tracking-widest">{service.id}</span>
        <h3 className="text-3xl md:text-[2.65rem] font-medium tracking-tight text-white leading-tight max-w-[280px]">
          {service.title}
        </h3>
      </div>

      {/* 2. Center Dynamic Media Box */}
      <div 
        className="md:col-span-4 flex justify-center items-center perspective-1000"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div className="w-full aspect-[4/3] max-w-[340px] md:max-w-full rounded-sm overflow-hidden bg-zinc-900/40 shadow-2xl relative group">
          <img
            ref={imageRef}
            src={service.image}
            alt={service.title}
            className="w-full h-full object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 will-change-transform"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-white/5 pointer-events-none" />
        </div>
      </div>

      {/* 3. Right Context & Metadata Matrix */}
      <div className="md:col-span-4 flex flex-col justify-between h-full md:pl-8 lg:pl-16 space-y-10">
        <p className="text-lg md:text-xl font-light leading-relaxed text-[#8a8a8a]">
          {service.description}
        </p>

        <div className="grid grid-cols-2 gap-x-4 gap-y-2 pt-4 border-t border-zinc-900">
          {service.tags.map((tag) => (
            <span 
              key={tag} 
              className="text-[10px] font-mono tracking-widest text-zinc-500 font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}