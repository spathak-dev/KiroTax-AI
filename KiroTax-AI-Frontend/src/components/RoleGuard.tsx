'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';
import { Role } from '@/types';

interface RoleGuardProps {
    children: React.ReactNode;
    allowedRoles: Role[];
}

export default function RoleGuard({ children, allowedRoles }: RoleGuardProps) {
    const { user } = useAuth();
    const router = useRouter();
    const [authorized, setAuthorized] = useState(false);

    useEffect(() => {
        const isAuthenticated = !!user;
        if (!isAuthenticated) {
            router.push('/login');
        } else if (user && !allowedRoles.includes(user.role)) {
            router.push('/unauthorized'); // Or dashboard home
        } else {
            setAuthorized(true);
        }
    }, [user, allowedRoles, router]);

    if (!authorized) {
        return null; // Or a loading spinner
    }

    return <>{children}</>;
}
