import React from 'react';
import { View, StatusBar } from 'react-native';
import { LoginScreen } from './src/views/screens/auth/LoginScreen';

export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" />
      
      {/* chamando a sua tela de login*/}
      <LoginScreen />
      
    </View>
  );
}