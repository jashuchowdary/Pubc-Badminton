import React from 'react';
import { motion } from 'framer-motion';
import gallerySmash from '../assets/gallery-smash.png';
import galleryEquipment from '../assets/gallery-equipment.png';
import heroBg from '../assets/hero-bg.png';

const GalleryImage = ({ src, alt, className, delay }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay }}
        className={`relative overflow-hidden group rounded-2xl cursor-pointer ${className}`}
    >
        <img
            src={src}
            alt={alt}
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
            <p className="text-neon-green font-bold text-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">{alt}</p>
        </div>
    </motion.div>
);

const GallerySection = () => {
    return (
        <div className="py-24 bg-black">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-bold text-white mb-4"
                    >
                        Start Your <span className="text-neon-green">Action</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-gray-400 max-w-2xl mx-auto"
                    >
                        State-of-the-art courts and premium equipment waiting for you.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 h-auto md:h-[600px]">
                    {/* Large Item */}
                    <GalleryImage
                        src={gallerySmash}
                        alt="Pro Level Action"
                        className="md:col-span-2 md:row-span-2 h-96 md:h-full"
                        delay={0}
                    />
                    {/* Stacked Items */}
                    <div className="flex flex-col gap-6 h-full">
                        <GalleryImage
                            src={galleryEquipment}
                            alt="Premium Gear"
                            className="flex-1 h-64 md:h-auto"
                            delay={0.2}
                        />
                        <GalleryImage
                            src={heroBg}
                            alt="International Standards"
                            className="flex-1 h-64 md:h-auto"
                            delay={0.4}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GallerySection;
