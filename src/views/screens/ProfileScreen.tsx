import React, { useState } from 'react';
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
import { createStyles } from '../../styles/screens/ProfileScreen.styles';
import { useTheme } from '../../context/Themecontext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getStatusColor, getStatusLabel } from '../../utils/PlantUtils';
import { AvatarPerfil } from '../components/AvatarPerfil';
import { PhotoPickerModal } from '../components/PhotoPickerModal';

type RootStackParamList = {
  MyGarden: undefined;
  EditarPerfil: { perfil: any };
  Settings: undefined;
  UserPosts: undefined;
  FollowList: { tipo: 'seguidores' | 'seguindo' };
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function ProfileScreen() {
  const navigation = useNavigation<NavigationProp>();
  const { cores } = useTheme();
  const styles = createStyles(cores);
  const [modalFotoVisivel, setModalFotoVisivel] = useState(false);

  const {
    perfil,
    totalPlantas,
    totalPosts,
    totalSeguidores,
    plantasFavoritas,
    notificacoes,
    toggleFavorita,
    alterarNotificacao,
    atualizarFoto,
    loading,
    error,
    recarregar,
  } = useProfileViewModel();

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={cores.primary} />
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

        {/* Topo: só o settings */}
        <View style={styles.topBar}>
          <Pressable onPress={() => navigation.navigate('Settings')}>
            <Ionicons name="settings-outline" size={22} color={cores.textPrimary} />
          </Pressable>
        </View>

        {/* Linha avatar + nome/pronomes/bio */}
        <View style={styles.profileRow}>
          <Pressable style={styles.avatarWrapper} onPress={() => setModalFotoVisivel(true)}>
            <AvatarPerfil fotoURL={perfil.fotoURL} nome={perfil.nome} tamanho={80} style={{ marginBottom: 0 }} />
            <View style={styles.cameraIcon}>
              <Ionicons name="camera" size={14} color={cores.white} />
            </View>
          </Pressable>

          <View style={styles.infoSection}>
            <Text style={styles.name}>{perfil.nome}</Text>
            {perfil.pronomes && perfil.pronomes !== 'prefiro não dizer' && (
              <Text style={styles.pronomes}>{perfil.pronomes}</Text>
            )}
            {perfil.bio ? (
              <Text style={styles.bio} numberOfLines={3}>{perfil.bio}</Text>
            ) : null}
          </View>
        </View>

        {/* Barra de stats */}
        <View style={styles.statsBar}>
          <Pressable style={styles.statItem} onPress={() => navigation.navigate('UserPosts')}>
            <Text style={styles.statValue}>{totalPosts}</Text>
            <Text style={styles.statLabel}>Posts</Text>
          </Pressable>
          <View style={styles.statDivider} />
          <Pressable style={styles.statItem} onPress={() => navigation.navigate('FollowList', { tipo: 'seguidores' })}>
            <Text style={styles.statValue}>{totalSeguidores}</Text>
            <Text style={styles.statLabel}>Seguidores</Text>
          </Pressable>
          <View style={styles.statDivider} />
          <Pressable style={styles.statItem} onPress={() => navigation.navigate('FollowList', { tipo: 'seguindo' })}>
            <Text style={styles.statValue}>{0}</Text>
            <Text style={styles.statLabel}>Seguindo</Text>
          </Pressable>
        </View>

        {/* Botão editar perfil */}
        <Pressable style={styles.editButton} onPress={() => navigation.navigate('EditarPerfil', { perfil })}>
          <Text style={styles.editButtonText}>Editar Perfil</Text>
        </Pressable>

        {/* Plantas favoritas */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Plantas favoritas</Text>
          {plantasFavoritas.length === 0 ? (
            <Text style={styles.emptyText}>Nenhuma planta favorita ainda.</Text>
          ) : (
            plantasFavoritas.map((planta, index) => (
              <View key={planta.id} style={[styles.plantCard, index === plantasFavoritas.length - 1 && styles.plantCardLast]}>
                {planta.imagemUrl ? (
                  <Image source={{ uri: planta.imagemUrl }} style={styles.plantImage} />
                ) : (
                  <View style={[styles.plantImage, { backgroundColor: '#C8E6C9', alignItems: 'center', justifyContent: 'center' }]}>
                    <Ionicons name="leaf-outline" size={20} color="#2E7D32" />
                  </View>
                )}
                <View style={styles.plantInfo}>
                  <Text style={styles.plantName}>{planta.nome}</Text>
                  <Text style={styles.plantSpecies}>{planta.especie}</Text>
                </View>
                <View style={[styles.statusBadge, { backgroundColor: getStatusColor(planta.statusSaude) }]}>
                  <Text style={styles.statusText}>{getStatusLabel(planta.statusSaude)}</Text>
                </View>
                <Pressable style={styles.favButton} onPress={() => toggleFavorita(planta.id, false)}>
                  <Ionicons name="heart" size={20} color={cores.error} />
                </Pressable>
              </View>
            ))
          )}
        </View>

        {/* Notificações */}
        <View style={[styles.section, styles.sectionLast]}>
          <Text style={styles.sectionTitle}>Notificações</Text>
          <View style={styles.notificationItem}>
            <Text style={styles.notificationLabel}>Lembrete de rega</Text>
            <Switch value={notificacoes.lembreteDeRega} onValueChange={(v) => alterarNotificacao('lembreteDeRega', v)} trackColor={{ false: cores.border, true: cores.verdeEscuro }} thumbColor={cores.white} />
          </View>
          <View style={styles.notificationDivider} />
          <View style={styles.notificationItem}>
            <Text style={styles.notificationLabel}>Alertas de sensor</Text>
            <Switch value={notificacoes.alertasSensor} onValueChange={(v) => alterarNotificacao('alertasSensor', v)} trackColor={{ false: cores.border, true: cores.verdeEscuro }} thumbColor={cores.white} />
          </View>
          <View style={styles.notificationDivider} />
          <View style={styles.notificationItem}>
            <Text style={styles.notificationLabel}>Novos posts do feed</Text>
            <Switch value={notificacoes.novosPosts} onValueChange={(v) => alterarNotificacao('novosPosts', v)} trackColor={{ false: cores.border, true: cores.verdeEscuro }} thumbColor={cores.white} />
          </View>
        </View>

      </ScrollView>

      <PhotoPickerModal
        visivel={modalFotoVisivel}
        onFechar={() => setModalFotoVisivel(false)}
        onFotoSelecionada={(_, base64) => {
          setModalFotoVisivel(false);
          atualizarFoto(base64);
        }}
      />
    </SafeAreaView>
  );
}
