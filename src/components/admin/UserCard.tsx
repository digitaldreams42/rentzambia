'use client';

import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export interface UserCardProps {
  user: {
    id: number;
    name: string;
    email: string;
    role: string;
    status: 'active' | 'pending' | 'suspended';
    properties: number;
    joinDate: string;
  };
  onApprove?: (id: number) => void;
  onSuspend?: (id: number) => void;
  onViewDetails?: (id: number) => void;
  className?: string;
}

const UserCard = React.forwardRef<HTMLDivElement, UserCardProps>(
  ({ user, onApprove, onSuspend, onViewDetails, className }, ref) => {
    const getStatusColor = (status: string) => {
      switch (status) {
        case 'active':
          return 'bg-success';
        case 'pending':
          return 'bg-warning';
        case 'suspended':
          return 'bg-destructive';
        default:
          return 'bg-muted';
      }
    };

    const getStatusText = (status: string) => {
      switch (status) {
        case 'active':
          return 'Active';
        case 'pending':
          return 'Pending';
        case 'suspended':
          return 'Suspended';
        default:
          return 'Unknown';
      }
    };

    return (
      <Card
        ref={ref}
        className={cn('rounded-lg border border-border', className)}
      >
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-lg font-semibold text-foreground">
            {user.name}
          </CardTitle>
          <div
            className={`px-2 py-1 rounded-full text-xs font-medium text-white ${getStatusColor(user.status)}`}
          >
            {getStatusText(user.status)}
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Email:</span>
              <span className="text-foreground">{user.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Role:</span>
              <span className="text-foreground capitalize">{user.role}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Properties:</span>
              <span className="text-foreground">{user.properties}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Join Date:</span>
              <span className="text-foreground">{user.joinDate}</span>
            </div>
          </div>

          <div className="flex gap-2 mt-4">
            {user.status === 'pending' && onApprove && (
              <Button
                variant="default"
                size="sm"
                onClick={() => onApprove(user.id)}
                className="flex-1"
              >
                Approve
              </Button>
            )}
            {user.status !== 'suspended' && onSuspend && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => onSuspend(user.id)}
                className="flex-1"
              >
                Suspend
              </Button>
            )}
            {onViewDetails && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onViewDetails(user.id)}
                className="flex-1"
              >
                Details
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }
);
UserCard.displayName = 'UserCard';

export { UserCard };
