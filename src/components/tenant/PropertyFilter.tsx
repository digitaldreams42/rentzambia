'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { AMENITIES, PROPERTY_TYPES } from '@/data/constants';
import { cn } from '@/lib/utils';

export interface PropertyFilters {
  searchQuery: string;
  minPrice: number | null;
  maxPrice: number | null;
  bedrooms: number | null;
  propertyType: string | null;
  furnished: boolean | null;
  amenities: string[];
}

export interface PropertyFilterProps {
  filters: PropertyFilters;
  onFiltersChange: (filters: PropertyFilters) => void;
  className?: string;
}

const PropertyFilter = React.forwardRef<HTMLDivElement, PropertyFilterProps>(
  ({ filters, onFiltersChange, className }, ref) => {
    const handleAmenityToggle = (amenity: string) => {
      const newAmenities = filters.amenities.includes(amenity)
        ? filters.amenities.filter(a => a !== amenity)
        : [...filters.amenities, amenity];

      onFiltersChange({
        ...filters,
        amenities: newAmenities,
      });
    };

    const resetFilters = () => {
      onFiltersChange({
        searchQuery: '',
        minPrice: null,
        maxPrice: null,
        bedrooms: null,
        propertyType: null,
        furnished: null,
        amenities: [],
      });
    };

    return (
      <div
        ref={ref}
        className={cn('bg-card rounded-lg shadow-md p-6', className)}
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-foreground">Filters</h3>
          <Button
            variant="ghost"
            onClick={resetFilters}
            className="text-primary hover:text-primary/80"
          >
            Reset All
          </Button>
        </div>

        <div className="space-y-6">
          {/* Search */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Search
            </label>
            <Input
              type="text"
              placeholder="Search by location, title..."
              value={filters.searchQuery}
              onChange={e =>
                onFiltersChange({ ...filters, searchQuery: e.target.value })
              }
            />
          </div>

          {/* Price Range */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Price Range (Monthly)
            </label>
            <div className="grid grid-cols-2 gap-3">
              <Input
                type="number"
                placeholder="Min"
                value={filters.minPrice || ''}
                onChange={e =>
                  onFiltersChange({
                    ...filters,
                    minPrice: e.target.value ? Number(e.target.value) : null,
                  })
                }
              />
              <Input
                type="number"
                placeholder="Max"
                value={filters.maxPrice || ''}
                onChange={e =>
                  onFiltersChange({
                    ...filters,
                    maxPrice: e.target.value ? Number(e.target.value) : null,
                  })
                }
              />
            </div>
          </div>

          {/* Bedrooms */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Bedrooms
            </label>
            <Select
              value={filters.bedrooms?.toString() || ''}
              onValueChange={value =>
                onFiltersChange({
                  ...filters,
                  bedrooms: value ? Number(value) : null,
                })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Any" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Any</SelectItem>
                <SelectItem value="1">1</SelectItem>
                <SelectItem value="2">2</SelectItem>
                <SelectItem value="3">3</SelectItem>
                <SelectItem value="4">4+</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Property Type */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Property Type
            </label>
            <Select
              value={filters.propertyType || ''}
              onValueChange={value =>
                onFiltersChange({ ...filters, propertyType: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Any" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Any</SelectItem>
                {PROPERTY_TYPES.map(type => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Furnished */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Furnished
            </label>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="furnished"
                  checked={filters.furnished === true}
                  onChange={() =>
                    onFiltersChange({ ...filters, furnished: true })
                  }
                  className="mr-2"
                />
                <span className="text-foreground">Yes</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="furnished"
                  checked={filters.furnished === false}
                  onChange={() =>
                    onFiltersChange({ ...filters, furnished: false })
                  }
                  className="mr-2"
                />
                <span className="text-foreground">No</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="furnished"
                  checked={filters.furnished === null}
                  onChange={() =>
                    onFiltersChange({ ...filters, furnished: null })
                  }
                  className="mr-2"
                />
                <span className="text-foreground">Any</span>
              </label>
            </div>
          </div>

          {/* Amenities */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Amenities
            </label>
            <div className="grid grid-cols-2 gap-2">
              {AMENITIES.slice(0, 8).map(amenity => (
                <label key={amenity} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.amenities.includes(amenity)}
                    onChange={() => handleAmenityToggle(amenity)}
                    className="mr-2"
                  />
                  <span className="text-foreground text-sm">{amenity}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <Button className="w-full mt-6">Apply Filters</Button>
      </div>
    );
  }
);
PropertyFilter.displayName = 'PropertyFilter';

export { PropertyFilter };
