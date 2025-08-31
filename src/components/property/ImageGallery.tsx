'use client';

import * as React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export interface PropertyImageGalleryProps {
  images: string[];
  className?: string;
}

const PropertyImageGallery = React.forwardRef<
  HTMLDivElement,
  PropertyImageGalleryProps
>(({ images, className }, ref) => {
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);

  return (
    <Card
      ref={ref}
      className={cn('rounded-lg shadow-md overflow-hidden mb-6', className)}
    >
      <div className="relative">
        <img
          src={images[currentImageIndex]}
          alt={`Property image ${currentImageIndex + 1}`}
          className="w-full h-96 object-cover"
        />
      </div>

      {/* Thumbnails */}
      <div className="flex p-4 space-x-2 overflow-x-auto">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border-2 ${currentImageIndex === index ? 'border-primary' : 'border-transparent'}`}
          >
            <img
              src={image}
              alt={`Property image ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </Card>
  );
});
PropertyImageGallery.displayName = 'PropertyImageGallery';

export { PropertyImageGallery };
