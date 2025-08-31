// __tests__/components/tenant/PropertyCard.test.tsx
import { render, screen } from '@testing-library/react';
import { PropertyCard } from '@/components/tenant/PropertyCard';

const mockProperty = {
  id: 1,
  title: 'Modern 2-Bedroom Apartment',
  location: 'Kabulonga, Lusaka',
  price: 3500,
  bedrooms: 2,
  bathrooms: 2,
  area: 85,
  type: 'Apartment',
  furnished: true,
  images: ['https://example.com/image.jpg'],
  isFavorite: false,
  landlord: {
    name: 'Sarah Banda',
    rating: 4.8,
  },
};

describe('PropertyCard', () => {
  it('renders property information correctly', () => {
    render(<PropertyCard property={mockProperty} />);

    expect(screen.getByText('Modern 2-Bedroom Apartment')).toBeInTheDocument();
    expect(screen.getByText('Kabulonga, Lusaka')).toBeInTheDocument();
    expect(screen.getByText('K3500/mo')).toBeInTheDocument();
    expect(screen.getByText('Sarah Banda')).toBeInTheDocument();
  });

  it('displays property details', () => {
    render(<PropertyCard property={mockProperty} />);

    expect(screen.getByText('2 bed')).toBeInTheDocument();
    expect(screen.getByText('2 bath')).toBeInTheDocument();
    expect(screen.getByText('85 m²')).toBeInTheDocument();
  });

  it('handles favorite toggle', () => {
    const mockToggle = jest.fn();
    render(
      <PropertyCard property={mockProperty} onFavoriteToggle={mockToggle} />
    );

    // The favorite button doesn't have an accessible name, so we'll select it by its class
    const favoriteButton = screen.getByRole('button', { hidden: true });
    favoriteButton.click();

    expect(mockToggle).toHaveBeenCalledWith(1);
  });
});
