'use client';

import { Button } from '@/components/ui/button';

interface FilterChipProps {
  label: string;
  active?: boolean;
  onClick?: () => void;
}

export function FilterChip({ label, active, onClick }: FilterChipProps) {
  return (
    <Button
      variant={active ? 'default' : 'outline'}
      size="sm"
      className="rounded-full px-3 py-1 h-auto"
      onClick={onClick}
    >
      {label}
    </Button>
  );
}

interface FilterChipsProps {
  filters: { label: string; active: boolean }[];
  onFilterClick: (index: number) => void;
}

export function FilterChips({ filters, onFilterClick }: FilterChipsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {filters.map((filter, index) => (
        <FilterChip
          key={index}
          label={filter.label}
          active={filter.active}
          onClick={() => onFilterClick(index)}
        />
      ))}
    </div>
  );
}
