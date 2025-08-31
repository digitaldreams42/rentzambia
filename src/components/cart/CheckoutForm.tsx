"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Icons } from "@/components/ui/icons";
import { MobileMoneyProcessor } from "@/components/payments/MobileMoneyProcessor";
import { CardProcessor } from "@/components/payments/CardProcessor";

interface CheckoutFormProps {
  amount: number;
  onPayment: (data: any) => void;
  loading?: boolean;
}

export function CheckoutForm({ amount, onPayment, loading }: CheckoutFormProps) {
  const [paymentMethod, setPaymentMethod] = useState("mobile-money");
  const [billingInfo, setBillingInfo] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: ""
  });

  const handleBillingInfoChange = (field: string, value: string) => {
    setBillingInfo(prev => ({ ...prev, [field]: value }));
  };

  const handlePayment = (data: any) => {
    onPayment({
      ...data,
      billingInfo,
      paymentMethod
    });
  };

  return (
    <div className="space-y-6">
      <div className="bg-card rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-foreground mb-4">Billing Information</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              value={billingInfo.fullName}
              onChange={(e) => handleBillingInfoChange("fullName", e.target.value)}
              placeholder="John Doe"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={billingInfo.email}
              onChange={(e) => handleBillingInfoChange("email", e.target.value)}
              placeholder="john@example.com"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              value={billingInfo.phone}
              onChange={(e) => handleBillingInfoChange("phone", e.target.value)}
              placeholder="+260 XXX XXX XXX"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              value={billingInfo.address}
              onChange={(e) => handleBillingInfoChange("address", e.target.value)}
              placeholder="123 Main St, Lusaka"
              required
            />
          </div>
        </div>
      </div>
      
      <div className="bg-card rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-foreground mb-4">Payment Method</h2>
        
        <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-4">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="mobile-money" id="mobile-money" />
            <Label htmlFor="mobile-money" className="flex items-center">
              <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
              Mobile Money (MTN, Airtel, Zamtel)
            </Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="card" id="card" />
            <Label htmlFor="card" className="flex items-center">
              <Icons.creditCard className="w-4 h-4 mr-2" />
              Credit/Debit Card
            </Label>
          </div>
        </RadioGroup>
        
        <div className="mt-6">
          {paymentMethod === "mobile-money" ? (
            <MobileMoneyProcessor 
              amount={amount} 
              onPayment={handlePayment} 
              loading={loading} 
            />
          ) : (
            <CardProcessor 
              amount={amount} 
              onPayment={handlePayment} 
              loading={loading} 
            />
          )}
        </div>
      </div>
    </div>
  );
}