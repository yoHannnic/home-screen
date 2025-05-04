import React, { useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, FlatList, SafeAreaView } from 'react-native';
import dayjs from 'dayjs';
import { AppContext } from '../App'; // Import the context from App.js

export default function HomeScreen() {
  // Get data from context instead of route params
  const { posts, events } = useContext(AppContext);

  // Render each announcement/event in the horizontal scroll
  const renderEvent = ({ item }) => (
    <View style={styles.eventCard}>
      <Text style={styles.eventTitle}>{item.title}</Text>
      <Text style={styles.eventDate}>{dayjs(item.date).format('MMMM D, YYYY')}</Text>
      <Text style={styles.eventLocation}>{item.location}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Welcome back 👋</Text>

      {/* Announcements/Events Section - Horizontal Scrolling */}
      <View style={styles.announcementsSection}>
        <Text style={styles.sectionTitle}>Announcements</Text>
        {events.length === 0 ? (
          <Text style={styles.emptyText}>No announcements available.</Text>
        ) : (
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={events}
            renderItem={renderEvent}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.horizontalList}
          />
        )}
      </View>

      {/* Posts Section - Vertical Scrolling */}
      <View style={styles.postsSection}>
        <Text style={styles.sectionTitle}>Latest Posts</Text>
        {posts.length === 0 ? (
          <Text style={styles.emptyText}>No posts yet. Create one using the + tab!</Text>
        ) : (
          <FlatList
            data={posts}
            renderItem={({ item }) => (
              <View key={item.id} style={styles.card}>
                {item.image && <Image source={{ uri: item.image }} style={styles.image} />}
                <Text style={styles.postTitle}>{item.title}</Text>
                <Text style={styles.postDate}>{item.date}</Text>
                <Text style={styles.postBody}>{item.body}</Text>
              </View>
            )}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.verticalList}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2C7E7B',
    marginBottom: 15,
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
    marginBottom: 10,
  },
  // Announcements/Events section
  announcementsSection: {
    marginBottom: 20,
  },
  horizontalList: {
    paddingRight: 20,
  },
  eventCard: {
    backgroundColor: '#E0F2F1',
    padding: 15,
    borderRadius: 10,
    marginRight: 12,
    width: 220,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
    elevation: 1,
  },
  eventTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#2C7E7B',
  },
  eventDate: {
    fontSize: 13,
    color: '#555',
    marginTop: 3,
  },
  eventLocation: {
    fontSize: 13,
    color: '#777',
    marginTop: 3,
  },
  // Posts section
  postsSection: {
    flex: 1,
  },
  verticalList: {
    paddingBottom: 20,
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
});