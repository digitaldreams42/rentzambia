"use client";

import * as React from "react";
import { PropertyCard } from "@/components/tenant/PropertyCard";
import { cn } from "@/lib/utils";

export interface PropertyGridProps {
  properties: any[];
  onFavoriteToggle?: (id: number) => void;
  className?: string;
}

const PropertyGrid = React.forwardRef<HTMLDivElement, PropertyGridProps>(
  ({ properties, onFavoriteToggle, className }, ref) => {
    return (
      <div 
        ref={ref} 
        className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", className)}
      >
        {properties.map((property) => (
          <PropertyCard
            key={property.id}
            property={property}
            onFavoriteToggle={onFavoriteToggle}
          />
        ))}
      </div>
    );
  }
);
PropertyGrid.displayName = "PropertyGrid";

export { PropertyGrid };