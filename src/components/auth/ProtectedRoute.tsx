'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Icons } from '@/components/ui/icons';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: string[];
}

export function ProtectedRoute({
  children,
  allowedRoles,
}: ProtectedRouteProps) {
  const { currentUser, userData, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !currentUser) {
      // Redirect to login if not authenticated
      router.push('/login');
    } else if (
      !loading &&
      currentUser &&
      userData &&
      !allowedRoles.includes(userData.role)
    ) {
      // Redirect to appropriate dashboard if role is not allowed
      router.push(`/${userData.role}`);
    }
  }, [currentUser, userData, loading, router, allowedRoles]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Icons.spinner className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!currentUser || (userData && !allowedRoles.includes(userData.role))) {
    return null;
  }

  return <>{children}</>;
}
