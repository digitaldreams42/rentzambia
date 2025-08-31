// __tests__/components/ui/Notification.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { NotificationItem } from '@/components/ui/notification';

describe('NotificationItem', () => {
  const mockNotification = {
    id: 1,
    title: 'New Inquiry Received',
    message: 'John Mwanza is interested in your property',
    date: '2025-02-15',
    read: false,
    type: 'info' as const,
  };

  const defaultProps = {
    notification: mockNotification,
    onMarkAsRead: jest.fn(),
    onDelete: jest.fn(),
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders notification with correct content', () => {
    render(<NotificationItem {...defaultProps} />);

    expect(screen.getByText('New Inquiry Received')).toBeInTheDocument();
    expect(
      screen.getByText('John Mwanza is interested in your property')
    ).toBeInTheDocument();
    expect(screen.getByText('2025-02-15')).toBeInTheDocument();
  });

  it('shows unread state with appropriate styling', () => {
    render(<NotificationItem {...defaultProps} />);

    const notification = screen.getByText('New Inquiry Received').closest('.flex.items-start');
    expect(notification).toHaveClass('bg-primary/5');
  });

  it('shows read state with appropriate styling', () => {
    render(
      <NotificationItem
        {...defaultProps}
        notification={{ ...defaultProps.notification, read: true }}
      />
    );

    const notification = screen.getByText('New Inquiry Received').closest('.flex.items-start');
    expect(notification).not.toHaveClass('bg-primary/5');
  });

  it('calls onMarkAsRead when mark as read button is clicked', () => {
    render(<NotificationItem {...defaultProps} />);

    const markAsReadButton = screen.getByText('Mark as read');
    fireEvent.click(markAsReadButton);

    expect(defaultProps.onMarkAsRead).toHaveBeenCalledWith(1);
  });

  it('calls onDelete when delete button is clicked', () => {
    render(<NotificationItem {...defaultProps} />);

    // Find the delete button by its SVG icon
    const deleteButtons = screen.getAllByRole('button');
    const deleteButton = deleteButtons[1]; // Second button is the delete button
    fireEvent.click(deleteButton);

    expect(defaultProps.onDelete).toHaveBeenCalledWith(1);
  });

  it('renders correct icon based on notification type', () => {
    render(<NotificationItem {...defaultProps} />);

    // Find the icon by its class
    const icon = document.querySelector('svg.w-5.h-5');
    expect(icon).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(
      <NotificationItem {...defaultProps} className="custom-class" />
    );

    const notification = screen.getByText('New Inquiry Received').closest('.flex.items-start');
    expect(notification).toHaveClass('custom-class');
  });
});
