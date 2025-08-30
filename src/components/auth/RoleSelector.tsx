"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface RoleSelectorProps {
  value: string;
  onValueChange: (value: string) => void;
  roles?: Array<{ value: string; label: string }>;
  className?: string;
}

const defaultRoles = [
  { value: "tenant", label: "Tenant" },
  { value: "landlord", label: "Landlord" },
  { value: "agent", label: "Agent" },
  { value: "admin", label: "Admin" },
];

const RoleSelector = React.forwardRef<HTMLDivElement, RoleSelectorProps>(
  ({ value, onValueChange, roles = defaultRoles, className }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("grid grid-cols-2 gap-2", className)}
      >
        {roles.map((role) => (
          <Button
            key={role.value}
            type="button"
            variant={value === role.value ? "default" : "outline"}
            size="sm"
            onClick={() => onValueChange(role.value)}
            className="py-2 px-4 rounded-md text-sm font-medium transition-colors"
          >
            {role.label}
          </Button>
        ))}
      </div>
    );
  }
);
RoleSelector.displayName = "RoleSelector";

export { RoleSelector };