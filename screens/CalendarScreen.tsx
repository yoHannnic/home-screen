// screens/CalendarScreen.tsx

import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Calendar, DateObject } from 'react-native-calendars';

const CalendarScreen = () => {
  const [selectedDate, setSelectedDate] = useState('');

  const onDayPress = (day: DateObject) => {
    setSelectedDate(day.dateString);
  };

  return (
    <View style={styles.container}>
      <Calendar
        onDayPress={onDayPress}
        markedDates={{
          [selectedDate]: {
            selected: true,
            marked: true,
            selectedColor: '#2C7E7B',
          },
        }}
        theme={{
          todayTextColor: '#2C7E7B',
          selectedDayBackgroundColor: '#2C7E7B',
          arrowColor: '#2C7E7B',
        }}
      />
      {selectedDate !== '' && (
        <View style={styles.selectedInfo}>
          <Text style={styles.infoText}>Selected Date: {selectedDate}</Text>
        </View>
      )}
    </View>
  );
};

export default CalendarScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  selectedInfo: {
    marginTop: 20,
    alignItems: 'center',
  },
  infoText: {
    fontSize: 16,
    color: '#2C7E7B',
    fontWeight: '500',
  },
});