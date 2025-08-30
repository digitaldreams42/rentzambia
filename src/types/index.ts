export interface User {
  id: number;
  name: string;
  email: string;
  phone?: string;
  role: "tenant" | "landlord" | "agent" | "admin";
  status: "active" | "pending" | "suspended";
  properties: number;
  joinDate: string;
}

export interface Landlord {
  id: number;
  name: string;
  rating: number;
  verified: boolean;
  phone: string;
  email: string;
  properties: number;
}

export interface Property {
  id: number;
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
  isFavorite: boolean;
  landlord: Landlord;
}

export interface Inquiry {
  id: number;
  propertyId: number;
  userId: number;
  userName: string;
  userEmail: string;
  userPhone: string;
  message: string;
  date: string;
  status: "pending" | "responded" | "closed";
}

export interface Booking {
  id: number;
  propertyId: number;
  tenantId: number;
  startDate: string;
  endDate: string;
  status: "pending" | "confirmed" | "cancelled";
  totalPrice: number;
}

export interface Notification {
  id: number;
  title: string;
  message: string;
  date: string;
  read: boolean;
  type: "info" | "success" | "warning" | "error";
}