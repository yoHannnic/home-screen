import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  SafeAreaView, 
  TouchableOpacity,
  StatusBar,
  Platform
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Constants from 'expo-constants';

// Import screens
import HomeScreen from './src/screens/HomeScreen';
import NotificationsScreen from './src/screens/NotificationsScreen';
import SettingsScreen from './src/screens/SettingsScreen';

// Import mock data
import { EVENTS, NOTIFICATIONS } from './src/data/mockData';

// Define types for Notifications and Settings
interface Notification {
  id: string;
  message: string;
  read: boolean;
}

interface NotificationSettings {
  pushEnabled: boolean;
  emailEnabled: boolean;
  academicAlerts: boolean;
  eventReminders: boolean;
  campusAnnouncements: boolean;
  socialNotifications: boolean;
}

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [notifications, setNotifications] = useState<Notification[]>(NOTIFICATIONS);
  const [events, setEvents] = useState(EVENTS);
  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>({
    pushEnabled: true,
    emailEnabled: true,
    academicAlerts: true,
    eventReminders: true,
    campusAnnouncements: true,
    socialNotifications: false,
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllRead = () => {
    setNotifications(notifications.map((n: Notification) => ({...n, read: true})));
  };

  const toggleSetting = (setting: keyof NotificationSettings) => {
    setNotificationSettings({
      ...notificationSettings,
      [setting]: !notificationSettings[setting]
    });
  };

  const renderTabContent = () => {
    switch(activeTab) {
      case 'home':
        return <HomeScreen events={events} />;
      case 'notifications':
        return <NotificationsScreen 
          notifications={notifications} 
        />;
      case 'settings':
        return <SettingsScreen 
          settings={notificationSettings} 
          toggleSetting={toggleSetting} 
        />;
      default:
        return <HomeScreen events={events} />;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          {activeTab === 'home' ? 'Campus Events' : 
           activeTab === 'notifications' ? 'Notifications' : 
           'Settings'}
        </Text>
        {activeTab === 'notifications' && (
          <TouchableOpacity onPress={markAllRead} style={styles.headerButton}>
            <Text style={styles.headerButtonText}>Mark all read</Text>
          </TouchableOpacity>
        )}
      </View>
      
      {renderTabContent()}
      
      <View style={styles.tabBar}>
        <TouchableOpacity 
          style={styles.tabButton} 
          onPress={() => setActiveTab('home')}
        >
          <Ionicons 
            name={activeTab === 'home' ? 'home' : 'home-outline'} 
            size={24} 
            color={activeTab === 'home' ? '#2C7E7B' : '#8e8e8e'} 
          />
          <Text style={[styles.tabLabel, {color: activeTab === 'home' ? '#2C7E7B' : '#8e8e8e'}]}>Home</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.tabButton} 
          onPress={() => setActiveTab('notifications')}
        >
          <View style={styles.iconContainer}>
            <Ionicons 
              name={activeTab === 'notifications' ? 'notifications' : 'notifications-outline'} 
              size={24} 
              color={activeTab === 'notifications' ? '#2C7E7B' : '#8e8e8e'} 
            />
            {unreadCount > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{unreadCount}</Text>
              </View>
            )}
          </View>
          <Text style={[styles.tabLabel, {color: activeTab === 'notifications' ? '#2C7E7B' : '#8e8e8e'}]}>Alerts</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.tabButton} 
          onPress={() => setActiveTab('addEvent')}
        >
          <View style={styles.addButton}>
            <Ionicons name="add" size={24} color="white" />
          </View>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.tabButton} 
          onPress={() => setActiveTab('calendar')}
        >
          <Ionicons 
            name={activeTab === 'calendar' ? 'calendar' : 'calendar-outline'} 
            size={24} 
            color={activeTab === 'calendar' ? '#2C7E7B' : '#8e8e8e'} 
          />
          <Text style={[styles.tabLabel, {color: activeTab === 'calendar' ? '#2C7E7B' : '#8e8e8e'}]}>Calendar</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.tabButton} 
          onPress={() => setActiveTab('settings')}
        >
          <Ionicons 
            name={activeTab === 'settings' ? 'settings' : 'settings-outline'} 
            size={24} 
            color={activeTab === 'settings' ? '#2C7E7B' : '#8e8e8e'} 
          />
          <Text style={[styles.tabLabel, {color: activeTab === 'settings' ? '#2C7E7B' : '#8e8e8e'}]}>Settings</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingTop: Platform.OS === 'android' ? Constants.statusBarHeight : 0,
  },
  header: {
    backgroundColor: '#2C7E7B',
    paddingVertical: 15,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  headerButton: {
    padding: 5,
  },
  headerButtonText: {
    color: 'white',
    fontSize: 14,
  },
  tabBar: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#e1e1e1',
    backgroundColor: 'white',
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  tabLabel: {
    fontSize: 12,
    marginTop: 2,
  },
  iconContainer: {
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    right: -6,
    top: -3,
    backgroundColor: '#FF3B30',
    borderRadius: 7,
    width: 14,
    height: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#2C7E7B',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
});
