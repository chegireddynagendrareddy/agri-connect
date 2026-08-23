import React, { createContext, useContext, useEffect, useState } from 'react';
import { dbService } from '../services/dbService';
import type { AppNotification } from '../types';
import { useAuth } from './AuthContext';

export interface Toast {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
}

interface NotificationContextType {
  toasts: Toast[];
  notifications: AppNotification[];
  unreadCount: number;
  showToast: (title: string, message: string, type?: 'success' | 'error' | 'warning' | 'info') => void;
  removeToast: (id: string) => void;
  markAsRead: (id: string) => void;
  refreshNotifications: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [notifications, setNotifications] = useState<AppNotification[]>([]);

  const userId = user?.id || 'guest_user';

  const refreshNotifications = () => {
    setNotifications(dbService.getNotifications(userId));
  };

  useEffect(() => {
    refreshNotifications();
    const interval = setInterval(refreshNotifications, 10000);
    return () => clearInterval(interval);
  }, [userId]);

  const showToast = (title: string, message: string, type: 'success' | 'error' | 'warning' | 'info' = 'success') => {
    const id = `toast_${Date.now()}_${Math.random()}`;
    const newToast: Toast = { id, title, message, type };

    setToasts((prev) => [...prev, newToast]);

    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const markAsRead = (id: string) => {
    dbService.markNotificationAsRead(id);
    refreshNotifications();
  };

  const unreadCount = notifications.filter((n) => !n.is_read).length;

  return (
    <NotificationContext.Provider
      value={{
        toasts,
        notifications,
        unreadCount,
        showToast,
        removeToast,
        markAsRead,
        refreshNotifications
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};
