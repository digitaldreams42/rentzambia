import * as React from 'react';
import { cn } from '@/lib/utils';

export interface FooterProps extends React.HTMLAttributes<HTMLElement> {}

const Footer = React.forwardRef<HTMLElement, FooterProps>(
  ({ className, ...props }, ref) => {
    return (
      <footer
        className={cn('bg-muted border-t border-border py-6', className)}
        ref={ref}
        {...props}
      />
    );
  }
);
Footer.displayName = 'Footer';

export { Footer };
