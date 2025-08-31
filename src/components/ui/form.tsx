import * as React from 'react';
import { cn } from '@/lib/utils';

const Form = React.forwardRef<
  HTMLFormElement,
  React.FormHTMLAttributes<HTMLFormElement>
>(({ className, ...props }, ref) => {
  return <form className={cn('space-y-4', className)} ref={ref} {...props} />;
});
Form.displayName = 'Form';

const FormField = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return <div className={cn('space-y-2', className)} ref={ref} {...props} />;
});
FormField.displayName = 'FormField';

const FormLabel = React.forwardRef<
  HTMLLabelElement,
  React.LabelHTMLAttributes<HTMLLabelElement>
>(({ className, ...props }, ref) => {
  return (
    <label
      className={cn('block text-sm font-medium text-foreground', className)}
      ref={ref}
      {...props}
    />
  );
});
FormLabel.displayName = 'FormLabel';

const FormMessage = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  return (
    <p
      className={cn('text-sm text-destructive', className)}
      ref={ref}
      {...props}
    />
  );
});
FormMessage.displayName = 'FormMessage';

export { Form, FormField, FormLabel, FormMessage };
