# Component Library Documentation

This document provides detailed information about the reusable components in the RentZambia application.

## UI Components

### Button

A versatile button component with multiple variants and sizes.

**Props:**
- `variant`: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
- `size`: "default" | "sm" | "lg" | "icon"
- All standard button HTML attributes

**Usage:**
```tsx
import { Button } from "@/components/ui/button";

<Button variant="default" size="lg">
  Click me
</Button>
```

### Card

A flexible card component for displaying content in a container.

**Props:**
- All standard div HTML attributes

**Subcomponents:**
- `CardHeader` - Header section of the card
- `CardTitle` - Title within the card header
- `CardDescription` - Description within the card header
- `CardContent` - Main content area
- `CardFooter` - Footer section

**Usage:**
```tsx
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
  </CardHeader>
  <CardContent>
    Card content goes here
  </CardContent>
</Card>
```

### Input

A styled input component with consistent styling.

**Props:**
- All standard input HTML attributes

**Usage:**
```tsx
import { Input } from "@/components/ui/input";

<Input type="text" placeholder="Enter text" />
```

### Textarea

A styled textarea component.

**Props:**
- All standard textarea HTML attributes

**Usage:**
```tsx
import { Textarea } from "@/components/ui/textarea";

<Textarea placeholder="Enter your message" rows={4} />
```

### Select

A styled select dropdown component.

**Props:**
- All standard select HTML attributes

**Usage:**
```tsx
import { Select } from "@/components/ui/select";

<Select>
  <option value="option1">Option 1</option>
  <option value="option2">Option 2</option>
</Select>
```

### Badge

A small badge component for displaying status or labels.

**Props:**
- `variant`: "default" | "secondary" | "destructive" | "outline" | "success" | "warning"
- All standard div HTML attributes

**Usage:**
```tsx
import { Badge } from "@/components/ui/badge";

<Badge variant="success">Active</Badge>
```

### Alert

A component for displaying important messages or notifications.

**Props:**
- `variant`: "default" | "destructive" | "success" | "warning"
- All standard div HTML attributes

**Subcomponents:**
- `AlertTitle` - Title of the alert
- `AlertDescription` - Detailed description

**Usage:**
```tsx
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

<Alert variant="success">
  <AlertTitle>Success!</AlertTitle>
  <AlertDescription>Your action was completed successfully.</AlertDescription>
</Alert>
```

## Layout Components

### Header

A consistent header component for application layouts.

**Props:**
- `variant`: "default" | "primary" | "secondary"
- `size`: "default" | "sm" | "lg"
- All standard header HTML attributes

**Usage:**
```tsx
import { Header } from "@/components/ui/header";

<Header variant="primary" size="lg">
  Application Header
</Header>
```

### Footer

A footer component for application layouts.

**Props:**
- All standard footer HTML attributes

**Usage:**
```tsx
import { Footer } from "@/components/ui/footer";

<Footer>
  Application Footer Content
</Footer>
```

### Modal

A modal dialog component for displaying overlays.

**Props:**
- `isOpen`: boolean - Controls visibility
- `onClose`: () => void - Callback when modal is closed
- All standard div HTML attributes

**Usage:**
```tsx
import { Modal } from "@/components/ui/modal";

<Modal isOpen={isOpen} onClose={handleClose}>
  <div>Modal Content</div>
</Modal>
```

## Form Components

### Form

A form container with consistent spacing.

**Props:**
- All standard form HTML attributes

**Usage:**
```tsx
import { Form } from "@/components/ui/form";

<Form onSubmit={handleSubmit}>
  {/* Form fields */}
</Form>
```

### FormField

A container for form fields with consistent spacing.

**Props:**
- All standard div HTML attributes

**Usage:**
```tsx
import { FormField } from "@/components/ui/form";

<FormField>
  <label htmlFor="fieldName">Field Label</label>
  <input id="fieldName" type="text" />
</FormField>
```

## Custom Components

### PropertyCard

A card component for displaying property listings.

**Props:**
- `property`: Property object with all property details
- `onFavoriteToggle`: (id: number) => void - Callback for favorite toggle
- All standard div HTML attributes

**Usage:**
```tsx
import { PropertyCard } from "@/components/tenant/PropertyCard";

<PropertyCard 
  property={propertyData} 
  onFavoriteToggle={handleFavoriteToggle}
/>
```

### LandlordPropertyCard

A card component for landlords to manage their properties.

**Props:**
- `property`: Property object with management details
- `onEdit`: (id: number) => void - Callback for edit action
- `onDelete`: (id: number) => void - Callback for delete action
- All standard div HTML attributes

**Usage:**
```tsx
import { LandlordPropertyCard } from "@/components/landlord/PropertyCard";

<LandlordPropertyCard 
  property={propertyData} 
  onEdit={handleEdit}
  onDelete={handleDelete}
/>
```

