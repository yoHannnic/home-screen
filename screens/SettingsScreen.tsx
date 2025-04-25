import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import SettingItem from '../components/SettingItem';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import PropTypes from 'prop-types';

const SettingsScreen = ({ settings = {}, toggleSetting }) => {
  const {
    pushEnabled = false,
    emailEnabled = false,
    academicAlerts = false,
    eventReminders = false,
    campusAnnouncements = false,
    socialNotifications = false,
  } = settings;

  return (
    <ScrollView style={styles.screenContainer}>
      {/* Notification Channels Section */}
      <View style={styles.settingSection}>
        <Text style={styles.settingSectionTitle}>Notification Channels</Text>

        <SettingItem
          title="Push Notifications"
          description="Receive alerts directly on your device"
          value={pushEnabled}
          onToggle={() => toggleSetting('pushEnabled')}
          icon={<MaterialCommunityIcons name="bell" size={24} color="#4CD964" />}
        />
        <SettingItem
          title="Email Notifications"
          description="Get updates in your inbox"
          value={emailEnabled}
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
          value={academicAlerts}
          onToggle={() => toggleSetting('academicAlerts')}
          icon={<MaterialCommunityIcons name="book-open" size={24} color="#4CD964" />}
        />
        <SettingItem
          title="Event Reminders"
          description="Updates about events you're attending"
          value={eventReminders}
          onToggle={() => toggleSetting('eventReminders')}
          icon={<MaterialCommunityIcons name="calendar" size={24} color="#4CD964" />}
        />
        <SettingItem
          title="Campus Announcements"
          description="Important campus-wide information"
          value={campusAnnouncements}
          onToggle={() => toggleSetting('campusAnnouncements')}
          icon={<MaterialCommunityIcons name="information" size={24} color="#4CD964" />}
        />
        <SettingItem
          title="Social Notifications"
          description="Friend activity and event suggestions"
          value={socialNotifications}
          onToggle={() => toggleSetting('socialNotifications')}
          icon={<MaterialCommunityIcons name="account-group" size={24} color="#4CD964" />}
        />
      </View>
    </ScrollView>
  );
};

// PropTypes for safety
SettingsScreen.propTypes = {
  settings: PropTypes.shape({
    pushEnabled: PropTypes.bool,
    emailEnabled: PropTypes.bool,
    academicAlerts: PropTypes.bool,
    eventReminders: PropTypes.bool,
    campusAnnouncements: PropTypes.bool,
    socialNotifications: PropTypes.bool,
  }),
  toggleSetting: PropTypes.func.isRequired,
};

// Styles
const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  settingSection: {
    backgroundColor: 'white',
    marginVertical: 10,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#EEEEEE',
    borderRadius: 8,
    marginHorizontal: 15,
  },
  settingSectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    paddingHorizontal: 15,
    paddingVertical: 10,
    color: '#1C1C1E',
  },
});

export default SettingsScreen;