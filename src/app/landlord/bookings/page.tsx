'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { PropertyStatusBadge } from '@/components/property/PropertyStatusBadge';

// Mock booking data
const mockBookings = [
  {
    id: 1,
    property: {
      id: 1,
      title: 'Modern 2-Bedroom Apartment in Kabulonga',
      location: 'Kabulonga, Lusaka',
      price: 3500,
      images: [
        'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg',
      ],
    },
    tenant: {
      name: 'John Mwanza',
      email: 'john.mwanza@email.com',
      phone: '+260 97 123 4567',
    },
    startDate: '2025-03-01',
    endDate: '2025-03-31',
    status: 'confirmed',
    totalPrice: 3500,
    paymentStatus: 'paid',
  },
  {
    id: 2,
    property: {
      id: 3,
      title: 'Luxury Studio in City Center',
      location: 'City Center, Lusaka',
      price: 2800,
      images: [
        'https://images.pexels.com/photos/2029667/pexels-photo-2029667.jpeg',
      ],
    },
    tenant: {
      name: 'Mary Chanda',
      email: 'mary.chanda@email.com',
      phone: '+260 96 987 6543',
    },
    startDate: '2025-02-15',
    endDate: '2025-02-28',
    status: 'pending',
    totalPrice: 2800,
    paymentStatus: 'pending',
  },
];

