"use client";

import { useState } from "react";
import { Form, FormField, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

// Mock landlord data
const mockLandlord = {
  id: 1,
  name: "Sarah Banda",
  email: "sarah.banda@rentzambia.com",
  phone: "+260 97 123 4567",
  role: "landlord",
  joinDate: "2024-11-22",
  bio: "Experienced landlord with multiple properties in prime locations across Lusaka. I pride myself on maintaining high-quality properties and providing excellent service to tenants.",
  company: "Banda Property Management",
  licenseNumber: "LIC-2024-001",
  propertiesManaged: 12
};

export default function LandlordProfilePage() {
  const [landlord, setLandlord] = useState(mockLandlord);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(mockLandlord);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setLandlord(formData);
    setIsEditing(false);
  };

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-foreground">My Profile</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="text-foreground hover:text-primary">
                Notifications
              </button>
              <div className="relative">
                <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium">
                  {landlord.name}
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-card rounded-lg shadow-md p-6 mb-6">
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-2xl font-bold text-foreground">
                Profile Information
              </h2>
              <Button 
                variant={isEditing ? "outline" : "default"}
                onClick={() => isEditing ? setIsEditing(false) : setIsEditing(true)}
              >
                {isEditing ? "Cancel" : "Edit Profile"}
              </Button>
            </div>

            {isEditing ? (
              <Form onSubmit={handleSave} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField>
                    <FormLabel htmlFor="name">Full Name</FormLabel>
                    <Input
                      id="name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                      required
                    />
                  </FormField>

                  <FormField>
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      required
                    />
                  </FormField>

                  <FormField>
                    <FormLabel htmlFor="phone">Phone Number</FormLabel>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleChange("phone", e.target.value)}
                      required
                    />
                  </FormField>

                  <FormField>
                    <FormLabel htmlFor="joinDate">Member Since</FormLabel>
                    <Input
                      id="joinDate"
                      type="text"
                      value={new Date(formData.joinDate).toLocaleDateString()}
                      disabled
                    />
                  </FormField>

                  <FormField>
                    <FormLabel htmlFor="company">Company Name</FormLabel>
                    <Input
                      id="company"
                      type="text"
                      value={formData.company}
                      onChange={(e) => handleChange("company", e.target.value)}
                    />
                  </FormField>

                  <FormField>
                    <FormLabel htmlFor="licenseNumber">License Number</FormLabel>
                    <Input
                      id="licenseNumber"
                      type="text"
                      value={formData.licenseNumber}
                      onChange={(e) => handleChange("licenseNumber", e.target.value)}
                    />
                  </FormField>
                </div>

                <FormField>
                  <FormLabel htmlFor="bio">Bio</FormLabel>
                  <Textarea
                    id="bio"
                    value={formData.bio}
                    onChange={(e) => handleChange("bio", e.target.value)}
                    rows={4}
                  />
                </FormField>

                <div className="flex justify-end">
                  <Button type="submit">
                    Save Changes
                  </Button>
                </div>
              </Form>
            ) : (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-muted-foreground">Full Name</p>
                    <p className="font-medium text-foreground">{landlord.name}</p>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium text-foreground">{landlord.email}</p>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground">Phone Number</p>
                    <p className="font-medium text-foreground">{landlord.phone}</p>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground">Member Since</p>
                    <p className="font-medium text-foreground">
                      {new Date(landlord.joinDate).toLocaleDateString()}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground">Company Name</p>
                    <p className="font-medium text-foreground">{landlord.company}</p>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground">License Number</p>
                    <p className="font-medium text-foreground">{landlord.licenseNumber}</p>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground">Properties Managed</p>
                    <p className="font-medium text-foreground">{landlord.propertiesManaged}</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">Bio</p>
                  <p className="font-medium text-foreground">{landlord.bio}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}