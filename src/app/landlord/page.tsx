"use client";

import { useState } from "react";
import Link from "next/link";
import { StatsCard } from "@/components/landlord/StatsCard";
import { LandlordPropertyCard } from "@/components/landlord/PropertyCard";
import { Button } from "@/components/ui/button";

// Mock property data
const mockProperties = [
  {
    id: 1,
    title: "Modern 2-Bedroom Apartment in Kabulonga",
    location: "Kabulonga, Lusaka",
    price: 3500,
    status: "available",
    views: 124,
    inquiries: 8,
    bookings: 2,
    images: [
      "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg"
    ]
  },
  {
    id: 2,
    title: "Spacious 3-Bedroom House in Roma",
    location: "Roma, Lusaka",
    price: 4200,
    status: "pending",
    views: 0,
    inquiries: 0,
    bookings: 0,
    images: [
      "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg"
    ]
  },
  {
    id: 3,
    title: "Luxury Studio in City Center",
    location: "City Center, Lusaka",
    price: 2800,
    status: "rented",
    views: 87,
    inquiries: 12,
    bookings: 1,
    images: [
      "https://images.pexels.com/photos/2029667/pexels-photo-2029667.jpeg"
    ]
  }
];

// Mock stats data
const mockStats = [
  { title: "Total Properties", value: "12", description: "All properties you've listed" },
  { title: "Active Listings", value: "8", description: "Currently available properties" },
  { title: "Total Earnings", value: "K24,500", description: "This month's earnings" },
  { title: "Pending Inquiries", value: "5", description: "Awaiting your response" }
];

export default function LandlordDashboard() {
  const [properties, setProperties] = useState(mockProperties);

  const handleEditProperty = (id: number) => {
    console.log("Edit property", id);
  };

  const handleDeleteProperty = (id: number) => {
    if (confirm("Are you sure you want to delete this property?")) {
      setProperties(prev => prev.filter(property => property.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-foreground">Landlord Dashboard</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="text-foreground hover:text-primary">
                Notifications
              </button>
              <div className="relative">
                <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium">
                  Sarah Banda
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {mockStats.map((stat, index) => (
            <StatsCard
              key={index}
              title={stat.title}
              value={stat.value}
              description={stat.description}
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-muted-foreground">
                  <path d="M11.7 2.805a.75.75 0 0 1 .6 0A60.65 60.65 0 0 1 22.83 8.72a.75.75 0 0 1-.231 1.337 49.948 49.948 0 0 0-9.902 3.912l-.003.002-.34.18a.75.75 0 0 1-.707 0l-.34-.18-.003-.002a49.949 49.949 0 0 0-9.902-3.912.75.75 0 0 1-.231-1.337A60.65 60.65 0 0 1 11.7 2.805Z" />
                  <path d="M13.06 15.473a48.45 48.45 0 0 1 7.666-3.282c.134 1.414.22 2.843.255 4.284a.75.75 0 0 1-.46.71 47.87 47.87 0 0 0-8.105 4.342.75.75 0 0 1-.832 0 47.87 47.87 0 0 0-8.104-4.342.75.75 0 0 1-.461-.71c.035-1.44.121-2.87.255-4.283.921.304 1.847.592 2.778.863a.75.75 0 0 1 .549.755 47.7 47.7 0 0 0 1.12 7.89.75.75 0 0 1-.612.865h-.001a47.7 47.7 0 0 0-5.487 1.62.75.75 0 0 1-.85-.851 47.7 47.7 0 0 0 1.62-5.486.75.75 0 0 1 .755-.55c.282.081.563.167.844.258a.75.75 0 0 1-.418 1.442 46.2 46.2 0 0 0-1.255-.375.75.75 0 0 1-.549-.755c.057-1.893.22-3.779.48-5.654Z" />
                </svg>
              }
            />
          ))}
        </div>

        {/* Properties Section */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-foreground">Your Properties</h2>
          <Button>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 mr-2">
              <path fillRule="evenodd" d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
            </svg>
            Add Property
          </Button>
        </div>

        {/* Property Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <LandlordPropertyCard
              key={property.id}
              property={property}
              onEdit={handleEditProperty}
              onDelete={handleDeleteProperty}
            />
          ))}
        </div>
      </main>
    </div>
  );
}