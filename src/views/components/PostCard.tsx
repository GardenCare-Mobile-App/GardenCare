import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HeartIcon, ChatCircleIcon, PaperPlaneRightIcon } from 'phosphor-react-native';
import { Post } from '../../models/Post';
import { Comentario } from '../../models/Comentario';
import { useTheme } from '../../context/Themecontext';
import { createStyles } from '../../styles/components/PostCard.styles';
import { AppStackParamList } from '../../navigation/AppNavigator';

type Nav = NativeStackNavigationProp<AppStackParamList>;

interface Props {
  post: Post;
  uid: string;
  comentarios?: Comentario[];
  carregandoComentarios?: boolean;
  onCurtida?: (post: Post) => void;
  onAbrirComentarios?: (postId: string) => void;
  onEnviarComentario?: (postId: string, conteudo: string) => Promise<void>;
}

export function PostCard({ post, uid, comentarios, carregandoComentarios, onCurtida, onAbrirComentarios, onEnviarComentario }: Props) {
  const navigation = useNavigation<Nav>();
  const { cores } = useTheme();
  const styles = createStyles(cores);

  const [expandido, setExpandido] = useState(false);
  const [textoComentario, setTextoComentario] = useState('');
  const [enviandoComentario, setEnviandoComentario] = useState(false);

  const jaCurtiu = post.curtidas.includes(uid);

  function handlePressAutor() {
    if (post.autorId === uid) {
      navigation.navigate('MainTabs', { screen: 'Profile' });
    } else {
      navigation.navigate('UserProfile', { uid: post.autorId });
    }
  }

  function handleToggleComentarios() {
    const novoEstado = !expandido;
    setExpandido(novoEstado);
    if (novoEstado && !comentarios) {
      onAbrirComentarios?.(post.id);
    }
  }

  async function handleEnviarComentario() {
    if (!textoComentario.trim() || !onEnviarComentario) return;
    setEnviandoComentario(true);
    try {
      await onEnviarComentario(post.id, textoComentario.trim());
      setTextoComentario('');
    } finally {
      setEnviandoComentario(false);
    }
  }

  return (
    <View style={styles.card}>

      <TouchableOpacity style={styles.cardHeader} onPress={handlePressAutor}>
        {post.autorFotoURL ? (
          <Image source={{ uri: post.autorFotoURL }} style={styles.avatar} />
        ) : (
          <View style={styles.avatarPlaceholder}>
            <Text style={styles.avatarLetra}>{post.autorNome[0].toUpperCase()}</Text>
          </View>
        )}
        <Text style={styles.autorNome}>{post.autorNome}</Text>
      </TouchableOpacity>

      <Text style={styles.conteudo}>{post.conteudo}</Text>

      {post.imagemURL ? (
        <Image source={{ uri: post.imagemURL }} style={styles.imagemPost} resizeMode="cover" />
      ) : null}

      <View style={styles.acoesBar}>
        <TouchableOpacity style={styles.acaoBtn} onPress={() => onCurtida?.(post)} disabled={!onCurtida}>
          <HeartIcon
            size={20}
            color={jaCurtiu ? cores.error : cores.textSecondary}
            weight={jaCurtiu ? 'fill' : 'regular'}
          />
          <Text style={[styles.acaoTexto, jaCurtiu && styles.curtidaAtiva]}>
            {post.curtidas.length} {post.curtidas.length === 1 ? 'curtida' : 'curtidas'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.acaoBtn} onPress={handleToggleComentarios}>
          <ChatCircleIcon
            size={20}
            color={expandido ? cores.verdeEscuro : cores.textSecondary}
            weight={expandido ? 'fill' : 'regular'}
          />
          <Text style={[styles.acaoTexto, expandido && styles.comentarioAtivo]}>
            {post.totalComentarios} {post.totalComentarios === 1 ? 'comentário' : 'comentários'}
          </Text>
        </TouchableOpacity>
      </View>

      {expandido && (
        <View style={styles.comentariosContainer}>
          {carregandoComentarios ? (
            <ActivityIndicator color={cores.primary} style={{ marginVertical: 12 }} />
          ) : comentarios && comentarios.length > 0 ? (
            comentarios.map((c) => (
              <View key={c.id} style={styles.comentarioItem}>
                {c.autorFotoURL ? (
                  <Image source={{ uri: c.autorFotoURL }} style={styles.comentarioAvatar} />
                ) : (
                  <View style={styles.comentarioAvatarPlaceholder}>
                    <Text style={styles.comentarioAvatarLetra}>{c.autorNome[0].toUpperCase()}</Text>
                  </View>
                )}
                <View style={styles.comentarioBalao}>
                  <Text style={styles.comentarioAutor}>{c.autorNome}</Text>
                  <Text style={styles.comentarioTexto}>{c.conteudo}</Text>
                </View>
              </View>
            ))
          ) : (
            <Text style={styles.semComentarios}>Nenhum comentário ainda. Seja o primeiro!</Text>
          )}

          <View style={styles.inputComentarioContainer}>
            <TextInput
              style={styles.inputComentario}
              placeholder="Escreva um comentário..."
              placeholderTextColor={cores.textSecondary}
              value={textoComentario}
              onChangeText={setTextoComentario}
              multiline
            />
            <TouchableOpacity
              style={[
                styles.btnEnviarComentario,
                (!textoComentario.trim() || enviandoComentario) && styles.btnEnviarDesabilitado,
              ]}
              onPress={handleEnviarComentario}
              disabled={!textoComentario.trim() || enviandoComentario}
            >
              {enviandoComentario ? (
                <ActivityIndicator size="small" color={cores.white} />
              ) : (
                <PaperPlaneRightIcon size={18} color={cores.white} weight="fill" />
              )}
            </TouchableOpacity>
          </View>
        </View>
      )}

    </View>
  );
}
