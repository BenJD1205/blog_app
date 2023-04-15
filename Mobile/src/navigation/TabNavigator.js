import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MainStackNavigator, PostStackNavigator, ProfileStackNavigator } from "./StackNavigator";
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();
const screenOptionStyle = {
  headerStyle: {
    backgroundColor: "#9AC4F8",
  }
};
const BottomTabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="HomeTab" component={MainStackNavigator} options={{
        tabBarLabel: 'Home',
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="home" color={color} size={size} />
        ),
      }} />
      <Tab.Screen name="PostTab" component={PostStackNavigator} options={{
        tabBarLabel: 'Post',
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="note" color={color} size={size} />
        ),
      }} />
      <Tab.Screen name="ProfileTab" component={ProfileStackNavigator} options={{
        tabBarLabel: 'Profile',
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="account" color={color} size={size} />
        ),
      }} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;