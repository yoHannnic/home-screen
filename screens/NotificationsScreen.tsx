import React, { useState, useCallback, useEffect, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  RefreshControl,
  TouchableOpacity,
  Animated,
} from 'react-native';
import NotificationItem from '../components/NotificationItem';
import { groupNotificationsByDate } from '../utils/groupNotifications';

const NotificationsScreen = ({ notifications: initialNotifications = [] }) => {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [refreshing, setRefreshing] = useState(false);
  const [recentlyDeleted, setRecentlyDeleted] = useState(null);

  const slideAnim = useRef(new Animated.Value(100)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      // Simulate refreshing data
      setRefreshing(false);
    }, 1000);
  }, []);

  const handleDelete = (notification) => {
    setNotifications(prev => prev.filter(n => n.id !== notification.id));
    setRecentlyDeleted(notification);
    showSnackbar();

    // Auto-clear undo after 5s
    setTimeout(() => {
      hideSnackbar();
      setRecentlyDeleted(null);
    }, 5000);
  };

  const handleUndo = () => {
    if (recentlyDeleted) {
      setNotifications(prev => [recentlyDeleted, ...prev]);
      setRecentlyDeleted(null);
      hideSnackbar();
    }
  };

  const showSnackbar = () => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const hideSnackbar = () => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: 100,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const grouped = groupNotificationsByDate(notifications);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.screenContainer}
        contentContainerStyle={styles.contentContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Notifications</Text>
          <Text style={styles.sectionSubtitle}>{notifications.length} total</Text>
        </View>

        {notifications.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>You're all caught up! 🎉</Text>
          </View>
        ) : (
          Object.entries(grouped).map(([label, group]) => (
            <View key={label} style={styles.groupSection}>
              <Text style={styles.groupLabel}>{label}</Text>
              {group.map(notification => (
                <NotificationItem
                  key={notification.id}
                  notification={notification}
                  onDelete={() => handleDelete(notification)}
                />
              ))}
            </View>
          ))
        )}
      </ScrollView>

      {/* Snackbar Animated View */}
      {recentlyDeleted && (
        <Animated.View
          style={[
            styles.snackbar,
            {
              transform: [{ translateY: slideAnim }],
              opacity: opacityAnim,
            },
          ]}
        >
          <Text style={styles.undoText}>Notification deleted</Text>
          <TouchableOpacity onPress={handleUndo}>
            <Text style={styles.undoButton}>Undo</Text>
          </TouchableOpacity>
        </Animated.View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  screenContainer: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 100,
  },
  sectionHeader: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#FFF',
    borderBottomColor: '#EEE',
    borderBottomWidth: 1,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1C1C1E',
  },
  sectionSubtitle: {
    fontSize: 13,
    color: '#888',
    marginTop: 4,
  },
  groupSection: {
    paddingHorizontal: 20,
    marginTop: 10,
  },
  groupLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#444',
    marginBottom: 5,
  },
  emptyState: {
    marginTop: 40,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#777',
  },
  snackbar: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: '#323232',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 999,
    elevation: 5,
  },
  undoText: {
    color: '#fff',
    fontSize: 14,
  },
  undoButton: {
    color: '#4CD964',
    fontWeight: '600',
    fontSize: 14,
    paddingLeft: 16,
  },
});

export default NotificationsScreen;