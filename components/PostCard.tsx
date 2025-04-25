import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// PostCard component to display each post
const PostCard = ({ post }: { post: { title: string; body: string; date: string } }) => {
  return (
    <View style={styles.cardContainer}>
      <Text style={styles.title}>{post.title}</Text>
      <Text style={styles.date}>{post.date}</Text>
      <Text style={styles.body}>{post.body}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 10,
    marginHorizontal: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  date: {
    fontSize: 14,
    color: '#888',
    marginTop: 5,
  },
  body: {
    fontSize: 16,
    color: '#444',
    marginTop: 10,
  },
});

export default PostCard;
