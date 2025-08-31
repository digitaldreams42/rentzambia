"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface DialogProps extends React.HTMLAttributes<HTMLDivElement> {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

interface DialogTriggerProps extends React.HTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

interface DialogContentProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

interface DialogHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

interface DialogTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  className?: string;
}

const Dialog = ({ open, onOpenChange, children }: DialogProps) => {
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
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div 
        className="fixed inset-0 bg-black/80"
        onClick={() => handleOpenChange(false)}
      />
      <div 
        className="relative bg-background rounded-lg shadow-lg w-full max-w-lg p-6"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

const DialogTrigger = ({ asChild, children, ...props }: DialogTriggerProps) => {
  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, props);
  }
  
  return (
    <button {...props}>
      {children}
    </button>
  );
};

const DialogContent = ({ className, children, ...props }: DialogContentProps) => (
  <div className={cn("relative", className)} {...props}>
    {children}
  </div>
);

const DialogHeader = ({ className, children, ...props }: DialogHeaderProps) => (
  <div className={cn("flex flex-col space-y-1.5 text-center sm:text-left", className)} {...props}>
    {children}
  </div>
);

const DialogTitle = ({ className, children, ...props }: DialogTitleProps) => (
  <h3 className={cn("text-lg font-semibold leading-none tracking-tight", className)} {...props}>
    {children}
  </h3>
);

export { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle };