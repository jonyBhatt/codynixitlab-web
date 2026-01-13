import React, { useState } from 'react';
import { ArrowRight, Layers } from 'lucide-react';
import { PopupModal } from "react-calendly";


const Hero: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);


    return (
        <section id="home" className="relative pt-32 pb-20 lg:pt-32 lg:pb-32 overflow-hidden">
            {/* Background/Gradient */}
            <div className="absolute inset-0 bg-background z-10">
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl"></div>
                <div className="absolute animate-pulse duration-300 ease-linear top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-gradient-to-tr from-primary/30 via-accent/10 to-transparent rounded-full blur-[100px]"></div>
            </div>

            <div className="container mx-auto px-6 text-center relative z-10">
                <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 px-4 py-2 rounded-full text-primary text-sm font-medium mb-8 animate-fade-in-up">
                    <Layers size={16} />
                    <span>Innovating the Digital Future</span>
                </div>

                <h1 className="text-2xl md:text-7xl font-extrabold text-foreground tracking-tight mb-8 leading-tight">
                    Building Scalable <br className="hidden md:block" />
                    <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                        Digital Solutions
                    </span>
                    {' '}for the Future
                </h1>

                <p className="text-xs md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed text-balance">
                    Codynix IT Lab delivers cutting-edge software, web platforms, and mobile experiences designed to transform your business and engage your audience.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <button
                        onClick={() => setIsOpen(true)}
                        className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 rounded-full font-semibold text-lg transition-transform hover:scale-105 shadow-lg shadow-primary/25 flex items-center gap-2 cursor-pointer"
                    >
                        Start Your Project <ArrowRight size={20} />
                    </button>
                    <a
                        href="#services"
                        className="bg-card hover:bg-accent/10 text-foreground border border-border px-8 py-4 rounded-full font-semibold text-lg transition-colors flex items-center gap-2"
                    >
                        View Services
                    </a>
                </div>
                <PopupModal
                    url="https://calendly.com/biplobdebnath168/30min"
                    onModalClose={() => setIsOpen(false)}
                    open={isOpen}
                    /*
                     * react-calendly uses React's Portal feature (https://reactjs.org/docs/portals.html) to render the popup modal. As a result, you'll need to
                     * specify the rootElement property to ensure that the modal is inserted into the correct domNode.
                     */
                    rootElement={document.getElementById("root")!}
                />

                {/* Optional decorative elements */}
                {/* <div className="mt-20 border border-slate-200 bg-white/50 backdrop-blur-sm rounded-xl p-4 shadow-xl max-w-5xl mx-auto transform rotate-1 hover:rotate-0 transition-all duration-500">
          <div className="aspect-video bg-slate-100 rounded-lg animate-pulse"></div>
        </div> */}
            </div>
        </section>
    );
};

export default Hero;
