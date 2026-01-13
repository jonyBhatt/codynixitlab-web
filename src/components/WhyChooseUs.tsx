import React, { useEffect, useRef, useState } from 'react';
import { CheckCircle2, Zap, Shield, Users } from 'lucide-react';

const features = [
    {
        icon: <Zap className="text-primary" size={24} />,
        title: 'Innovative Technology',
        description: 'We stay ahead of the curve, utilizing the latest tech stacks to build future-proof solutions.'
    },
    {
        icon: <CheckCircle2 className="text-primary" size={24} />,
        title: 'Proven Expertise',
        description: 'Our team of seasoned developers and designers brings years of experience to every project.'
    },
    {
        icon: <Shield className="text-primary" size={24} />,
        title: 'Reliable Support',
        description: 'We offer ongoing maintenance and support to ensure your product runs smoothly 24/7.'
    },
    {
        icon: <Users className="text-primary" size={24} />,
        title: 'Client-Centric Approach',
        description: 'Your vision is our priority. We work closely with you to deliver exactly what you need.'
    }
];

const stats = [
    { value: 3, label: 'Years Experience', suffix: '+', color: 'text-primary', bg: 'bg-card' },
    { value: 100, label: 'Projects Delivered', suffix: '+', color: 'text-primary-foreground', bg: 'bg-primary' },
    { value: 50, label: 'Happy Clients', suffix: '+', color: 'text-primary-foreground', bg: 'bg-primary/90' },
    { value: 24, label: 'Support Available', suffix: '/7', color: 'text-accent', bg: 'bg-card' },
];

// Custom hook for counting animation
const useCountAnimation = (end: number, duration: number = 2000, isVisible: boolean) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!isVisible) {
            setCount(0);
            return;
        }

        let startTime: number | null = null;
        let animationFrameId: number;

        const step = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);

            setCount(Math.floor(progress * end));

            if (progress < 1) {
                animationFrameId = requestAnimationFrame(step);
            }
        };

        animationFrameId = requestAnimationFrame(step);

        return () => {
            if (animationFrameId) cancelAnimationFrame(animationFrameId);
        };
    }, [end, duration, isVisible]);

    return count;
};

const WhyChooseUs: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting);
            },
            { threshold: 0.2 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, []);

    return (
        <section ref={sectionRef} className="py-24 bg-background overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="flex flex-col lg:flex-row items-center gap-16">
                    {/* Left Section - Slide from Left */}
                    <div
                        className={`lg:w-1/2 transition-all duration-1000 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'
                            }`}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                            Why Partner with <span className="text-primary">Codynix?</span>
                        </h2>
                        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                            At Codynix IT Lab, we don't just write code; we build relationships and delivering value. Our commitment to quality and innovation sets us apart in the crowded digital landscape.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {features.map((feature, index) => (
                                <div
                                    key={index}
                                    className={`flex flex-col gap-3 transition-all duration-700 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'
                                        }`}
                                    style={{ transitionDelay: `${index * 150}ms` }}
                                >
                                    <div className="flex items-center gap-2 font-semibold text-foreground">
                                        {feature.icon}
                                        {feature.title}
                                    </div>
                                    <p className="text-sm text-muted-foreground">
                                        {feature.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Section - Slide from Right */}
                    <div
                        className={`lg:w-1/2 relative transition-all duration-1000 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
                            }`}
                    >
                        <div className="relative z-10 grid grid-cols-2 gap-4">
                            {/* First Column */}
                            <div className="space-y-4 mt-8">
                                <StatCard
                                    stat={stats[0]}
                                    isVisible={isVisible}
                                    delay={100}
                                    height="h-40"
                                />
                                <StatCard
                                    stat={stats[1]}
                                    isVisible={isVisible}
                                    delay={200}
                                    height="h-48"
                                />
                            </div>

                            {/* Second Column */}
                            <div className="space-y-4">
                                <StatCard
                                    stat={stats[2]}
                                    isVisible={isVisible}
                                    delay={300}
                                    height="h-48"
                                />
                                <StatCard
                                    stat={stats[3]}
                                    isVisible={isVisible}
                                    delay={400}
                                    height="h-40"
                                />
                            </div>
                        </div>

                        {/* Background decoration */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-primary/5 rounded-full blur-3xl -z-10"></div>
                    </div>
                </div>
            </div>
        </section>
    );
};

// Stat Card Component with Counting Animation
const StatCard: React.FC<{
    stat: typeof stats[0];
    isVisible: boolean;
    delay: number;
    height: string;
}> = ({ stat, isVisible, delay, height }) => {
    const count = useCountAnimation(stat.value, 2000, isVisible);

    return (
        <div
            className={`${height} ${stat.bg} rounded-2xl shadow-lg p-6 flex flex-col justify-center items-center text-center transition-all duration-700 hover:scale-105 hover:shadow-xl ${isVisible ? 'scale-100 opacity-100' : 'scale-50 opacity-0'
                }`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            <h4 className={`text-4xl font-bold mb-2 ${stat.color}`}>
                {count}{stat.suffix}
            </h4>
            <p className={`text-sm font-medium ${stat.bg === 'bg-card' ? 'text-muted-foreground' : 'text-primary-foreground/80'
                }`}>
                {stat.label}
            </p>
        </div>
    );
};

export default WhyChooseUs;
