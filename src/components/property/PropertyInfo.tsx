"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface PropertyInfoProps {
  property: {
    title: string;
    location: string;
    price: {
      monthly: number;
      yearly: number;
      shortTerm: number;
    };
    bedrooms: number;
    bathrooms: number;
    area: number;
    type: string;
    furnished: boolean;
    description: string;
    amenities: string[];
  };
  className?: string;
}

const PropertyInfo = React.forwardRef<HTMLDivElement, PropertyInfoProps>(
  ({ property, className }, ref) => {
    return (
      <Card ref={ref} className={cn("rounded-lg shadow-md p-6 mb-6", className)}>
        <div className="flex justify-between items-start mb-4">
          <h1 className="text-2xl font-bold text-foreground">{property.title}</h1>
          <div className="text-right">
            <div className="text-2xl font-bold text-primary">K{property.price.monthly}/mo</div>
            <div className="text-sm text-muted-foreground">
              K{property.price.yearly}/year or K{property.price.shortTerm}/day
            </div>
          </div>
        </div>
        
        <div className="flex items-center text-muted-foreground mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 mr-1">
            <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
          </svg>
          {property.location}
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-muted p-3 rounded-md text-center">
            <div className="text-lg font-semibold text-foreground">{property.bedrooms}</div>
            <div className="text-sm text-muted-foreground">Bedrooms</div>
          </div>
          <div className="bg-muted p-3 rounded-md text-center">
            <div className="text-lg font-semibold text-foreground">{property.bathrooms}</div>
            <div className="text-sm text-muted-foreground">Bathrooms</div>
          </div>
          <div className="bg-muted p-3 rounded-md text-center">
            <div className="text-lg font-semibold text-foreground">{property.area} m²</div>
            <div className="text-sm text-muted-foreground">Area</div>
          </div>
          <div className="bg-muted p-3 rounded-md text-center">
            <div className="text-lg font-semibold text-foreground">{property.type}</div>
            <div className="text-sm text-muted-foreground">Type</div>
          </div>
        </div>
        
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-foreground mb-3">Description</h2>
          <p className="text-muted-foreground">
            {property.description}
          </p>
        </div>
        
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-3">Amenities</h2>
          <div className="flex flex-wrap gap-2">
            {property.amenities.map((amenity, index) => (
              <span 
                key={index} 
                className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm"
              >
                {amenity}
              </span>
            ))}
          </div>
        </div>
      </Card>
    );
  }
);
PropertyInfo.displayName = "PropertyInfo";

export { PropertyInfo };