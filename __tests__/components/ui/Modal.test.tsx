// __tests__/components/ui/Modal.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { Modal } from '@/components/ui/modal';

describe('Modal', () => {
  const defaultProps = {
    isOpen: true,
    onClose: jest.fn(),
    children: <div>Modal Content</div>
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders modal when isOpen is true', () => {
    render(<Modal {...defaultProps} />);
    
    expect(screen.getByText('Modal Content')).toBeInTheDocument();
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('does not render modal when isOpen is false', () => {
    render(<Modal {...defaultProps} isOpen={false} />);
    
    expect(screen.queryByText('Modal Content')).not.toBeInTheDocument();
  });

  it('calls onClose when backdrop is clicked', () => {
    render(<Modal {...defaultProps} />);
    
    const backdrop = screen.getByRole('dialog').parentElement;
    fireEvent.click(backdrop!);
    
    expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
  });

  it('does not close modal when content is clicked', () => {
    render(<Modal {...defaultProps} />);
    
    const content = screen.getByText('Modal Content');
    fireEvent.click(content);
    
    expect(defaultProps.onClose).not.toHaveBeenCalled();
  });

  it('renders with custom className', () => {
    render(<Modal {...defaultProps} className="custom-class" />);
    
    const modal = screen.getByRole('dialog');
    expect(modal).toHaveClass('custom-class');
  });

  it('applies correct accessibility attributes', () => {
    render(<Modal {...defaultProps} />);
    
    const modal = screen.getByRole('dialog');
    expect(modal).toHaveAttribute('aria-modal', 'true');
    expect(modal).toHaveAttribute('role', 'dialog');
  });
});