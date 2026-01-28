import React from 'react';
import { motion } from 'framer-motion';
import heroBg from '../assets/hero-bg.png';

const HeroSection = () => {
    return (
        <div className="relative h-screen w-full overflow-hidden flex items-center justify-center">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <img
                    src={heroBg}
                    alt="Badminton Court"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight"
                >
                    Players United <span className="text-neon-green">Badminton Courts</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    className="text-xl md:text-2xl text-gray-300 mb-8 font-light"
                >
                    RL's PUBC - Premium Courts for <span className="text-electric-blue">Early Risers</span> & <span className="text-electric-blue">Night Owls</span>.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                    className="flex flex-col md:flex-row gap-4 justify-center items-center"
                >
                    <button className="px-8 py-3 bg-neon-green text-black font-semibold rounded-full hover:bg-[#2ecc10] transition-colors duration-300 shadow-[0_0_15px_rgba(57,255,20,0.5)]">
                        Book a Court
                    </button>
                    <button className="px-8 py-3 border border-white/20 bg-white/5 backdrop-blur-md text-white font-semibold rounded-full hover:bg-white/10 transition-colors duration-300">
                        Explore Facilities
                    </button>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
            >
                <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-1">
                    <motion.div
                        animate={{ y: [0, 12, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                        className="w-1.5 h-1.5 bg-neon-green rounded-full"
                    />
                </div>
            </motion.div>
        </div>
    );
};

export default HeroSection;
