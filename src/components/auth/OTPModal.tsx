"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface OTPModalProps {
  isOpen: boolean;
  onClose: () => void;
  onVerify: (otp: string) => void;
  loading?: boolean;
}

export function OTPModal({ isOpen, onClose, onVerify, loading }: OTPModalProps) {
  const [otp, setOtp] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onVerify(otp);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Verify Your Phone Number</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <p className="text-muted-foreground">
            We've sent a 6-digit code to your phone number. Please enter it below to verify your account.
          </p>
          <div className="flex space-x-2">
            {[...Array(6)].map((_, i) => (
              <Input
                key={i}
                type="text"
                maxLength={1}
                className="w-12 h-12 text-center text-2xl"
                value={otp[i] || ''}
                onChange={(e) => {
                  const newOtp = otp.split('');
                  newOtp[i] = e.target.value;
                  setOtp(newOtp.join(''));
                  
                  // Auto focus next input
                  if (e.target.value && i < 5) {
                    const nextInput = document.getElementById(`otp-${i + 1}`);
                    if (nextInput) nextInput.focus();
                  }
                }}
                id={`otp-${i}`}
              />
            ))}
          </div>
          <div className="flex justify-between">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={otp.length !== 6 || loading}>
              {loading ? "Verifying..." : "Verify"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}