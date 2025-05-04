// App.js - Updated with Create Post Modal and HomeScreen integration
import React, { useState, useRef, useEffect, createContext } from 'react';
import { Text, View, Platform, Modal, TouchableOpacity, TextInput, Image, StyleSheet, ScrollView, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import Constants from 'expo-constants';
import * as ImagePicker from 'expo-image-picker';
import dayjs from 'dayjs';

// Import screens
import HomeScreen from './screens/HomeScreen';
import NotificationsScreen from './screens/NotificationsScreen';
import SettingsScreen from './screens/SettingsScreen';
import CalendarScreen from './screens/CalendarScreen';

// Import mock data
import { EVENTS, NOTIFICATIONS } from './data/mockData';

// Create context for app data
export const AppContext = createContext(null);

const HomeStack = createStackNavigator();
const NotificationsStack = createStackNavigator();
const SettingsStack = createStackNavigator();
const CalendarStack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen 
        name="Home" 
        component={HomeScreen}
      />
    </HomeStack.Navigator>
  );
}

function NotificationsStackScreen() {
  return (
    <NotificationsStack.Navigator>
      <NotificationsStack.Screen 
        name="Notifications" 
        component={NotificationsScreen}
      />
    </NotificationsStack.Navigator>
  );
}

function CalendarStackScreen() {
  return (
    <CalendarStack.Navigator>
      <CalendarStack.Screen name="Calendar" component={CalendarScreen} />
    </CalendarStack.Navigator>
  );
}

function SettingsStackScreen() {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen name="Settings" component={SettingsScreen} />
    </SettingsStack.Navigator>
  );
}

export default function App() {
  const [notifications, setNotifications] = useState(NOTIFICATIONS);
  const [events, setEvents] = useState(EVENTS);
  const [posts, setPosts] = useState([]);
  const unreadCount = notifications.filter(n => !n.read).length;
  
  // Create post modal state
  const [modalVisible, setModalVisible] = useState(false);
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostBody, setNewPostBody] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  
  // Reference to the navigation object
  const navigationRef = React.useRef(null);
  
  // Create context value with data and setter functions
  const contextValue = {
    posts,
    setPosts,
    events,
    setEvents,
    notifications,
    setNotifications
  };

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

    const newPost = {
      id: Date.now(),
      title: newPostTitle,
      body: newPostBody,
      date: dayjs().format('MMMM D, YYYY'),
      image: selectedImage
    };

    // Update posts state with the new post at the beginning of the array
    setPosts(prevPosts => [newPost, ...prevPosts]);
    
    // Reset form fields
    setNewPostTitle('');
    setNewPostBody('');
    setSelectedImage(null);
    setModalVisible(false);
    
    // Navigate to Home after posting to see the new post
    if (navigationRef.current) {
      navigationRef.current.navigate('Home');
    }
    
    // Show confirmation
    Alert.alert(
      "Success",
      "Post created successfully!",
      [{ text: "OK" }],
      { cancelable: true }
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <AppContext.Provider value={contextValue}>
        <NavigationContainer ref={navigationRef}>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ color, size }) => {
                let iconName;

                if (route.name === 'Home') iconName = 'home';
                else if (route.name === 'Alerts') iconName = 'notifications-outline';
                else if (route.name === 'Add') iconName = 'add-circle';
                else if (route.name === 'Calendar') iconName = 'calendar-outline';
                else if (route.name === 'Settings') iconName = 'settings-outline';

                return <Ionicons name={iconName} size={size} color={color} />;
              },
              tabBarActiveTintColor: '#2C7E7B',
              tabBarInactiveTintColor: '#8e8e8e',
              headerShown: false,
            })}
          >
            <Tab.Screen 
              name="Home" 
              component={HomeStackScreen}
              options={{ tabBarLabel: 'Home' }}
            />

            <Tab.Screen
              name="Alerts"
              component={NotificationsStackScreen}
              options={{
                tabBarLabel: 'Alerts',
                tabBarBadge: unreadCount > 0 ? unreadCount : undefined,
              }}
            />

          <Tab.Screen
            name="Add"
            component={() => <View />}
            options={{
              tabBarLabel: '',
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="add-circle" size={48} color="#2C7E7B" style={{ marginBottom: 10 }} />
              ),
            }}
            listeners={{
              tabPress: (e) => {
                e.preventDefault();
                setModalVisible(true);
              },
            }}
          />

          <Tab.Screen 
            name="Calendar" 
            component={CalendarStackScreen} 
            options={{ tabBarLabel: 'Calendar' }} 
          />

          <Tab.Screen 
            name="Settings" 
            component={SettingsStackScreen} 
            options={{ tabBarLabel: 'Settings' }} 
          />
        </Tab.Navigator>
      </NavigationContainer>
      </AppContext.Provider>

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
    </View>
  );
}

const styles = StyleSheet.create({
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