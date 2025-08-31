'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const headerVariants = cva(
  'flex items-center justify-between px-4 py-3 border-b',
  {
    variants: {
      variant: {
        default: 'bg-background border-border',
        primary: 'bg-primary text-primary-foreground border-primary',
        secondary: 'bg-secondary text-secondary-foreground border-secondary',
      },
      size: {
        default: 'h-16',
        sm: 'h-12',
        lg: 'h-20',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface HeaderProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof headerVariants> {}

const Header = React.forwardRef<HTMLElement, HeaderProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <header
        className={cn(headerVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Header.displayName = 'Header';

export { Header, headerVariants };
