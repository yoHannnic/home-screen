import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Modal, TextInput, Image, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import EventCard from '../components/EventCard';
import PostCard from '../components/PostCard';

// Define types for the event and post objects
interface Event {
  id: number;
  title: string;
  date: string;
  location: string;
  description?: string;
}

interface Post {
  id: number;
  title: string;
  body: string;
  date: string;
  image?: string;
}

const HomeScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  // State for posts and events
  const [events, setEvents] = useState<Event[]>(route.params?.events || [
    {
      id: 1,
      title: 'CREAM Week 2023',
      date: 'April 17 - 25',
      location: 'Student Center',
      description: 'Career readiness and mentorship week with industry pros'
    }
  ]);
  
  const [posts, setPosts] = useState<Post[]>(route.params?.posts || []);
  
  // State for create post modal
  const [modalVisible, setModalVisible] = useState(false);
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostBody, setNewPostBody] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Function to pick an image from the device gallery
  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'Please grant permission to access your photos');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  // Function to create a new post
  const createPost = () => {
    if (!newPostTitle.trim()) {
      Alert.alert('Error', 'Please enter a title for your post');
      return;
    }

    const newPost: Post = {
      id: Date.now(),
      title: newPostTitle,
      body: newPostBody,
      date: new Date().toLocaleDateString(),
      image: selectedImage || undefined
    };

    setPosts([newPost, ...posts]);
    
    // Reset form fields
    setNewPostTitle('');
    setNewPostBody('');
    setSelectedImage(null);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
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
          posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))
        )}
      </ScrollView>

      {/* Create Post Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Create New Post</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Ionicons name="close" size={24} color="#333" />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalContent}>
              <Text style={styles.inputLabel}>Title</Text>
              <TextInput
                style={styles.input}
                value={newPostTitle}
                onChangeText={setNewPostTitle}
                placeholder="Enter post title"
              />

              <Text style={styles.inputLabel}>Content</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={newPostBody}
                onChangeText={setNewPostBody}
                placeholder="What's on your mind?"
                multiline
                numberOfLines={4}
              />

              <Text style={styles.inputLabel}>Image</Text>
              <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
                {selectedImage ? (
                  <Image source={{ uri: selectedImage }} style={styles.previewImage} />
                ) : (
                  <View style={styles.placeholderImage}>
                    <Ionicons name="image-outline" size={40} color="#aaa" />
                    <Text style={styles.placeholderText}>Tap to select an image</Text>
                  </View>
                )}
              </TouchableOpacity>

              <TouchableOpacity style={styles.postButton} onPress={createPost}>
                <Text style={styles.postButtonText}>Create Post</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navButton}>
          <Ionicons name="home" size={24} color="#333" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <Ionicons name="calendar" size={24} color="#333" />
          <View style={styles.badge}><Text style={styles.badgeText}>2</Text></View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
          <Ionicons name="add" size={32} color="#FFF" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <Ionicons name="calendar-outline" size={24} color="#333" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <Ionicons name="settings-outline" size={24} color="#333" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  screenContainer: {
    flex: 1,
    paddingTop: 10,
    marginBottom: 60, // Space for bottom nav
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
  
  // Bottom Navigation
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    height: 60,
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  navButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: 'red',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#2C7E7B',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    marginBottom: 20, // Lift up the + button
  },
  
  // Modal Styles
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    width: '90%',
    maxHeight: '80%',
    paddingVertical: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C7E7B',
  },
  modalContent: {
    padding: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 5,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#DDDDDD',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    backgroundColor: '#FAFAFA',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  imagePicker: {
    marginBottom: 20,
  },
  placeholderImage: {
    height: 150,
    borderWidth: 1,
    borderColor: '#DDDDDD',
    borderRadius: 8,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  placeholderText: {
    marginTop: 10,
    color: '#888',
  },
  previewImage: {
    height: 200,
    borderRadius: 8,
    resizeMode: 'cover',
  },
  postButton: {
    backgroundColor: '#2C7E7B',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  postButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default HomeScreen;