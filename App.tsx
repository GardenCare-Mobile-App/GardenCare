import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { InitialScreen } from './src/views/screens/auth/InitialScreen';
import { LoginScreen } from './src/views/screens/auth/LoginScreen';
import { RegisterScreen } from './src/views/screens/auth/RegisterScreen';
 
const Stack = createNativeStackNavigator();
 
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Inicio">
        <Stack.Screen name="Inicio" component={InitialScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}