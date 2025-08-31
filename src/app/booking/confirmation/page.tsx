'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ReceiptGenerator } from '@/components/booking/ReceiptGenerator';

// Mock booking data
const mockBooking = {
  id: 1,
  propertyTitle: 'Modern 2-Bedroom Apartment in Kabulonga',
  startDate: '2025-03-01',
  endDate: '2026-02-28',
  totalPrice: 3500,
  status: 'confirmed',
};

export default function BookingConfirmationPage() {
  const handleDownloadReceipt = () => {
    // In a real implementation, this would generate and download a PDF receipt
    alert('Receipt downloaded successfully!');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <Link
                href="/tenant"
                className="text-xl font-bold text-foreground"
              >
                RentZambia
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <div className="bg-success/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-8 h-8 text-success"
              >
                <path
                  fillRule="evenodd"
                  d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Booking Confirmed!
            </h1>
            <p className="text-muted-foreground">
              Your rental agreement has been successfully processed.
            </p>
          </div>

          <div className="bg-card rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">
              Booking Details
            </h2>

            <div className="space-y-4">
              <div className="flex justify-between border-b pb-2">
                <span className="text-muted-foreground">Property</span>
                <span className="font-medium">{mockBooking.propertyTitle}</span>
              </div>

              <div className="flex justify-between border-b pb-2">
                <span className="text-muted-foreground">Rental Period</span>
                <span className="font-medium">
                  {mockBooking.startDate} to {mockBooking.endDate}
                </span>
              </div>

              <div className="flex justify-between border-b pb-2">
                <span className="text-muted-foreground">Amount Paid</span>
                <span className="font-medium">
                  K{mockBooking.totalPrice.toLocaleString()}
                </span>
              </div>

              <div className="flex justify-between border-b pb-2">
                <span className="text-muted-foreground">Booking Status</span>
                <span className="font-medium text-success capitalize">
                  {mockBooking.status}
                </span>
              </div>

              <div className="flex justify-between pt-2">
                <span className="text-muted-foreground">Receipt Number</span>
                <span className="font-medium">
                  RZ-{mockBooking.id}-{Date.now().toString().slice(-4)}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <ReceiptGenerator
              booking={mockBooking}
              onDownload={handleDownloadReceipt}
            />
            <Button>
              <Link href="/tenant">Back to Dashboard</Link>
            </Button>
          </div>

          <div className="mt-8 text-center text-sm text-muted-foreground">
            <p>
              A confirmation email has been sent to your registered email
              address.
            </p>
            <p className="mt-2">
              If you have any questions, please contact our support team.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
