import React from 'react';
import { Globe, Smartphone, Palette, Code2, Cloud, Briefcase } from 'lucide-react';

const services = [
    {
        icon: <Globe size={32} className="text-primary" />,
        title: 'Web Development',
        description: 'High-performance websites and web applications built with modern frameworks like React and Next.js.'
    },
    {
        icon: <Smartphone size={32} className="text-primary" />,
        title: 'Mobile App Development',
        description: 'Native and cross-platform mobile apps that deliver seamless experiences on iOS and Android.'
    },
    {
        icon: <Palette size={32} className="text-primary" />,
        title: 'UI/UX Design',
        description: 'User-centric design solutions that combine aesthetics with intuitive functionality.'
    },
    {
        icon: <Code2 size={32} className="text-primary" />,
        title: 'Custom Software',
        description: 'Tailored software solutions to streamline your business operations and solve complex challenges.'
    },
    {
        icon: <Cloud size={32} className="text-primary" />,
        title: 'Cloud & DevOps',
        description: 'Scalable cloud architecture and DevOps practices to ensure reliability and speed.'
    },
    {
        icon: <Briefcase size={32} className="text-primary" />,
        title: 'IT Consulting',
        description: 'Expert guidance to help you navigate the digital landscape and make informed technology decisions.'
    }
];

const Services: React.FC = () => {
    return (
        <section id="services" className="py-24 bg-background">

            <div className="container mx-auto px-6">




                {/* Two Column Layout - Left: sticky description, Right: stacking cards */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
                    {/* Left Column - Sticky Content */}
                    <div className="lg:sticky lg:top-32 h-fit">
                        <div className="text-center mb-20">
                            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6 tracking-tight">Our Expertise</h2>
                            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto font-medium">
                                We provide comprehensive IT solutions tailored to meet the unique needs of your business.
                            </p>
                        </div>
                    </div>

                    {/* Right Column - Stacking Cards */}
                    <div className="relative">
                        {services.map((service, index) => (
                            <div
                                key={index}
                                className="sticky mb-10 last:mb-0"
                                style={{
                                    top: `${32 + index * 32}px`,
                                    zIndex: services.length - index
                                }}
                            >
                                <div
                                    className="group p-8 md:p-10 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 relative overflow-hidden "
                                    style={{
                                        transform: `scale(${1 - index * 0.02})`,
                                        transformOrigin: 'top center',
                                        border: '1.5px solid var(--border)',
                                    }}
                                >
                                    {/* Solid Card Background */}
                                    <div className="absolute inset-0 bg-card  -z-10 bg-gradient-to-br group-hover:from-secondary/80 group-hover:to-accent/10 transition-colors duration-500 ease-in-out"></div>

                                    {/* Blue Gradient Overlay */}
                                    <div
                                        className="absolute inset-0 pointer-events-none"
                                        style={{
                                            background: 'linear-gradient(to left, var(--primary), rgba(var(--primary-rgb), 0.02), transparent)',
                                            opacity: 0.08
                                        }}
                                    ></div>

                                    <div className="relative z-10">
                                        <div className="mb-8 p-5 bg-gradient-to-br from-primary/10 to-accent/5 rounded-2xl w-fit group-hover:from-primary/25 group-hover:to-accent/10 transition-colors duration-300">
                                            {service.icon}
                                        </div>
                                        <h3 className="text-xl md:text-2xl font-bold text-foreground mb-4 tracking-tight">{service.title}</h3>
                                        <p className="text-sm md:text-base text-muted-foreground leading-relaxed font-medium">
                                            {service.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Services;
