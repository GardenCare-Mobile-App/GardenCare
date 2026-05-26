import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '../context/AuthContext';
import { COLORS } from '../styles/globalStyles';
import { PerfilUsuario } from '../models/User';

import ProfileScreen from '../views/screens/ProfileScreen';
import MyGardenScreen from '../views/screens/MyGardenScreen';
import EditProfileScreen from '../views/screens/EditProfileScreen';
import SettingsScreen from '../views/screens/SettingsScreen';
import PlantDetailScreen from '../views/screens/PlantDetailScreen';
import AddPlantScreen from '../views/screens/AddPlantScreen';

import { InitialScreen } from '../views/screens/auth/InicialScreen';
import { LoginScreen } from '../views/screens/auth/LoginScreen';
import { RegisterScreen } from '../views/screens/auth/RegisterScreen';

export type AppStackParamList = {
  Profile: undefined;
  MyGarden: undefined;
  EditarPerfil: { perfil: PerfilUsuario };
  Settings: undefined;
  PlantDetail: { plantaId: string };
  CadastroPlanta: undefined;
};

export type AuthStackParamList = {
  Inicio: undefined;
  Login: undefined;
  Register: undefined;
};

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const { estaLogado, carregando } = useAuth();

  if (carregando) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.primary }}>
        <ActivityIndicator size="large" color={COLORS.white} />
      </View>
    );
  }

  return (
    <Stack.Navigator
      key={estaLogado ? 'logado' : 'deslogado'}
      screenOptions={{ headerShown: false }}
    >
      {estaLogado ? (
        <>
          <Stack.Screen name="Profile"       component={ProfileScreen} />
          <Stack.Screen name="MyGarden"      component={MyGardenScreen} />
          <Stack.Screen name="EditarPerfil"  component={EditProfileScreen} />
          <Stack.Screen name="Settings"      component={SettingsScreen} />
          <Stack.Screen name="PlantDetail"   component={PlantDetailScreen} />
          <Stack.Screen name="CadastroPlanta" component={AddPlantScreen} />
        </>
      ) : (
        <>
          <Stack.Screen name="Inicio"   component={InitialScreen} />
          <Stack.Screen name="Login"    component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}
