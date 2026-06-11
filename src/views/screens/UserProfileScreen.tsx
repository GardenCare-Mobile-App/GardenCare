import React from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useUserProfileViewModel } from "../../viewmodels/UserProfileViewModel";
import { AvatarPerfil } from "../components/AvatarPerfil";
import { PostCard } from "../components/PostCard";
import { FavoritePlantCard } from "../components/FavoritePlantCard";
import { ProfileStatsBar } from "../components/ProfileStatsBar";
import { createStyles } from "../../styles/screens/UserProfileScreen.styles";
import { useTheme } from "../../context/Themecontext";
import { Post } from "../../models/Post";

export default function UserProfileScreen() {
  const { cores } = useTheme();
  const styles = createStyles(cores);

  const {
    perfil,
    posts,
    plantasFavoritas,
    totalPosts,
    totalSeguidores,
    totalSeguindo,
    estaSeguindo,
    seguindoLoading,
    loading,
    erro,
    uid,
    toggleSeguir,
    voltar,
    irParaFollowList,
  } = useUserProfileViewModel();

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={cores.primary} />
      </View>
    );
  }

  if (erro || !perfil) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{erro ?? "Perfil não encontrado."}</Text>
      </View>
    );
  }

  function renderPost({ item }: { item: Post }) {
    return <PostCard post={item} uid={uid} />;
  }

  function renderCabecalho() {
    return (
      <>
        <View style={styles.profileRow}>
          <AvatarPerfil
            fotoURL={perfil!.fotoURL}
            nome={perfil!.nome}
            tamanho={80}
          />
          <View style={styles.infoSection}>
            <Text style={styles.name}>{perfil!.nome}</Text>
            {perfil!.pronomes && perfil!.pronomes !== "Prefiro não dizer" && (
              <Text style={styles.pronomes}>{perfil!.pronomes}</Text>
            )}
            {perfil!.bio ? (
              <Text style={styles.bio} numberOfLines={3}>
                {perfil!.bio}
              </Text>
            ) : null}
          </View>
        </View>

        <ProfileStatsBar
          totalPosts={totalPosts}
          totalSeguidores={totalSeguidores}
          totalSeguindo={totalSeguindo}
          onSeguidores={() => irParaFollowList("seguidores")}
          onSeguindo={() => irParaFollowList("seguindo")}
        />

        <TouchableOpacity
          style={[
            styles.followButton,
            estaSeguindo && styles.followButtonOutline,
          ]}
          onPress={toggleSeguir}
          disabled={seguindoLoading}
        >
          {seguindoLoading ? (
            <ActivityIndicator
              color={estaSeguindo ? cores.primary : cores.white}
              size="small"
            />
          ) : (
            <Text
              style={[
                styles.followButtonText,
                estaSeguindo && styles.followButtonTextOutline,
              ]}
            >
              {estaSeguindo ? "Seguindo" : "Seguir"}
            </Text>
          )}
        </TouchableOpacity>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Plantas favoritas</Text>
          {plantasFavoritas.length === 0 ? (
            <Text style={styles.emptyText}>Nenhuma planta favorita.</Text>
          ) : (
            plantasFavoritas.map((planta, index) => (
              <FavoritePlantCard
                key={planta.id}
                planta={planta}
                isLast={index === plantasFavoritas.length - 1}
              />
            ))
          )}
        </View>

        <Text style={styles.postsTitle}>Publicações</Text>
      </>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={voltar}>
          <Ionicons name="arrow-back" size={22} color={cores.white} />
        </Pressable>
        <Text style={styles.headerTitle}>{perfil.nome}</Text>
      </View>

      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={renderPost}
        contentContainerStyle={styles.lista}
        ListHeaderComponent={renderCabecalho}
        ListEmptyComponent={
          <Text style={styles.vazio}>Nenhuma publicação ainda.</Text>
        }
      />
    </SafeAreaView>
  );
}
