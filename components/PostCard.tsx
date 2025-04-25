import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// Define the type for the post prop
type Post = {
  id: number;
  title: string;
  body: string;
  date: string;
};

type Props = {
  post: Post;
};

const PostCard: React.FC<Props> = ({ post }) => (
  <View style={styles.card}>
    <Text style={styles.title}>{post.title}</Text>
    <Text style={styles.date}>{post.date}</Text>
    <Text style={styles.body}>{post.body}</Text>
  </View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginBottom: 15,
    padding: 15,
    borderRadius: 10,
    elevation: 2,
  },
  title: {
    fontWeight: '700',
    fontSize: 16,
    marginBottom: 5,
  },
  date: {
    fontSize: 12,
    color: '#999',
    marginBottom: 8,
  },
  body: {
    fontSize: 14,
    color: '#333',
  },
});

export default PostCard;
