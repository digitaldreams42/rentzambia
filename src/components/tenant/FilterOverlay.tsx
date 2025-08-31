"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface FilterOverlayProps {
  onApplyFilters: (filters: any) => void;
  currentFilters: any;
}

export function FilterOverlay({ onApplyFilters, currentFilters }: FilterOverlayProps) {
  const [filters, setFilters] = useState(currentFilters);

  const handleApply = () => {
    onApplyFilters(filters);
  };

  const handleReset = () => {
    setFilters({
      priceRange: [0, 10000],
      propertyTypes: [],
      bedrooms: [],
      amenities: [],
    });
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Filters</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Filter Properties</SheetTitle>
        </SheetHeader>
        <div className="py-6 space-y-6">
          {/* Price Range */}
          <div>
            <Label>Price Range (K)</Label>
            <div className="mt-2">
              <Slider
                min={0}
                max={10000}
                step={100}
                value={filters.priceRange}
                onValueChange={(value) => setFilters({...filters, priceRange: value})}
              />
              <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                <span>K{filters.priceRange[0]}</span>
                <span>K{filters.priceRange[1]}</span>
              </div>
            </div>
          </div>

          {/* Property Types */}
          <div>
            <Label>Property Type</Label>
            <div className="mt-2 space-y-2">
              {['Apartment', 'House', 'Studio', 'Room'].map((type) => (
                <div key={type} className="flex items-center">
                  <Checkbox
                    id={`type-${type}`}
                    checked={filters.propertyTypes.includes(type)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setFilters({
                          ...filters,
                          propertyTypes: [...filters.propertyTypes, type]
                        });
                      } else {
                        setFilters({
                          ...filters,
                          propertyTypes: filters.propertyTypes.filter((t: string) => t !== type)
                        });
                      }
                    }}
                  />
                  <Label htmlFor={`type-${type}`} className="ml-2">
                    {type}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Bedrooms */}
          <div>
            <Label>Bedrooms</Label>
            <div className="mt-2 space-y-2">
              {[1, 2, 3, 4, 5].map((beds) => (
                <div key={beds} className="flex items-center">
                  <Checkbox
                    id={`beds-${beds}`}
                    checked={filters.bedrooms.includes(beds)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setFilters({
                          ...filters,
                          bedrooms: [...filters.bedrooms, beds]
                        });
                      } else {
                        setFilters({
                          ...filters,
                          bedrooms: filters.bedrooms.filter((b: number) => b !== beds)
                        });
                      }
                    }}
                  />
                  <Label htmlFor={`beds-${beds}`} className="ml-2">
                    {beds} {beds === 5 ? '+' : ''}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Amenities */}
          <div>
            <Label>Amenities</Label>
            <div className="mt-2 space-y-2">
              {['WiFi', 'Parking', 'Security', 'Generator', 'Swimming Pool', 'Gym'].map((amenity) => (
                <div key={amenity} className="flex items-center">
                  <Checkbox
                    id={`amenity-${amenity}`}
                    checked={filters.amenities.includes(amenity)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setFilters({
                          ...filters,
                          amenities: [...filters.amenities, amenity]
                        });
                      } else {
                        setFilters({
                          ...filters,
                          amenities: filters.amenities.filter((a: string) => a !== amenity)
                        });
                      }
                    }}
                  />
                  <Label htmlFor={`amenity-${amenity}`} className="ml-2">
                    {amenity}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex space-x-2 pt-4">
            <Button variant="outline" onClick={handleReset} className="flex-1">
              Reset
            </Button>
            <Button onClick={handleApply} className="flex-1">
              Apply Filters
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}