import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { useNavigation, useRoute } from '@react-navigation/native';
import EventCard from '../components/EventCard';
import PostCard from '../components/PostCard'; // Assuming you have this

const HomeScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const events = route.params?.events || [];
  const posts = route.params?.posts || [];

  return (
    <ScrollView style={styles.screenContainer}>
      {/* Upcoming Events Section */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Upcoming Events</Text>
        <TouchableOpacity onPress={() => navigation.navigate('AllEvents')}>
          <Text style={styles.seeAllButton}>See All</Text>
        </TouchableOpacity>
      </View>

      {events.length === 0 ? (
        <Text style={styles.emptyText}>No upcoming events at the moment.</Text>
      ) : (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalScroll}>
          {events.map(event => (
            <EventCard key={event.id} event={event} />
          ))}
        </ScrollView>
      )}

      {/* Posts Section */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Posts</Text>
      </View>
      {posts.length === 0 ? (
        <Text style={styles.emptyText}>No posts available.</Text>
      ) : (
        posts.map(post => (
          <PostCard key={post.id} post={post} />
        ))
      )}
    </ScrollView>
  );
};

HomeScreen.propTypes = {
  events: PropTypes.array,
  posts: PropTypes.array,
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
  horizontalScroll: {
    paddingHorizontal: 20,
  },
});

export default HomeScreen;