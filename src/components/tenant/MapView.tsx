"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export function MapView() {
  const [isLoading, setIsLoading] = useState(false);

  const handleLoadMap = () => {
    setIsLoading(true);
    // Simulate map loading
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="bg-card rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-foreground">Map View</h2>
        <Button variant="outline" size="sm" onClick={handleLoadMap} disabled={isLoading}>
          {isLoading ? "Loading..." : "Refresh Map"}
        </Button>
      </div>
      
      <div className="bg-muted rounded-lg h-96 flex items-center justify-center">
        {isLoading ? (
          <div className="text-muted-foreground">Loading map...</div>
        ) : (
          <div className="text-center">
            <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mx-auto mb-2" />
            <p className="text-muted-foreground">Map visualization would appear here</p>
            <p className="text-sm text-muted-foreground mt-1">
              Interactive map showing property locations
            </p>
          </div>
        )}
      </div>
      
      <div className="mt-4 text-sm text-muted-foreground">
        <p>Click on property markers to view details</p>
      </div>
    </div>
  );
}