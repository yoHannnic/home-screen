import dayjs from 'dayjs';
import isToday from 'dayjs/plugin/isToday';
import isYesterday from 'dayjs/plugin/isYesterday';

dayjs.extend(isToday);
dayjs.extend(isYesterday);

// Define types for the notifications and groupings
type Notification = {
  timestamp: string; // Assuming the timestamp is a string, adjust if it's a Date object
  // Add other properties for the notification as needed
};

type GroupedNotifications = {
  [key: string]: Notification[];
};

export const groupNotificationsByDate = (notifications: Notification[]): GroupedNotifications => {
  const groups: GroupedNotifications = {};

  // Early return if no notifications
  if (notifications.length === 0) return groups;

  notifications.forEach((notif) => {
    const date = dayjs(notif.timestamp);
    let label = 'Earlier'; // Default label

    if (date.isToday()) {
      label = 'Today';
    } else if (date.isYesterday()) {
      label = 'Yesterday';
    }

    if (!groups[label]) {
      groups[label] = [];
    }
    groups[label].push(notif);
  });

  return groups;
};
