// __tests__/components/ui/Pagination.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { Pagination } from '@/components/ui/pagination';

describe('Pagination', () => {
  const defaultProps = {
    currentPage: 2,
    totalPages: 5,
    onPageChange: jest.fn()
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders correct number of page buttons', () => {
    render(<Pagination {...defaultProps} />);
    
    const pageButtons = screen.getAllByRole('button', { name: /\d+/ });
    expect(pageButtons).toHaveLength(5);
  });

  it('highlights current page button', () => {
    render(<Pagination {...defaultProps} />);
    
    const currentPageButton = screen.getByRole('button', { name: '2' });
    expect(currentPageButton).toHaveClass('bg-primary', 'text-primary-foreground');
  });

  it('calls onPageChange when page button is clicked', () => {
    render(<Pagination {...defaultProps} />);
    
    const pageButton = screen.getByRole('button', { name: '3' });
    fireEvent.click(pageButton);
    
    expect(defaultProps.onPageChange).toHaveBeenCalledWith(3);
  });

  it('disables previous button on first page', () => {
    render(<Pagination {...defaultProps} currentPage={1} />);
    
    const prevButton = screen.getByRole('button', { name: 'Previous' });
    expect(prevButton).toBeDisabled();
  });

  it('disables next button on last page', () => {
    render(<Pagination {...defaultProps} currentPage={5} totalPages={5} />);
    
    const nextButton = screen.getByRole('button', { name: 'Next' });
    expect(nextButton).toBeDisabled();
  });

  it('calls onPageChange when previous button is clicked', () => {
    render(<Pagination {...defaultProps} />);
    
    const prevButton = screen.getByRole('button', { name: 'Previous' });
    fireEvent.click(prevButton);
    
    expect(defaultProps.onPageChange).toHaveBeenCalledWith(1);
  });

  it('calls onPageChange when next button is clicked', () => {
    render(<Pagination {...defaultProps} />);
    
    const nextButton = screen.getByRole('button', { name: 'Next' });
    fireEvent.click(nextButton);
    
    expect(defaultProps.onPageChange).toHaveBeenCalledWith(3);
  });

  it('does not render pagination when there is only one page', () => {
    render(<Pagination {...defaultProps} totalPages={1} />);
    
    expect(screen.queryByRole('navigation')).not.toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<Pagination {...defaultProps} className="custom-class" />);
    
    const nav = screen.getByRole('navigation');
    expect(nav).toHaveClass('custom-class');
  });
});