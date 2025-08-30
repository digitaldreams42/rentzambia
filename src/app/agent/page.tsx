"use client";

import { useState } from "react";
import Link from "next/link";

// Mock property data
const mockProperties = [
  {
    id: 1,
    title: "Modern 2-Bedroom Apartment in Kabulonga",
    location: "Kabulonga, Lusaka",
    price: 3500,
    landlord: "Sarah Banda",
    status: "published",
    views: 124,
    inquiries: 8,
    bookings: 2
  },
  {
    id: 2,
    title: "Spacious 3-Bedroom House in Roma",
    location: "Roma, Lusaka",
    price: 4200,
    landlord: "Michael Phiri",
    status: "published",
    views: 87,
    inquiries: 5,
    bookings: 1
  },
  {
    id: 3,
    title: "Luxury Studio in City Center",
    location: "City Center, Lusaka",
    price: 2800,
    landlord: "Grace Mulenga",
    status: "draft",
    views: 0,
    inquiries: 0,
    bookings: 0
  }
];

export default function AgentDashboard() {
  const [properties, setProperties] = useState(mockProperties);

  const handleStatusChange = (id: number, newStatus: string) => {
    setProperties(prev => prev.map(property => 
      property.id === id ? { ...property, status: newStatus } : property
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
              <nav className="ml-8 hidden md:flex space-x-8">
                <Link href="/agent" className="text-primary font-medium">Dashboard</Link>
                <Link href="#" className="text-foreground hover:text-primary">Properties</Link>
                <Link href="#" className="text-foreground hover:text-primary">Landlords</Link>
                <Link href="#" className="text-foreground hover:text-primary">Inquiries</Link>
                <Link href="#" className="text-foreground hover:text-primary">Bookings</Link>
                <Link href="#" className="text-foreground hover:text-primary">Analytics</Link>
              </nav>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="text-foreground hover:text-primary">
                Notifications
              </button>
              <div className="relative">
                <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium">
                  David Phiri
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Agent Dashboard</h1>
            <p className="text-muted-foreground mt-2">Manage properties for multiple landlords</p>
          </div>
          <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md font-medium hover:bg-primary/90 transition-colors">
            + Add Property
          </button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <div className="bg-card rounded-lg shadow-md p-6 border border-border">
            <div className="text-3xl font-bold text-foreground">3</div>
            <div className="text-muted-foreground">Managed Landlords</div>
          </div>
          <div className="bg-card rounded-lg shadow-md p-6 border border-border">
            <div className="text-3xl font-bold text-foreground">3</div>
            <div className="text-muted-foreground">Total Properties</div>
          </div>
          <div className="bg-card rounded-lg shadow-md p-6 border border-border">
            <div className="text-3xl font-bold text-foreground">211</div>
            <div className="text-muted-foreground">Total Views</div>
          </div>
          <div className="bg-card rounded-lg shadow-md p-6 border border-border">
            <div className="text-3xl font-bold text-foreground">13</div>
            <div className="text-muted-foreground">Total Inquiries</div>
          </div>
          <div className="bg-card rounded-lg shadow-md p-6 border border-border">
            <div className="text-3xl font-bold text-foreground">3</div>
            <div className="text-muted-foreground">Total Bookings</div>
          </div>
        </div>

        {/* Properties Table */}
        <div className="bg-card rounded-lg shadow-md overflow-hidden border border-border">
          <div className="px-6 py-4 border-b border-border">
            <h2 className="text-xl font-semibold text-foreground">Managed Properties</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Property</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Landlord</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Views</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Inquiries</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Bookings</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {properties.map((property) => (
                  <tr key={property.id} className="hover:bg-muted/50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-foreground">{property.title}</div>
                      <div className="text-sm text-muted-foreground">{property.location}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                      {property.landlord}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                      K{property.price}/mo
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        property.status === 'published' ? 'bg-success/10 text-success' :
                        property.status === 'draft' ? 'bg-warning/10 text-warning' :
                        'bg-muted text-muted-foreground'
                      }`}>
                        {property.status.charAt(0).toUpperCase() + property.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                      {property.views}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                      {property.inquiries}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                      {property.bookings}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button className="text-primary hover:text-primary/80">
                          Edit
                        </button>
                        <button 
                          onClick={() => {
                            const newStatus = property.status === 'published' ? 'unpublished' : 'published';
                            handleStatusChange(property.id, newStatus);
                          }}
                          className="text-foreground hover:text-foreground/80"
                        >
                          {property.status === 'published' ? 'Unpublish' : 'Publish'}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="px-6 py-4 border-t border-border">
            <button className="text-primary hover:text-primary/80 font-medium">
              View all properties →
            </button>
          </div>
        </div>

        {/* Managed Landlords */}
        <div className="mt-8 bg-card rounded-lg shadow-md overflow-hidden border border-border">
          <div className="px-6 py-4 border-b border-border">
            <h2 className="text-xl font-semibold text-foreground">Managed Landlords</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Landlord</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Phone</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Properties</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                <tr className="hover:bg-muted/50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-foreground">Sarah Banda</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                    sarah.banda@rentzambia.com
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                    +260 97 123 4567
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                    1
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-success/10 text-success">
                      Active
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-primary hover:text-primary/80">
                      View Details
                    </button>
                  </td>
                </tr>
                <tr className="hover:bg-muted/50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-foreground">Michael Phiri</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                    michael.phiri@rentzambia.com
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                    +260 96 234 5678
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                    1
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-success/10 text-success">
                      Active
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-primary hover:text-primary/80">
                      View Details
                    </button>
                  </td>
                </tr>
                <tr className="hover:bg-muted/50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-foreground">Grace Mulenga</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                    grace.mulenga@rentzambia.com
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                    +260 95 345 6789
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                    1
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-warning/10 text-warning">
                      Pending
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-primary hover:text-primary/80">
                      View Details
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}