import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from '../components/HomeScreen';
import CarDetailScreen from '../components/CarDetailScreen';
import BookingScreen from '../components/BookingScreen';
import AuthScreen from '../components/AuthScreen';
import LocationScreen from '../components/LocationScreen';

const TabNavigator = () => {
  return (
    <createBottomTabNavigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let rnIcon;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
            rnIcon = 'home';
          } else if (route.name === 'Bookings') {
            iconName = focused ? 'calendar' : 'calendar-outline';
            rnIcon = 'calendar';
          } else if (route.name === 'Location') {
            iconName = focused ? 'map-marker' : 'map-marker-outline';
            rnIcon = 'map';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'account' : 'account-outline';
            rnIcon = 'account';
          } else if (route.name === 'Auth') {
            iconName = focused ? 'login' : 'login-outline';
            rnIcon = 'login';
          }

          return (
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ 
                fontSize: 12, 
                color: focused ? '#007bff' : '#6c757d',
                marginTop: 4 
              }}>
                {route.name}
              </Text>
            </View>
          );
        },
        tabBarActiveTintColor: '#007bff',
        tabBarInactiveTintColor: '#6c757d',
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopWidth: 1,
          borderTopColor: '#e0e0e0',
          paddingBottom: 5,
          height: 80,
        },
        headerStyle: {
          backgroundColor: '#007bff',
        },
        headerTintColor: '#ffffff',
      })}
    >
      <TabNavigator.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <TabNavigator.Screen name="Bookings" component={BookingScreen} options={{ headerShown: false }} />
      <TabNavigator.Screen name="Location" component={LocationScreen} options={{ headerShown: false }} />
      <TabNavigator.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
      <TabNavigator.Screen name="Auth" component={AuthScreen} options={{ headerShown: false }} />
    </createBottomTabNavigator>
  );
};

const StackNavigator = () => {
  return (
    <createNativeStackNavigator>
      <Stack.Screen 
        name="Main" 
        component={TabNavigator} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="CarDetail" 
        component={CarDetailScreen} 
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: '#007bff',
          },
          headerTintColor: '#ffffff',
          title: 'Vehicle Details',
        }} 
      />
      <Stack.Screen 
        name="Booking" 
        component={BookingScreen} 
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: '#007bff',
          },
          headerTintColor: '#ffffff',
          title: 'Complete Booking',
        }} 
      />
    </createNativeStackNavigator>
  );
};

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
};

export default AppNavigator;
