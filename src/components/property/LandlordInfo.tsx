"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface LandlordInfoProps {
  landlord: {
    name: string;
    rating: number;
    verified: boolean;
    properties: number;
    phone: string;
    email: string;
  };
  onSendInquiry?: () => void;
  onScheduleVisit?: () => void;
  onBookNow?: () => void;
  className?: string;
}

const LandlordInfo = React.forwardRef<HTMLDivElement, LandlordInfoProps>(
  ({ landlord, onSendInquiry, onScheduleVisit, onBookNow, className }, ref) => {
    return (
      <Card ref={ref} className={cn("rounded-lg shadow-md p-6 mb-6", className)}>
        <h2 className="text-xl font-semibold text-foreground mb-4">Landlord Information</h2>
        
        <div className="flex items-center mb-4">
          <div className="bg-muted rounded-full w-16 h-16 flex items-center justify-center mr-4">
            <span className="text-2xl font-bold text-foreground">
              {landlord.name.charAt(0)}
            </span>
          </div>
          <div>
            <div className="font-semibold text-foreground">{landlord.name}</div>
            <div className="flex items-center text-sm text-muted-foreground">
              <span className="flex items-center mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-amber-500 mr-1">
                  <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
                </svg>
                {landlord.rating}
              </span>
              {landlord.verified && (
                <span className="flex items-center text-success">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 mr-1">
                    <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0 1 12 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 0 1 3.498 1.307 4.491 4.491 0 0 1 1.307 3.497A4.49 4.49 0 0 1 21.75 12a4.49 4.49 0 0 1-1.549 3.397 4.49 4.49 0 0 1-1.307 3.497 4.491 4.491 0 0 1-3.497 1.307A4.49 4.49 0 0 1 12 21.75a4.49 4.49 0 0 1-3.397-1.549 4.49 4.49 0 0 1-3.498-1.306 4.491 4.491 0 0 1-1.307-3.498A4.49 4.49 0 0 1 2.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 0 1 1.307-3.497 4.49 4.49 0 0 1 3.497-1.307Zm7.007 6.387a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
                  </svg>
                  Verified
                </span>
              )}
            </div>
            <div className="text-sm text-muted-foreground">
              {landlord.properties} properties listed
            </div>
          </div>
        </div>
        
        <div className="space-y-3">
          <Button 
            onClick={onSendInquiry}
            className="w-full bg-primary text-primary-foreground py-2 px-4 rounded-md font-medium hover:bg-primary/90 transition-colors"
          >
            Send Inquiry
          </Button>
          
          <Button 
            variant="outline"
            onClick={onScheduleVisit}
            className="w-full py-2 px-4 rounded-md font-medium hover:bg-muted transition-colors"
          >
            Schedule Visit
          </Button>
          
          <Button 
            variant="default"
            onClick={onBookNow}
            className="w-full bg-success text-success-foreground py-2 px-4 rounded-md font-medium hover:bg-success/90 transition-colors"
          >
            Book Now
          </Button>
        </div>
      </Card>
    );
  }
);
LandlordInfo.displayName = "LandlordInfo";

export { LandlordInfo };