// This file would contain actual API service calls in a real application
// For now, we'll use mock data and simulate API calls

import { mockProperties, mockUsers, mockInquiries } from "@/data/mockData";
import { Property, User, Inquiry } from "@/types";

export class ApiService {
  // Property services
  static async getProperties(): Promise<Property[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockProperties;
  }

  static async getPropertyById(id: number): Promise<Property | undefined> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockProperties.find(property => property.id === id);
  }

  static async createProperty(property: Omit<Property, "id">): Promise<Property> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    const newProperty = {
      ...property,
      id: Math.max(...mockProperties.map(p => p.id)) + 1
    };
    return newProperty;
  }

  static async updateProperty(id: number, updates: Partial<Property>): Promise<Property> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 600));
    const index = mockProperties.findIndex(property => property.id === id);
    if (index !== -1) {
      mockProperties[index] = { ...mockProperties[index], ...updates };
      return mockProperties[index];
    }
    throw new Error("Property not found");
  }

  static async deleteProperty(id: number): Promise<void> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 400));
    const index = mockProperties.findIndex(property => property.id === id);
    if (index !== -1) {
      mockProperties.splice(index, 1);
    }
  }

  // User services
  static async getUsers(): Promise<User[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockUsers;
  }

  static async getUserById(id: number): Promise<User | undefined> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockUsers.find(user => user.id === id);
  }

  static async updateUserStatus(id: number, status: User["status"]): Promise<User> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 400));
    const index = mockUsers.findIndex(user => user.id === id);
    if (index !== -1) {
      // Create a new object with the updated status, preserving the correct type
      const user = mockUsers[index];
      const updatedUser = {
        ...user,
        status
      } as typeof user;
      mockUsers[index] = updatedUser;
      return updatedUser;
    }
    throw new Error("User not found");
  }

  // Inquiry services
  static async getInquiries(): Promise<Inquiry[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockInquiries;
  }

  static async createInquiry(inquiry: Omit<Inquiry, "id">): Promise<Inquiry> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 600));
    const newInquiry = {
      ...inquiry,
      id: Math.max(...mockInquiries.map(i => i.id)) + 1
    };
    return newInquiry;
  }
}