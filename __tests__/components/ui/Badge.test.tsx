// __tests__/components/ui/Badge.test.tsx
import { render, screen } from '@testing-library/react';
import { Badge } from '@/components/ui/badge';

describe('Badge', () => {
  it('renders badge with correct text', () => {
    render(<Badge>Active</Badge>);

    expect(screen.getByText('Active')).toBeInTheDocument();
  });

  it('applies correct variant classes', () => {
    render(<Badge variant="success">Success</Badge>);

    const badge = screen.getByText('Success');
    expect(badge).toHaveClass('bg-success');
  });

  it('applies correct size classes', () => {
    render(<Badge size="sm">Small</Badge>);

    const badge = screen.getByText('Small');
    expect(badge).toHaveClass('px-2.5', 'py-0.5');
  });

  it('renders default variant when no variant is specified', () => {
    render(<Badge>Default</Badge>);

    const badge = screen.getByText('Default');
    expect(badge).toHaveClass('bg-primary');
  });

  it('passes additional className props', () => {
    render(<Badge className="custom-class">Custom</Badge>);

    const badge = screen.getByText('Custom');
    expect(badge).toHaveClass('custom-class');
  });
});
