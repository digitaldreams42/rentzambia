"use client";

import { useState } from "react";
import Link from "next/link";
import { AuthForm } from "@/components/auth/AuthForm";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (data: any) => {
    setIsLoading(true);
    // Simulate login
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
    console.log("Login attempt with:", data);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground">RentZambia</h1>
          <p className="text-muted-foreground mt-2">Find your perfect rental property</p>
        </div>

        <div className="bg-card rounded-lg shadow-md p-6">
          <div className="space-y-4">
            <AuthForm 
              type="login" 
              onSubmit={handleSubmit} 
              isLoading={isLoading} 
            />

            <div className="text-center text-sm">
              <Link href="/register" className="text-primary hover:underline">
                Don&apos;t have an account? Sign up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}