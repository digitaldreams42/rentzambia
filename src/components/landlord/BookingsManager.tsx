'use client';

import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Icons } from '@/components/ui/icons';

interface Booking {
  id: number;
  propertyId: number;
  tenantId: number;
  tenantName: string;
  tenantEmail: string;
  tenantPhone: string;
  startDate: string;
  endDate: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  totalPrice: number;
}

interface BookingsManagerProps {
  bookings: Booking[];
  onApprove: (bookingId: number) => void;
  onCancel: (bookingId: number) => void;
}

export function BookingsManager({
  bookings,
  onApprove,
  onCancel,
}: BookingsManagerProps) {
  const getStatusBadge = (status: Booking['status']) => {
    switch (status) {
      case 'pending':
        return (
          <span className="bg-warning/10 text-warning px-2 py-1 rounded-full text-xs">
            Pending
          </span>
        );
      case 'confirmed':
        return (
          <span className="bg-success/10 text-success px-2 py-1 rounded-full text-xs">
            Confirmed
          </span>
        );
      case 'cancelled':
        return (
          <span className="bg-destructive/10 text-destructive px-2 py-1 rounded-full text-xs">
            Cancelled
          </span>
        );
      default:
        return (
          <span className="bg-muted/10 text-muted-foreground px-2 py-1 rounded-full text-xs">
            Unknown
          </span>
        );
    }
  };

  return (
    <div className="bg-card rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-foreground">
          Property Bookings
        </h2>
        <p className="text-muted-foreground">{bookings.length} bookings</p>
      </div>

      {bookings.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tenant</TableHead>
              <TableHead>Property</TableHead>
              <TableHead>Dates</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bookings.map(booking => (
              <TableRow key={booking.id}>
                <TableCell>
                  <div>
                    <p className="font-medium">{booking.tenantName}</p>
                    <p className="text-sm text-muted-foreground">
                      {booking.tenantEmail}
                    </p>
                  </div>
                </TableCell>
                <TableCell>Property #{booking.propertyId}</TableCell>
                <TableCell>
                  <div>
                    <p>{new Date(booking.startDate).toLocaleDateString()}</p>
                    <p className="text-sm text-muted-foreground">
                      to {new Date(booking.endDate).toLocaleDateString()}
                    </p>
                  </div>
                </TableCell>
                <TableCell>K{booking.totalPrice.toLocaleString()}</TableCell>
                <TableCell>{getStatusBadge(booking.status)}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    {booking.status === 'pending' && (
                      <>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onApprove(booking.id)}
                        >
                          Approve
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onCancel(booking.id)}
                        >
                          Cancel
                        </Button>
                      </>
                    )}
                    {booking.status === 'confirmed' && (
                      <Button variant="outline" size="sm" disabled>
                        Confirmed
                      </Button>
                    )}
                    {booking.status === 'cancelled' && (
                      <Button variant="outline" size="sm" disabled>
                        Cancelled
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No bookings yet</p>
        </div>
      )}
    </div>
  );
}
