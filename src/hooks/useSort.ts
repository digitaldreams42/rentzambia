import * as React from "react";

type SortDirection = "asc" | "desc";

interface UseSortOptions<T> {
  initialSortField?: keyof T;
  initialSortDirection?: SortDirection;
}

export function useSort<T>(
  items: T[],
  options: UseSortOptions<T> = {}
) {
  const { 
    initialSortField = Object.keys(items[0] || {})[0] as keyof T,
    initialSortDirection = "asc"
  } = options;

  const [sortField, setSortField] = React.useState<keyof T>(initialSortField);
  const [sortDirection, setSortDirection] = React.useState<SortDirection>(initialSortDirection);

  const sortedItems = React.useMemo(() => {
    if (!sortField) return items;

    return [...items].sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];

      // Handle different data types
      if (typeof aValue === "string" && typeof bValue === "string") {
        const comparison = aValue.localeCompare(bValue);
        return sortDirection === "asc" ? comparison : -comparison;
      }

      if (typeof aValue === "number" && typeof bValue === "number") {
        const comparison = aValue - bValue;
        return sortDirection === "asc" ? comparison : -comparison;
      }

      if (aValue instanceof Date && bValue instanceof Date) {
        const comparison = aValue.getTime() - bValue.getTime();
        return sortDirection === "asc" ? comparison : -comparison;
      }

      // Fallback for other types
      const aStr = String(aValue);
      const bStr = String(bValue);
      const comparison = aStr.localeCompare(bStr);
      return sortDirection === "asc" ? comparison : -comparison;
    });
  }, [items, sortField, sortDirection]);

  const toggleSort = (field: keyof T) => {
    if (sortField === field) {
      setSortDirection(prev => prev === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  return {
    sortedItems,
    sortField,
    sortDirection,
    toggleSort
  };
}