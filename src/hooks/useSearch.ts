import * as React from "react";
import { debounce } from "@/lib/utils";

interface UseSearchOptions {
  debounceMs?: number;
}

export function useSearch<T>(
  items: T[],
  searchFields: (keyof T)[],
  options: UseSearchOptions = {}
) {
  const { debounceMs = 300 } = options;
  const [query, setQuery] = React.useState("");
  const [filteredItems, setFilteredItems] = React.useState<T[]>(items);

  const debouncedSearch = React.useMemo(
    () => debounce((searchQuery: string) => {
      if (!searchQuery) {
        setFilteredItems(items);
        return;
      }

      const filtered = items.filter(item => {
        return searchFields.some(field => {
          const value = item[field];
          if (typeof value === "string") {
            return value.toLowerCase().includes(searchQuery.toLowerCase());
          }
          return false;
        });
      });

      setFilteredItems(filtered);
    }, debounceMs),
    [items, searchFields, debounceMs]
  );

  React.useEffect(() => {
    debouncedSearch(query);
  }, [query, debouncedSearch]);

  React.useEffect(() => {
    setFilteredItems(items);
  }, [items]);

  return {
    query,
    setQuery,
    filteredItems
  };
}