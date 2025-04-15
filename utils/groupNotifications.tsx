import dayjs from 'dayjs';
import isToday from 'dayjs/plugin/isToday';
import isYesterday from 'dayjs/plugin/isYesterday';

dayjs.extend(isToday);
dayjs.extend(isYesterday);

export const groupNotificationsByDate = (notifications) => {
  const groups = {};

  notifications.forEach((notif) => {
    const date = dayjs(notif.timestamp);

    let label = 'Earlier';
    if (date.isToday()) label = 'Today';
    else if (date.isYesterday()) label = 'Yesterday';

    if (!groups[label]) groups[label] = [];
    groups[label].push(notif);
  });

  return groups;
};
