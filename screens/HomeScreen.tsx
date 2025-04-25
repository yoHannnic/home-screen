// screens/HomeScreen.js
import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import EventCard from '../components/EventCard';

const HomeScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  // Get events and posts from route params
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
          {events.map((event) => (
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
        <View style={styles.postsContainer}>
          {posts.map((post) => (
            <View key={post.id} style={styles.postCard}>
              {post.image && (
                <Image source={{ uri: post.image }} style={styles.postImage} />
              )}
              <View style={styles.postContent}>
                <Text style={styles.postTitle}>{post.title}</Text>
                <Text style={styles.postDate}>{post.date}</Text>
                <Text style={styles.postBody}>{post.body}</Text>
              </View>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
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
    marginTop: 20,
    marginBottom: 40,
    fontSize: 16,
    color: '#999',
  },
  horizontalScroll: {
    paddingHorizontal: 20,
  },
  postsContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  postCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  postImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  postContent: {
    padding: 16,
  },
  postTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  postDate: {
    fontSize: 14,
    color: '#888',
    marginBottom: 8,
  },
  postBody: {
    fontSize: 16,
    color: '#444',
    lineHeight: 22,
  },
});

export default HomeScreen;