export default function LandlordBookingsPage() {
  const [bookings, setBookings] = useState(mockBookings);
  const [selectedBooking, setSelectedBooking] = useState<any>(null);

  const handleStatusChange = (id: number, status: string) => {
    setBookings(prev =>
      prev.map(booking =>
        booking.id === id ? { ...booking, status } : booking
      )
    );
  };

  const getPaymentStatusVariant = (status: string) => {
    switch (status) {
      case 'paid':
        return 'success';
      case 'pending':
        return 'warning';
      case 'overdue':
        return 'destructive';
      default:
        return 'default';
    }
  };

  const getPaymentStatusText = (status: string) => {
    switch (status) {
      case 'paid':
        return 'Paid';
      case 'pending':
        return 'Pending';
      case 'overdue':
        return 'Overdue';
      default:
        return status;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-foreground">Bookings</h1>
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
          <h2 className="text-2xl font-bold text-foreground">
            Property Bookings
          </h2>
          <p className="text-muted-foreground">{bookings.length} bookings</p>
        </div>

        {bookings.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Bookings List */}
            <div className="lg:col-span-1">
              <div className="bg-card rounded-lg shadow-md border border-border">
                <div className="p-4 border-b border-border">
                  <h3 className="font-semibold text-foreground">
                    All Bookings
                  </h3>
                </div>
                <div className="divide-y divide-border">
                  {bookings.map(booking => (
                    <div
                      key={booking.id}
                      className={`p-4 cursor-pointer hover:bg-muted/50 transition-colors ${
                        selectedBooking?.id === booking.id ? 'bg-muted' : ''
                      }`}
                      onClick={() => setSelectedBooking(booking)}
                    >
                      <div className="flex justify-between items-start">
                        <h4 className="font-medium text-foreground">
                          {booking.tenant.name}
                        </h4>
                        <PropertyStatusBadge status={booking.status as any} />
                      </div>
                      <p className="text-sm text-muted-foreground mt-1 truncate">
                        {booking.property.title}
                      </p>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-xs text-muted-foreground">
                          {new Date(booking.startDate).toLocaleDateString()}
                        </span>
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${
                            booking.paymentStatus === 'paid'
                              ? 'bg-success/10 text-success'
                              : booking.paymentStatus === 'pending'
                                ? 'bg-warning/10 text-warning'
                                : 'bg-destructive/10 text-destructive'
                          }`}
                        >
                          {getPaymentStatusText(booking.paymentStatus)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Booking Detail */}
            <div className="lg:col-span-2">
              {selectedBooking ? (
                <div className="bg-card rounded-lg shadow-md p-6 border border-border">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="text-xl font-bold text-foreground">
                        {selectedBooking.tenant.name}
                      </h3>
                      <p className="text-muted-foreground">
                        {selectedBooking.property.title}
                      </p>
                    </div>
                    <div className="text-right">
                      <PropertyStatusBadge
                        status={selectedBooking.status as any}
                      />
                      <div
                        className={`mt-2 text-sm px-2 py-1 rounded-full inline-block ${
                          selectedBooking.paymentStatus === 'paid'
                            ? 'bg-success/10 text-success'
                            : selectedBooking.paymentStatus === 'pending'
                              ? 'bg-warning/10 text-warning'
                              : 'bg-destructive/10 text-destructive'
                        }`}
                      >
                        {getPaymentStatusText(selectedBooking.paymentStatus)}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-foreground mb-3">
                        Property Details
                      </h4>
                      <div className="flex">
                        <div className="w-24 flex-shrink-0 mr-3">
                          <img
                            src={selectedBooking.property.images[0]}
                            alt={selectedBooking.property.title}
                            className="w-full h-full object-cover rounded"
                          />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">
                            {selectedBooking.property.title}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {selectedBooking.property.location}
                          </p>
                          <p className="font-semibold text-foreground mt-1">
                            K{selectedBooking.property.price}/mo
                          </p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-foreground mb-3">
                        Tenant Information
                      </h4>
                      <div className="space-y-2">
                        <div>
                          <p className="text-sm text-muted-foreground">Name</p>
                          <p className="font-medium text-foreground">
                            {selectedBooking.tenant.name}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Email</p>
                          <p className="font-medium text-foreground">
                            {selectedBooking.tenant.email}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Phone</p>
                          <p className="font-medium text-foreground">
                            {selectedBooking.tenant.phone}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-foreground mb-3">
                        Booking Details
                      </h4>
                      <div className="space-y-2">
                        <div>
                          <p className="text-sm text-muted-foreground">
                            Start Date
                          </p>
                          <p className="font-medium text-foreground">
                            {new Date(
                              selectedBooking.startDate
                            ).toLocaleDateString()}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">
                            End Date
                          </p>
                          <p className="font-medium text-foreground">
                            {new Date(
                              selectedBooking.endDate
                            ).toLocaleDateString()}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">
                            Total Price
                          </p>
                          <p className="font-semibold text-foreground">
                            K{selectedBooking.totalPrice}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-foreground mb-3">
                        Actions
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedBooking.status === 'pending' && (
                          <>
                            <Button
                              variant="default"
                              onClick={() =>
                                handleStatusChange(
                                  selectedBooking.id,
                                  'confirmed'
                                )
                              }
                            >
                              Confirm Booking
                            </Button>
                            <Button
                              variant="destructive"
                              onClick={() =>
                                handleStatusChange(
                                  selectedBooking.id,
                                  'cancelled'
                                )
                              }
                            >
                              Cancel Booking
                            </Button>
                          </>
                        )}
                        {selectedBooking.status === 'confirmed' && (
                          <Button
                            variant="outline"
                            onClick={() =>
                              handleStatusChange(
                                selectedBooking.id,
                                'completed'
                              )
                            }
                          >
                            Mark as Completed
                          </Button>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-2 mt-2">
                        <Button variant="outline">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-5 h-5 mr-2"
                          >
                            <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
                            <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
                          </svg>
                          Send Message
                        </Button>
                        <Button variant="outline">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-5 h-5 mr-2"
                          >
                            <path
                              fillRule="evenodd"
                              d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z"
                              clipRule="evenodd"
                            />
                          </svg>
                          Call Tenant
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-card rounded-lg shadow-md p-12 border border-border text-center">
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
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <h3 className="text-lg font-medium text-foreground mb-2">
                    Select a booking
                  </h3>
                  <p className="text-muted-foreground">
                    Choose a booking from the list to view details and manage.
                  </p>
                </div>
              )}
            </div>
          </div>
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
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <h3 className="text-lg font-medium text-foreground mb-2">
              No bookings yet
            </h3>
            <p className="text-muted-foreground">
              You don't have any property bookings at the moment.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
