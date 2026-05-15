import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileScreen from '../views/screens/ProfileScreen';
import MyGardenScreen from '../views/screens/MyGardenScreen';

export type RootStackParamList = {
  Profile: undefined;
  MyGarden: undefined;
  Settings: undefined;
  // Dashboard: undefined;
  // Feed: undefined;
  // Sensor: undefined;
};
 
const Stack = createNativeStackNavigator<RootStackParamList>();
 
export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Profile"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="MyGarden" component={MyGardenScreen}/>
        {/* Adicione as demais telas aqui */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
 