'use client';

import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export interface LandlordPropertyCardProps {
  property: {
    id: number;
    title: string;
    location: string;
    price: number;
    status: 'available' | 'rented' | 'pending';
    inquiries: number;
    views: number;
    images: string[];
  };
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
  className?: string;
}

const LandlordPropertyCard = React.forwardRef<
  HTMLDivElement,
  LandlordPropertyCardProps
>(({ property, onEdit, onDelete, className }, ref) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-success';
      case 'rented':
        return 'bg-muted';
      case 'pending':
        return 'bg-warning';
      default:
        return 'bg-muted';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'available':
        return 'Available';
      case 'rented':
        return 'Rented';
      case 'pending':
        return 'Pending';
      default:
        return 'Unknown';
    }
  };

  return (
    <Card
      ref={ref}
      className={cn(
        'rounded-lg shadow-md overflow-hidden border border-border',
        className
      )}
    >
      <div className="relative">
        <img
          src={property.images[0]}
          alt={property.title}
          className="w-full h-48 object-cover"
        />
        <div
          className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium text-white ${getStatusColor(property.status)}`}
        >
          {getStatusText(property.status)}
        </div>
      </div>

      <CardHeader className="p-4 pb-2">
        <CardTitle className="text-lg font-semibold text-foreground">
          {property.title}
        </CardTitle>
        <p className="text-muted-foreground text-sm">{property.location}</p>
      </CardHeader>

      <CardContent className="p-4 pt-0">
        <div className="flex justify-between items-center mb-3">
          <span className="text-lg font-bold text-primary">
            K{property.price}/mo
          </span>
        </div>

        <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
          <span>{property.inquiries} inquiries</span>
          <span>{property.views} views</span>
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit?.(property.id)}
            className="flex-1"
          >
            Edit
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => onDelete?.(property.id)}
            className="flex-1"
          >
            Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  );
});
LandlordPropertyCard.displayName = 'LandlordPropertyCard';

export { LandlordPropertyCard };
