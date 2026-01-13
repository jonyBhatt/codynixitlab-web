import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { PopupModal } from "react-calendly";

const CTA: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <section id="contact" className="py-24 bg-gradient-to-br from-primary to-primary/90 relative overflow-hidden">
            {/* Abstract Shapes */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary-foreground/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/20 rounded-full blur-3xl -ml-20 -mb-20"></div>

            <div className="container mx-auto px-6 relative z-10 text-center text-primary-foreground">
                <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Transform Your Digital Presence?</h2>
                <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto mb-10">
                    Let's discuss your project and how Codynix IT Lab can help you achieve your goals.
                </p>
                <button
                    onClick={() => setIsOpen(true)}
                    className="bg-background text-primary hover:bg-background/90 font-bold text-lg px-10 py-5 rounded-full shadow-xl transition-transform hover:scale-105 inline-flex items-center gap-2 cursor-pointer"
                >
                    Contact Us Today <ArrowRight size={24} />
                </button>
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
        </section>
    );
};

export default CTA;
