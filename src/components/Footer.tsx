import { Facebook, Instagram, Mail, MapPin, Phone, Twitter } from 'lucide-react';
import React from 'react';
import logo from '../assets/logo-trns.png';

const Footer: React.FC = () => {
    return (
        <footer className="bg-primary/10 border-t border-primary/20 text-muted-foreground pt-16 pb-8">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    {/* Brand */}
                    <div>
                        <div className="flex items-center gap-2 mb-6">
                            <img src={logo} alt="Codynix IT Lab" className="h-8 w-auto rounded opacity-90" />
                            <span className="text-xl font-bold text-foreground">Codynix IT Lab</span>
                        </div>
                        <p className="text-muted-foreground/80 leading-relaxed mb-6">
                            Empowering businesses with innovative digital solutions. Building the future, one line of code at a time.
                        </p>
                        <div className="flex gap-4">
                            <a href="https://www.facebook.com/share/1BfyhMCoXL/" className="hover:text-primary transition-colors"><Facebook size={20} /></a>
                            <a href="https://x.com/codynixitlab" className="hover:text-primary transition-colors"><Twitter size={20} /></a>
                            <a href="https://www.instagram.com/codynixitlab?igsh=b3pmeDhzczF5bGV1#" className="hover:text-primary transition-colors"><Instagram size={20} /></a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-foreground font-bold mb-6">Quick Links</h4>
                        <ul className="space-y-3">
                            <li><a href="#home" className="hover:text-primary transition-colors">Home</a></li>
                            <li><a href="#services" className="hover:text-primary transition-colors">Services</a></li>
                            <li><a href="#about" className="hover:text-primary transition-colors">About Us</a></li>
                            <li><a href="#portfolio" className="hover:text-primary transition-colors">Portfolio</a></li>
                            <li><a href="#contact" className="hover:text-primary transition-colors">Contact</a></li>
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 className="text-foreground font-bold mb-6">Services</h4>
                        <ul className="space-y-3">
                            <li><a href="#" className="hover:text-primary transition-colors">Web Development</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Mobile Applications</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">UI/UX Design</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Cloud Solutions</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">IT Consulting</a></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-foreground font-bold mb-6">Contact Us</h4>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <MapPin size={20} className="text-primary mt-1" />
                                <span>Bagbari, Modina Market, Sylhet, Bangladesh</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone size={20} className="text-primary" />
                                <span>+880 1719 144 437</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail size={20} className="text-primary" />
                                <a href='mailto:info@codynixitlab.site' className="hover:text-primary transition-colors">info@codynixitlab.site</a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-primary/10 pt-8 text-center text-sm text-muted-foreground/60">
                    <p>&copy; 2023 Codynix IT Lab. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
