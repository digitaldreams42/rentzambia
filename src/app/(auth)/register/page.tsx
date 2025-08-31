"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AuthForm } from "@/components/auth/AuthForm";
import { OTPModal } from "@/components/auth/OTPModal";
import { AuthService } from "@/services/authService";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [showOTPModal, setShowOTPModal] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (data: any) => {
    setIsLoading(true);
    setAuthError(null);
    
    try {
      // Validate passwords match
      if (data.type === "register" && data.password !== data.confirmPassword) {
        setAuthError("Passwords do not match");
        setIsLoading(false);
        return;
      }
      
      const response = await AuthService.register(
        data.email, 
        data.password, 
        data.fullName, 
        data.role
      );
      
      if (response.success) {
        // For landlords and agents, require phone verification
        if (data.role === "landlord" || data.role === "agent") {
          setShowOTPModal(true);
        } else {
          // Redirect to dashboard
          router.push(`/${data.role}`);
        }
      } else {
        setAuthError(response.error || "Failed to create account");
      }
    } catch (error: any) {
      setAuthError(error.message || "An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOTPVerify = async (otp: string) => {
    // Simulate OTP verification
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setShowOTPModal(false);
    setIsLoading(false);
    // Redirect to dashboard
    router.push("/landlord");
  };

  const handleGoogleRegister = async () => {
    setIsLoading(true);
    try {
      const response = await AuthService.signInWithGoogle();
      
      if (response.success) {
        router.push("/tenant");
      } else {
        setAuthError(response.error || "Failed to register with Google");
      }
    } catch (error: any) {
      setAuthError(error.message || "An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground">RentZambia</h1>
          <p className="text-muted-foreground mt-2">Create your account</p>
        </div>

        <div className="bg-card rounded-lg shadow-md p-6">
          <div className="space-y-4">
            {authError && (
              <div className="bg-destructive/10 text-destructive p-3 rounded-md text-sm">
                {authError}
              </div>
            )}
            
            <AuthForm 
              type="register" 
              onSubmit={handleSubmit} 
              isLoading={isLoading} 
            />

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>

            <Button
              variant="outline"
              type="button"
              disabled={isLoading}
              onClick={handleGoogleRegister}
              className="w-full"
            >
              {isLoading ? (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Icons.google className="mr-2 h-4 w-4" />
              )}
              Google
            </Button>

            <div className="text-center text-sm">
              <Link href="/login" className="text-primary hover:underline">
                Already have an account? Sign in
              </Link>
            </div>
          </div>
        </div>
      </div>

      <OTPModal
        isOpen={showOTPModal}
        onClose={() => setShowOTPModal(false)}
        onVerify={handleOTPVerify}
        loading={isLoading}
      />
    </div>
  );
}