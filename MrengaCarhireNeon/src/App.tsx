import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import AppNavigator from './src/navigation/AppNavigator';
import { StatusBar } from 'react-native';
import { Platform } from 'react-native';

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <StatusBar 
          barStyle={Platform.OS === 'android' ? 'light-content' : 'dark-content'}
          backgroundColor="#007bff" 
        />
        <AppNavigator />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
