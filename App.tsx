import React, { useState } from 'react';
import { Text, View, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import Constants from 'expo-constants';

// Import screens
import HomeScreen from './screens/HomeScreen';
import NotificationsScreen from './screens/NotificationsScreen';
import SettingsScreen from './screens/SettingsScreen';
import CalendarScreen from './screens/CalendarScreen';

// Import mock data
import { EVENTS, NOTIFICATIONS } from './data/mockData';

const HomeStack = createStackNavigator();
const NotificationsStack = createStackNavigator();
const SettingsStack = createStackNavigator();
const CalendarStack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStackScreen({ route }: any) {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={HomeScreen} initialParams={{ events: route.params.events }} />
    </HomeStack.Navigator>
  );
}

function NotificationsStackScreen({ route }: any) {
  return (
    <NotificationsStack.Navigator>
      <NotificationsStack.Screen name="Notifications" component={NotificationsScreen} initialParams={{ notifications: route.params.notifications }} />
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
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName: any;

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
        <Tab.Screen name="Home" options={{ tabBarLabel: 'Home' }}>
          {(props) => <HomeStackScreen {...props} route={{ ...props.route, params: { events } }} />}
        </Tab.Screen>

        <Tab.Screen
          name="Alerts"
          options={{
            tabBarLabel: 'Alerts',
            tabBarBadge: unreadCount > 0 ? unreadCount : undefined,
          }}
        >
          {(props) => <NotificationsStackScreen {...props} route={{ ...props.route, params: { notifications } }} />}
        </Tab.Screen>

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
              console.log('Add button pressed');
              // Show modal or navigate if needed
            },
          }}
        />

        <Tab.Screen name="Calendar" component={CalendarStackScreen} options={{ tabBarLabel: 'Calendar' }} />

        <Tab.Screen name="Settings" component={SettingsStackScreen} options={{ tabBarLabel: 'Settings' }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}