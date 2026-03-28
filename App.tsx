import React from 'react';
import { firebase } from '@react-native-firebase/app';
import { View, StatusBar } from 'react-native';
import { LoginScreen } from './src/views/screens/auth/LoginScreen';
import { RegisterScreen } from './src/views/screens/auth/Register';

export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" />
      
      {/* chamando a sua tela de login*/}
      <RegisterScreen />
      
    </View>
  );
}