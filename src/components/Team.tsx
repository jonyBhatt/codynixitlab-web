import { useRef } from 'react';
import { ChevronLeft, ChevronRight, Linkedin, Twitter, Mail } from 'lucide-react';

import ceoImage from '../assets/ceo.jpeg';
import ctoImage from '../assets/cto.jpeg';
import headOfDesignImage from '../assets/headofdesign.jpeg';
import leadImage from '../assets/lead.jpeg';
import marketingImage from '../assets/marketing.jpeg';
import productManagerImage from '../assets/productmanager.jpeg';
import salesImage from '../assets/sales.jpeg';

const teamMembers = [
    {
        name: "Biplob Deb Nath",
        role: "CEO",
        image: ceoImage
    },
    {
        name: "Jony Bhattacharjee",
        role: "CTO",
        image: ctoImage
    },
    {
        name: "Pritam Dam Rahul",
        role: "COO",
        image: leadImage
    },
    {
        name: "Joy Datta",
        role: "Head of Design",
        image: headOfDesignImage
    },

    {
        name: "Tutul Chandra Das",
        role: "Marketing Director",
        image: marketingImage
    },
    {
        name: "Bilasi Deb Nath",
        role: "Product Manager",
        image: productManagerImage
    },
    {
        name: "Sagor Ghosh",
        role: "Sales Lead",
        image: salesImage
    }
];

export default function Team() {
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const scrollAmount = 350;
            const newScrollLeft = direction === 'left'
                ? scrollContainerRef.current.scrollLeft - scrollAmount
                : scrollContainerRef.current.scrollLeft + scrollAmount;

            scrollContainerRef.current.scrollTo({
                left: newScrollLeft,
                behavior: 'smooth'
            });
        }
    };

    return (
        <section className="py-20 bg-background relative overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12">
                    <div className="max-w-2xl">
                        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-center md:text-left ">
                            Our fearless leaders
                        </h2>
                        <p className="text-lg text-muted-foreground text-center md:text-left">
                            Each and every one of our team members is a leader in their own right, dedicated to delivering excellence.
                        </p>
                    </div>

                    <div className="flex gap-2 mt-6 md:mt-0">
                        <button
                            onClick={() => scroll('left')}
                            className="p-2 rounded-full border border-border bg-card hover:bg-accent/10 text-muted-foreground transition-colors shadow-sm cursor-pointer"
                            aria-label="Scroll left"
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </button>
                        <button
                            onClick={() => scroll('right')}
                            className="p-2 rounded-full border border-border bg-card hover:bg-accent/10 text-muted-foreground transition-colors shadow-sm cursor-pointer"
                            aria-label="Scroll right"
                        >
                            <ChevronRight className="w-6 h-6" />
                        </button>
                    </div>
                </div>

                <div
                    ref={scrollContainerRef}
                    className="flex gap-6 overflow-x-auto pb-12 snap-x snap-mandatory scrollbar-hide -mx-4 px-4"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {teamMembers.map((member, index) => (
                        <div
                            key={index}
                            className="min-w-[280px] md:min-w-[320px] bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow snap-start border border-border/50 group"
                        >
                            <div className="h-80 overflow-hidden relative">
                                <img
                                    src={member.image}
                                    alt={member.name}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                                    <div className="flex gap-4">
                                        <a href="#" className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white hover:text-blue-600 transition-colors">
                                            <Linkedin className="w-5 h-5" />
                                        </a>
                                        <a href="#" className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white hover:text-blue-400 transition-colors">
                                            <Twitter className="w-5 h-5" />
                                        </a>
                                        <a href="#" className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white hover:text-red-500 transition-colors">
                                            <Mail className="w-5 h-5" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="p-6 bg-gradient-to-b from-secondary via-accent/60 to-primary/20 dark:from-card dark:via-card dark:to-primary/20">
                                <h3 className="text-xl font-bold text-foreground mb-1">{member.name}</h3>
                                <p className="text-primary font-medium">{member.role}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
