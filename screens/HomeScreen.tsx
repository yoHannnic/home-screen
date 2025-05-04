import React, { useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import dayjs from 'dayjs';
import { AppContext } from '../App'; // Import the context from App.js

export default function HomeScreen() {
  // Get data from context instead of route params
  const { posts, events } = useContext(AppContext);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Welcome back 👋</Text>

      {/* Posts Section */}
      <Text style={styles.sectionTitle}>Latest Posts</Text>
      {posts.length === 0 ? (
        <Text style={styles.emptyText}>No posts yet. Create one using the + tab!</Text>
      ) : (
        posts.map((post) => (
          <View key={post.id} style={styles.card}>
            {post.image && <Image source={{ uri: post.image }} style={styles.image} />}
            <Text style={styles.postTitle}>{post.title}</Text>
            <Text style={styles.postDate}>{post.date}</Text>
            <Text style={styles.postBody}>{post.body}</Text>
          </View>
        ))
      )}

      {/* Events Section */}
      <Text style={styles.sectionTitle}>Upcoming Events</Text>
      {events.length === 0 ? (
        <Text style={styles.emptyText}>No upcoming events.</Text>
      ) : (
        events.map((event) => (
          <View key={event.id} style={styles.eventCard}>
            <Text style={styles.eventTitle}>{event.title}</Text>
            <Text style={styles.eventDate}>{dayjs(event.date).format('MMMM D, YYYY')}</Text>
            <Text style={styles.eventLocation}>{event.location}</Text>
          </View>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2C7E7B',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#444',
    marginVertical: 10,
  },
  emptyText: {
    fontSize: 14,
    color: '#999',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#F9F9F9',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 2,
  },
  image: {
    width: '100%',
    height: 180,
    borderRadius: 8,
    marginBottom: 10,
  },
  postTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2C7E7B',
  },
  postDate: {
    fontSize: 12,
    color: '#888',
    marginBottom: 5,
  },
  postBody: {
    fontSize: 14,
    color: '#333',
  },
  eventCard: {
    backgroundColor: '#E0F2F1',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  eventTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#2C7E7B',
  },
  eventDate: {
    fontSize: 13,
    color: '#555',
  },
  eventLocation: {
    fontSize: 13,
    color: '#777',
  },
});