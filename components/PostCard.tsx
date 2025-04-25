import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { Ionicons } from '@expo/vector-icons'; // Requires expo or react-native-vector-icons

const PostCard = ({ post }) => {
  return (
    <View style={styles.card}>
      {post.image && <Image source={{ uri: post.image }} style={styles.image} />}

      <Text style={styles.title}>{post.title}</Text>
      <Text style={styles.date}>{post.date}</Text>
      <Text style={styles.body}>{post.body}</Text>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.button}>
          <Ionicons name="heart-outline" size={20} color="#2C7E7B" />
          <Text style={styles.buttonText}>Like</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Ionicons name="chatbubble-outline" size={20} color="#2C7E7B" />
          <Text style={styles.buttonText}>Comment</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

PostCard.propTypes = {
  post: PropTypes.shape({
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    image: PropTypes.string, // optional
  }).isRequired,
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginHorizontal: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 180,
    borderRadius: 8,
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1C1C1E',
    marginBottom: 5,
  },
  date: {
    fontSize: 12,
    color: '#888',
    marginBottom: 10,
  },
  body: {
    fontSize: 15,
    color: '#333',
    lineHeight: 20,
    marginBottom: 15,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 20,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  buttonText: {
    fontSize: 14,
    color: '#2C7E7B',
    fontWeight: '500',
  },
});

export default PostCard;
