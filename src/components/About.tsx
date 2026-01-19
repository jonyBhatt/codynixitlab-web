import React from 'react';

const About: React.FC = () => {
    return (
        <section id="about" className="py-28 bg-background border-t border-border">
            <div className="container mx-auto px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8">About Codynix IT Lab</h2>

                    <div className="prose prose-lg mx-auto text-muted-foreground leading-relaxed">
                        <p className="mb-6">
                            Founded on the principles of innovation and integrity, <strong>Codynix IT Lab</strong> is more than just a software agency. We are a team of passionate technologists, designers, and strategists dedicated to empowering businesses through digital transformation.
                        </p>
                        <p className="mb-6">
                            Our mission is simple: to bridge the gap between complex technology and real-world business problems. Whether you're a startup looking to disrupt the market or an enterprise seeking scalability, we provide the technical foundation you need to succeed.
                        </p>
                        <p>
                            We pride ourselves on our collaborative approach, transparent communication, and unwavering commitment to quality. At Codynix, your success is our success.
                        </p>
                    </div>

                    <div className="mt-12 flex flex-wrap justify-center gap-4">
                        {['Innovation', 'Integrity', 'Excellence', 'Collaboration'].map((value) => (
                            <span key={value} className="px-6 py-2 bg-accent dark:bg-card/95 dark:shadow-[inset_0_-2px_4px_rgba(0,0,0,0.6)] rounded-full border border-primary/50 text-foreground font-medium shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)]  backdrop-blur-sm transition-colors hover:bg-secondary/80 dark:hover:bg-accent/10">
                                {value}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;


