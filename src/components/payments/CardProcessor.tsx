'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Icons } from '@/components/ui/icons';

interface CardProcessorProps {
  amount: number;
  onPayment: (data: any) => void;
  loading?: boolean;
}

export function CardProcessor({
  amount,
  onPayment,
  loading,
}: CardProcessorProps) {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardholderName, setCardholderName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onPayment({
      amount,
      cardNumber,
      expiryDate,
      cvv,
      cardholderName,
    });
  };

  // Format card number as XXXX XXXX XXXX XXXX
  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  // Format expiry date as MM/YY
  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  return (
    <div className="bg-card rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-foreground mb-4">
        Card Payment
      </h2>

      <div className="space-y-4">
        <div className="bg-muted rounded-lg p-4 text-center">
          <p className="text-lg font-semibold">
            Total Amount: K{amount.toLocaleString()}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="cardNumber">Card Number</Label>
            <Input
              id="cardNumber"
              value={cardNumber}
              onChange={e => setCardNumber(formatCardNumber(e.target.value))}
              placeholder="1234 5678 9012 3456"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="expiryDate">Expiry Date</Label>
              <Input
                id="expiryDate"
                value={expiryDate}
                onChange={e => setExpiryDate(formatExpiryDate(e.target.value))}
                placeholder="MM/YY"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="cvv">CVV</Label>
              <Input
                id="cvv"
                type="password"
                value={cvv}
                onChange={e => setCvv(e.target.value.replace(/\D/g, ''))}
                placeholder="123"
                maxLength={4}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="cardholderName">Cardholder Name</Label>
            <Input
              id="cardholderName"
              value={cardholderName}
              onChange={e => setCardholderName(e.target.value)}
              placeholder="John Doe"
              required
            />
          </div>

          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Icons.lock className="w-4 h-4" />
            <span>Your payment details are securely encrypted</span>
          </div>

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? (
              <span className="flex items-center">
                <Icons.spinner className="w-4 h-4 mr-2 animate-spin" />
                Processing Payment...
              </span>
            ) : (
              'Pay Now'
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
