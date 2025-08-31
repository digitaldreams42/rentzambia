"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Icons } from "@/components/ui/icons";

interface CartItem {
  id: number;
  propertyId: number;
  title: string;
  location: string;
  price: number;
  dates: {
    start: string;
    end: string;
  };
  image: string;
}

interface RentalCartProps {
  items: CartItem[];
  onRemoveItem: (id: number) => void;
  onCheckout: () => void;
  loading?: boolean;
}

export function RentalCart({ items, onRemoveItem, onCheckout, loading }: RentalCartProps) {
  const [promoCode, setPromoCode] = useState("");

  const subtotal = items.reduce((sum, item) => sum + item.price, 0);
  const tax = subtotal * 0.15; // 15% tax
  const total = subtotal + tax;

  const handleApplyPromo = () => {
    // In a real implementation, you would validate and apply the promo code
    alert("Promo code applied!");
  };

  return (
    <div className="bg-card rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-foreground mb-6">Your Rental Cart</h2>
      
      {items.length > 0 ? (
        <div className="space-y-6">
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.id} className="flex items-center border-b pb-4">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-16 h-16 object-cover rounded-md"
                />
                <div className="ml-4 flex-1">
                  <h3 className="font-medium">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.location}</p>
                  <p className="text-sm">{new Date(item.dates.start).toLocaleDateString()} - {new Date(item.dates.end).toLocaleDateString()}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">K{item.price.toLocaleString()}</p>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => onRemoveItem(item.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Icons.trash className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>K{subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax (15%)</span>
              <span>K{tax.toLocaleString()}</span>
            </div>
            <div className="flex justify-between font-semibold pt-2 border-t">
              <span>Total</span>
              <span>K{total.toLocaleString()}</span>
            </div>
          </div>
          
          <div className="flex space-x-2">
            <Input
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              placeholder="Promo code"
              className="flex-1"
            />
            <Button 
              variant="outline" 
              onClick={handleApplyPromo}
              disabled={!promoCode.trim()}
            >
              Apply
            </Button>
          </div>
          
          <Button 
            onClick={onCheckout}
            disabled={loading}
            className="w-full"
          >
            {loading ? (
              <span className="flex items-center">
                <Icons.spinner className="w-4 h-4 mr-2 animate-spin" />
                Processing...
              </span>
            ) : (
              "Proceed to Checkout"
            )}
          </Button>
        </div>
      ) : (
        <div className="text-center py-8">
          <Icons.shoppingCart className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground mb-4">Your rental cart is empty</p>
          <Button>
            <Link href="/tenant">Browse Properties</Link>
          </Button>
        </div>
      )}
    </div>
  );
}