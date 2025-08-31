import * as React from 'react';

interface Notification {
  id: number;
  title: string;
  message: string;
  date: string;
  read: boolean;
  type: 'info' | 'success' | 'warning' | 'error';
}

interface UseNotificationsReturn {
  notifications: Notification[];
  unreadCount: number;
  markAsRead: (id: number) => void;
  markAllAsRead: () => void;
  deleteNotification: (id: number) => void;
  addNotification: (
    notification: Omit<Notification, 'id' | 'date' | 'read'>
  ) => void;
}

const mockNotifications: Notification[] = [
  {
    id: 1,
    title: 'New Inquiry',
    message: 'John Mwanza is interested in your property',
    date: '2025-02-15',
    read: false,
    type: 'info',
  },
  {
    id: 2,
    title: 'Booking Confirmed',
    message: 'Your booking for Luxury Studio has been confirmed',
    date: '2025-02-14',
    read: true,
    type: 'success',
  },
  {
    id: 3,
    title: 'Payment Received',
    message: 'Payment of K2,800 received for Luxury Studio',
    date: '2025-02-14',
    read: true,
    type: 'success',
  },
  {
    id: 4,
    title: 'Reminder',
    message: 'Your property listing expires in 7 days',
    date: '2025-02-13',
    read: false,
    type: 'warning',
  },
];

export function useNotifications(): UseNotificationsReturn {
  const [notifications, setNotifications] =
    React.useState<Notification[]>(mockNotifications);

  const unreadCount = React.useMemo(
    () => notifications.filter(n => !n.read).length,
    [notifications]
  );

  const markAsRead = (id: number) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const deleteNotification = (id: number) => {
    setNotifications(prev =>
      prev.filter(notification => notification.id !== id)
    );
  };

  const addNotification = (
    notification: Omit<Notification, 'id' | 'date' | 'read'>
  ) => {
    const newNotification: Notification = {
      ...notification,
      id: Math.max(0, ...notifications.map(n => n.id)) + 1,
      date: new Date().toISOString().split('T')[0],
      read: false,
    };
    setNotifications(prev => [newNotification, ...prev]);
  };

  return {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    addNotification,
  };
}
