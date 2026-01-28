import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, User, LogOut, MapPin, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

import { api } from '../services/api';

const ClientDashboard = () => {
    const navigate = useNavigate();
    const { user, signOut } = useAuth();
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        const fetchBookings = async () => {
            if (user) {
                const { data } = await api.bookings.getUserBookings(user.id);
                if (data) setBookings(data);
            }
        };
        fetchBookings();
    }, [user]);

    const handleLogout = async () => {
        await signOut();
        navigate('/');
    };

    return (
        <div className="min-h-screen bg-neutral-900 text-white selection:bg-neon-green selection:text-black font-sans pb-20">
            {/* Header */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
                <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                    <span className="text-xl font-bold tracking-tighter">
                        PUBC <span className="text-neon-green font-normal">Member</span>
                    </span>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-neutral-800 rounded-full flex items-center justify-center border border-white/20">
                                <User size={16} />
                            </div>
                            <span className="text-sm font-medium hidden md:block">{user?.email || 'Guest User'}</span>
                        </div>
                        <button onClick={handleLogout} className="text-red-400 hover:text-red-300">
                            <LogOut size={20} />
                        </button>
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-6 pt-24">
                {/* Welcome & Quick Action */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                        <h1 className="text-3xl md:text-5xl font-bold mb-2">Ready to Play?</h1>
                        <p className="text-gray-400">You have {bookings.length} upcoming bookings this week.</p>
                    </motion.div>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={async () => {
                            const newBooking = {
                                court_name: `Court ${Math.floor(Math.random() * 4) + 1}`,
                                type: 'Singles',
                                start_time: new Date().toISOString(),
                                price: 25,
                                status: 'confirmed'
                            };
                            const { data } = await api.bookings.create(newBooking);
                            if (data) setBookings([...bookings, data]);
                        }}
                        className="bg-neon-green text-black font-bold px-8 py-4 rounded-full flex items-center gap-2 shadow-[0_0_20px_rgba(57,255,20,0.4)]"
                    >
                        <Plus size={20} />
                        New Booking
                    </motion.button>
                </div>

                {/* Upcoming Bookings */}
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <Calendar className="text-neon-green" /> Upcoming Sessions
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                    {bookings.length > 0 ? (
                        bookings.map((booking, index) => (
                            <motion.div
                                key={booking.id}
                                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * index }}
                                className="bg-neutral-800 border border-white/5 p-6 rounded-2xl flex justify-between items-center group hover:border-neon-green/30 transition-all"
                            >
                                <div>
                                    <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">
                                        {new Date(booking.start_time).toLocaleDateString()}
                                    </p>
                                    <h3 className="text-2xl font-bold text-white mb-2">{booking.court_name} - {booking.type}</h3>
                                    <div className="flex items-center gap-4 text-sm text-gray-300">
                                        <span className="flex items-center gap-1">
                                            <Clock size={14} />
                                            {new Date(booking.start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </span>
                                        <span className="flex items-center gap-1"><MapPin size={14} /> Arena A</span>
                                    </div>
                                </div>
                                <div className="h-12 w-12 bg-white/5 rounded-full flex items-center justify-center border border-white/10 group-hover:bg-neon-green group-hover:text-black transition-colors">
                                    <Calendar size={20} />
                                </div>
                            </motion.div>
                        ))
                    ) : (
                        <p className="text-gray-400">No upcoming bookings found.</p>
                    )}
                </div>

                {/* History / Stats */}
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <Clock className="text-electric-blue" /> Recent History
                </h2>
                <div className="bg-neutral-800 rounded-2xl border border-white/5 overflow-hidden">
                    {[1, 2, 3].map((item, index) => (
                        <div key={index} className="px-6 py-4 border-b border-white/5 last:border-0 flex items-center justify-between hover:bg-white/5 transition-colors">
                            <div>
                                <p className="font-semibold text-white">Badminton Practice</p>
                                <p className="text-xs text-gray-500">Jan {20 - index}, 2026</p>
                            </div>
                            <span className="text-sm text-gray-400">Completed</span>
                        </div>
                    ))}
                </div>

            </main>
        </div>
    );
};

export default ClientDashboard;
