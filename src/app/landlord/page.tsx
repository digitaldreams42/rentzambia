"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { StatsCard } from "@/components/landlord/StatsCard";
import { LandlordPropertyCard } from "@/components/landlord/PropertyCard";
import { Button } from "@/components/ui/button";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { useAuth } from "@/context/AuthContext";
import { ApiService } from "@/services/apiService";
import { Property } from "@/types";
import { Icons } from "@/components/ui/icons";

// Mock stats data
const mockStats = [
  { title: "Total Properties", value: "12", description: "All properties you've listed" },
  { title: "Active Listings", value: "8", description: "Currently available properties" },
  { title: "Total Earnings", value: "K24,500", description: "This month's earnings" },
  { title: "Pending Inquiries", value: "5", description: "Awaiting your response" }
];

export default function LandlordDashboard() {
  const { userData } = useAuth();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        const data = await ApiService.getProperties();
        // Filter properties by current landlord
        const landlordProperties = data.filter(
          prop => prop.landlord.id === userData?.id
        );
        setProperties(landlordProperties);
      } catch (err) {
        setError("Failed to load properties");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (userData) {
      fetchProperties();
    }
  }, [userData]);

  const handleEditProperty = (id: number) => {
    console.log("Edit property", id);
    // In a real implementation, this would redirect to an edit form
  };

  const handleDeleteProperty = async (id: number) => {
    if (confirm("Are you sure you want to delete this property?")) {
      try {
        await ApiService.deleteProperty(id);
        setProperties(prev => prev.filter(property => property.id !== id));
      } catch (err) {
        console.error("Failed to delete property", err);
        alert("Failed to delete property. Please try again.");
      }
    }
  };

  const handleAddProperty = () => {
    // In a real implementation, this would redirect to a create form
    console.log("Add new property");
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
    <ProtectedRoute allowedRoles={["landlord", "agent"]}>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="bg-card border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              <div className="flex items-center">
                <Link href="/landlord" className="text-xl font-bold text-foreground">
                  Landlord Dashboard
                </Link>
              </div>
              
              <div className="flex items-center space-x-4">
                <button className="text-foreground hover:text-primary">
                  Notifications
                </button>
                <div className="relative">
                  <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium">
                    {userData?.name || "Landlord"}
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
            <Button onClick={handleAddProperty}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 mr-2">
                <path fillRule="evenodd" d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
              </svg>
              Add Property
            </Button>
          </div>

          {/* Property Grid */}
          {properties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties.map((property) => (
                <LandlordPropertyCard
                  key={property.id}
                  property={{
                    id: property.id,
                    title: property.title,
                    location: property.location,
                    price: property.price.monthly,
                    status: "available", // This would come from the actual property data
                    inquiries: 0, // This would come from the actual property data
                    views: 0, // This would come from the actual property data
                    images: property.images
                  }}
                  onEdit={handleEditProperty}
                  onDelete={handleDeleteProperty}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="bg-muted rounded-lg p-8 max-w-md mx-auto">
                <h3 className="text-xl font-semibold text-foreground mb-2">No properties yet</h3>
                <p className="text-muted-foreground mb-4">
                  You haven't listed any properties yet. Get started by adding your first property.
                </p>
                <Button onClick={handleAddProperty}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 mr-2">
                    <path fillRule="evenodd" d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
                  </svg>
                  Add Your First Property
                </Button>
              </div>
            </div>
          )}
        </main>
      </div>
    </ProtectedRoute>
  );
}