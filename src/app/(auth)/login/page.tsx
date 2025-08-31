'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { AuthForm } from '@/components/auth/AuthForm';
import { OTPModal } from '@/components/auth/OTPModal';
import { TwoFactorModal } from '@/components/auth/TwoFactorModal';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/ui/icons';
import { AuthService } from '@/services/authService';

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [showOTPModal, setShowOTPModal] = useState(false);
  const [showTwoFactorModal, setShowTwoFactorModal] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (data: any) => {
    setIsLoading(true);
    setAuthError(null);

    try {
      const response = await AuthService.login(data.email, data.password);

      if (response.success) {
        // Check if 2FA is required
        if (Math.random() > 0.7) {
          // Simulate 2FA requirement
          setShowTwoFactorModal(true);
        } else {
          // Redirect to appropriate dashboard
          router.push(`/${data.role}`);
        }
      } else {
        setAuthError(response.error || 'Failed to login');
      }
    } catch (error: any) {
      setAuthError(error.message || 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOTPVerify = async () => {
    // Simulate OTP verification
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setShowOTPModal(false);
    setIsLoading(false);
    // Redirect to dashboard
    router.push('/tenant');
  };

  const handleTwoFactorVerify = async () => {
    // Simulate 2FA verification
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setShowTwoFactorModal(false);
    setIsLoading(false);
    // Redirect to dashboard
    router.push('/landlord');
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      const response = await AuthService.signInWithGoogle();

      if (response.success) {
        router.push('/tenant');
      } else {
        setAuthError(response.error || 'Failed to login with Google');
      }
    } catch (error: any) {
      setAuthError(error.message || 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    router.push('/reset-password');
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground">RentZambia</h1>
          <p className="text-muted-foreground mt-2">
            Find your perfect rental property
          </p>
        </div>

        <div className="bg-card rounded-lg shadow-md p-6">
          <div className="space-y-4">
            {authError && (
              <div className="bg-destructive/10 text-destructive p-3 rounded-md text-sm">
                {authError}
              </div>
            )}

            <AuthForm
              type="login"
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
              onClick={handleGoogleLogin}
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
              <button
                onClick={handleForgotPassword}
                className="text-primary hover:underline"
                disabled={isLoading}
              >
                Forgot password?
              </button>
            </div>

            <div className="text-center text-sm">
              <Link href="/register" className="text-primary hover:underline">
                Don&apos;t have an account? Sign up
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

      <TwoFactorModal
        isOpen={showTwoFactorModal}
        onClose={() => setShowTwoFactorModal(false)}
        onVerify={handleTwoFactorVerify}
        loading={isLoading}
      />
    </div>
  );
}
