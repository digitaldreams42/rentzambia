"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Icons } from "@/components/ui/icons";

interface MobileMoneyProcessorProps {
  amount: number;
  onPayment: (data: any) => void;
  loading?: boolean;
}

export function MobileMoneyProcessor({ amount, onPayment, loading }: MobileMoneyProcessorProps) {
  const [mobileNumber, setMobileNumber] = useState("");
  const [network, setNetwork] = useState("mtn");
  const [transactionId, setTransactionId] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onPayment({
      amount,
      mobileNumber,
      network,
      transactionId
    });
  };

  return (
    <div className="bg-card rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-foreground mb-4">Mobile Money Payment</h2>
      
      <div className="space-y-4">
        <div className="bg-muted rounded-lg p-4 text-center">
          <p className="text-lg font-semibold">Total Amount: K{amount.toLocaleString()}</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="network">Network</Label>
            <Select value={network} onValueChange={setNetwork}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mtn">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                    MTN Money
                  </div>
                </SelectItem>
                <SelectItem value="airtel">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                    Airtel Money
                  </div>
                </SelectItem>
                <SelectItem value="zamtel">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                    Zamtel Money
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="mobileNumber">Mobile Number</Label>
            <Input
              id="mobileNumber"
              type="tel"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              placeholder="+260 XXX XXX XXX"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="transactionId">Transaction ID (Optional)</Label>
            <Input
              id="transactionId"
              value={transactionId}
              onChange={(e) => setTransactionId(e.target.value)}
              placeholder="Enter transaction reference if available"
            />
          </div>
          
          <div className="bg-info/10 rounded-lg p-4">
            <h3 className="font-medium text-info flex items-center">
              <Icons.info className="w-4 h-4 mr-2" />
              Payment Instructions
            </h3>
            <ol className="list-decimal list-inside text-sm mt-2 space-y-1">
              <li>Dial *123# (MTN) or *124# (Airtel) or *125# (Zamtel)</li>
              <li>Select "Send Money"</li>
              <li>Enter the mobile number: 097XXXXXXX</li>
              <li>Enter the amount: K{amount.toLocaleString()}</li>
              <li>Enter your PIN</li>
              <li>After successful payment, enter the transaction ID above</li>
            </ol>
          </div>
          
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? (
              <span className="flex items-center">
                <Icons.spinner className="w-4 h-4 mr-2 animate-spin" />
                Processing Payment...
              </span>
            ) : (
              "Confirm Payment"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}