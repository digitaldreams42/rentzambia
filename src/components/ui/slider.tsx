"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface SliderProps extends React.HTMLAttributes<HTMLDivElement> {
  min?: number;
  max?: number;
  step?: number;
  value?: number[];
  onValueChange?: (value: number[]) => void;
  className?: string;
}

const Slider = React.forwardRef<HTMLDivElement, SliderProps>(
  ({ min = 0, max = 100, step = 1, value = [0], onValueChange, className, ...props }, ref) => {
    const [values, setValues] = React.useState(value);
    const sliderRef = React.useRef<HTMLDivElement>(null);

    const updateValue = (index: number, newValue: number) => {
      const newValues = [...values];
      newValues[index] = Math.min(max, Math.max(min, newValue));
      setValues(newValues);
      onValueChange?.(newValues);
    };

    const handleMouseDown = (index: number) => (e: React.MouseEvent) => {
      e.preventDefault();
      const handleMouseMove = (moveEvent: MouseEvent) => {
        if (!sliderRef.current) return;
        
        const rect = sliderRef.current.getBoundingClientRect();
        const percentage = (moveEvent.clientX - rect.left) / rect.width;
        const newValue = min + percentage * (max - min);
        updateValue(index, Math.round(newValue / step) * step);
      };

      const handleMouseUp = () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    };

    return (
      <div
        ref={sliderRef}
        className={cn("relative flex w-full touch-none select-none items-center", className)}
        {...props}
      >
        <div className="relative h-2 w-full grow overflow-hidden rounded-full bg-secondary">
          <div 
            className="absolute h-full bg-primary" 
            style={{ 
              left: `${((values[0] - min) / (max - min)) * 100}%`,
              width: values.length > 1 
                ? `${((values[1] - values[0]) / (max - min)) * 100}%` 
                : '0%'
            }}
          />
        </div>
        {values.map((value, index) => (
          <button
            key={index}
            className="absolute top-1/2 h-5 w-5 rounded-full border-2 border-primary bg-background shadow transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
            style={{ 
              left: `${((value - min) / (max - min)) * 100}%`,
              transform: 'translateX(-50%) translateY(-50%)'
            }}
            onMouseDown={handleMouseDown(index)}
          />
        ))}
      </div>
    );
  }
);
Slider.displayName = "Slider";

export { Slider };