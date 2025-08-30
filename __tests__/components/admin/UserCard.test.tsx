// __tests__/components/admin/UserCard.test.tsx
import { render, screen } from '@testing-library/react';
import { UserCard } from '@/components/admin/UserCard';

const mockUser = {
  id: 1,
  name: 'John Mwanza',
  email: 'john.mwanza@email.com',
  role: 'tenant' as const,
  status: 'active' as const,
  properties: 0,
  joinDate: '2025-01-15'
};

describe('UserCard', () => {
  it('renders user information correctly', () => {
    render(
      <UserCard 
        user={mockUser} 
        onApprove={jest.fn()} 
        onSuspend={jest.fn()} 
        onViewDetails={jest.fn()} 
      />
    );
    
    expect(screen.getByText('John Mwanza')).toBeInTheDocument();
    expect(screen.getByText('john.mwanza@email.com')).toBeInTheDocument();
    expect(screen.getByText('Tenant')).toBeInTheDocument();
  });

  it('displays user status badge', () => {
    render(
      <UserCard 
        user={mockUser} 
        onApprove={jest.fn()} 
        onSuspend={jest.fn()} 
        onViewDetails={jest.fn()} 
      />
    );
    
    expect(screen.getByText('Active')).toBeInTheDocument();
  });

  it('shows approve button for pending users', () => {
    const pendingUser = { ...mockUser, status: 'pending' as const };
    render(
      <UserCard 
        user={pendingUser} 
        onApprove={jest.fn()} 
        onSuspend={jest.fn()} 
        onViewDetails={jest.fn()} 
      />
    );
    
    expect(screen.getByRole('button', { name: 'Approve' })).toBeInTheDocument();
  });

  it('shows suspend button for active users', () => {
    render(
      <UserCard 
        user={mockUser} 
        onApprove={jest.fn()} 
        onSuspend={jest.fn()} 
        onViewDetails={jest.fn()} 
      />
    );
    
    expect(screen.getByRole('button', { name: 'Suspend' })).toBeInTheDocument();
  });

  it('handles view details button click', () => {
    const mockViewDetails = jest.fn();
    render(
      <UserCard 
        user={mockUser} 
        onApprove={jest.fn()} 
        onSuspend={jest.fn()} 
        onViewDetails={mockViewDetails} 
      />
    );
    
    const viewButton = screen.getByRole('button', { name: 'Details' });
    viewButton.click();
    
    expect(mockViewDetails).toHaveBeenCalledWith(1);
  });
});