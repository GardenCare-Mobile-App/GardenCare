import React from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Pressable,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useFollowListViewModel } from "../../viewmodels/FollowListViewModel";
import { AvatarPerfil } from "../components/AvatarPerfil";
import { PerfilUsuario } from "../../models/User";
import { createStyles } from "../../styles/screens/FollowListScreen.styles";
import { useTheme } from "../../context/Themecontext";

export default function FollowListScreen() {
  const { cores } = useTheme();
  const styles = createStyles(cores);

  const {
    lista,
    loading,
    buscando,
    erro,
    searchText,
    estaBuscando,
    titulo,
    setSearchText,
    irParaPerfil,
    voltar,
  } = useFollowListViewModel();

  function renderItem({ item }: { item: PerfilUsuario }) {
    return (
      <Pressable style={styles.item} onPress={() => irParaPerfil(item.uid)}>
        <AvatarPerfil fotoURL={item.fotoURL} nome={item.nome} tamanho={44} />
        <View style={{ flex: 1 }}>
          <Text style={styles.itemNome}>{item.nome}</Text>
          {item.pronomes && item.pronomes !== "Prefiro não dizer" && (
            <Text style={styles.itemPronomes}>{item.pronomes}</Text>
          )}
        </View>
        <Ionicons
          name="chevron-forward"
          size={18}
          color={cores.textSecondary}
        />
      </Pressable>
    );
  }

  const mensagemVazia = estaBuscando
    ? "Nenhum usuário encontrado."
    : titulo === "Seguidores"
      ? "Nenhum seguidor ainda."
      : "Você não segue ninguém ainda.";

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={voltar}>
          <Ionicons name="arrow-back" size={22} color={cores.white} />
        </Pressable>
        <Text style={styles.headerTitle}>{titulo}</Text>
      </View>

      <View style={styles.searchContainer}>
        <Ionicons name="search" size={18} color={cores.textSecondary} />
        <TextInput
          style={styles.searchInput}
          placeholder="Pesquisar usuário..."
          placeholderTextColor={cores.textSecondary}
          value={searchText}
          onChangeText={setSearchText}
          autoCapitalize="none"
        />
        {searchText.length > 0 && (
          <Pressable onPress={() => setSearchText("")}>
            <Ionicons
              name="close-circle"
              size={18}
              color={cores.textSecondary}
            />
          </Pressable>
        )}
      </View>

      {loading || buscando ? (
        <ActivityIndicator color={cores.primary} style={styles.loader} />
      ) : erro ? (
        <Text style={styles.erro}>{erro}</Text>
      ) : (
        <FlatList
          data={lista}
          keyExtractor={(item) => item.uid}
          renderItem={renderItem}
          contentContainerStyle={styles.lista}
          ListEmptyComponent={<Text style={styles.vazio}>{mensagemVazia}</Text>}
        />
      )}
    </SafeAreaView>
  );
}
