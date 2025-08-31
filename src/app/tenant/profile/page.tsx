'use client';

import { useState } from 'react';
import { Form, FormField, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

// Mock user data
const mockUser = {
  id: 1,
  name: 'John Mwanza',
  email: 'john.mwanza@email.com',
  phone: '+260 97 123 4567',
  role: 'tenant',
  joinDate: '2025-01-15',
  bio: "I'm a professional looking for a comfortable place to live in Lusaka. I work in the city center and prefer properties that are well-connected to public transport.",
  preferences: {
    propertyType: 'apartment',
    budget: '2000-4000',
    location: 'Kabulonga, Roma, City Center',
    moveInDate: '2025-03-01',
  },
};

export default function TenantProfilePage() {
  const [user, setUser] = useState(mockUser);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(mockUser);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setUser(formData);
    setIsEditing(false);
  };

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePreferencesChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [field]: value,
      },
    }));
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
                  {user.name}
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
                variant={isEditing ? 'outline' : 'default'}
                onClick={() =>
                  isEditing ? setIsEditing(false) : setIsEditing(true)
                }
              >
                {isEditing ? 'Cancel' : 'Edit Profile'}
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
                      onChange={e => handleChange('name', e.target.value)}
                      required
                    />
                  </FormField>

                  <FormField>
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={e => handleChange('email', e.target.value)}
                      required
                    />
                  </FormField>

                  <FormField>
                    <FormLabel htmlFor="phone">Phone Number</FormLabel>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={e => handleChange('phone', e.target.value)}
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
                </div>

                <FormField>
                  <FormLabel htmlFor="bio">Bio</FormLabel>
                  <Textarea
                    id="bio"
                    value={formData.bio}
                    onChange={e => handleChange('bio', e.target.value)}
                    rows={4}
                  />
                </FormField>

                <div className="border-t border-border pt-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">
                    Rental Preferences
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField>
                      <FormLabel htmlFor="propertyType">
                        Preferred Property Type
                      </FormLabel>
                      <Input
                        id="propertyType"
                        type="text"
                        value={formData.preferences.propertyType}
                        onChange={e =>
                          handlePreferencesChange(
                            'propertyType',
                            e.target.value
                          )
                        }
                      />
                    </FormField>

                    <FormField>
                      <FormLabel htmlFor="budget">Budget Range (K)</FormLabel>
                      <Input
                        id="budget"
                        type="text"
                        value={formData.preferences.budget}
                        onChange={e =>
                          handlePreferencesChange('budget', e.target.value)
                        }
                      />
                    </FormField>

                    <FormField>
                      <FormLabel htmlFor="location">
                        Preferred Locations
                      </FormLabel>
                      <Input
                        id="location"
                        type="text"
                        value={formData.preferences.location}
                        onChange={e =>
                          handlePreferencesChange('location', e.target.value)
                        }
                      />
                    </FormField>

                    <FormField>
                      <FormLabel htmlFor="moveInDate">
                        Preferred Move-in Date
                      </FormLabel>
                      <Input
                        id="moveInDate"
                        type="date"
                        value={formData.preferences.moveInDate}
                        onChange={e =>
                          handlePreferencesChange('moveInDate', e.target.value)
                        }
                      />
                    </FormField>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button type="submit">Save Changes</Button>
                </div>
              </Form>
            ) : (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-muted-foreground">Full Name</p>
                    <p className="font-medium text-foreground">{user.name}</p>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium text-foreground">{user.email}</p>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground">
                      Phone Number
                    </p>
                    <p className="font-medium text-foreground">{user.phone}</p>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground">
                      Member Since
                    </p>
                    <p className="font-medium text-foreground">
                      {new Date(user.joinDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">Bio</p>
                  <p className="font-medium text-foreground">{user.bio}</p>
                </div>

                <div className="border-t border-border pt-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">
                    Rental Preferences
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Preferred Property Type
                      </p>
                      <p className="font-medium text-foreground">
                        {user.preferences.propertyType}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-muted-foreground">
                        Budget Range (K)
                      </p>
                      <p className="font-medium text-foreground">
                        {user.preferences.budget}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-muted-foreground">
                        Preferred Locations
                      </p>
                      <p className="font-medium text-foreground">
                        {user.preferences.location}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-muted-foreground">
                        Preferred Move-in Date
                      </p>
                      <p className="font-medium text-foreground">
                        {new Date(
                          user.preferences.moveInDate
                        ).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
