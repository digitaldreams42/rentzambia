'use client';

import { useState } from 'react';
import Link from 'next/link';
import { PropertyGrid } from '@/components/tenant/PropertyGrid';
import { useProperty } from '@/hooks/useProperty';

export default function TenantFavoritesPage() {
  const { properties, toggleFavorite } = useProperty();
  const [searchQuery, setSearchQuery] = useState('');

  // Filter properties to show only favorites
  const favoriteProperties = properties.filter(
    property =>
      property.isFavorite &&
      (property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.location.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleFavoriteToggle = (id: number) => {
    // If user unfavorited a property on this page, it should be removed from the list
    toggleFavorite(id);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-foreground">
                My Favorites
              </h1>
            </div>

            <div className="flex items-center space-x-4">
              <button className="text-foreground hover:text-primary">
                Notifications
              </button>
              <div className="relative">
                <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium">
                  John Mwanza
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Search Section */}
      <div className="bg-muted py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search favorites..."
                className="w-full px-4 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-foreground">
            Favorite Properties
          </h2>
          <p className="text-muted-foreground">
            {favoriteProperties.length} properties
          </p>
        </div>

        {favoriteProperties.length > 0 ? (
          <PropertyGrid
            properties={favoriteProperties}
            onFavoriteToggle={handleFavoriteToggle}
          />
        ) : (
          <div className="text-center py-12">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 mx-auto text-muted-foreground mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
            <h3 className="text-lg font-medium text-foreground mb-2">
              No favorites yet
            </h3>
            <p className="text-muted-foreground mb-4">
              You haven't saved any properties to your favorites list.
            </p>
            <Link
              href="/tenant"
              className="inline-block bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
            >
              Browse Properties
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}
