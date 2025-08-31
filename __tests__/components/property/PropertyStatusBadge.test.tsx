// __tests__/components/property/PropertyStatusBadge.test.tsx
import { render, screen } from '@testing-library/react';
import { PropertyStatusBadge } from '@/components/property/PropertyStatusBadge';

describe('PropertyStatusBadge', () => {
  it('renders available status correctly', () => {
    render(<PropertyStatusBadge status="available" />);

    const badge = screen.getByText('Available');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('bg-success');
  });

  it('renders rented status correctly', () => {
    render(<PropertyStatusBadge status="rented" />);

    const badge = screen.getByText('Rented');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('bg-secondary');
  });

  it('renders pending status correctly', () => {
    render(<PropertyStatusBadge status="pending" />);

    const badge = screen.getByText('Pending');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('bg-warning');
  });

  it('renders draft status correctly', () => {
    render(<PropertyStatusBadge status="draft" />);

    const badge = screen.getByText('Draft');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('text-foreground');
  });

  it('applies additional className props', () => {
    render(<PropertyStatusBadge status="available" className="custom-class" />);

    const badge = screen.getByText('Available');
    expect(badge).toHaveClass('custom-class');
  });
});
