"use client";

import { useState } from "react";
import { Form, FormField, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

interface Settings {
  siteName: string;
  siteDescription: string;
  contactEmail: string;
  contactPhone: string;
  currency: string;
  timezone: string;
  maintenanceMode: boolean;
  allowRegistration: boolean;
  requireEmailVerification: boolean;
  maxPropertiesPerLandlord: number;
  commissionRate: number;
}

// Mock settings data
const mockSettings: Settings = {
  siteName: "RentZambia",
  siteDescription: "RentZambia connects tenants with landlords and agents to make property rental simple, fast, and secure in Zambia.",
  contactEmail: "support@rentzambia.com",
  contactPhone: "+260 97 123 4567",
  currency: "K",
  timezone: "Africa/Lusaka",
  maintenanceMode: false,
  allowRegistration: true,
  requireEmailVerification: true,
  maxPropertiesPerLandlord: 10,
  commissionRate: 5
};

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<Settings>(mockSettings);
  const [formData, setFormData] = useState<Settings>(mockSettings);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSettings(formData);
    alert("Settings saved successfully!");
  };

  const handleChange = <K extends keyof Settings>(field: K, value: Settings[K]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleToggle = (field: keyof Settings) => {
    setFormData(prev => ({ ...prev, [field]: !prev[field] }));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-foreground">Site Settings</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="text-foreground hover:text-primary">
                Notifications
              </button>
              <div className="relative">
                <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium">
                  Admin User
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
            <h2 className="text-2xl font-bold text-foreground mb-6">
              General Settings
            </h2>

            <Form onSubmit={handleSave} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField>
                  <FormLabel htmlFor="siteName">Site Name</FormLabel>
                  <Input
                    id="siteName"
                    type="text"
                    value={formData.siteName}
                    onChange={(e) => handleChange("siteName", e.target.value)}
                    required
                  />
                </FormField>

                <FormField>
                  <FormLabel htmlFor="contactEmail">Contact Email</FormLabel>
                  <Input
                    id="contactEmail"
                    type="email"
                    value={formData.contactEmail}
                    onChange={(e) => handleChange("contactEmail", e.target.value)}
                    required
                  />
                </FormField>

                <FormField>
                  <FormLabel htmlFor="contactPhone">Contact Phone</FormLabel>
                  <Input
                    id="contactPhone"
                    type="tel"
                    value={formData.contactPhone}
                    onChange={(e) => handleChange("contactPhone", e.target.value)}
                    required
                  />
                </FormField>

                <FormField>
                  <FormLabel htmlFor="currency">Currency Symbol</FormLabel>
                  <Input
                    id="currency"
                    type="text"
                    value={formData.currency}
                    onChange={(e) => handleChange("currency", e.target.value)}
                    required
                  />
                </FormField>

                <FormField>
                  <FormLabel htmlFor="timezone">Timezone</FormLabel>
                  <Select 
                    value={formData.timezone} 
                    onValueChange={(value) => handleChange("timezone", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select timezone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Africa/Lusaka">Africa/Lusaka</SelectItem>
                      <SelectItem value="Africa/Harare">Africa/Harare</SelectItem>
                      <SelectItem value="UTC">UTC</SelectItem>
                    </SelectContent>
                  </Select>
                </FormField>

                <FormField>
                  <FormLabel htmlFor="commissionRate">Commission Rate (%)</FormLabel>
                  <Input
                    id="commissionRate"
                    type="number"
                    min="0"
                    max="100"
                    step="0.1"
                    value={formData.commissionRate}
                    onChange={(e) => handleChange("commissionRate", Number(e.target.value))}
                    required
                  />
                </FormField>

                <FormField>
                  <FormLabel htmlFor="maxPropertiesPerLandlord">Max Properties Per Landlord</FormLabel>
                  <Input
                    id="maxPropertiesPerLandlord"
                    type="number"
                    min="1"
                    value={formData.maxPropertiesPerLandlord}
                    onChange={(e) => handleChange("maxPropertiesPerLandlord", Number(e.target.value))}
                    required
                  />
                </FormField>
              </div>

              <FormField>
                <FormLabel htmlFor="siteDescription">Site Description</FormLabel>
                <Textarea
                  id="siteDescription"
                  value={formData.siteDescription}
                  onChange={(e) => handleChange("siteDescription", e.target.value)}
                  rows={3}
                  required
                />
              </FormField>

              <div className="border-t border-border pt-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Site Features
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-foreground">Maintenance Mode</p>
                      <p className="text-sm text-muted-foreground">
                        Temporarily disable the site for maintenance
                      </p>
                    </div>
                    <Button
                      variant={formData.maintenanceMode ? "default" : "outline"}
                      onClick={() => handleToggle("maintenanceMode")}
                      type="button"
                    >
                      {formData.maintenanceMode ? "Enabled" : "Disabled"}
                    </Button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-foreground">Allow Registration</p>
                      <p className="text-sm text-muted-foreground">
                        Allow new users to register
                      </p>
                    </div>
                    <Button
                      variant={formData.allowRegistration ? "default" : "outline"}
                      onClick={() => handleToggle("allowRegistration")}
                      type="button"
                    >
                      {formData.allowRegistration ? "Enabled" : "Disabled"}
                    </Button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-foreground">Require Email Verification</p>
                      <p className="text-sm text-muted-foreground">
                        Require users to verify their email address
                      </p>
                    </div>
                    <Button
                      variant={formData.requireEmailVerification ? "default" : "outline"}
                      onClick={() => handleToggle("requireEmailVerification")}
                      type="button"
                    >
                      {formData.requireEmailVerification ? "Enabled" : "Disabled"}
                    </Button>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button type="submit">
                  Save Settings
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </main>
    </div>
  );
}