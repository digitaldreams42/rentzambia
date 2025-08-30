"use client";

import { useState } from "react";
import { LandlordPropertyCard } from "@/components/landlord/PropertyCard";
import { Button } from "@/components/ui/button";
import { ConfirmationModal } from "@/components/ui/confirmation-modal";
import { PropertyForm } from "@/components/landlord/PropertyForm";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

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

export default function LandlordPropertiesPage() {
  const [properties, setProperties] = useState(mockProperties);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editingProperty, setEditingProperty] = useState<any>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [propertyToDelete, setPropertyToDelete] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleEditProperty = (property: any) => {
    setEditingProperty(property);
    setShowEditForm(true);
  };

  const handleDeleteProperty = (property: any) => {
    setPropertyToDelete(property);
    setShowDeleteModal(true);
  };

  const confirmDeleteProperty = async () => {
    if (!propertyToDelete) return;
    
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setProperties(prev => prev.filter(p => p.id !== propertyToDelete.id));
    setShowDeleteModal(false);
    setPropertyToDelete(null);
    setIsLoading(false);
  };

  const handleAddProperty = async (data: any) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newProperty = {
      ...data,
      id: Math.max(0, ...properties.map(p => p.id)) + 1,
      status: "pending",
      views: 0,
      inquiries: 0,
      bookings: 0
    };
    
    setProperties(prev => [...prev, newProperty]);
    setShowAddForm(false);
    setIsLoading(false);
  };

  const handleUpdateProperty = async (data: any) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setProperties(prev => 
      prev.map(p => p.id === editingProperty.id ? { ...p, ...data } : p)
    );
    
    setShowEditForm(false);
    setEditingProperty(null);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-foreground">My Properties</h1>
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
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-foreground">Property Listings</h2>
          <Button onClick={() => setShowAddForm(true)}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 mr-2">
              <path fillRule="evenodd" d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
            </svg>
            Add Property
          </Button>
        </div>

        {properties.length > 0 ? (
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
        ) : (
          <div className="text-center py-12">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-muted-foreground mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            <h3 className="text-lg font-medium text-foreground mb-2">
              No properties listed yet
            </h3>
            <p className="text-muted-foreground mb-4">
              Get started by adding your first property listing.
            </p>
            <Button onClick={() => setShowAddForm(true)}>
              Add Property
            </Button>
          </div>
        )}
      </main>

      {/* Add Property Form Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-card rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-foreground">Add New Property</h3>
                <button 
                  onClick={() => setShowAddForm(false)}
                  className="text-muted-foreground hover:text-foreground"
                  disabled={isLoading}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
              
              <PropertyForm
                onSubmit={handleAddProperty}
                onCancel={() => setShowAddForm(false)}
                isLoading={isLoading}
              />
            </div>
          </div>
        </div>
      )}

      {/* Edit Property Form Modal */}
      {showEditForm && editingProperty && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-card rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-foreground">Edit Property</h3>
                <button 
                  onClick={() => {
                    setShowEditForm(false);
                    setEditingProperty(null);
                  }}
                  className="text-muted-foreground hover:text-foreground"
                  disabled={isLoading}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
              
              <PropertyForm
                initialData={editingProperty}
                onSubmit={handleUpdateProperty}
                onCancel={() => {
                  setShowEditForm(false);
                  setEditingProperty(null);
                }}
                isLoading={isLoading}
              />
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setPropertyToDelete(null);
        }}
        onConfirm={confirmDeleteProperty}
        title="Delete Property"
        message="Are you sure you want to delete this property? This action cannot be undone."
        isLoading={isLoading}
      />
    </div>
  );
}