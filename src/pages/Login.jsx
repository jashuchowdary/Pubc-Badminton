import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { User, ShieldCheck, ArrowRight, Lock, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import loginBg from '../assets/login-bg.png';

const LoginPage = () => {
    const [role, setRole] = useState('client');
    const [isSignUp, setIsSignUp] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(null);
    const [successMsg, setSuccessMsg] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();
    const { signIn } = useAuth(); // Use real auth hook

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccessMsg(null);
        setIsLoading(true);

        try {
            if (isSignUp) {
                const { data, error } = await api.auth.signUp({ email, password });
                if (error) throw error;

                // If auto-confirm is not on, Supabase returns a user but session might be null depending on config
                // For this demo, let's assume if no error, we are good or need to check email.
                setSuccessMsg("Account created! Please sign in.");
                setIsSignUp(false);
            } else {
                const { error } = await api.auth.signIn({ email, password });
                if (error) throw error;

                if (role === 'admin') {
                    navigate('/admin');
                } else {
                    navigate('/client');
                }
            }

        } catch (err) {
            setError(err.message || 'Authentication failed');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-neutral-900">
            {/* Background */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-black/50 z-10"></div>
                <img src={loginBg} alt="Background" className="w-full h-full object-cover opacity-60" />
            </div>

            {/* Login Card */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="relative z-20 w-full max-w-md mx-4"
            >
                <div className="bg-neutral-800/80 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">

                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">
                            {isSignUp ? 'Create Account' : 'Welcome Back'}
                        </h2>
                        <p className="text-gray-400 text-sm">
                            {isSignUp ? 'Join PUBC today' : 'Sign in to access PUBC Portal'}
                        </p>
                    </div>

                    {/* Messages */}
                    <AnimatePresence>
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                                className="bg-red-500/10 border border-red-500/20 text-red-500 p-3 rounded-lg mb-6 flex items-center gap-2 text-sm"
                            >
                                <AlertCircle size={16} /> {error}
                            </motion.div>
                        )}
                        {successMsg && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                                className="bg-green-500/10 border border-green-500/20 text-green-500 p-3 rounded-lg mb-6 flex items-center gap-2 text-sm"
                            >
                                <ShieldCheck size={16} /> {successMsg}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Role Toggle (Only show on Login for simplicity or keep for both) */}
                    {!isSignUp && (
                        <div className="flex bg-black/40 p-1 rounded-xl mb-8 relative">
                            <div className="absolute inset-y-1 w-1/2 bg-neon-green/90 rounded-lg shadow-lg transition-all duration-300 ease-in-out"
                                style={{ left: role === 'client' ? '4px' : '50%' }} />

                            <button
                                onClick={() => setRole('client')}
                                className={`flex-1 flex items-center justify-center gap-2 py-2.5 relative z-10 text-sm font-semibold transition-colors duration-300 ${role === 'client' ? 'text-black' : 'text-gray-400 hover:text-white'}`}
                            >
                                <User size={18} /> Client
                            </button>
                            <button
                                onClick={() => setRole('admin')}
                                className={`flex-1 flex items-center justify-center gap-2 py-2.5 relative z-10 text-sm font-semibold transition-colors duration-300 ${role === 'admin' ? 'text-black' : 'text-gray-400 hover:text-white'}`}
                            >
                                <ShieldCheck size={18} /> Admin
                            </button>
                        </div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="space-y-1">
                            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider ml-1">Email Address</label>
                            <div className="relative group">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-neon-green/50 focus:ring-1 focus:ring-neon-green/50 transition-all"
                                    placeholder="name@example.com"
                                />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider ml-1">Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-neon-green/50 focus:ring-1 focus:ring-neon-green/50 transition-all pr-12"
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        {!isSignUp && (
                            <div className="flex items-center justify-between text-xs">
                                <label className="flex items-center gap-2 cursor-pointer text-gray-400 hover:text-white">
                                    <input type="checkbox" className="rounded border-gray-700 bg-gray-800 text-neon-green focus:ring-neon-green/50" />
                                    <span>Remember me</span>
                                </label>
                                <a href="#" className="text-neon-green hover:underline">Forgot password?</a>
                            </div>
                        )}

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            disabled={isLoading}
                            className={`w-full bg-neon-green text-black font-bold py-3.5 rounded-xl shadow-[0_0_20px_rgba(57,255,20,0.3)] hover:shadow-[0_0_30px_rgba(57,255,20,0.5)] transition-all flex items-center justify-center gap-2 group ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                            {isLoading ? (
                                <span className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></span>
                            ) : (
                                <>
                                    <span>{isSignUp ? 'Create Account' : `Sign In as ${role === 'admin' ? 'Administrator' : 'Client'}`}</span>
                                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </motion.button>
                    </form>

                </div>

                <p className="text-center text-gray-500 text-sm mt-6">
                    {isSignUp ? 'Already a member?' : 'Not a member?'}
                    <button onClick={() => setIsSignUp(!isSignUp)} className="ml-1 text-electric-blue hover:text-white transition-colors underline bg-transparent border-0 cursor-pointer">
                        {isSignUp ? 'Sign In' : 'Apply for Membership'}
                    </button>
                </p>

            </motion.div>
        </div>
    );
};

export default LoginPage;
