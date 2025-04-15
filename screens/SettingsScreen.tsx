import React from 'react';
import { StyleSheet, Text, View, ScrollView, Switch } from 'react-native';
import SettingItem from '../components/SettingItem'; // Assuming your custom SettingItem component exists
import { MaterialCommunityIcons } from '@expo/vector-icons'; // Optional: for adding icons

const SettingsScreen = ({ settings, toggleSetting }) => {
  return (
    <ScrollView style={styles.screenContainer}>
      {/* Notification Channels Section */}
      <View style={styles.settingSection}>
        <Text style={styles.settingSectionTitle}>Notification Channels</Text>

        <SettingItem
          title="Push Notifications"
          description="Receive alerts directly on your device"
          value={settings.pushEnabled}
          onToggle={() => toggleSetting('pushEnabled')}
          icon={<MaterialCommunityIcons name="bell" size={24} color="#4CD964" />}
        />
        <SettingItem
          title="Email Notifications"
          description="Get updates in your inbox"
          value={settings.emailEnabled}
          onToggle={() => toggleSetting('emailEnabled')}
          icon={<MaterialCommunityIcons name="email" size={24} color="#4CD964" />}
        />
      </View>

      {/* Notification Categories Section */}
      <View style={styles.settingSection}>
        <Text style={styles.settingSectionTitle}>Notification Categories</Text>

        <SettingItem
          title="Academic Alerts"
          description="Class changes, assignments, exams"
          value={settings.academicAlerts}
          onToggle={() => toggleSetting('academicAlerts')}
          icon={<MaterialCommunityIcons name="book-open" size={24} color="#4CD964" />}
        />
        <SettingItem
          title="Event Reminders"
          description="Updates about events you're attending"
          value={settings.eventReminders}
          onToggle={() => toggleSetting('eventReminders')}
          icon={<MaterialCommunityIcons name="calendar" size={24} color="#4CD964" />}
        />
        <SettingItem
          title="Campus Announcements"
          description="Important campus-wide information"
          value={settings.campusAnnouncements}
          onToggle={() => toggleSetting('campusAnnouncements')}
          icon={<MaterialCommunityIcons name="information" size={24} color="#4CD964" />}
        />
        <SettingItem
          title="Social Notifications"
          description="Friend activity and event suggestions"
          value={settings.socialNotifications}
          onToggle={() => toggleSetting('socialNotifications')}
          icon={<MaterialCommunityIcons name="account-group" size={24} color="#4CD964" />}
        />
      </View>
    </ScrollView>
  );
};

// Styles
const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#F5F5F5', // Soft background color
  },
  settingSection: {
    backgroundColor: 'white',
    marginVertical: 10,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#EEEEEE',
    borderRadius: 8, // Add rounded corners for cleaner look
    marginHorizontal: 15, // Slightly reduced horizontal margin
  },
  settingSectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    paddingHorizontal: 15,
    paddingVertical: 10,
    color: '#1C1C1E', // Dark text for visibility
  },
  settingItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
    paddingHorizontal: 15,
  },
  settingTextContainer: {
    flex: 1,
    marginLeft: 10,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1C1C1E',
  },
  settingDescription: {
    fontSize: 13,
    color: '#888',
    marginTop: 4,
  },
  switchContainer: {
    marginLeft: 'auto',
  },
});

export default SettingsScreen;
