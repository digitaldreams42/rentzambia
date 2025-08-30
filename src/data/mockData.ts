export const mockProperties = [
  {
    id: 1,
    title: "Modern 2-Bedroom Apartment in Kabulonga",
    description: "Beautiful modern apartment located in the heart of Kabulonga. This spacious 2-bedroom apartment features high-quality finishes, modern appliances, and stunning views of the city. The property is fully furnished and ready for immediate occupation.",
    location: "Kabulonga, Lusaka",
    price: {
      monthly: 3500,
      yearly: 38000,
      shortTerm: 150
    },
    bedrooms: 2,
    bathrooms: 2,
    area: 85,
    type: "Apartment",
    furnished: true,
    availableFrom: "2025-01-15",
    amenities: ["WiFi", "Parking", "Security", "Generator", "Swimming Pool"],
    images: [
      "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg"
    ],
    isFavorite: false,
    landlord: {
      id: 101,
      name: "Sarah Banda",
      rating: 4.8,
      verified: true,
      phone: "+260 97 123 4567",
      email: "sarah.banda@rentzambia.com",
      properties: 12
    }
  },
  {
    id: 2,
    title: "Spacious 3-Bedroom House in Roma",
    description: "Charming 3-bedroom house in the desirable Roma neighborhood. This family-friendly home features a large garden, modern kitchen, and ample parking space. Perfect for families or professionals looking for a quiet yet accessible location.",
    location: "Roma, Lusaka",
    price: {
      monthly: 4200,
      yearly: 45000,
      shortTerm: 180
    },
    bedrooms: 3,
    bathrooms: 2,
    area: 120,
    type: "House",
    furnished: false,
    availableFrom: "2025-02-01",
    amenities: ["Garden", "Parking", "Security", "Water Tank"],
    images: [
      "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg"
    ],
    isFavorite: true,
    landlord: {
      id: 102,
      name: "Michael Phiri",
      rating: 4.6,
      verified: true,
      phone: "+260 96 987 6543",
      email: "michael.phiri@rentzambia.com",
      properties: 5
    }
  },
  {
    id: 3,
    title: "Luxury Studio in City Center",
    description: "Contemporary studio apartment in the heart of Lusaka's business district. Features floor-to-ceiling windows, premium finishes, and access to building amenities including a gym and rooftop terrace. Ideal for professionals seeking convenience and style.",
    location: "City Center, Lusaka",
    price: {
      monthly: 2800,
      yearly: 29000,
      shortTerm: 120
    },
    bedrooms: 1,
    bathrooms: 1,
    area: 45,
    type: "Studio",
    furnished: true,
    availableFrom: "2025-01-20",
    amenities: ["Gym", "Rooftop Terrace", "Concierge", "WiFi", "Parking"],
    images: [
      "https://images.pexels.com/photos/2029667/pexels-photo-2029667.jpeg"
    ],
    isFavorite: false,
    landlord: {
      id: 103,
      name: "Grace Mulenga",
      rating: 4.9,
      verified: true,
      phone: "+260 95 456 7890",
      email: "grace.mulenga@rentzambia.com",
      properties: 8
    }
  }
];

export const mockUsers = [
  {
    id: 1,
    name: "John Mwanza",
    email: "john.mwanza@email.com",
    role: "tenant",
    status: "active",
    properties: 0,
    joinDate: "2025-01-15"
  },
  {
    id: 2,
    name: "Sarah Banda",
    email: "sarah.banda@rentzambia.com",
    role: "landlord",
    status: "active",
    properties: 3,
    joinDate: "2024-11-22"
  },
  {
    id: 3,
    name: "David Phiri",
    email: "david.phiri@agency.com",
    role: "agent",
    status: "pending",
    properties: 0,
    joinDate: "2025-02-10"
  },
  {
    id: 4,
    name: "Mary Chanda",
    email: "mary.chanda@rentzambia.com",
    role: "landlord",
    status: "suspended",
    properties: 2,
    joinDate: "2024-09-05"
  }
];

export const mockInquiries = [
  {
    id: 1,
    propertyId: 1,
    userId: 1,
    userName: "John Mwanza",
    userEmail: "john.mwanza@email.com",
    userPhone: "+260 97 123 4567",
    message: "I'm interested in this property. When can I schedule a visit?",
    date: "2025-02-15",
    status: "pending"
  },
  {
    id: 2,
    propertyId: 2,
    userId: 3,
    userName: "David Phiri",
    userEmail: "david.phiri@agency.com",
    userPhone: "+260 96 987 6543",
    message: "Representing a client who is very interested in this property. Can we arrange a viewing next week?",
    date: "2025-02-14",
    status: "responded"
  }
];