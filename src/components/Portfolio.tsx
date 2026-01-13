import React from 'react';
import { ExternalLink } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Navigation, Autoplay } from 'swiper/modules';

// Import Swiper styles (v11+ includes all module styles in base CSS)
import 'swiper/css';
const projects = [
    {
        title: 'AI-Powered Analytics Dashboard',
        category: 'Web Application',
        description: 'A comprehensive analytics platform featuring real-time data visualization, predictive insights, and interactive dashboards powered by machine learning.',
        tags: ['React', 'TypeScript', 'D3.js'],
        year: '2024',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1600',
    },
    {
        title: 'HealthCare Mobile App',
        category: 'Mobile Development',
        description: 'A patient-centric mobile application enabling seamless appointment booking, health records management, and telemedicine consultations.',
        tags: ['React Native', 'Firebase'],
        year: '2024',
        image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=1600',
    },
    {
        title: 'E-Commerce Platform',
        category: 'E-Commerce',
        description: 'A modern online marketplace with advanced product filtering, secure payment processing, and personalized shopping experiences.',
        tags: ['Next.js', 'Stripe', 'Tailwind'],
        year: '2023',
        image: 'https://images.unsplash.com/photo-1661956602116-aa6865609028?auto=format&fit=crop&q=80&w=1600',
    },
    {
        title: 'Smart Home IoT Platform',
        category: 'IoT Solutions',
        description: 'An integrated ecosystem for home automation, connecting and controlling smart devices through a unified mobile and web interface.',
        tags: ['IoT', 'Cloud', 'Mobile'],
        year: '2024',
        image: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&q=80&w=1600',
    },
    {
        title: 'Brand Identity System',
        category: 'Branding & Design',
        description: 'A complete brand identity overhaul including logo-trns design, brand guidelines, and visual communication systems for modern businesses.',
        tags: ['Branding', 'UI/UX', 'Design'],
        year: '2023',
        image: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=1600',
    },
    {
        title: 'Cloud Infrastructure Platform',
        category: 'Cloud & DevOps',
        description: 'Scalable cloud infrastructure management with automated deployment pipelines and comprehensive monitoring solutions.',
        tags: ['AWS', 'Kubernetes', 'Docker'],
        year: '2024',
        image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1600',
    },
];

const Portfolio: React.FC = () => {
    return (
        <section id="portfolio" className="py-24 bg-gradient-to-b from-background via-primary/20 to-accent/20 relative overflow-hidden">
            {/* Cinematic Background Effects */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(var(--primary-rgb),0.05),transparent_50%)]"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(var(--accent-rgb),0.05),transparent_50%)]"></div>

            <div className="container mx-auto px-6 relative z-10">
                {/* Header */}
                <div className="text-center mb-20">
                    <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                        Featured Projects
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Discover our portfolio of cutting-edge digital solutions
                    </p>
                </div>

                {/* Swiper Carousel */}
                <div className=" mx-auto">
                    <Swiper
                        effect={'coverflow'}
                        grabCursor={true}
                        centeredSlides={true}
                        slidesPerView={'auto'}
                        coverflowEffect={{
                            rotate: 50,
                            stretch: 0,
                            depth: 100,
                            modifier: 1,
                            slideShadows: true,
                        }}
                        pagination={{
                            clickable: true,
                            dynamicBullets: true,
                        }}
                        navigation={true}
                        autoplay={{
                            delay: 2000,
                            disableOnInteraction: false,
                            pauseOnMouseEnter: true,
                        }}
                        loop={true}
                        modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
                        className="portfolio-swiper"
                    >
                        {projects.map((project, index) => (
                            <SwiperSlide key={index}>
                                <div className="relative rounded  overflow-hidden shadow-2xl bg-card border border-border h-full">
                                    {/* Image Container */}
                                    <div className="relative h-80 overflow-hidden">
                                        <img
                                            src={project.image}
                                            alt={project.title}
                                            className="w-full h-full object-cover px-5 pt-5 rounded-[40px]"
                                        />
                                        {/* Gradient Overlay */}
                                        <div className="absolute inset-0  bg-gradient-to-t from-card via-card/40 to-transparent"></div>

                                        {/* Year Badge */}
                                        <div className="absolute top-6 right-6">
                                            <span className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-white text-sm font-medium border border-white/20">
                                                {project.year}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-8">
                                        {/* Category */}
                                        <span className="inline-block px-3 py-1 bg-primary/20 text-primary rounded-full text-sm font-medium mb-4">
                                            {project.category}
                                        </span>

                                        {/* Title */}
                                        <h3 className="text-3xl font-bold text-foreground mb-4">
                                            {project.title}
                                        </h3>

                                        {/* Description */}
                                        <p className="text-muted-foreground text-lg leading-relaxed mb-6 truncate line-clamp-2">
                                            {project.description}
                                        </p>

                                        {/* Tags */}
                                        <div className="flex flex-wrap gap-2 mb-6">
                                            {project.tags.map((tag, tagIndex) => (
                                                <span
                                                    key={tagIndex}
                                                    className="px-3 py-1 bg-primary/5 text-muted-foreground rounded-lg text-sm border border-border"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>

                                        {/* CTA Button */}
                                        <button className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full font-medium transition-all duration-300 group">
                                            View Project
                                            <ExternalLink size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                                        </button>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>

            {/* Custom Swiper Styles */}
            <style>{`
                .portfolio-swiper {
                    padding: 50px 0 80px 0;
                }

                .portfolio-swiper .swiper-slide {
                    width: 500px;
                    max-width: 80vw;
                }

                .portfolio-swiper .swiper-slide-active {
                    z-index: 10;
                }

                /* Navigation Buttons */
                .portfolio-swiper .swiper-button-next,
                .portfolio-swiper .swiper-button-prev {
                    color: white;
                    background: rgba(255, 255, 255, 0.1);
                    backdrop-filter: blur(10px);
                    width: 20px;
                    height: 20px;
                    border-radius: 50%;
                    border: 1px solid rgba(255, 255, 255, 0.2);
                    transition: all 0.3s ease;
                    display:none;
                }

                .portfolio-swiper .swiper-button-next:hover,
                .portfolio-swiper .swiper-button-prev:hover {
                    background: rgba(255, 255, 255, 0.2);
                    transform: scale(1.1);
                }

                .portfolio-swiper .swiper-button-next::after,
                .portfolio-swiper .swiper-button-prev::after {
                    font-size: 20px;
                }

                /* Pagination Bullets */
                .portfolio-swiper .swiper-pagination-bullet {
                    background: var(--muted-foreground);
                    opacity: 0.3;
                    transition: all 0.3s ease;
                }

                .portfolio-swiper .swiper-pagination-bullet-active {
                    background: var(--primary);
                    width: 40px;
                    border-radius: 10px;
                    opacity: 1;
                }

                /* Shadow Effects */
                .portfolio-swiper .swiper-slide-shadow-left,
                .portfolio-swiper .swiper-slide-shadow-right {
                    background-image: linear-gradient(
                        to right,
                        rgba(0, 0, 0, 0.3),
                        rgba(0, 0, 0, 0)
                    );
                }
            `}</style>
        </section>
    );
};

export default Portfolio;
