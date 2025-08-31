// __tests__/components/ui/Textarea.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { Textarea } from '@/components/ui/textarea';
import React from 'react';

describe('Textarea', () => {
  it('renders textarea with correct attributes', () => {
    render(<Textarea placeholder="Enter your message" rows={4} />);

    const textarea = screen.getByPlaceholderText('Enter your message');
    expect(textarea).toBeInTheDocument();
    expect(textarea).toHaveAttribute('rows', '4');
  });

  it('handles onChange events', () => {
    const handleChange = jest.fn();
    render(<Textarea onChange={handleChange} />);

    const textarea = screen.getByRole('textbox');
    fireEvent.change(textarea, { target: { value: 'This is a test message' } });

    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('applies error styles when hasError prop is true', () => {
    render(<Textarea hasError={true} />);

    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveClass('border-destructive');
  });

  it('renders with custom className', () => {
    render(<Textarea className="custom-class" />);

    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLTextAreaElement>();
    render(<Textarea ref={ref} />);

    expect(ref.current).toBeInTheDocument();
  });
});
