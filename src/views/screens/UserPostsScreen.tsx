import React from 'react';
import { View, Text, FlatList, ActivityIndicator, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/Themecontext';
import { useFeedViewModel } from '../../viewmodels/FeedViewModel';
import { Post } from '../../models/Post';
import { PostCard } from '../components/PostCard';
import { createStyles } from '../../styles/screens/UserPostsScreen.styles';

export default function UserPostsScreen() {
  const navigation = useNavigation();
  const { cores } = useTheme();
  const styles = createStyles(cores);

  const {
    posts,
    carregando,
    uid,
    comentarios,
    carregandoComentarios,
    carregarPosts,
    toggleCurtida,
    carregarComentarios,
    comentar,
  } = useFeedViewModel();

  const meusPosts = posts.filter((p) => p.autorId === uid);

  function renderPost({ item }: { item: Post }) {
    return (
      <PostCard
        post={item}
        uid={uid}
        comentarios={comentarios[item.id]}
        carregandoComentarios={carregandoComentarios[item.id]}
        onCurtida={toggleCurtida}
        onAbrirComentarios={carregarComentarios}
        onEnviarComentario={comentar}
      />
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={22} color={cores.white} />
        </Pressable>
        <Text style={styles.headerTitle}>Meus Posts</Text>
      </View>

      {carregando ? (
        <ActivityIndicator color={cores.primary} style={styles.loader} />
      ) : (
        <FlatList
          data={meusPosts}
          keyExtractor={(item) => item.id}
          renderItem={renderPost}
          contentContainerStyle={styles.lista}
          onRefresh={carregarPosts}
          refreshing={carregando}
          ListEmptyComponent={
            <Text style={styles.vazio}>Você ainda não fez nenhuma publicação.</Text>
          }
        />
      )}
    </SafeAreaView>
  );
}
