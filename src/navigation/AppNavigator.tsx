import React from "react";
import { View, ActivityIndicator } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigatorScreenParams } from "@react-navigation/native";
import { useAuth } from "../context/AuthContext";
import { COLORS } from "../styles/globalStyles";
import { PerfilUsuario } from "../models/User";
import { TabParamList } from "./TabNavigator";

import MyGardenScreen from "../views/screens/MyGardenScreen";
import EditProfileScreen from "../views/screens/EditProfileScreen";
import SettingsScreen from "../views/screens/SettingsScreen";
import PlantDetailScreen from "../views/screens/PlantDetailScreen";
import AddPlantScreen from "../views/screens/AddPlantScreen";
import UserPostsScreen from "../views/screens/UserPostsScreen";
import FollowListScreen from "../views/screens/FollowListScreen";
import UserProfileScreen from "../views/screens/UserProfileScreen";

import { InitialScreen } from "../views/screens/auth/InicialScreen";
import { LoginScreen } from "../views/screens/auth/LoginScreen";
import { RegisterScreen } from "../views/screens/auth/RegisterScreen";

import MainTabNavigator from "./TabNavigator";

export type AppStackParamList = {
  MainTabs: NavigatorScreenParams<TabParamList> | undefined;
  MyGarden: undefined;
  EditarPerfil: { perfil: PerfilUsuario };
  Settings: undefined;
  PlantDetail: { plantaId: string };
  CadastroPlanta: undefined;
  UserPosts: undefined;
  FollowList: { tipo: "seguidores" | "seguindo"; uid?: string };
  AddRoutine: undefined;
  UserProfile: { uid: string };
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
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: COLORS.primary,
        }}
      >
        <ActivityIndicator size="large" color={COLORS.white} />
      </View>
    );
  }

  return (
    <Stack.Navigator
      key={estaLogado ? "logado" : "deslogado"}
      screenOptions={{ headerShown: false }}
    >
      {estaLogado ? (
        <>
          <Stack.Screen name="MainTabs" component={MainTabNavigator} />
          <Stack.Screen name="MyGarden" component={MyGardenScreen} />
          <Stack.Screen name="EditarPerfil" component={EditProfileScreen} />
          <Stack.Screen name="Settings" component={SettingsScreen} />
          <Stack.Screen name="PlantDetail" component={PlantDetailScreen} />
          <Stack.Screen name="CadastroPlanta" component={AddPlantScreen} />
          <Stack.Screen name="UserPosts" component={UserPostsScreen} />
          <Stack.Screen name="FollowList" component={FollowListScreen} />
          <Stack.Screen name="UserProfile" component={UserProfileScreen} />
        </>
      ) : (
        <>
          <Stack.Screen name="Inicio" component={InitialScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}
