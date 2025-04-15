import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const NotificationItem = ({ notification }) => {
  const getIconName = (category) => {
    switch(category) {
      case 'event': return 'calendar';
      case 'academic': return 'school';
      case 'announcement': return 'megaphone';
      default: return 'notifications';
    }
  };
  
  const getIconColor = (category) => {
    switch(category) {
      case 'event': return '#2C7E7B';
      case 'academic': return '#8E44AD';
      case 'announcement': return '#D35400';
      default: return '#3498DB';
    }
  };

  return (
    <TouchableOpacity 
      style={[
        styles.notificationItem, 
        !notification.read && styles.unreadNotification
      ]}
    >
      <View style={[styles.notificationIcon, { backgroundColor: `${getIconColor(notification.category)}20` }]}>
        <Ionicons name={getIconName(notification.category)} size={20} color={getIconColor(notification.category)} />
      </View>
      <View style={styles.notificationContent}>
        <Text style={styles.notificationTitle}>{notification.title}</Text>
        <Text style={styles.notificationMessage}>{notification.message}</Text>
        <Text style={styles.notificationTime}>{notification.time}</Text>
      </View>
      {!notification.read && <View style={styles.unreadDot} />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  notificationItem: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    alignItems: 'center',
  },
  unreadNotification: {
    backgroundColor: '#F0F9FF',
  },
  notificationIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 3,
  },
  notificationMessage: {
    fontSize: 13,
    color: '#555',
    marginBottom: 5,
  },
  notificationTime: {
    fontSize: 12,
    color: '#999',
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#2C7E7B',
  },
});

export default NotificationItem;