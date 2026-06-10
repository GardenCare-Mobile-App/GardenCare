import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "../context/Themecontext";

import FeedScreen from "../views/screens/FeedScreen";
import IdentificationScreen from "../views/screens/IdentificationPlantScreen";
import RotinaScreen from "../views/screens/RoutineScreen";
import ProfileScreen from "../views/screens/ProfileScreen";

export type TabParamList = {
  Feed: undefined;
  Identificacao: undefined;
  Rotina: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

export default function MainTabNavigator() {
  const insets = useSafeAreaInsets();
  const { cores, estaEscuro } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: cores.acao,
        tabBarInactiveTintColor: estaEscuro ? "#6B6B6B" : "#A0A0A0",
        tabBarStyle: {
          backgroundColor: cores.cardBackground,
          borderTopColor: cores.border,
          borderTopWidth: 1,
          height: 60 + insets.bottom,
          paddingBottom: insets.bottom + 8,
          paddingTop: 6,
        },
        tabBarLabelStyle: {
          fontSize: 11,
        },
        tabBarIcon: ({ color, size }) => {
          let iconName: React.ComponentProps<typeof Ionicons>["name"];

          if (route.name === "Feed") {
            iconName = "leaf-outline";
          } else if (route.name === "Identificacao") {
            iconName = "scan-outline";
          } else if (route.name === "Rotina") {
            iconName = "calendar-outline";
          } else {
            iconName = "person-outline";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="Feed"
        component={FeedScreen}
        options={{ tabBarLabel: "Feed" }}
      />
      <Tab.Screen
        name="Identificacao"
        component={IdentificationScreen}
        options={{ tabBarLabel: "Identificar" }}
      />
      <Tab.Screen
        name="Rotina"
        component={RotinaScreen}
        options={{ tabBarLabel: "Rotina" }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ tabBarLabel: "Perfil" }}
      />
    </Tab.Navigator>
  );
}
