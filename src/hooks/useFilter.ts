import * as React from "react";

type FilterValue = string | number | boolean | null | undefined;

interface UseFilterOptions<T> {
  initialFilters?: Partial<Record<keyof T, FilterValue>>;
}

export function useFilter<T>(
  items: T[],
  options: UseFilterOptions<T> = {}
) {
  const { initialFilters = {} } = options;
  const [filters, setFilters] = React.useState<Partial<Record<keyof T, FilterValue>>>(initialFilters);

  const filteredItems = React.useMemo(() => {
    return items.filter(item => {
      return Object.entries(filters).every(([field, value]) => {
        if (value === null || value === undefined || value === "") {
          return true;
        }

        const itemValue = item[field as keyof T];

        // Handle different filter types
        if (typeof value === "string") {
          if (typeof itemValue === "string") {
            return itemValue.toLowerCase().includes(value.toLowerCase());
          }
          return String(itemValue).toLowerCase().includes(value.toLowerCase());
        }

        if (typeof value === "number") {
          if (typeof itemValue === "number") {
            return itemValue === value;
          }
          return Number(itemValue) === value;
        }

        if (typeof value === "boolean") {
          return Boolean(itemValue) === value;
        }

        return true;
      });
    });
  }, [items, filters]);

  const updateFilter = (field: keyof T, value: FilterValue) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const clearFilters = () => {
    setFilters({});
  };

  const resetFilters = () => {
    setFilters(initialFilters);
  };

  return {
    filteredItems,
    filters,
    updateFilter,
    clearFilters,
    resetFilters
  };
}