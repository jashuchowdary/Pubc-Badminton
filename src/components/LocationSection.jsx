import React from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';

const LocationSection = () => {
    return (
        <div className="py-24 bg-neutral-800 relative overflow-hidden">
            <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">

                {/* Contact Info */}
                <div>
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-8">
                        Find <span className="text-electric-blue">Us</span>
                    </h2>
                    <div className="space-y-6">
                        <div className="flex items-start gap-4 text-gray-300">
                            <MapPin className="w-6 h-6 text-neon-green shrink-0 mt-1" />
                            <div>
                                <p className="text-xl font-semibold text-white mb-1">Players United Badminton Courts</p>
                                <p>123 Smash Avenue</p>
                                <p>Sports District, SD 45001</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 text-gray-300">
                            <Phone className="w-6 h-6 text-neon-green shrink-0" />
                            <p>+1 (555) 123-4567</p>
                        </div>
                        <div className="flex items-center gap-4 text-gray-300">
                            <Mail className="w-6 h-6 text-neon-green shrink-0" />
                            <p>contact@pubc-club.com</p>
                        </div>
                    </div>
                </div>

                {/* Map Placeholder */}
                <div className="h-80 bg-neutral-900 rounded-2xl border border-white/10 flex items-center justify-center relative group overflow-hidden">
                    {/* Styled Map Background (Representation) */}
                    <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#39FF14_1px,transparent_1px)] [background-size:16px_16px]"></div>

                    <div className="z-10 text-center">
                        <MapPin className="w-12 h-12 text-neon-green mx-auto mb-2 animate-bounce" />
                        <p className="text-gray-400">Map Integration Loading...</p>
                        <a
                            href="https://maps.google.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-4 inline-block px-6 py-2 bg-white/10 hover:bg-white/20 rounded-full text-white text-sm transition-colors"
                        >
                            Open in Google Maps
                        </a>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default LocationSection;
