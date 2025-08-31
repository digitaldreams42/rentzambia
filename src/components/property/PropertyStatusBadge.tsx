import * as React from 'react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export interface PropertyStatusBadgeProps {
  status: 'available' | 'rented' | 'pending' | 'draft';
  className?: string;
}

const PropertyStatusBadge = React.forwardRef<
  HTMLDivElement,
  PropertyStatusBadgeProps
>(({ status, className }, ref) => {
  const getStatusVariant = () => {
    switch (status) {
      case 'available':
        return 'success';
      case 'rented':
        return 'secondary';
      case 'pending':
        return 'warning';
      case 'draft':
        return 'outline';
      default:
        return 'default';
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'available':
        return 'Available';
      case 'rented':
        return 'Rented';
      case 'pending':
        return 'Pending';
      case 'draft':
        return 'Draft';
      default:
        return status;
    }
  };

  return (
    <Badge
      ref={ref}
      variant={getStatusVariant()}
      className={cn('capitalize', className)}
    >
      {getStatusText()}
    </Badge>
  );
});
PropertyStatusBadge.displayName = 'PropertyStatusBadge';

export { PropertyStatusBadge };
