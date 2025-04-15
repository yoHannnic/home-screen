import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import EventCard from '../components/EventCard';

const HomeScreen = ({ events }) => {
  return (
    <ScrollView style={styles.screenContainer}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Upcoming Events</Text>
        <TouchableOpacity>
          <Text style={styles.seeAllButton}>See All</Text>
        </TouchableOpacity>
      </View>
      
      {events.map(event => (
        <EventCard key={event.id} event={event} />
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
  seeAllButton: {
    color: '#2C7E7B',
    fontSize: 14,
  },
});

export default HomeScreen;