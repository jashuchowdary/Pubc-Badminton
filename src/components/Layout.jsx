import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Dumbbell, MapPin, Star } from 'lucide-react';
import { Link } from 'react-scroll';

const Layout = ({ children }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', to: 'home' },
        { name: 'Info', to: 'info' },
        { name: 'Gallery', to: 'gallery' },
        { name: 'Location', to: 'location' },
    ];

    const handleLoginClick = () => {
        window.location.href = '/login';
    };

    return (
        <div className="min-h-screen bg-neutral-900 text-white selection:bg-neon-green selection:text-black">
            {/* Navbar */}
            <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-black/80 backdrop-blur-md py-4' : 'bg-transparent py-6'}`}>
                <div className="container mx-auto px-6 flex justify-between items-center">
                    <a href="#" className="text-2xl font-bold tracking-tighter flex items-center gap-2">
                        <span className="text-neon-green">PUBC</span>
                    </a>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex gap-8 items-center">
                        {navLinks.map((link) => (
                            <Link
                                key={link.to}
                                to={link.to}
                                smooth={true}
                                duration={500}
                                className="text-gray-300 hover:text-neon-green cursor-pointer transition-colors text-sm font-medium uppercase tracking-widest"
                            >
                                {link.name}
                            </Link>
                        ))}
                        <button
                            onClick={handleLoginClick}
                            className="px-5 py-2 bg-white/10 hover:bg-neon-green hover:text-black border border-white/20 hover:border-neon-green rounded-full transition-all duration-300 text-sm font-bold"
                        >
                            Sign In
                        </button>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                        {mobileMenuOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: '100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '100%' }}
                        transition={{ type: 'tween' }}
                        className="fixed inset-0 z-40 bg-black flex flex-col items-center justify-center gap-8 md:hidden"
                    >
                        {navLinks.map((link) => (
                            <Link
                                key={link.to}
                                to={link.to}
                                smooth={true}
                                duration={500}
                                onClick={() => setMobileMenuOpen(false)}
                                className="text-2xl font-bold text-white hover:text-neon-green cursor-pointer"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

            <main>
                {children}
            </main>

            <footer className="bg-black py-8 border-t border-white/10 text-center text-gray-500 text-sm">
                <p>&copy; {new Date().getFullYear()} Players United Badminton Courts.</p>
            </footer>
        </div>
    );
};

export default Layout;
