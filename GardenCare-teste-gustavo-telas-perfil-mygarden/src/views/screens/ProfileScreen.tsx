import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  Pressable,
  ActivityIndicator,
  Switch,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useProfileViewModel } from '../../viewmodels/ProfileViewModel';
import { Plant } from '../../models/Plant';
import { styles } from '../../styles/screens/ProfileScreen.styles';
import { COLORS } from '../../styles/globalStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getStatusColor, getStatusLabel } from '../../utils/PlantUtils';
import { AvatarPerfil } from '../components/AvatarPerfil';

type RootStackParamList = {
  Profile: undefined;
  MyGarden: undefined;
  EditarPerfil: { perfil: any };
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Profile'>;

export default function ProfileScreen() {
  const navigation = useNavigation<NavigationProp>();
  const {
    perfil,
    totalPlantas,
    totalPosts,
    totalSeguidores,
    plantasFavoritas,
    notificacoes,
    toggleFavorita,
    alterarNotificacao,
    loading,
    error,
    recarregar,
  } = useProfileViewModel();

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

          <AvatarPerfil fotoURL={perfil.fotoURL} nome={perfil.nome} />

          <Text style={styles.name}>{perfil.nome}</Text>
          <Text style={styles.pronomes}>{perfil.pronomes}</Text>

          {perfil.bio ? (
            <Text style={styles.bio}>{perfil.bio}</Text>
          ) : null}

          <View style={styles.headerButtons}>
            <Pressable
              style={styles.editButton}
              onPress={() => navigation.navigate('EditarPerfil', { perfil })}
            >
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

        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{totalPlantas}</Text>
            <Text style={styles.statLabel}>Plantas</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{totalPosts}</Text>
            <Text style={styles.statLabel}>Posts</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{totalSeguidores}</Text>
            <Text style={styles.statLabel}>Seguidores</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Plantas favoritas</Text>

          {plantasFavoritas.length === 0 ? (
            <Text style={styles.emptyText}>
              Nenhuma planta favorita ainda.
            </Text>
          ) : (
            plantasFavoritas.map((planta, index) => (
              <View
                key={planta.id}
                style={[
                  styles.plantCard,
                  index === plantasFavoritas.length - 1 && styles.plantCardLast,
                ]}
              >
                <Image source={{ uri: planta.imagemUrl }} style={styles.plantImage} />
                <View style={styles.plantInfo}>
                  <Text style={styles.plantName}>{planta.nome}</Text>
                  <Text style={styles.plantSpecies}>{planta.especie}</Text>
                </View>
                <View style={[
                  styles.statusBadge,
                  { backgroundColor: getStatusColor(planta.statusSaude) },
                ]}>
                  <Text style={styles.statusText}>
                    {getStatusLabel(planta.statusSaude)}
                  </Text>
                </View>
                <Pressable
                  style={styles.favButton}
                  onPress={() => toggleFavorita(planta.id, false)}
                >
                  <Ionicons name="heart" size={20} color={COLORS.error} />
                </Pressable>
              </View>
            ))
          )}
        </View>

        <View style={[styles.section, styles.sectionLast]}>
          <Text style={styles.sectionTitle}>Notificações</Text>

          <View style={styles.notificationItem}>
            <Text style={styles.notificationLabel}>Lembrete de rega</Text>
            <Switch
              value={notificacoes.lembreteDeRega}
              onValueChange={(valor) => alterarNotificacao('lembreteDeRega', valor)}
              trackColor={{ false: COLORS.border, true: COLORS.verdeEscuro }}
              thumbColor={COLORS.white}
            />
          </View>

          <View style={styles.notificationDivider} />

          <View style={styles.notificationItem}>
            <Text style={styles.notificationLabel}>Alertas de sensor</Text>
            <Switch
              value={notificacoes.alertasSensor}
              onValueChange={(valor) => alterarNotificacao('alertasSensor', valor)}
              trackColor={{ false: COLORS.border, true: COLORS.verdeEscuro }}
              thumbColor={COLORS.white}
            />
          </View>

          <View style={styles.notificationDivider} />

          <View style={styles.notificationItem}>
            <Text style={styles.notificationLabel}>Novos posts do feed</Text>
            <Switch
              value={notificacoes.novosPosts}
              onValueChange={(valor) => alterarNotificacao('novosPosts', valor)}
              trackColor={{ false: COLORS.border, true: COLORS.verdeEscuro }}
              thumbColor={COLORS.white}
            />
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}