'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore, UserRole } from '@/store/authStore';
import { Role } from '@/types';

interface AuthContextType {
    login: (email: string, password: string, role: Role) => Promise<void>;
    logout: () => void;
    user: any;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const router = useRouter();
    const { login: storeLogin, logout: storeLogout, user } = useAuthStore();
    const [loading, setLoading] = React.useState(false);

    const login = async (email: string, password: string, role: Role) => {
        setLoading(true);
        try {
            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Map uppercase Role to lowercase UserRole
            // default to 'client' if mapping fails or strictly map
            const userRole = role.toLowerCase() as UserRole;

            const mockUser = {
                id: Math.random().toString(36).substr(2, 9),
                email,
                name: email.split('@')[0],
                role: userRole,
            };

            storeLogin(mockUser, 'mock-jwt-token');
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        storeLogout();
        router.push('/login');
    };

    return (
        <AuthContext.Provider value={{ login, logout, user, loading }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
