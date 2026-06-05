import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/Themecontext';
import { FeedRepository } from '../../repository/FeedRepository';
import { Post } from '../../models/Post';
import { PostCard } from '../components/PostCard';
import { createStyles } from '../../styles/screens/UserPostsScreen.styles';

const feedRepository = new FeedRepository();

export default function UserPostsScreen() {
  const navigation = useNavigation();
  const { usuario } = useAuth();
  const { cores } = useTheme();
  const styles = createStyles(cores);
  const [posts, setPosts] = useState<Post[]>([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    if (!usuario?.uid) return;
    feedRepository.getPostsByUser(usuario.uid)
      .then(setPosts)
      .finally(() => setCarregando(false));
  }, [usuario?.uid]);

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
          data={posts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <PostCard post={item} uid={usuario?.uid ?? ''} />
          )}
          contentContainerStyle={styles.lista}
          ListEmptyComponent={
            <Text style={styles.vazio}>Você ainda não fez nenhuma publicação.</Text>
          }
        />
      )}
    </SafeAreaView>
  );
}
