import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { LayoutDashboard, Users, Calendar, Settings, DollarSign, Activity, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';

const StatCard = ({ icon: Icon, title, value, change, delay }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay }}
        className="bg-neutral-800 border border-white/5 p-6 rounded-2xl hover:border-neon-green/30 transition-colors"
    >
        <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-neutral-900 rounded-xl text-neon-green">
                <Icon size={24} />
            </div>
            <span className={`text-sm font-medium ${change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {change > 0 ? '+' : ''}{change}%
            </span>
        </div>
        <h3 className="text-3xl font-bold text-white mb-1">{value}</h3>
        <p className="text-gray-400 text-sm">{title}</p>
    </motion.div>
);

const AdminDashboard = () => {

    const navigate = useNavigate();
    const { signOut } = useAuth();

    // State for stats
    const [stats, setStats] = useState({
        activeBookings: 0,
        totalMembers: 0,
        revenue: 0,
        utilization: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadDashboardData = async () => {
            try {
                const { data, error } = await api.dashboard.getStats();
                const { data: recentBookings } = await api.dashboard.getRecentBookings();

                if (data) {
                    setStats({ ...data, recentBookings: recentBookings || [] });
                }
            } catch (error) {
                console.error("Failed to load dashboard stats", error);
            } finally {
                setLoading(false);
            }
        };

        loadDashboardData();
    }, []);

    const handleLogout = async () => {
        await api.auth.signOut();
        navigate('/');
    };

    return (
        <div className="min-h-screen bg-neutral-900 flex text-white font-sans">
            {/* Sidebar */}
            <div className="w-64 bg-black border-r border-white/10 hidden md:flex flex-col p-6">
                <div className="flex items-center gap-2 mb-10">
                    <span className="text-2xl font-bold tracking-tighter text-white">PUBC <span className="text-neon-green text-sm align-top">Admin</span></span>
                </div>

                <nav className="flex-1 space-y-2">
                    {[
                        { icon: LayoutDashboard, label: 'Overview', active: true },
                        { icon: Calendar, label: 'Bookings' },
                        { icon: Users, label: 'Members' },
                        { icon: DollarSign, label: 'Revenue' },
                        { icon: Settings, label: 'Settings' },
                    ].map((item) => (
                        <button
                            key={item.label}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${item.active ? 'bg-neon-green text-black font-semibold' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
                        >
                            <item.icon size={20} />
                            {item.label}
                        </button>
                    ))}
                </nav>

                <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-white/5 rounded-xl transition-colors mt-auto"
                >
                    <LogOut size={20} />
                    Logout
                </button>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-8 overflow-y-auto">
                <header className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-2xl font-bold">Dashboard Overview</h1>
                        <p className="text-gray-400">Welcome back, Admin</p>
                    </div>
                    <div className="w-10 h-10 bg-neutral-800 rounded-full border border-white/10 flex items-center justify-center">
                        <Users size={20} className="text-gray-400" />
                    </div>
                </header>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <StatCard icon={Activity} title="Active Bookings" value={stats.activeBookings} change={12} delay={0.1} />
                    <StatCard icon={Users} title="Total Members" value={stats.totalMembers.toLocaleString()} change={5} delay={0.2} />
                    <StatCard icon={DollarSign} title="Daily Revenue" value={`$${stats.revenue}`} change={8} delay={0.3} />
                    <StatCard icon={Calendar} title="Court Utilization" value={`${stats.utilization}%`} change={-2} delay={0.4} />
                </div>

                {/* Recent Activity Section */}
                <div className="bg-neutral-800 border border-white/5 rounded-2xl p-6">
                    <h2 className="text-lg font-bold mb-6">Recent Bookings</h2>
                    <div className="space-y-4">
                        {stats.recentBookings && stats.recentBookings.length > 0 ? (
                            stats.recentBookings.map((booking) => (
                                <div key={booking.id} className="flex items-center justify-between p-4 bg-black/20 rounded-xl hover:bg-black/40 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-neon-green to-blue-500 flex items-center justify-center text-black font-bold text-sm">
                                            User
                                        </div>
                                        <div>
                                            <p className="font-semibold text-white">{booking.court_name}</p>
                                            <p className="text-xs text-gray-500">
                                                {new Date(booking.start_time).toLocaleDateString()} • {booking.type}
                                            </p>
                                        </div>
                                    </div>
                                    <span className={`px-3 py-1 text-xs rounded-full font-medium border ${booking.status === 'confirmed' ? 'bg-green-500/10 text-green-500 border-green-500/20' : 'bg-gray-500/10 text-gray-500 border-gray-500/20'
                                        }`}>
                                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                                    </span>
                                </div>
                            ))
                        ) : (
                            <div className="text-gray-500 text-center py-4">No recent bookings</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
