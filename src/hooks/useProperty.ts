import * as React from "react";

interface Property {
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
  landlord: {
    name: string;
    rating: number;
    verified: boolean;
    phone: string;
    email: string;
    properties: number;
  };
}

interface PropertyFilters {
  searchQuery: string;
  minPrice: number | null;
  maxPrice: number | null;
  bedrooms: number | null;
  propertyType: string | null;
  furnished: boolean | null;
}

interface UsePropertyReturn {
  properties: Property[];
  loading: boolean;
  error: string | null;
  filters: PropertyFilters;
  setFilters: React.Dispatch<React.SetStateAction<PropertyFilters>>;
  fetchProperties: () => Promise<void>;
  toggleFavorite: (id: number) => void;
}

const mockProperties: Property[] = [
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
      name: "Grace Mulenga",
      rating: 4.9,
      verified: true,
      phone: "+260 95 456 7890",
      email: "grace.mulenga@rentzambia.com",
      properties: 8
    }
  }
];

export function useProperty(): UsePropertyReturn {
  const [properties, setProperties] = React.useState<Property[]>(mockProperties);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [filters, setFilters] = React.useState<PropertyFilters>({
    searchQuery: "",
    minPrice: null,
    maxPrice: null,
    bedrooms: null,
    propertyType: null,
    furnished: null
  });

  const fetchProperties = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setProperties(mockProperties);
    } catch (err) {
      setError("Failed to fetch properties");
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = (id: number) => {
    setProperties(prev => 
      prev.map(property => 
        property.id === id 
          ? { ...property, isFavorite: !property.isFavorite } 
          : property
      )
    );
  };

  React.useEffect(() => {
    fetchProperties();
  }, []);

  return {
    properties,
    loading,
    error,
    filters,
    setFilters,
    fetchProperties,
    toggleFavorite
  };
}