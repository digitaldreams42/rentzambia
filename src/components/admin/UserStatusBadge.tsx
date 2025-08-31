import * as React from 'react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export interface UserStatusBadgeProps {
  status: 'active' | 'pending' | 'suspended';
  className?: string;
}

const UserStatusBadge = React.forwardRef<HTMLDivElement, UserStatusBadgeProps>(
  ({ status, className }, ref) => {
    const getStatusVariant = () => {
      switch (status) {
        case 'active':
          return 'success';
        case 'pending':
          return 'warning';
        case 'suspended':
          return 'destructive';
        default:
          return 'default';
      }
    };

    const getStatusText = () => {
      switch (status) {
        case 'active':
          return 'Active';
        case 'pending':
          return 'Pending';
        case 'suspended':
          return 'Suspended';
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
  }
);
UserStatusBadge.displayName = 'UserStatusBadge';

export { UserStatusBadge };
