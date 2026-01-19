import { Logs, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { PopupModal } from "react-calendly";
import logo from '../assets/desktop-logo-transparent.png';
import DarkLogo2 from '../assets/logo-dark-theme2.png'
import { ModeToggle } from './ModeToggle';
import { useTheme } from './ThemeProvider';

const Header: React.FC = () => {
    const { theme } = useTheme()

    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isMobileMenuOpen]);

    const navLinks = [
        { name: 'Home', href: '#home' },
        { name: 'Services', href: '#services' },
        { name: 'About', href: '#about' },
        // { name: 'Portfolio', href: '#portfolio' },
        { name: 'Contact', href: '#contact' },
    ];

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-background/90 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-5'
                }`}
        >
            <div className="container mx-auto px-6 flex justify-between items-center">
                {/* logo-trns */}
                <div className="flex items-center">
                    {
                        theme === "light" ? <>
                            <img src={logo} alt="Codynix IT Lab" className="sm:h-20 h-10 w-auto rounded-lg" />

                        </> : <>
                            <img src={DarkLogo2} alt="Codynix IT Lab" className="sm:h-20 h-10 w-auto rounded-lg" />

                        </>
                    }

                </div>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className="text-muted-foreground hover:text-primary font-medium transition-colors"
                        >
                            {link.name}
                        </a>
                    ))}
                    <ModeToggle />

                    <button
                        onClick={() => setIsOpen(true)}
                        className="bg-primary hover:bg-primary/90 text-primary-foreground px-5 py-2 rounded-full font-medium transition-colors shadow-lg shadow-primary/20 cursor-pointer"
                    >
                        Get a Quote
                    </button>
                </nav>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-foreground relative z-10 w-10 h-10 flex items-center justify-center transition-all duration-300"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    <div className={`transition-all duration-500 transform ${isMobileMenuOpen ? 'rotate-90 scale-110' : 'rotate-0 scale-100'}`}>
                        {isMobileMenuOpen ? (
                            <X size={28} className='text-primary animate-pulse cursor-pointer' />
                        ) : (
                            <Logs size={28} className='animate-pulse cursor-pointer' />
                        )}
                    </div>
                </button>
            </div>

            {/* Mobile Nav Overlay */}
            <div
                className={`md:hidden fixed inset-0  backdrop-blur-sm z-[-1] transition-opacity duration-500 ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
                onClick={() => setIsMobileMenuOpen(false)}
            ></div>

            {/* Mobile Nav Menu */}
            <div className={`md:hidden absolute top-full left-0 right-0 bg-background shadow-2xl border-t border-border/50 p-8 flex flex-col gap-6 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] origin-top transform ${isMobileMenuOpen ? 'translate-y-0 opacity-100 visible' : '-translate-y-4 opacity-0 invisible'}`}>
                {navLinks.map((link, index) => (
                    <a
                        key={link.name}
                        href={link.href}
                        className={`text-foreground  text-xl transition-all duration-500 transform hover:text-primary flex items-center justify-between group ${isMobileMenuOpen ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'}`}
                        style={{ transitionDelay: `${index * 75}ms` }}
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        <span>{link.name}</span>
                        <div className="w-2 h-2 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </a>
                ))}
                <ModeToggle />
                <div className={`pt-4 border-t border-border/50 transition-all duration-500 transform ${isMobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
                    style={{ transitionDelay: `${navLinks.length * 75}ms` }}>
                    <button
                        onClick={() => {
                            setIsMobileMenuOpen(false);
                            setIsOpen(true);
                        }}
                        className="w-full bg-primary text-primary-foreground px-5 py-4 rounded-2xl font-medium text-center cursor-pointer shadow-lg shadow-primary/25 active:scale-95 transition-transform"
                    >
                        Get a Quote
                    </button>
                </div>
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
        </header>
    );
};

export default Header;
