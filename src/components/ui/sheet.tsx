"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface SheetProps {
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

interface SheetTriggerProps {
  children: React.ReactNode;
  asChild?: boolean;
}

interface SheetContentProps {
  children: React.ReactNode;
  className?: string;
  side?: "top" | "right" | "bottom" | "left";
}

interface SheetHeaderProps {
  children: React.ReactNode;
  className?: string;
}

interface SheetTitleProps {
  children: React.ReactNode;
  className?: string;
}

const Sheet = ({ children, open, onOpenChange }: SheetProps) => {
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div 
        className="fixed inset-0 bg-black/80"
        onClick={() => handleOpenChange(false)}
      />
      <div className="fixed inset-0 overflow-hidden">
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child) && child.type === SheetTrigger) {
            return React.cloneElement(child, {
              onOpenChange: handleOpenChange,
              isOpen: isOpen,
            } as any);
          }
          if (React.isValidElement(child) && child.type === SheetContent) {
            return child;
          }
          return child;
        })}
      </div>
    </div>
  );
};

const SheetTrigger = ({ children, asChild }: SheetTriggerProps) => {
  // The parent Sheet will inject the onOpenChange and isOpen props
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

const SheetContent = ({ children, className, side = "right" }: SheetContentProps) => {
  const sideClasses = {
    top: "inset-x-0 top-0 border-b",
    bottom: "inset-x-0 bottom-0 border-t",
    left: "inset-y-0 left-0 border-r",
    right: "inset-y-0 right-0 border-l",
  }[side];

  return (
    <div
      className={cn(
        "fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out",
        sideClasses,
        "h-full w-3/4 md:w-1/2 lg:w-1/3",
        className
      )}
    >
      {children}
    </div>
  );
};

const SheetHeader = ({ children, className }: SheetHeaderProps) => (
  <div className={cn("flex flex-col space-y-2", className)}>
    {children}
  </div>
);

const SheetTitle = ({ children, className }: SheetTitleProps) => (
  <h3 className={cn("text-lg font-semibold", className)}>
    {children}
  </h3>
);

export { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle };