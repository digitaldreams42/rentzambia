'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { SearchHeader } from '@/components/tenant/SearchHeader';
import { PropertyGrid } from '@/components/tenant/PropertyGrid';
import { FilterChips } from '@/components/tenant/FilterChips';
import { FilterOverlay } from '@/components/tenant/FilterOverlay';
import { MapView } from '@/components/tenant/MapView';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { useAuth } from '@/context/AuthContext';
import { ApiService } from '@/services/apiService';
import { Property } from '@/types';
import { Icons } from '@/components/ui/icons';
import { Button } from '@/components/ui/button';

export default function TenantDashboard() {
  const { userData } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [properties, setProperties] = useState<Property[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [sortBy, setSortBy] = useState('relevance');
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');
  const [filters, setFilters] = useState({
    priceRange: [0, 10000],
    propertyTypes: [] as string[],
    bedrooms: [] as number[],
    amenities: [] as string[],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        const data = await ApiService.getProperties();
        setProperties(data);
        setFilteredProperties(data);
      } catch (err) {
        setError('Failed to load properties');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  useEffect(() => {
    // Filter properties based on search query and filters
    let result = properties;

    // Search query filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        property =>
          property.title.toLowerCase().includes(query) ||
          property.location.toLowerCase().includes(query) ||
          property.description.toLowerCase().includes(query) ||
          property.type.toLowerCase().includes(query) ||
          property.amenities.some(amenity =>
            amenity.toLowerCase().includes(query)
          )
      );
    }

    // Price range filter
    result = result.filter(
      property =>
        property.price.monthly >= filters.priceRange[0] &&
        property.price.monthly <= filters.priceRange[1]
    );

    // Property type filter
    if (filters.propertyTypes.length > 0) {
      result = result.filter(property =>
        filters.propertyTypes.includes(property.type)
      );
    }

    // Bedrooms filter
    if (filters.bedrooms.length > 0) {
      result = result.filter(
        property =>
          filters.bedrooms.includes(property.bedrooms) ||
          (filters.bedrooms.includes(5) && property.bedrooms >= 5)
      );
    }

    // Amenities filter
    if (filters.amenities.length > 0) {
      result = result.filter(property =>
        filters.amenities.every(amenity => property.amenities.includes(amenity))
      );
    }

    // Sort properties
    switch (sortBy) {
      case 'price-low':
        result = [...result].sort((a, b) => a.price.monthly - b.price.monthly);
        break;
      case 'price-high':
        result = [...result].sort((a, b) => b.price.monthly - a.price.monthly);
        break;
      case 'newest':
        // In a real app, you would sort by date
        break;
      default:
        // Relevance sorting would be more complex
        break;
    }

    setFilteredProperties(result);
  }, [searchQuery, sortBy, properties, filters]);

  const handleFavoriteToggle = async (propertyId: number) => {
    try {
      // In a real implementation, you would update the favorite status in the database
      setProperties(prev =>
        prev.map(property =>
          property.id === propertyId
            ? { ...property, isFavorite: !property.isFavorite }
            : property
        )
      );
    } catch (err) {
      console.error('Failed to update favorite status', err);
    }
  };

  const handleApplyFilters = (newFilters: any) => {
    setFilters(newFilters);
  };

  const handleFilterChipClick = (index: number) => {
    // This would handle clicking on filter chips
    console.log('Filter chip clicked', index);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Icons.spinner className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="bg-destructive/10 text-destructive p-4 rounded-md">
            {error}
          </div>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 text-primary hover:underline"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  return (
    <ProtectedRoute allowedRoles={['tenant']}>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="bg-card border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              <div className="flex items-center">
                <Link
                  href="/tenant"
                  className="text-xl font-bold text-foreground"
                >
                  RentZambia
                </Link>
              </div>

              <div className="flex items-center space-x-4">
                <button className="text-foreground hover:text-primary">
                  Notifications
                </button>
                <div className="relative">
                  <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium">
                    {userData?.name || 'Tenant'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Search Section */}
        <div className="bg-muted py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SearchHeader
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              sortBy={sortBy}
              onSortChange={setSortBy}
            />

            {/* Filter Chips */}
            <div className="mt-4 flex items-center justify-between">
              <FilterChips
                filters={[
                  { label: 'All', active: true },
                  { label: 'Apartment', active: false },
                  { label: 'House', active: false },
                  { label: 'Studio', active: false },
                ]}
                onFilterClick={handleFilterChipClick}
              />

              <div className="flex space-x-2">
                <FilterOverlay
                  onApplyFilters={handleApplyFilters}
                  currentFilters={filters}
                />
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                >
                  Grid View
                </Button>
                <Button
                  variant={viewMode === 'map' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('map')}
                >
                  Map View
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-foreground">
              Available Properties
            </h2>
            <p className="text-muted-foreground">
              {filteredProperties.length} properties found
            </p>
          </div>

          {/* Content based on view mode */}
          {viewMode === 'grid' ? (
            <PropertyGrid
              properties={filteredProperties}
              onFavoriteToggle={handleFavoriteToggle}
            />
          ) : (
            <MapView />
          )}
        </main>
      </div>
    </ProtectedRoute>
  );
}
