import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useProfileViewModel } from '../../viewmodels/ProfileViewModel ';
import { styles } from '../../styles/screens/ProfileScreen.styles';
import { COLORS } from '../../styles/globalStyles';
import { SafeAreaView } from "react-native-safe-area-context";

type RootStackParamList = {
  Profile: undefined;
  MyGarden: undefined;
};
 
type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Profile'>;
 
function formatarMembroDesde(criadoEm: any): string {
  if (!criadoEm) return '';
  const data = criadoEm?.toDate ? criadoEm.toDate() : new Date(criadoEm);
  return `Membro desde ${data.toLocaleDateString('pt-BR', {
    month: 'long',
    year: 'numeric',
  })}`;
}
 
export default function ProfileScreen() {
  const navigation = useNavigation<NavigationProp>();
 
  //depoistenho que substituir pelo uid real do usuário autenticado
  const uid = 'uid-do-usuario-logado';
  const { perfil, loading, error, recarregar } = useProfileViewModel(uid);
 
  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }
 
  if (error || !perfil) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error ?? 'Perfil não encontrado.'}</Text>
        <Pressable style={styles.retryButton} onPress={recarregar}>
          <Text style={styles.retryButtonText}>Tentar novamente</Text>
        </Pressable>
      </View>
    );
  }
 
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
 
        <View style={styles.header}>
 
          <View style={styles.headerActions}>
            <Pressable style={styles.settingsButton}>
              <Ionicons name="settings-outline" size={22} color={COLORS.white} />
            </Pressable>
          </View>
 
          {perfil.fotoURL ? (
            <Image source={{ uri: perfil.fotoURL }} style={styles.avatar} />
          ) : (
            <View style={styles.avatarFallback}>
              <Text style={styles.avatarFallbackText}>
                {perfil.nome.charAt(0).toUpperCase()}
              </Text>
            </View>
          )}
 
          <Text style={styles.name}>{perfil.nome}</Text>
 
          <Text style={styles.pronomes}>{perfil.pronomes}</Text>
 
          <Text style={styles.email}>{perfil.email}</Text>
 
          <Text style={styles.membroDesde}>
            {formatarMembroDesde(perfil.criadoEm)}
          </Text>

          <View style={styles.headerButtons}>
            <Pressable style={styles.editButton}>
              <Text style={styles.editButtonText}>Editar Perfil</Text>
            </Pressable>
 
            <Pressable
              style={styles.gardenButton}
              onPress={() => navigation.navigate('MyGarden')}
            >
              <Ionicons name="leaf-outline" size={16} color={COLORS.white} />
              <Text style={styles.gardenButtonText}>Meu Jardim</Text>
            </Pressable>
          </View>
        </View>
 
      </ScrollView>
    </SafeAreaView>
  );
}