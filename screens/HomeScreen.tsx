import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { useNavigation } from '@react-navigation/native';
import EventCard from '../components/EventCard';

const HomeScreen = ({ events }) => {
  const navigation = useNavigation();

  return (
    <ScrollView style={styles.screenContainer}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Upcoming Events</Text>
        <TouchableOpacity onPress={() => navigation.navigate('AllEvents')}>
          <Text style={styles.seeAllButton}>See All</Text>
        </TouchableOpacity>
      </View>

      {events.length === 0 ? (
        <Text style={styles.emptyText}>No upcoming events at the moment.</Text>
      ) : (
        events.map(event => <EventCard key={event.id} event={event} />)
      )}
    </ScrollView>
  );
};

HomeScreen.propTypes = {
  events: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    })
  ).isRequired,
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#F9F9F9',
    paddingTop: 10,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1C1C1E',
  },
  seeAllButton: {
    color: '#2C7E7B',
    fontSize: 15,
    fontWeight: '500',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: '#999',
  },
});

export default HomeScreen;
