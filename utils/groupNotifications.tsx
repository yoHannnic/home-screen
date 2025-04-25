// utils/groupNotifications.tsx
import dayjs from 'dayjs';

interface Notification {
  id: number;
  title: string;
  message: string;
  date: string;
  read: boolean;
}

// Function to group notifications by date section (Today, Yesterday, This Week, Earlier)
export const groupNotifications = (notifications: Notification[]) => {
  const today = dayjs().startOf('day');
  const yesterday = today.subtract(1, 'day');
  const weekStart = today.subtract(6, 'day');
  
  const groups = {
    today: [] as Notification[],
    yesterday: [] as Notification[],
    thisWeek: [] as Notification[],
    earlier: [] as Notification[],
  };

  notifications.forEach(notification => {
    const notificationDate = dayjs(notification.date);
    
    if (notificationDate.isSame(today, 'day')) {
      groups.today.push(notification);
    } else if (notificationDate.isSame(yesterday, 'day')) {
      groups.yesterday.push(notification);
    } else if (notificationDate.isAfter(weekStart)) {
      groups.thisWeek.push(notification);
    } else {
      groups.earlier.push(notification);
    }
  });

  return groups;
};

// Format notification time based on the date
export const formatNotificationTime = (date: string) => {
  const notificationDate = dayjs(date);
  const today = dayjs().startOf('day');
  const yesterday = today.subtract(1, 'day');
  
  if (notificationDate.isSame(today, 'day')) {
    return notificationDate.format('h:mm A');
  } else if (notificationDate.isSame(yesterday, 'day')) {
    return 'Yesterday';
  } else if (notificationDate.isAfter(today.subtract(7, 'day'))) {
    return notificationDate.format('dddd');
  } else {
    return notificationDate.format('MMM D');
  }
};