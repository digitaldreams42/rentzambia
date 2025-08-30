"use client";

import * as React from "react";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: "tenant" | "landlord" | "agent" | "admin";
}

export function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
  const { user } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    // Check if user is authenticated
    if (!user) {
      // Redirect to login if not authenticated
      router.push("/login");
      return;
    }

    // Check if user has required role
    if (requiredRole && user.role !== requiredRole) {
      // Redirect to appropriate dashboard
      router.push(`/${user.role}`);
      return;
    }

    setIsLoading(false);
  }, [user, requiredRole, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return <>{children}</>;
}