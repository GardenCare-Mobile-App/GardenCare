import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, Image, ActivityIndicator, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import { useFeedViewModel } from '../../viewmodels/FeedViewModel';
import { Post } from '../../models/Post';
import { styles } from '../../styles/screens/FeedScreen.styles';
import { COLORS } from '../../styles/globalStyles';

export default function FeedScreen({ navigation }: any) {

  const { posts, carregando, erro, enviando, uid, carregarPosts, publicar, toggleCurtida } =
    useFeedViewModel();

  const [conteudo, setConteudo] = useState('');
  const [imagemUri, setImagemUri] = useState<string | undefined>();

  useEffect(() => {
    carregarPosts();
  }, []);

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
    const jaCurtiu = item.curtidas.includes(uid);

    return (
      <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('PostDetail', { postId: item.id })} activeOpacity={0.85}>

        <View style={styles.cardHeader}>
          {item.autorFotoURL ? (
            <Image source={{ uri: item.autorFotoURL }} style={styles.avatar} />
          ) : (
            <View style={styles.avatarPlaceholder}>
              <Text style={styles.avatarLetra}>
                {item.autorNome[0].toUpperCase()}
              </Text>
            </View>
          )}
          <Text style={styles.autorNome}>{item.autorNome}</Text>
        </View>

        <Text style={styles.conteudo}>{item.conteudo}</Text>

        {item.imagemURL ? (
          <Image
            source={{ uri: item.imagemURL }}
            style={styles.imagemPost}
            resizeMode="cover"
          />
        ) : null}

        <TouchableOpacity style={styles.curtidaBtn} onPress={() => toggleCurtida(item)}>
          <Text style={[styles.curtidaTexto, jaCurtiu && styles.curtidaAtiva]}>
            {jaCurtiu ? '❤️' : '🤍'} {item.curtidas.length}{' '}
            {item.curtidas.length === 1 ? 'curtida' : 'curtidas'}
          </Text>
        </TouchableOpacity>

      </TouchableOpacity>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >

        <View style={styles.header}>
          <Text style={styles.headerTitle}>Feed da Comunidade 🌱</Text>
        </View>

        <View style={styles.novoPost}>

          <TextInput
            style={styles.input}
            placeholder="Compartilhe algo sobre suas plantas..."
            placeholderTextColor={COLORS.textPLaceholder}
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
                <ActivityIndicator color={COLORS.white} size="small"/>
              ) : (
                <Text style={styles.btnPublicarTexto}>Publicar</Text>
              )}
            </TouchableOpacity>

          </View>
        </View>

        {erro ? <Text style={styles.erro}>{erro}</Text> : null}

        {carregando ? (
          <ActivityIndicator color={COLORS.primary} style={{ marginTop: 32 }} />
        ) : (
          <FlatList
            data={posts}
            keyExtractor={(item) => item.id}
            renderItem={renderPost}
            contentContainerStyle={styles.lista}
            onRefresh={carregarPosts}
            refreshing={carregando}
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