// __tests__/components/landlord/PropertyCard.test.tsx
import { render, screen } from '@testing-library/react';
import { LandlordPropertyCard } from '@/components/landlord/PropertyCard';

const mockProperty = {
  id: 1,
  title: 'Modern 2-Bedroom Apartment',
  location: 'Kabulonga, Lusaka',
  price: 3500,
  status: 'available' as const,
  views: 124,
  inquiries: 8,
  bookings: 2,
  images: ['https://example.com/image.jpg'],
};

describe('LandlordPropertyCard', () => {
  it('renders property information correctly', () => {
    render(
      <LandlordPropertyCard
        property={mockProperty}
        onEdit={jest.fn()}
        onDelete={jest.fn()}
      />
    );

    expect(screen.getByText('Modern 2-Bedroom Apartment')).toBeInTheDocument();
    expect(screen.getByText('Kabulonga, Lusaka')).toBeInTheDocument();
    expect(screen.getByText('K3500/mo')).toBeInTheDocument();
  });

  it('displays property statistics', () => {
    render(
      <LandlordPropertyCard
        property={mockProperty}
        onEdit={jest.fn()}
        onDelete={jest.fn()}
      />
    );

    expect(screen.getByText('8 inquiries')).toBeInTheDocument();
    expect(screen.getByText('124 views')).toBeInTheDocument();
  });

  it('handles edit button click', () => {
    const mockEdit = jest.fn();
    render(
      <LandlordPropertyCard
        property={mockProperty}
        onEdit={mockEdit}
        onDelete={jest.fn()}
      />
    );

    const editButton = screen.getByRole('button', { name: 'Edit' });
    editButton.click();

    expect(mockEdit).toHaveBeenCalledWith(1);
  });

  it('handles delete button click', () => {
    const mockDelete = jest.fn();
    render(
      <LandlordPropertyCard
        property={mockProperty}
        onEdit={jest.fn()}
        onDelete={mockDelete}
      />
    );

    const deleteButton = screen.getByRole('button', { name: 'Delete' });
    deleteButton.click();

    expect(mockDelete).toHaveBeenCalledWith(1);
  });
});
