'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

// Mock inquiry data
const mockInquiries = [
  {
    id: 1,
    property: {
      id: 1,
      title: 'Modern 2-Bedroom Apartment in Kabulonga',
    },
    user: {
      name: 'John Mwanza',
      email: 'john.mwanza@email.com',
      phone: '+260 97 123 4567',
    },
    message: "I'm interested in this property. When can I schedule a visit?",
    date: '2025-02-15',
    status: 'pending',
  },
  {
    id: 2,
    property: {
      id: 3,
      title: 'Luxury Studio in City Center',
    },
    user: {
      name: 'Mary Chanda',
      email: 'mary.chanda@email.com',
      phone: '+260 96 987 6543',
    },
    message:
      "Is this property still available? I'm looking for a short-term rental for March.",
    date: '2025-02-14',
    status: 'responded',
  },
  {
    id: 3,
    property: {
      id: 1,
      title: 'Modern 2-Bedroom Apartment in Kabulonga',
    },
    user: {
      name: 'David Phiri',
      email: 'david.phiri@agency.com',
      phone: '+260 95 456 7890',
    },
    message:
      'Representing a client who is very interested in this property. Can we arrange a viewing next week?',
    date: '2025-02-12',
    status: 'closed',
  },
];

export default function LandlordInquiriesPage() {
  const [inquiries, setInquiries] = useState(mockInquiries);
  const [selectedInquiry, setSelectedInquiry] = useState<any>(null);

  const handleStatusChange = (id: number, status: string) => {
    setInquiries(prev =>
      prev.map(inquiry =>
        inquiry.id === id ? { ...inquiry, status } : inquiry
      )
    );
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'pending':
        return 'warning';
      case 'responded':
        return 'success';
      case 'closed':
        return 'secondary';
      default:
        return 'default';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Pending';
      case 'responded':
        return 'Responded';
      case 'closed':
        return 'Closed';
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
              <h1 className="text-xl font-bold text-foreground">Inquiries</h1>
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
            Property Inquiries
          </h2>
          <p className="text-muted-foreground">{inquiries.length} inquiries</p>
        </div>

        {inquiries.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Inquiries List */}
            <div className="lg:col-span-1">
              <div className="bg-card rounded-lg shadow-md border border-border">
                <div className="p-4 border-b border-border">
                  <h3 className="font-semibold text-foreground">
                    All Inquiries
                  </h3>
                </div>
                <div className="divide-y divide-border">
                  {inquiries.map(inquiry => (
                    <div
                      key={inquiry.id}
                      className={`p-4 cursor-pointer hover:bg-muted/50 transition-colors ${
                        selectedInquiry?.id === inquiry.id ? 'bg-muted' : ''
                      }`}
                      onClick={() => setSelectedInquiry(inquiry)}
                    >
                      <div className="flex justify-between items-start">
                        <h4 className="font-medium text-foreground">
                          {inquiry.user.name}
                        </h4>
                        <Badge variant={getStatusVariant(inquiry.status)}>
                          {getStatusText(inquiry.status)}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1 truncate">
                        {inquiry.property.title}
                      </p>
                      <p className="text-xs text-muted-foreground mt-2">
                        {new Date(inquiry.date).toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Inquiry Detail */}
            <div className="lg:col-span-2">
              {selectedInquiry ? (
                <div className="bg-card rounded-lg shadow-md p-6 border border-border">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="text-xl font-bold text-foreground">
                        {selectedInquiry.user.name}
                      </h3>
                      <p className="text-muted-foreground">
                        {selectedInquiry.property.title}
                      </p>
                    </div>
                    <Badge variant={getStatusVariant(selectedInquiry.status)}>
                      {getStatusText(selectedInquiry.status)}
                    </Badge>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Contact Information
                      </p>
                      <p className="font-medium text-foreground">
                        {selectedInquiry.user.email}
                      </p>
                      <p className="font-medium text-foreground">
                        {selectedInquiry.user.phone}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-muted-foreground">
                        Inquiry Date
                      </p>
                      <p className="font-medium text-foreground">
                        {new Date(selectedInquiry.date).toLocaleDateString()}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-muted-foreground mb-2">
                        Message
                      </p>
                      <div className="bg-muted p-4 rounded-md">
                        <p className="text-foreground">
                          {selectedInquiry.message}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 pt-4">
                      <Button
                        variant={
                          selectedInquiry.status === 'pending'
                            ? 'default'
                            : 'outline'
                        }
                        onClick={() =>
                          handleStatusChange(selectedInquiry.id, 'pending')
                        }
                      >
                        Mark as Pending
                      </Button>
                      <Button
                        variant={
                          selectedInquiry.status === 'responded'
                            ? 'default'
                            : 'outline'
                        }
                        onClick={() =>
                          handleStatusChange(selectedInquiry.id, 'responded')
                        }
                      >
                        Mark as Responded
                      </Button>
                      <Button
                        variant={
                          selectedInquiry.status === 'closed'
                            ? 'default'
                            : 'outline'
                        }
                        onClick={() =>
                          handleStatusChange(selectedInquiry.id, 'closed')
                        }
                      >
                        Close Inquiry
                      </Button>
                    </div>

                    <div className="flex flex-wrap gap-2 pt-2">
                      <Button>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-5 h-5 mr-2"
                        >
                          <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
                          <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
                        </svg>
                        Send Email
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
                        Call
                      </Button>
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
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <h3 className="text-lg font-medium text-foreground mb-2">
                    Select an inquiry
                  </h3>
                  <p className="text-muted-foreground">
                    Choose an inquiry from the list to view details and respond.
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
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            <h3 className="text-lg font-medium text-foreground mb-2">
              No inquiries yet
            </h3>
            <p className="text-muted-foreground">
              You don't have any property inquiries at the moment.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
