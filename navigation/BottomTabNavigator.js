import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import JobsScreen from '../screens/JobsScreen';
import BookmarksScreen from '../screens/BookmarksScreen';
import JobDetailScreen from '../screens/JobDetailScreen';
import Icon from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Stack navigator for the Jobs section
const JobsStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Jobs" component={JobsScreen} />
      <Stack.Screen name="JobDetail" component={JobDetailScreen} />
    </Stack.Navigator>
  );
};

// Stack navigator for the Bookmarks section
const BookmarksStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Bookmarks" component={BookmarksScreen} />
      <Stack.Screen name="JobDetail" component={JobDetailScreen} />
    </Stack.Navigator>
  );
};

// Bottom tab navigator for the main navigation
const BottomTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Jobs"
        component={JobsStack}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="ios-briefcase" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Bookmarks"
        component={BookmarksStack}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="ios-bookmark" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
