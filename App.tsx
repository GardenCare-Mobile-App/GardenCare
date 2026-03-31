import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileScreen from './src/views/screens/ProfileScreen';
import MyGardenScreen from './src/views/screens/MyGardenScreen';
 
const Stack = createNativeStackNavigator();
 
export default function App() {
  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="MyGarden" component={MyGardenScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}