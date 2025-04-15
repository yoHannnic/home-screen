import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import NotificationItem from '../components/NotificationItem';

const NotificationsScreen = ({ notifications }) => {
  return (
    <ScrollView style={styles.screenContainer}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Recent</Text>
      </View>
      
      {notifications.map(notification => (
        <NotificationItem key={notification.id} notification={notification} />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
});

export default NotificationsScreen;