### UserCard

A card component for displaying user information in admin panel.

**Props:**
- `user`: User object with all user details
- `onApprove`: (id: number) => void - Callback for approval
- `onSuspend`: (id: number) => void - Callback for suspension
- `onViewDetails`: (id: number) => void - Callback for viewing details
- All standard div HTML attributes

**Usage:**
```tsx
import { UserCard } from "@/components/admin/UserCard";

<UserCard 
  user={userData} 
  onApprove={handleApprove}
  onSuspend={handleSuspend}
  onViewDetails={handleViewDetails}
/>
```

### StatsCard

A card component for displaying statistics.

**Props:**
- `title`: string - Card title
- `value`: string | number - Statistical value
- `description`: string - Description of the statistic
- `icon`: ReactNode - Icon to display
- `trend`: "up" | "down" - Trend direction
- `trendValue`: string - Trend value
- All standard div HTML attributes

**Usage:**
```tsx
import { StatsCard } from "@/components/landlord/StatsCard";

<StatsCard 
  title="Total Properties"
  value={12}
  description="All properties you've listed"
  icon={<HomeIcon />}
  trend="up"
  trendValue="+2"
/>
```

## Hook Components

### AuthForm

A form component for authentication flows.

**Props:**
- `type`: "login" | "register" - Form type
- `onSubmit`: (data: any) => void - Submit callback
- `isLoading`: boolean - Loading state

**Usage:**
```tsx
import { AuthForm } from "@/components/auth/AuthForm";

<AuthForm 
  type="login" 
  onSubmit={handleLogin} 
  isLoading={isLoading}
/>
```

### RoleSelector

A component for selecting user roles.

**Props:**
- `value`: string - Selected role
- `onValueChange`: (value: string) => void - Change callback
- `roles`: Array of role objects
- All standard div HTML attributes

**Usage:**
```tsx
import { RoleSelector } from "@/components/auth/RoleSelector";

<RoleSelector 
  value={selectedRole} 
  onValueChange={setSelectedRole}
  roles={roleOptions}
/>
```

## Dashboard Components

### DashboardOverview

A component for displaying dashboard statistics.

**Props:**
- `stats`: Array of stat objects
- All standard div HTML attributes

**Usage:**
```tsx
import { DashboardOverview } from "@/components/dashboard/DashboardOverview";

<DashboardOverview stats={statsData} />
```

### RecentActivity

A component for displaying recent activity.

**Props:**
- `activities`: Array of activity objects
- `onViewAll`: () => void - Callback for view all action
- All standard div HTML attributes

**Usage:**
```tsx
import { RecentActivity } from "@/components/dashboard/RecentActivity";

<RecentActivity 
  activities={activityData} 
  onViewAll={handleViewAll}
/>
```

## Utility Components

### LoadingSpinner

A loading spinner component.

**Props:**
- `size`: "sm" | "md" | "lg" - Spinner size
- All standard div HTML attributes

**Usage:**
```tsx
import { LoadingSpinner } from "@/components/ui/loading-spinner";

<LoadingSpinner size="lg" />
```

### PropertyStatusBadge

A badge component for property status.

**Props:**
- `status`: "available" | "rented" | "pending" | "draft" - Property status
- All standard div HTML attributes

**Usage:**
```tsx
import { PropertyStatusBadge } from "@/components/property/PropertyStatusBadge";

<PropertyStatusBadge status="available" />
```

### UserStatusBadge

A badge component for user status.

**Props:**
- `status`: "active" | "pending" | "suspended" - User status
- All standard div HTML attributes

**Usage:**
```tsx
import { UserStatusBadge } from "@/components/admin/UserStatusBadge";

<UserStatusBadge status="active" />
```

## Best Practices

1. **Consistent Styling**: All components use Tailwind CSS classes for consistent styling
2. **Accessibility**: Components follow WCAG guidelines for accessibility
3. **Type Safety**: All components are fully typed with TypeScript
4. **Responsive Design**: Components are designed to work on all screen sizes
5. **Performance**: Components are optimized for performance with React.memo where appropriate
6. **Reusability**: Components are designed to be reusable across different parts of the application

## Customization

To customize the appearance of components:
1. Modify the Tailwind CSS configuration in `tailwind.config.ts`
2. Update CSS variables in `src/app/globals.css`
3. Extend component variants in the component files
4. Create new variants using the `cva` utility

## Testing

Components should be tested with:
1. Unit tests for isolated functionality
2. Integration tests for component interactions
3. Visual regression tests for UI consistency
4. Accessibility tests for WCAG compliance

## Contributing

When adding new components:
1. Follow the existing component structure and patterns
2. Ensure proper TypeScript typing
3. Add comprehensive documentation
4. Include usage examples
5. Write tests for the component
6. Follow accessibility guidelines