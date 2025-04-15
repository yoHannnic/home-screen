import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';

const NotificationItem = ({ notification, onDelete }) => {
  const renderRightActions = () => (
    <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
      <Ionicons name="trash-outline" size={22} color="#fff" />
    </TouchableOpacity>
  );

  return (
    <Swipeable renderRightActions={renderRightActions}>
      <View style={styles.container}>
        <Text style={styles.title}>{notification.title}</Text>
        <Text style={styles.message}>{notification.message}</Text>
        <Text style={styles.timestamp}>{notification.timestamp}</Text>
      </View>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 1,
  },
  title: {
    fontWeight: '600',
    fontSize: 15,
    marginBottom: 4,
  },
  message: {
    fontSize: 13,
    color: '#555',
  },
  timestamp: {
    fontSize: 11,
    color: '#888',
    marginTop: 4,
  },
  deleteButton: {
    backgroundColor: '#FF3B30',
    justifyContent: 'center',
    alignItems: 'center',
    width: 70,
    borderRadius: 10,
    marginVertical: 5,
  },
});

export default NotificationItem;
