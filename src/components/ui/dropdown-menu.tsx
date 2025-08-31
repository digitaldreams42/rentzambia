"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface DropdownMenuProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
  align?: "start" | "end" | "center";
}

export interface DropdownMenuTriggerProps {
  children: React.ReactNode;
  asChild?: boolean;
}

export interface DropdownMenuContentProps {
  children: React.ReactNode;
  className?: string;
  align?: "start" | "end" | "center";
}

export interface DropdownMenuItemProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const DropdownMenu = ({ open, onOpenChange, children }: DropdownMenuProps) => {
  const [isOpen, setIsOpen] = React.useState(open || false);

  React.useEffect(() => {
    if (open !== undefined) {
      setIsOpen(open);
    }
  }, [open]);

  const handleOpenChange = (newOpen: boolean) => {
    setIsOpen(newOpen);
    onOpenChange?.(newOpen);
  };

  return (
    <div className="relative">
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child) && child.type === DropdownMenuTrigger) {
          return React.cloneElement(child, {
            onOpenChange: handleOpenChange,
            isOpen: isOpen,
          } as any);
        }
        if (React.isValidElement(child) && child.type === DropdownMenuContent) {
          return isOpen ? child : null;
        }
        return child;
      })}
    </div>
  );
};

const DropdownMenuTrigger = ({ children, asChild }: DropdownMenuTriggerProps) => {
  // The parent DropdownMenu will inject the onOpenChange and isOpen props
  // We don't need to handle them directly here
  
  if (asChild && React.isValidElement(children)) {
    return children;
  }

  return (
    <button>
      {children}
    </button>
  );
};

const DropdownMenuContent = ({ children, className, align = "end" }: DropdownMenuContentProps) => {
  const alignmentClass = {
    start: "left-0",
    end: "right-0",
    center: "left-1/2 transform -translate-x-1/2",
  }[align];

  return (
    <div
      className={cn(
        "absolute z-50 mt-2 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95",
        alignmentClass,
        className
      )}
    >
      {children}
    </div>
  );
};

const DropdownMenuItem = React.forwardRef<HTMLDivElement, DropdownMenuItemProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className
      )}
      {...props}
    />
  )
);
DropdownMenuItem.displayName = "DropdownMenuItem";

export { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem };