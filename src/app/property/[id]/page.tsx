"use client";

import { useState } from "react";
import Link from "next/link";
import { PropertyImageGallery } from "@/components/property/ImageGallery";
import { PropertyInfo } from "@/components/property/PropertyInfo";
import { LandlordInfo } from "@/components/property/LandlordInfo";
import { InquiryForm } from "@/components/property/InquiryForm";

// Mock property data
const mockProperty = {
  id: 1,
  title: "Modern 2-Bedroom Apartment in Kabulonga",
  description: "Beautiful modern apartment located in the heart of Kabulonga. This spacious 2-bedroom apartment features high-quality finishes, modern appliances, and stunning views of the city. The property is fully furnished and ready for immediate occupation.",
  location: "Kabulonga, Lusaka",
  price: {
    monthly: 3500,
    yearly: 38000,
    shortTerm: 150
  },
  bedrooms: 2,
  bathrooms: 2,
  area: 85,
  type: "Apartment",
  furnished: true,
  availableFrom: "2025-01-15",
  amenities: ["WiFi", "Parking", "Security", "Generator", "Swimming Pool"],
  images: [
    "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg",
    "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg",
    "https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg"
  ],
  isFavorite: false,
  landlord: {
    name: "Sarah Banda",
    rating: 4.8,
    verified: true,
    phone: "+260 97 123 4567",
    email: "sarah.banda@rentzambia.com",
    properties: 12
  }
};

export default function PropertyDetailsPage({ params }: any) {
  const [isFavorite, setIsFavorite] = useState(mockProperty.isFavorite);
  const [showInquiryForm, setShowInquiryForm] = useState(false);
  const [isInquiryLoading, setIsInquiryLoading] = useState(false);

  const handleInquirySubmit = async (data: any) => {
    setIsInquiryLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log("Inquiry submitted:", data);
    setIsInquiryLoading(false);
    setShowInquiryForm(false);
    alert("Inquiry sent successfully! The landlord will contact you soon.");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <Link href="/tenant" className="text-xl font-bold text-foreground">RentZambia</Link>
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
        {/* Back Button */}
        <div className="mb-6">
          <Link href="/tenant" className="text-primary hover:underline flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 mr-1">
              <path fillRule="evenodd" d="M11.03 3.97a.75.75 0 0 1 0 1.06l-6.22 6.22H21a.75.75 0 0 1 0 1.5H4.81l6.22 6.22a.75.75 0 1 1-1.06 1.06l-7.5-7.5a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 0 1 1.06 0Z" clipRule="evenodd" />
            </svg>
            Back to Properties
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Images and Details */}
          <div className="lg:col-span-2">
            <PropertyImageGallery images={mockProperty.images} />
            <PropertyInfo property={mockProperty} />
          </div>

          {/* Right Column - Landlord Info and Actions */}
          <div>
            <LandlordInfo 
              landlord={mockProperty.landlord}
              onSendInquiry={() => setShowInquiryForm(true)}
              onScheduleVisit={() => alert("Schedule visit functionality to be implemented")}
              onBookNow={() => alert("Book now functionality to be implemented")}
            />
            
            {/* Availability */}
            <div className="bg-card rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-foreground mb-4">Availability</h2>
              <div className="text-muted-foreground">
                <div className="flex items-center mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 mr-2 text-success">
                    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 0 0 0-1.5h-3.75V6Z" clipRule="evenodd" />
                  </svg>
                  Available from: {new Date(mockProperty.availableFrom).toLocaleDateString()}
                </div>
                <div className="text-sm text-muted-foreground">
                  This property is currently available for booking
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Inquiry Form Modal */}
        <InquiryForm
          isOpen={showInquiryForm}
          onClose={() => setShowInquiryForm(false)}
          onSubmit={handleInquirySubmit}
          isLoading={isInquiryLoading}
        />
      </main>
    </div>
  );
}