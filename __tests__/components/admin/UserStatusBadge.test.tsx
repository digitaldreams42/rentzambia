// __tests__/components/admin/UserStatusBadge.test.tsx
import { render, screen } from '@testing-library/react';
import { UserStatusBadge } from '@/components/admin/UserStatusBadge';

describe('UserStatusBadge', () => {
  it('renders active status correctly', () => {
    render(<UserStatusBadge status="active" />);

    const badge = screen.getByText('Active');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('bg-success');
  });

  it('renders pending status correctly', () => {
    render(<UserStatusBadge status="pending" />);

    const badge = screen.getByText('Pending');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('bg-warning');
  });

  it('renders suspended status correctly', () => {
    render(<UserStatusBadge status="suspended" />);

    const badge = screen.getByText('Suspended');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('bg-destructive');
  });

  it('applies additional className props', () => {
    render(<UserStatusBadge status="active" className="custom-class" />);

    const badge = screen.getByText('Active');
    expect(badge).toHaveClass('custom-class');
  });
});
