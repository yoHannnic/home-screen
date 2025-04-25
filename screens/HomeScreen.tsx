import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
  Button,
  Platform
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import EventCard from '../components/EventCard';
import PostCard from '../components/PostCard';

const HomeScreen = () => {
  const navigation = useNavigation();

  // Explicitly type the posts state
  const [posts, setPosts] = useState<{ id: number; title: string; body: string; date: string }[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newBody, setNewBody] = useState('');
  const [postDate, setPostDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Explicitly type the events array
  const events: { id: number; title: string; date: string; location: string }[] = [
    {
      id: 1,
      title: 'Band Practice',
      date: 'April 26, 2025',
      location: 'Music Room A',
    },
    {
      id: 2,
      title: 'Harana Para Kina Lolo\'t Lola',
      date: 'April 30, 2025',
      location: 'St. La Salle Hall',
    },
  ];

  const addPost = () => {
    if (newTitle.trim() && newBody.trim()) {
      const newPost = {
        id: Date.now(),
        title: newTitle,
        body: newBody,
        date: postDate.toLocaleDateString(),
      };
      setPosts([newPost, ...posts]);
      setNewTitle('');
      setNewBody('');
      setPostDate(new Date());
      setModalVisible(false);
    }
  };

  // Fix the type of event and selectedDate parameters
  const onChangeDate = (event: Event, selectedDate: Date | undefined) => {
    const currentDate = selectedDate || postDate;
    setShowDatePicker(Platform.OS === 'ios');
    setPostDate(currentDate);
  };

  return (
    <ScrollView style={styles.screenContainer}>
      {/* Events Header */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Upcoming Events</Text>
        <TouchableOpacity onPress={() => navigation.navigate('AllEvents')}>
          <Text style={styles.seeAllButton}>See All</Text>
        </TouchableOpacity>
      </View>

      {/* Events List */}
      {events.length === 0 ? (
        <Text style={styles.emptyText}>No upcoming events at the moment.</Text>
      ) : (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalScroll}>
          {events.map(event => (
            <EventCard key={event.id} event={event} />
          ))}
        </ScrollView>
      )}

      {/* Posts Header */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Posts</Text>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Text style={styles.addPostButton}>+ Add Post</Text>
        </TouchableOpacity>
      </View>

      {/* Posts List */}
      {posts.length === 0 ? (
        <Text style={styles.emptyText}>No posts available.</Text>
      ) : (
        posts.map(post => (
          <PostCard key={post.id} post={post} />
        ))
      )}

      {/* Modal */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Create New Post</Text>
            <TextInput
              placeholder="Title"
              value={newTitle}
              onChangeText={setNewTitle}
              style={styles.input}
            />
            <TextInput
              placeholder="Content"
              value={newBody}
              onChangeText={setNewBody}
              style={[styles.input, { height: 80 }]}
              multiline
            />
            <TouchableOpacity onPress={() => setShowDatePicker(true)}>
              <Text style={styles.dateText}>Date: {postDate.toLocaleDateString()}</Text>
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                value={postDate}
                mode="date"
                display="default"
                onChange={onChangeDate}
              />
            )}
            <View style={styles.modalButtons}>
              <Button title="Cancel" color="#888" onPress={() => setModalVisible(false)} />
              <Button title="Post" onPress={addPost} />
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#F9F9F9',
    paddingTop: 10,
    paddingBottom: 40,
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
  addPostButton: {
    color: '#007AFF',
    fontSize: 15,
    fontWeight: '600',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: '#999',
  },
  horizontalScroll: {
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 20,
  },
  modalContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#f1f1f1',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  dateText: {
    fontSize: 16,
    color: '#007AFF',
    marginBottom: 10,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default HomeScreen;
