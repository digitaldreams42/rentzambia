"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ImageUploader } from "@/components/landlord/ImageUploader";

interface PropertyFormProps {
  property?: any;
  onSubmit: (data: any) => void;
  onCancel: () => void;
  loading?: boolean;
}

export function PropertyForm({ property, onSubmit, onCancel, loading }: PropertyFormProps) {
  const [title, setTitle] = useState(property?.title || "");
  const [description, setDescription] = useState(property?.description || "");
  const [location, setLocation] = useState(property?.location || "");
  const [propertyType, setPropertyType] = useState(property?.type || "");
  const [bedrooms, setBedrooms] = useState(property?.bedrooms || 1);
  const [bathrooms, setBathrooms] = useState(property?.bathrooms || 1);
  const [area, setArea] = useState(property?.area || 0);
  const [monthlyPrice, setMonthlyPrice] = useState(property?.price?.monthly || 0);
  const [yearlyPrice, setYearlyPrice] = useState(property?.price?.yearly || 0);
  const [shortTermPrice, setShortTermPrice] = useState(property?.price?.shortTerm || 0);
  const [furnished, setFurnished] = useState(property?.furnished || false);
  const [availableFrom, setAvailableFrom] = useState(property?.availableFrom || "");
  const [amenities, setAmenities] = useState<string[]>(property?.amenities || []);
  const [images, setImages] = useState<string[]>(property?.images || []);

  const availableAmenities = [
    "WiFi",
    "Parking",
    "Security",
    "Generator",
    "Swimming Pool",
    "Gym",
    "Air Conditioning",
    "Balcony",
    "Garden",
    "Water Tank",
    "CCTV",
    "Elevator"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      title,
      description,
      location,
      type: propertyType,
      bedrooms: parseInt(bedrooms.toString()),
      bathrooms: parseInt(bathrooms.toString()),
      area: parseInt(area.toString()),
      price: {
        monthly: parseInt(monthlyPrice.toString()),
        yearly: parseInt(yearlyPrice.toString()),
        shortTerm: parseInt(shortTermPrice.toString())
      },
      furnished,
      availableFrom,
      amenities,
      images
    });
  };

  const handleAmenityChange = (amenity: string, checked: boolean) => {
    if (checked) {
      setAmenities([...amenities, amenity]);
    } else {
      setAmenities(amenities.filter(a => a !== amenity));
    }
  };

  const handleImageUpload = (imageUrl: string) => {
    setImages([...images, imageUrl]);
  };

  const handleImageRemove = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="title">Property Title</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Modern 2-Bedroom Apartment in Kabulonga"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Kabulonga, Lusaka"
            required
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe your property in detail..."
          rows={4}
          required
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <Label htmlFor="propertyType">Property Type</Label>
          <Select value={propertyType} onValueChange={setPropertyType}>
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Apartment">Apartment</SelectItem>
              <SelectItem value="House">House</SelectItem>
              <SelectItem value="Studio">Studio</SelectItem>
              <SelectItem value="Room">Room</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="bedrooms">Bedrooms</Label>
          <Input
            id="bedrooms"
            type="number"
            min="0"
            value={bedrooms}
            onChange={(e) => setBedrooms(parseInt(e.target.value) || 0)}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="bathrooms">Bathrooms</Label>
          <Input
            id="bathrooms"
            type="number"
            min="0"
            value={bathrooms}
            onChange={(e) => setBathrooms(parseInt(e.target.value) || 0)}
            required
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <Label htmlFor="area">Area (sqm)</Label>
          <Input
            id="area"
            type="number"
            min="0"
            value={area}
            onChange={(e) => setArea(parseInt(e.target.value) || 0)}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="availableFrom">Available From</Label>
          <Input
            id="availableFrom"
            type="date"
            value={availableFrom}
            onChange={(e) => setAvailableFrom(e.target.value)}
            required
          />
        </div>
        
        <div className="space-y-2 flex items-end">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="furnished"
              checked={furnished}
              onCheckedChange={(checked) => setFurnished(checked as boolean)}
            />
            <Label htmlFor="furnished">Furnished</Label>
          </div>
        </div>
      </div>
      
      <div className="space-y-2">
        <Label>Pricing</Label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="monthlyPrice" className="text-sm">Monthly (K)</Label>
            <Input
              id="monthlyPrice"
              type="number"
              min="0"
              value={monthlyPrice}
              onChange={(e) => setMonthlyPrice(parseInt(e.target.value) || 0)}
              required
            />
          </div>
          <div>
            <Label htmlFor="yearlyPrice" className="text-sm">Yearly (K)</Label>
            <Input
              id="yearlyPrice"
              type="number"
              min="0"
              value={yearlyPrice}
              onChange={(e) => setYearlyPrice(parseInt(e.target.value) || 0)}
              required
            />
          </div>
          <div>
            <Label htmlFor="shortTermPrice" className="text-sm">Short-term (K/day)</Label>
            <Input
              id="shortTermPrice"
              type="number"
              min="0"
              value={shortTermPrice}
              onChange={(e) => setShortTermPrice(parseInt(e.target.value) || 0)}
              required
            />
          </div>
        </div>
      </div>
      
      <div className="space-y-2">
        <Label>Amenities</Label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {availableAmenities.map((amenity) => (
            <div key={amenity} className="flex items-center space-x-2">
              <Checkbox
                id={`amenity-${amenity}`}
                checked={amenities.includes(amenity)}
                onCheckedChange={(checked) => handleAmenityChange(amenity, checked as boolean)}
              />
              <Label htmlFor={`amenity-${amenity}`} className="text-sm">
                {amenity}
              </Label>
            </div>
          ))}
        </div>
      </div>
      
      <div className="space-y-2">
        <Label>Property Images</Label>
        <ImageUploader 
          onImageUpload={handleImageUpload}
          onImageRemove={handleImageRemove}
          images={images}
        />
      </div>
      
      <div className="flex justify-end space-x-4 pt-4">
        <Button type="button" variant="outline" onClick={onCancel} disabled={loading}>
          Cancel
        </Button>
        <Button type="submit" disabled={loading}>
          {loading ? "Saving..." : (property ? "Update Property" : "Add Property")}
        </Button>
      </div>
    </form>
  );
}