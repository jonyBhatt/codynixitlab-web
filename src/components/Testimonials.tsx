import React from 'react';
import { Quote } from 'lucide-react';

const testimonials = [
    {
        quote: "Codynix transformed our outdated platform into a modern, high-speed web app. Their attention to detail and technical expertise are unmatched.",
        name: "Sarah Jenkins",
        role: "CTO, FinWave Solutions",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150"
    },
    {
        quote: "The team at Codynix IT Lab is professional, responsive, and incredibly talented. They delivered our mobile app ahead of schedule.",
        name: "Michael Chen",
        role: "Founder, FitTrack",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150"
    },
    {
        quote: "We've worked with many agencies, but Codynix stands out for their ability to truly understand our business goals and translate them into code.",
        name: "Emily Rodriguez",
        role: "Director of Operations, DataFlow",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150"
    }
];

const Testimonials: React.FC = () => {
    return (
        <section className="py-24 bg-background overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">What Our Clients Say</h2>
                    <p className="text-lg text-muted-foreground">Trust is built on results.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((t, index) => (
                        <div key={index} className="bg-card p-8 rounded-2xl relative border border-border">
                            <Quote className="text-primary/10 absolute top-6 left-6 -z-10" size={64} />
                            <p className="text-foreground mb-6 italic relative z-10 leading-relaxed">"{t.quote}"</p>
                            <div className="flex items-center gap-4">
                                <img src={t.image} alt={t.name} className="w-12 h-12 rounded-full object-cover border-2 border-card shadow-sm" />
                                <div>
                                    <h4 className="font-bold text-foreground">{t.name}</h4>
                                    <p className="text-xs text-muted-foreground uppercase tracking-wide">{t.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
