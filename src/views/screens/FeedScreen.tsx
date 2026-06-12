import React, { useState, useRef } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, Image, ActivityIndicator, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useScrollToTop } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useFeedViewModel } from '../../viewmodels/FeedViewModel';
import { Post } from '../../models/Post';
import { PostCard } from '../components/PostCard';
import { createStyles } from '../../styles/screens/FeedScreen.styles';
import { useTheme } from '../../context/Themecontext';
import { AppStackParamList } from '../../navigation/AppNavigator';

type Nav = NativeStackNavigationProp<AppStackParamList>;

export default function FeedScreen() {
  const navigation = useNavigation<Nav>();
  const { cores } = useTheme();
  const styles = createStyles(cores);

  const { posts, carregando, erro, enviando, uid, comentarios, carregandoComentarios, carregarPosts, publicar, toggleCurtida, carregarComentarios, comentar } =
    useFeedViewModel();

  const [conteudo, setConteudo] = useState('');
  const [imagemUri, setImagemUri] = useState<string | undefined>();

  const flatListRef = useRef<FlatList>(null);
  useScrollToTop(flatListRef as any);

  async function escolherImagem() {
    const resultado = await ImagePicker.launchImageLibraryAsync({
       mediaTypes: ['images'],
       quality: 0.7,
     });

    if (!resultado.canceled) {
      setImagemUri(resultado.assets[0].uri);
    }
  }

  async function handlePublicar() {
    if (!conteudo.trim()) {
      Alert.alert('Atenção', 'Escreva algo antes de publicar.');
      return;
    }
    await publicar(conteudo, imagemUri);
    setConteudo('');
    setImagemUri(undefined);
  }

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
    <SafeAreaView style={styles.container} edges={['top']}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >

        <View style={styles.header}>
          <Text style={styles.headerTitle}>Feed da Comunidade </Text>
          <TouchableOpacity style={styles.headerBtn} onPress={() => navigation.navigate('Rotinas')}>
            <Ionicons name="calendar-outline" size={22} color={cores.white} />
            <Text style={styles.headerBtnTexto}>Rotinas</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.novoPost}>

          <TextInput
            style={styles.input}
            placeholder="Compartilhe algo sobre suas plantas..."
            placeholderTextColor={cores.textPLaceholder}
            value={conteudo}
            onChangeText={setConteudo}
            multiline
          />

          {imagemUri && (
            <View style={styles.previewContainer}>
              <Image source={{ uri: imagemUri }} style={styles.previewImagem} />
              <TouchableOpacity onPress={() => setImagemUri(undefined)}>
                <Text style={styles.removerImagem}>✕ Remover foto</Text>
              </TouchableOpacity>
            </View>
          )}

          <View style={styles.botoesPost}>

            <TouchableOpacity style={styles.btnFoto} onPress={escolherImagem}>
              <Text style={styles.btnFotoTexto}>📷 Foto</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.btnPublicar, enviando && styles.btnDesabilitado]}
              onPress={handlePublicar}
              disabled={enviando}
            >
              {enviando ? (
                <ActivityIndicator color={cores.white} size="small"/>
              ) : (
                <Text style={styles.btnPublicarTexto}>Publicar</Text>
              )}
            </TouchableOpacity>

          </View>
        </View>

        {erro ? <Text style={styles.erro}>{erro}</Text> : null}

        {carregando ? (
          <ActivityIndicator color={cores.primary} style={{ marginTop: 32 }} />
        ) : (
          <FlatList
            ref={flatListRef}
            data={posts}
            keyExtractor={(item) => item.id}
            renderItem={renderPost}
            contentContainerStyle={styles.lista}
            onRefresh={carregarPosts}
            refreshing={carregando}
            automaticallyAdjustKeyboardInsets={true}
            ListEmptyComponent={
              <Text style={styles.vazio}>
                Nenhuma publicação ainda. Seja a primeira!
              </Text>
            }
          />
        )}

      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}