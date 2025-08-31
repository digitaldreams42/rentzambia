"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface SearchHeaderProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  sortBy: string;
  onSortChange: (value: string) => void;
  onFilterClick?: () => void;
  className?: string;
}

const SearchHeader = React.forwardRef<HTMLDivElement, SearchHeaderProps>(
  ({ searchQuery, onSearchChange, sortBy, onSortChange, onFilterClick, className }, ref) => {
    return (
      <div ref={ref} className={cn("flex flex-col md:flex-row gap-4", className)}>
        <div className="flex-1">
          <Input
            type="text"
            placeholder="Search properties..."
            className="w-full"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Select 
            value={sortBy} 
            onValueChange={onSortChange}
          >
            <SelectTrigger className="px-4 py-2">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="relevance">Sort by Relevance</SelectItem>
              <SelectItem value="price_low">Price: Low to High</SelectItem>
              <SelectItem value="price_high">Price: High to Low</SelectItem>
              <SelectItem value="newest">Newest First</SelectItem>
            </SelectContent>
          </Select>
          <Button 
            className="px-4 py-2"
            onClick={onFilterClick}
          >
            Filters
          </Button>
        </div>
      </div>
    );
  }
);
SearchHeader.displayName = "SearchHeader";

export { SearchHeader };