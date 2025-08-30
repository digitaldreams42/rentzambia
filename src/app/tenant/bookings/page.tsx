"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PropertyStatusBadge } from "@/components/property/PropertyStatusBadge";

// Mock booking data
const mockBookings = [
  {
    id: 1,
    property: {
      id: 1,
      title: "Modern 2-Bedroom Apartment in Kabulonga",
      location: "Kabulonga, Lusaka",
      price: 3500,
      images: ["https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg"]
    },
    startDate: "2025-03-01",
    endDate: "2025-03-31",
    status: "confirmed",
    totalPrice: 3500
  },
  {
    id: 2,
    property: {
      id: 3,
      title: "Luxury Studio in City Center",
      location: "City Center, Lusaka",
      price: 2800,
      images: ["https://images.pexels.com/photos/2029667/pexels-photo-2029667.jpeg"]
    },
    startDate: "2025-02-15",
    endDate: "2025-02-28",
    status: "pending",
    totalPrice: 2800
  }
];

export default function TenantBookingsPage() {
  const [bookings] = useState(mockBookings);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-foreground">My Bookings</h1>
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

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-foreground">
            Booking History
          </h2>
          <p className="text-muted-foreground">
            {bookings.length} bookings
          </p>
        </div>

        {bookings.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {bookings.map((booking) => (
              <div key={booking.id} className="bg-card rounded-lg shadow-md overflow-hidden border border-border">
                <div className="flex">
                  <div className="w-32 flex-shrink-0">
                    <img 
                      src={booking.property.images[0]} 
                      alt={booking.property.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="p-4 flex-1">
                    <div className="flex justify-between">
                      <h3 className="font-semibold text-foreground">
                        {booking.property.title}
                      </h3>
                      <PropertyStatusBadge status={booking.status as any} />
                    </div>
                    
                    <p className="text-sm text-muted-foreground mt-1">
                      {booking.property.location}
                    </p>
                    
                    <div className="mt-3 flex justify-between items-center">
                      <div>
                        <p className="text-sm text-muted-foreground">
                          {new Date(booking.startDate).toLocaleDateString()} - {new Date(booking.endDate).toLocaleDateString()}
                        </p>
                        <p className="font-semibold text-foreground">
                          K{booking.totalPrice}
                        </p>
                      </div>
                      
                      <div className="flex space-x-2">
                        {booking.status === "pending" && (
                          <Button variant="outline" size="sm">
                            Cancel
                          </Button>
                        )}
                        <Button variant="default" size="sm">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-muted-foreground mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <h3 className="text-lg font-medium text-foreground mb-2">
              No bookings yet
            </h3>
            <p className="text-muted-foreground mb-4">
              You haven't made any bookings yet.
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