// screens/NotificationsScreen.tsx
import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  SectionList,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { groupNotifications, formatNotificationTime } from '../utils/groupNotifications';

interface Notification {
  id: number;
  title: string;
  message: string;
  date: string;
  read: boolean;
}

interface GroupedNotifications {
  title: string;
  data: Notification[];
}

const NotificationsScreen = () => {
  const route = useRoute();
  const [notifications, setNotifications] = useState<Notification[]>(
    route.params?.notifications || []
  );

  // Process notifications into sections
  const getGroupedNotifications = (): GroupedNotifications[] => {
    const groups = groupNotifications(notifications);
    
    const sections: GroupedNotifications[] = [];
    
    if (groups.today.length > 0) {
      sections.push({ title: 'Today', data: groups.today });
    }
    
    if (groups.yesterday.length > 0) {
      sections.push({ title: 'Yesterday', data: groups.yesterday });
    }
    
    if (groups.thisWeek.length > 0) {
      sections.push({ title: 'This Week', data: groups.thisWeek });
    }
    
    if (groups.earlier.length > 0) {
      sections.push({ title: 'Earlier', data: groups.earlier });
    }
    
    return sections;
  };

  // Mark a notification as read
  const markAsRead = (id: number) => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === id
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  // Render notification item
  const renderNotificationItem = ({ item }: { item: Notification }) => {
    return (
      <TouchableOpacity
        style={[
          styles.notificationItem,
          !item.read && styles.unreadNotification,
        ]}
        onPress={() => markAsRead(item.id)}
      >
        <View style={styles.notificationContent}>
          <Text style={styles.notificationTitle}>{item.title}</Text>
          <Text style={styles.notificationMessage}>{item.message}</Text>
        </View>
        <View style={styles.notificationMeta}>
          <Text style={styles.notificationTime}>
            {formatNotificationTime(item.date)}
          </Text>
          {!item.read && <View style={styles.unreadDot} />}
        </View>
      </TouchableOpacity>
    );
  };

  // Render section header
  const renderSectionHeader = ({
    section,
  }: {
    section: GroupedNotifications;
  }) => (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{section.title}</Text>
    </View>
  );

  // Empty notifications component
  const EmptyNotifications = () => (
    <View style={styles.emptyContainer}>
      <Ionicons name="notifications-off-outline" size={60} color="#ccc" />
      <Text style={styles.emptyText}>No notifications yet</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {notifications.length === 0 ? (
        <EmptyNotifications />
      ) : (
        <SectionList
          sections={getGroupedNotifications()}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderNotificationItem}
          renderSectionHeader={renderSectionHeader}
          stickySectionHeadersEnabled={true}
          contentContainerStyle={styles.listContent}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  listContent: {
    paddingBottom: 20,
  },
  sectionHeader: {
    backgroundColor: '#F9F9F9',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#8E8E8E',
  },
  notificationItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  unreadNotification: {
    backgroundColor: '#F0F7F7',
  },
  notificationContent: {
    flex: 1,
    paddingRight: 15,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
    color: '#333333',
  },
  notificationMessage: {
    fontSize: 14,
    color: '#666666',
  },
  notificationMeta: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingVertical: 2,
  },
  notificationTime: {
    fontSize: 13,
    color: '#999999',
    marginBottom: 5,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#2C7E7B',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    marginTop: 15,
    fontSize: 16,
    color: '#999999',
  },
});

export default NotificationsScreen;