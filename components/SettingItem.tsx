import React from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';

const SettingItem = ({ title, description, value, onToggle, icon }) => {
  return (
    <View style={styles.settingItemContainer}>
      {icon}
      <View style={styles.settingTextContainer}>
        <Text style={styles.settingTitle}>{title}</Text>
        <Text style={styles.settingDescription}>{description}</Text>
      </View>
      <View style={styles.switchContainer}>
        <Switch value={value} onValueChange={onToggle} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  settingItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
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

export default SettingItem;
