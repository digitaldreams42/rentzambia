// __tests__/components/ui/Select.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { Select } from '@/components/ui/select';

describe('Select', () => {
  const options = [
    { value: 'tenant', label: 'Tenant' },
    { value: 'landlord', label: 'Landlord' },
    { value: 'agent', label: 'Agent' }
  ];

  it('renders select with correct options', () => {
    render(<Select options={options} placeholder="Select a role" />);
    
    const select = screen.getByRole('combobox');
    expect(select).toBeInTheDocument();
    
    options.forEach(option => {
      expect(screen.getByText(option.label)).toBeInTheDocument();
    });
  });

  it('handles onChange events', () => {
    const handleChange = jest.fn();
    render(<Select options={options} onChange={handleChange} />);
    
    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'landlord' } });
    
    expect(handleChange).toHaveBeenCalledWith('landlord');
  });

  it('renders with default value', () => {
    render(<Select options={options} defaultValue="tenant" />);
    
    const select = screen.getByRole('combobox');
    expect(select).toHaveValue('tenant');
  });

  it('applies error styles when hasError prop is true', () => {
    render(<Select options={options} hasError={true} />);
    
    const select = screen.getByRole('combobox');
    expect(select).toHaveClass('border-destructive');
  });

  it('renders with custom className', () => {
    render(<Select options={options} className="custom-class" />);
    
    const select = screen.getByRole('combobox');
    expect(select).toHaveClass('custom-class');
  });
});