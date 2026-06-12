import React, { useState } from 'react';
import {
  View,
  Text,
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
import { AvatarPerfil } from '../components/AvatarPerfil';
import { PhotoPickerModal } from '../components/PhotoPickerModal';
import { FavoritePlantCard } from '../components/FavoritePlantCard';
import { ProfileStatsBar } from '../components/ProfileStatsBar';

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
    totalSeguindo,
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
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>

        <View style={styles.topBar}>
          <Pressable onPress={() => navigation.navigate('Settings')}>
            <Ionicons name="settings-outline" size={22} color={cores.textPrimary} />
          </Pressable>
        </View>

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

        <ProfileStatsBar
          totalPosts={totalPosts}
          totalSeguidores={totalSeguidores}
          totalSeguindo={totalSeguindo}
          onPosts={() => navigation.navigate('UserPosts')}
          onSeguidores={() => navigation.navigate('FollowList', { tipo: 'seguidores' })}
          onSeguindo={() => navigation.navigate('FollowList', { tipo: 'seguindo' })}
        />

        <Pressable style={styles.editButton} onPress={() => navigation.navigate('EditarPerfil', { perfil })}>
          <Text style={styles.editButtonText}>Editar Perfil</Text>
        </Pressable>

        <Pressable style={styles.myGardenButton} onPress={() => navigation.navigate('MyGarden')}>
          <Text style={styles.myGardenButtonText}>Meu Jardim</Text>
        </Pressable>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Plantas favoritas</Text>
          {plantasFavoritas.length === 0 ? (
            <Text style={styles.emptyText}>Nenhuma planta favorita ainda.</Text>
          ) : (
            plantasFavoritas.map((planta, index) => (
              <FavoritePlantCard
                key={planta.id}
                planta={planta}
                isLast={index === plantasFavoritas.length - 1}
                onToggleFavorita={toggleFavorita}
              />
            ))
          )}
        </View>

        <View style={[styles.section, styles.sectionLast]}>
          <Text style={styles.sectionTitle}>Notificações</Text>
          <View style={styles.notificationItem}>
            <Text style={styles.notificationLabel}>Alertas de sensor</Text>
            <Switch value={notificacoes.alertasSensor} onValueChange={(v) => alterarNotificacao('alertasSensor', v)} trackColor={{ false: cores.border, true: cores.verdeEscuro }} thumbColor={cores.white} />
          </View>
          <View style={styles.notificationDivider} />
          <View style={styles.notificationItem}>
            <Text style={styles.notificationLabel}>Lembretes de rotina</Text>
            <Switch value={notificacoes.rotinas} onValueChange={(v) => alterarNotificacao('rotinas', v)} trackColor={{ false: cores.border, true: cores.verdeEscuro }} thumbColor={cores.white} />
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