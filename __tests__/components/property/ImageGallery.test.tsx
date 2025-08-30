// __tests__/components/property/ImageGallery.test.tsx
import { render, screen } from '@testing-library/react';
import { PropertyImageGallery } from '@/components/property/ImageGallery';

const mockImages = [
  'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg',
  'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg',
  'https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg'
];

describe('PropertyImageGallery', () => {
  it('renders main image correctly', () => {
    render(<PropertyImageGallery images={mockImages} />);
    
    const mainImage = screen.getByAltText('Property image 1');
    expect(mainImage).toBeInTheDocument();
    expect(mainImage).toHaveAttribute('src', mockImages[0]);
  });

  it('renders thumbnail images', () => {
    render(<PropertyImageGallery images={mockImages} />);
    
    const thumbnails = screen.getAllByRole('button');
    expect(thumbnails).toHaveLength(3);
    
    thumbnails.forEach((thumbnail, index) => {
      const img = thumbnail.querySelector('img');
      expect(img).toHaveAttribute('src', mockImages[index]);
      expect(img).toHaveAttribute('alt', `Property image ${index + 1}`);
    });
  });

  it('changes main image when thumbnail is clicked', () => {
    render(<PropertyImageGallery images={mockImages} />);
    
    const thumbnails = screen.getAllByRole('button');
    const secondThumbnail = thumbnails[1];
    
    secondThumbnail.click();
    
    const mainImage = screen.getByAltText('Property image 2');
    expect(mainImage).toHaveAttribute('src', mockImages[1]);
  });

  it('highlights active thumbnail', () => {
    render(<PropertyImageGallery images={mockImages} />);
    
    const thumbnails = screen.getAllByRole('button');
    const firstThumbnail = thumbnails[0];
    
    expect(firstThumbnail).toHaveClass('border-primary');
  });

  it('passes additional className props', () => {
    render(<PropertyImageGallery images={mockImages} className="custom-class" />);
    
    const container = screen.getByRole('region');
    expect(container).toHaveClass('custom-class');
  });
});