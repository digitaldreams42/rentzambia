'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface ReceiptGeneratorProps {
  booking: any;
  onDownload: () => void;
}

export function ReceiptGenerator({
  booking,
  onDownload,
}: ReceiptGeneratorProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">View Receipt</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Payment Receipt</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="border-b pb-4">
            <h3 className="text-lg font-semibold">RentZambia</h3>
            <p className="text-sm text-muted-foreground">
              Property Rental Platform
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Receipt Number</p>
              <p className="font-medium">
                RZ-{booking.id}-{Date.now().toString().slice(-4)}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Date</p>
              <p className="font-medium">{new Date().toLocaleDateString()}</p>
            </div>
          </div>

          <div className="border-t border-b py-4">
            <div className="flex justify-between mb-2">
              <span>Property:</span>
              <span className="font-medium">{booking.propertyTitle}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Rental Period:</span>
              <span className="font-medium">
                {booking.startDate} to {booking.endDate}
              </span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Amount Paid:</span>
              <span className="font-medium">
                K{booking.totalPrice.toLocaleString()}
              </span>
            </div>
          </div>

          <div className="flex justify-between font-semibold">
            <span>Total:</span>
            <span>K{booking.totalPrice.toLocaleString()}</span>
          </div>

          <div className="pt-4">
            <Button onClick={onDownload} className="w-full">
              Download Receipt
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
