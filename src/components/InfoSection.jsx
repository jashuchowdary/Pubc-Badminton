import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Star, MapPin, Trophy } from 'lucide-react';

const InfoCard = ({ icon: Icon, title, content, delay }) => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay }}
        className="bg-neutral-800/50 backdrop-blur-sm p-8 rounded-2xl border border-white/5 hover:border-neon-green/30 transition-all duration-300 hover:shadow-[0_0_20px_rgba(57,255,20,0.1)] group"
    >
        <div className="w-12 h-12 bg-neutral-700 rounded-full flex items-center justify-center mb-6 group-hover:bg-neon-green group-hover:text-black transition-colors duration-300 transform group-hover:scale-110">
            <Icon className="w-6 h-6" />
        </div>
        <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
        <div className="text-gray-400 leading-relaxed font-light">{content}</div>
    </motion.div>
);

const InfoSection = () => {
    return (
        <div className="py-24 bg-neutral-900 relative">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-bold text-white mb-4"
                    >
                        Why Choose <span className="text-electric-blue">PUBC?</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-gray-400 max-w-2xl mx-auto"
                    >
                        Experience the best badminton facilities designed for both casual players and professionals.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <InfoCard
                        icon={Clock}
                        title="Flexible Hours"
                        content={
                            <div>
                                <p>Open Daily</p>
                                <p className="text-white font-semibold">5:00 AM - 11:00 PM</p>
                                <p className="text-sm mt-2 text-gray-500">Perfect for Early Birds & Night Owls</p>
                            </div>
                        }
                        delay={0}
                    />
                    <InfoCard
                        icon={Star}
                        title="Top Rated"
                        content={
                            <div>
                                <div className="flex items-center gap-1 text-yellow-400 mb-2">
                                    <Star className="fill-current w-5 h-5" />
                                    <Star className="fill-current w-5 h-5" />
                                    <Star className="fill-current w-5 h-5" />
                                    <Star className="fill-current w-5 h-5" />
                                    <div className="relative">
                                        <Star className="w-5 h-5 text-neutral-600" />
                                        <div className="absolute top-0 left-0 w-1/2 overflow-hidden">
                                            <Star className="fill-current w-5 h-5" />
                                        </div>
                                    </div>
                                    <span className="ml-2 text-white font-bold text-lg">4.5</span>
                                </div>
                                <p>Premium experience rated by our community.</p>
                            </div>
                        }
                        delay={0.2}
                    />
                    <InfoCard
                        icon={MapPin}
                        title="Prime Location"
                        content={
                            <div>
                                <p>Conveniently located with ample parking.</p>
                                <a href="#location" className="text-neon-green hover:underline mt-2 inline-block">Get Directions &rarr;</a>
                            </div>
                        }
                        delay={0.4}
                    />
                </div>
            </div>
        </div>
    );
};

export default InfoSection;
