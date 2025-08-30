"use client";

import { useState } from "react";
import Link from "next/link";
import { SearchHeader } from "@/components/tenant/SearchHeader";
import { PropertyGrid } from "@/components/tenant/PropertyGrid";

// Mock property data
const mockProperties = [
  {
    id: 1,
    title: "Modern 2-Bedroom Apartment in Kabulonga",
    location: "Kabulonga, Lusaka",
    price: 3500,
    bedrooms: 2,
    bathrooms: 2,
    area: 85,
    type: "Apartment",
    furnished: true,
    images: [
      "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg"
    ],
    isFavorite: false,
    landlord: {
      name: "Sarah Banda",
      rating: 4.8
    }
  },
  {
    id: 2,
    title: "Spacious 3-Bedroom House in Roma",
    location: "Roma, Lusaka",
    price: 4200,
    bedrooms: 3,
    bathrooms: 2,
    area: 120,
    type: "House",
    furnished: false,
    images: [
      "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg"
    ],
    isFavorite: true,
    landlord: {
      name: "Michael Phiri",
      rating: 4.6
    }
  },
  {
    id: 3,
    title: "Luxury Studio in City Center",
    location: "City Center, Lusaka",
    price: 2800,
    bedrooms: 1,
    bathrooms: 1,
    area: 45,
    type: "Studio",
    furnished: true,
    images: [
      "https://images.pexels.com/photos/2029667/pexels-photo-2029667.jpeg"
    ],
    isFavorite: false,
    landlord: {
      name: "Grace Mulenga",
      rating: 4.9
    }
  }
];

export default function TenantDashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [properties, setProperties] = useState(mockProperties);
  const [sortBy, setSortBy] = useState("relevance");

  const handleFavoriteToggle = (propertyId: number) => {
    setProperties(prev => prev.map(property => 
      property.id === propertyId 
        ? { ...property, isFavorite: !property.isFavorite } 
        : property
    ));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-foreground">RentZambia</h1>
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
          <SearchHeader
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            sortBy={sortBy}
            onSortChange={setSortBy}
          />
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-foreground">Available Properties</h2>
          <p className="text-muted-foreground">{properties.length} properties found</p>
        </div>

        {/* Property Grid */}
        <PropertyGrid
          properties={properties}
          onFavoriteToggle={handleFavoriteToggle}
        />
      </main>
    </div>
  );
}