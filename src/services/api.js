import { supabase } from '../lib/supabaseClient';

// Helper to check if we are in "Real Mode"
const isSupabaseConfigured = () => {
    return import.meta.env.VITE_SUPABASE_URL &&
        import.meta.env.VITE_SUPABASE_URL !== 'https://placeholder.supabase.co';
};

// --- MOCK DATA ---
const MOCK_DELAY = 800;

const mockStats = {
    activeBookings: 24,
    totalMembers: 1204,
    revenue: 4250,
    utilization: 86
};

const mockBookings = [
    { id: 1, court_name: 'Court 1', type: 'Doubles', start_time: new Date(Date.now() + 86400000).toISOString(), price: 40, status: 'confirmed' },
    { id: 2, court_name: 'Court 3', type: 'Singles', start_time: new Date(Date.now() + 172800000).toISOString(), price: 25, status: 'confirmed' }
];

const mockUser = {
    id: 'mock-user-123',
    email: 'demo@pubc.com',
    role: 'client'
};

// --- API SERVICE ---

export const api = {
    auth: {
        signIn: async ({ email, password }) => {
            if (isSupabaseConfigured()) {
                return await supabase.auth.signInWithPassword({ email, password });
            }

            // MOCK LOGIN
            return new Promise((resolve) => {
                setTimeout(() => {
                    console.log("Creating mock session for:", email);
                    // Return a fake session object structure similar to Supabase
                    resolve({
                        data: {
                            user: { ...mockUser, email },
                            session: { access_token: 'mock-token', user: { ...mockUser, email } }
                        },
                        error: null
                    });
                }, MOCK_DELAY);
            });
        },

        signUp: async ({ email, password }) => {
            if (isSupabaseConfigured()) {
                const { data, error } = await supabase.auth.signUp({
                    email,
                    password,
                });
                return { data, error };
            }

            // MOCK SIGN UP
            return new Promise((resolve) => {
                setTimeout(() => {
                    console.log("Mock Sign Up for:", email);
                    resolve({
                        data: {
                            user: { ...mockUser, email },
                            session: { access_token: 'mock-token', user: { ...mockUser, email } }
                        },
                        error: null
                    });
                }, MOCK_DELAY);
            });
        },

        signOut: async () => {
            if (isSupabaseConfigured()) {
                return await supabase.auth.signOut();
            }
            return Promise.resolve({ error: null });
        },

        getUser: async () => {
            if (isSupabaseConfigured()) {
                const { data } = await supabase.auth.getUser();
                return data?.user;
            }
            return mockUser; // Return default mock user for dev
        }
    },

    dashboard: {
        getStats: async () => {
            if (isSupabaseConfigured()) {
                // Real DB queries would go here
                // For now, returning mock even in "Real" mode until tables are guaranteed
                return { data: mockStats, error: null };
            }

            return new Promise(resolve => {
                setTimeout(() => resolve({ data: mockStats, error: null }), MOCK_DELAY);
            });
        },

        getRecentBookings: async () => {
            // Return mock bookings
            return new Promise(resolve => {
                setTimeout(() => resolve({ data: mockBookings, error: null }), MOCK_DELAY);
            });
        }
    },

    bookings: {
        getUserBookings: async (userId) => {
            if (isSupabaseConfigured()) {
                return await supabase.from('bookings').select('*, courts(*)').eq('user_id', userId);
            }

            return new Promise(resolve => {
                setTimeout(() => resolve({ data: mockBookings, error: null }), MOCK_DELAY);
            });
        },

        create: async (bookingData) => {
            if (isSupabaseConfigured()) {
                return await supabase.from('bookings').insert([bookingData]);
            }

            console.log("Mock Booking Created:", bookingData);
            return new Promise(resolve => {
                setTimeout(() => resolve({ data: { ...bookingData, id: Math.random() }, error: null }), MOCK_DELAY);
            });
        }
    }
};
