"use client";

import * as React from "react";
import { Form, FormField, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { PROPERTY_TYPES, AMENITIES } from "@/data/constants";

export interface PropertyFormData {
  title: string;
  description: string;
  location: string;
  price: {
    monthly: number;
    yearly: number;
    shortTerm: number;
  };
  bedrooms: number;
  bathrooms: number;
  area: number;
  type: string;
  furnished: boolean;
  availableFrom: string;
  amenities: string[];
  images: string[];
}

export interface PropertyFormProps {
  initialData?: PropertyFormData;
  onSubmit: (data: PropertyFormData) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

const PropertyForm = React.forwardRef<HTMLFormElement, PropertyFormProps>(
  ({ initialData, onSubmit, onCancel, isLoading }, ref) => {
    const [formData, setFormData] = React.useState<PropertyFormData>(
      initialData || {
        title: "",
        description: "",
        location: "",
        price: {
          monthly: 0,
          yearly: 0,
          shortTerm: 0
        },
        bedrooms: 1,
        bathrooms: 1,
        area: 0,
        type: "apartment",
        furnished: false,
        availableFrom: new Date().toISOString().split("T")[0],
        amenities: [],
        images: []
      }
    );

    const [selectedAmenities, setSelectedAmenities] = React.useState<string[]>(
      initialData?.amenities || []
    );

    const handleAmenityToggle = (amenity: string) => {
      const newAmenities = selectedAmenities.includes(amenity)
        ? selectedAmenities.filter(a => a !== amenity)
        : [...selectedAmenities, amenity];
      
      setSelectedAmenities(newAmenities);
      setFormData(prev => ({ ...prev, amenities: newAmenities }));
    };

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onSubmit(formData);
    };

    const handleChange = (field: string, value: any) => {
      setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handlePriceChange = (type: keyof PropertyFormData["price"], value: string) => {
      const numValue = value ? Number(value) : 0;
      setFormData(prev => ({
        ...prev,
        price: {
          ...prev.price,
          [type]: numValue
        }
      }));
    };

    return (
      <Form ref={ref} onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField>
            <FormLabel htmlFor="title">Property Title</FormLabel>
            <Input
              id="title"
              type="text"
              value={formData.title}
              onChange={(e) => handleChange("title", e.target.value)}
              placeholder="e.g., Modern 2-Bedroom Apartment in Kabulonga"
              required
            />
          </FormField>

          <FormField>
            <FormLabel htmlFor="location">Location</FormLabel>
            <Input
              id="location"
              type="text"
              value={formData.location}
              onChange={(e) => handleChange("location", e.target.value)}
              placeholder="e.g., Kabulonga, Lusaka"
              required
            />
          </FormField>

          <FormField>
            <FormLabel htmlFor="type">Property Type</FormLabel>
            <Select
              id="type"
              value={formData.type}
              onChange={(e) => handleChange("type", e.target.value)}
              required
            >
              {PROPERTY_TYPES.map(type => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </Select>
          </FormField>

          <FormField>
            <FormLabel htmlFor="furnished">Furnished</FormLabel>
            <Select
              id="furnished"
              value={formData.furnished ? "true" : "false"}
              onChange={(e) => handleChange("furnished", e.target.value === "true")}
              required
            >
              <option value="true">Yes</option>
              <option value="false">No</option>
            </Select>
          </FormField>

          <FormField>
            <FormLabel htmlFor="bedrooms">Bedrooms</FormLabel>
            <Input
              id="bedrooms"
              type="number"
              min="1"
              value={formData.bedrooms}
              onChange={(e) => handleChange("bedrooms", Number(e.target.value))}
              required
            />
          </FormField>

          <FormField>
            <FormLabel htmlFor="bathrooms">Bathrooms</FormLabel>
            <Input
              id="bathrooms"
              type="number"
              min="1"
              value={formData.bathrooms}
              onChange={(e) => handleChange("bathrooms", Number(e.target.value))}
              required
            />
          </FormField>

          <FormField>
            <FormLabel htmlFor="area">Area (sq. meters)</FormLabel>
            <Input
              id="area"
              type="number"
              min="1"
              value={formData.area}
              onChange={(e) => handleChange("area", Number(e.target.value))}
              required
            />
          </FormField>

          <FormField>
            <FormLabel htmlFor="availableFrom">Available From</FormLabel>
            <Input
              id="availableFrom"
              type="date"
              value={formData.availableFrom}
              onChange={(e) => handleChange("availableFrom", e.target.value)}
              required
            />
          </FormField>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField>
            <FormLabel htmlFor="monthlyPrice">Monthly Price (K)</FormLabel>
            <Input
              id="monthlyPrice"
              type="number"
              min="0"
              value={formData.price.monthly || ""}
              onChange={(e) => handlePriceChange("monthly", e.target.value)}
              placeholder="0"
              required
            />
          </FormField>

          <FormField>
            <FormLabel htmlFor="yearlyPrice">Yearly Price (K)</FormLabel>
            <Input
              id="yearlyPrice"
              type="number"
              min="0"
              value={formData.price.yearly || ""}
              onChange={(e) => handlePriceChange("yearly", e.target.value)}
              placeholder="0"
            />
          </FormField>

          <FormField>
            <FormLabel htmlFor="shortTermPrice">Short Term Price (K/day)</FormLabel>
            <Input
              id="shortTermPrice"
              type="number"
              min="0"
              value={formData.price.shortTerm || ""}
              onChange={(e) => handlePriceChange("shortTerm", e.target.value)}
              placeholder="0"
            />
          </FormField>
        </div>

        <FormField>
          <FormLabel htmlFor="description">Description</FormLabel>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => handleChange("description", e.target.value)}
            placeholder="Describe your property in detail..."
            rows={4}
            required
          />
        </FormField>

        <FormField>
          <FormLabel>Amenities</FormLabel>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {AMENITIES.map(amenity => (
              <label key={amenity} className="flex items-center">
                <input
                  type="checkbox"
                  checked={selectedAmenities.includes(amenity)}
                  onChange={() => handleAmenityToggle(amenity)}
                  className="mr-2"
                />
                <span className="text-foreground text-sm">{amenity}</span>
              </label>
            ))}
          </div>
        </FormField>

        <div className="flex justify-end space-x-3 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Saving..." : (initialData ? "Update Property" : "Add Property")}
          </Button>
        </div>
      </Form>
    );
  }
);
PropertyForm.displayName = "PropertyForm";

export { PropertyForm };