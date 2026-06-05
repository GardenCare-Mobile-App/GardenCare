import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/Themecontext';
import { createStyles } from '../../styles/screens/FollowListScreen.styles';
import { AppStackParamList } from '../../navigation/AppNavigator';

type FollowListRouteProp = RouteProp<AppStackParamList, 'FollowList'>;

export default function FollowListScreen() {
  const navigation = useNavigation();
  const route = useRoute<FollowListRouteProp>();
  const { tipo } = route.params;
  const { cores } = useTheme();
  const styles = createStyles(cores);

  const titulo = tipo === 'seguidores' ? 'Seguidores' : 'Seguindo';

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={22} color={cores.white} />
        </Pressable>
        <Text style={styles.headerTitle}>{titulo}</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.emptyTitle}>Em breve</Text>
      </View>
    </SafeAreaView>
  );
}
