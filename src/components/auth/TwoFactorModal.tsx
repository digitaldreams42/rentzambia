"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

interface TwoFactorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onVerify: (code: string) => void;
  loading?: boolean;
  method?: 'sms' | 'authenticator';
}

export function TwoFactorModal({ isOpen, onClose, onVerify, loading, method = 'sms' }: TwoFactorModalProps) {
  const [code, setCode] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onVerify(code);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Two-Factor Authentication</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <p className="text-muted-foreground">
            {method === 'sms' 
              ? "Enter the 6-digit code we sent to your phone number." 
              : "Enter the 6-digit code from your authenticator app."}
          </p>
          <div className="space-y-2">
            <Label htmlFor="code">Authentication Code</Label>
            <Input
              id="code"
              type="text"
              maxLength={6}
              className="text-center text-2xl tracking-widest"
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
              placeholder="000000"
            />
          </div>
          <div className="flex justify-between">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={code.length !== 6 || loading}>
              {loading ? "Verifying..." : "Verify"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}