"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onCheckedChange?: (checked: boolean) => void;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, onCheckedChange, ...props }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onCheckedChange?.(e.target.checked);
      props.onChange?.(e);
    };

    return (
      <input
        type="checkbox"
        className={cn(
          "h-4 w-4 rounded border-border text-primary focus:ring-primary",
          className
        )}
        ref={ref}
        {...props}
        onChange={handleChange}
      />
    );
  }
);
Checkbox.displayName = "Checkbox";

export { Checkbox };