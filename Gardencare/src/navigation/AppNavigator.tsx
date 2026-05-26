import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileScreen from '../views/screens/ProfileScreen';
import MyGardenScreen from '../views/screens/MyGardenScreen';
import EditarPerfilScreen from '../views/screens/EditProfileScreen';
import SettingsScreen from '../views/screens/SettingsScreen';
import PlantDetailScreen from '../views/screens/PlantDetailScreen';
import { PerfilUsuario } from '../models/User';

export type RootStackParamList = {
  Profile: undefined;
  MyGarden: undefined;
  EditarPerfil: { perfil: PerfilUsuario };
  Settings: undefined;
  PlantDetail: { plantaId: string };
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
        <Stack.Screen name="MyGarden" component={MyGardenScreen} />
        <Stack.Screen name="EditarPerfil" component={EditarPerfilScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="PlantDetail" component={PlantDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
 