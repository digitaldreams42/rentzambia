// __tests__/components/ui/Input.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { Input } from '@/components/ui/input';
import React from 'react';

describe('Input', () => {
  it('renders input with correct attributes', () => {
    render(<Input type="email" placeholder="Enter your email" />);

    const input = screen.getByPlaceholderText('Enter your email');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'email');
  });

  it('handles onChange events', () => {
    const handleChange = jest.fn();
    render(<Input onChange={handleChange} />);

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'test@example.com' } });

    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('applies error styles when hasError prop is true', () => {
    render(<Input hasError={true} />);

    const input = screen.getByRole('textbox');
    expect(input).toHaveClass('border-destructive');
  });

  it('renders with custom className', () => {
    render(<Input className="custom-class" />);

    const input = screen.getByRole('textbox');
    expect(input).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLInputElement>();
    render(<Input ref={ref} />);

    expect(ref.current).toBeInTheDocument();
  });
});
