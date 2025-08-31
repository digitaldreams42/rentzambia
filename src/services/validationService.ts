// Validation service

export class ValidationService {
  // Email validation
  static isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Phone number validation for Zambia
  static isValidZambianPhone(phone: string): boolean {
    const phoneRegex = /^(\+260|0)(9[5-7]|7[5-9])\d{7}$/;
    return phoneRegex.test(phone);
  }

  // Password validation
  static isValidPassword(password: string): { valid: boolean; message?: string } {
    if (password.length < 8) {
      return { valid: false, message: "Password must be at least 8 characters long" };
    }
    
    if (!/[A-Z]/.test(password)) {
      return { valid: false, message: "Password must contain at least one uppercase letter" };
    }
    
    if (!/[a-z]/.test(password)) {
      return { valid: false, message: "Password must contain at least one lowercase letter" };
    }
    
    if (!/\d/.test(password)) {
      return { valid: false, message: "Password must contain at least one number" };
    }
    
    return { valid: true };
  }

  // Price validation
  static isValidPrice(price: number): boolean {
    return price > 0 && price <= 100000; // Reasonable range for rental prices in Zambia
  }

  // Date validation
  static isValidDate(dateString: string): boolean {
    const date = new Date(dateString);
    return date instanceof Date && !isNaN(date.getTime());
  }

  // Future date validation
  static isFutureDate(dateString: string): boolean {
    const date = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date >= today;
  }

  // Property validation
  static validateProperty(property: any): { valid: boolean; errors: string[] } {
    const errors: string[] = [];
    
    if (!property.title || property.title.trim().length === 0) {
      errors.push("Property title is required");
    }
    
    if (!property.location || property.location.trim().length === 0) {
      errors.push("Property location is required");
    }
    
    if (!property.type || property.type.trim().length === 0) {
      errors.push("Property type is required");
    }
    
    if (property.bedrooms === undefined || property.bedrooms < 0) {
      errors.push("Number of bedrooms must be a non-negative number");
    }
    
    if (property.bathrooms === undefined || property.bathrooms < 0) {
      errors.push("Number of bathrooms must be a non-negative number");
    }
    
    if (property.area === undefined || property.area <= 0) {
      errors.push("Property area must be a positive number");
    }
    
    if (!property.price || !this.isValidPrice(property.price.monthly)) {
      errors.push("Monthly price must be between 1 and 100,000 ZMW");
    }
    
    if (!property.price || !this.isValidPrice(property.price.yearly)) {
      errors.push("Yearly price must be between 1 and 100,000 ZMW");
    }
    
    if (!property.price || !this.isValidPrice(property.price.shortTerm)) {
      errors.push("Short-term price must be between 1 and 100,000 ZMW");
    }
    
    if (!property.availableFrom || !this.isValidDate(property.availableFrom)) {
      errors.push("Available from date is required and must be a valid date");
    }
    
    if (property.availableFrom && !this.isFutureDate(property.availableFrom)) {
      errors.push("Available from date must be today or in the future");
    }
    
    return {
      valid: errors.length === 0,
      errors
    };
  }

  // User validation
  static validateUser(user: any): { valid: boolean; errors: string[] } {
    const errors: string[] = [];
    
    if (!user.name || user.name.trim().length === 0) {
      errors.push("Full name is required");
    }
    
    if (!user.email || !this.isValidEmail(user.email)) {
      errors.push("Valid email is required");
    }
    
    if (user.phone && !this.isValidZambianPhone(user.phone)) {
      errors.push("Phone number must be a valid Zambian number");
    }
    
    if (user.role && !["tenant", "landlord", "agent", "admin"].includes(user.role)) {
      errors.push("Invalid user role");
    }
    
    return {
      valid: errors.length === 0,
      errors
    };
  }
}