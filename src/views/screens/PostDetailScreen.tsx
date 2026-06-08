import React, { useMemo } from 'react';
import { View, Text, ScrollView, Pressable, Image, ActivityIndicator, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import { ArrowLeftIcon, HeartIcon, DotsThreeVerticalIcon } from 'phosphor-react-native';
import { useTheme } from '../../context/Themecontext';
import { usePostDetailViewModel } from '../../viewmodels/PostDetailViewModel';
import { createStyles } from '../../styles/screens/PostDetailScreen.styles';
import { AvatarPerfil } from '../components/AvatarPerfil';

function formatarData(criadoEm: any): string {
  if (!criadoEm) return '';
  const data: Date = criadoEm?.toDate ? criadoEm.toDate() : new Date(criadoEm);
  const agora = new Date();
  const diffMin = Math.floor((agora.getTime() - data.getTime()) / 60000);
  if (diffMin < 1) return 'agora mesmo';
  if (diffMin < 60) return `há ${diffMin} min`;
  const diffH = Math.floor(diffMin / 60);
  if (diffH < 24) return `há ${diffH}h`;
  const diffD = Math.floor(diffH / 24);
  if (diffD === 1) return 'há 1 dia';
  if (diffD < 7) return `há ${diffD} dias`;
  return data.toLocaleDateString('pt-BR');
}

export default function PostDetailScreen({ route, navigation }: any) {
  const { postId } = route.params as { postId: string };
  const { cores, estaEscuro } = useTheme();
  const styles = useMemo(() => createStyles(cores, estaEscuro), [cores, estaEscuro]);

  const { post, loading, error, jaCurtiu, ehAutor, carregarPost, toggleCurtida, deletarPost } =
    usePostDetailViewModel(postId);

  function confirmarExclusao() {
    Alert.alert(
      'Excluir post',
      'Tem certeza de que deseja excluir este post?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            await deletarPost();
            navigation.goBack();
          },
        },
      ]
    );
  }

  useFocusEffect(
    React.useCallback(() => {
      carregarPost();
    }, [carregarPost])
  );

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={cores.primary} />
      </View>
    );
  }

  if (error || !post) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error ?? 'Post não encontrado.'}</Text>
      </View>
    );
  }

  const totalCurtidas = post.curtidas?.length ?? 0;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* header */}
      <View style={styles.header}>
        <Pressable
          style={({ pressed }) => [styles.backButton, { opacity: pressed ? 0.6 : 1 }]}
          onPress={() => navigation.goBack()}
        >
          <ArrowLeftIcon size={28} color={cores.white} weight="regular" />
        </Pressable>
        <Text style={styles.headerTitle}>Detalhes do Post</Text>
        {ehAutor && (
          <Pressable
            style={({ pressed }) => [styles.menuButton, { opacity: pressed ? 0.6 : 1 }]}
            onPress={confirmarExclusao}
          >
            <DotsThreeVerticalIcon size={28} color={cores.white} weight="bold" />
          </Pressable>
        )}
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.postCard}>

          {/* autor */}
          <View style={styles.autorRow}>
            <AvatarPerfil fotoURL={post.autorFotoURL} nome={post.autorNome} tamanho={46} />
            <View style={styles.autorInfo}>
              <Text style={styles.autorNome}>{post.autorNome}</Text>
              <Text style={styles.autorData}>{formatarData(post.criadoEm)}</Text>
            </View>
          </View>

          {/* conteúdo do post */}
          <View style={styles.conteudoContainer}>
            <Text style={styles.conteudoTexto}>{post.conteudo}</Text>
          </View>

          {/* imagem (opcional) */}
          {post.imagemURL ? (
            <Image source={{ uri: post.imagemURL }} style={styles.imagemPost} />
          ) : null}

          {/* curtidas */}
          <View style={styles.curtidasRow}>
            <View style={styles.curtidasInfo}>
              <HeartIcon
                size={20}
                color={totalCurtidas > 0 ? cores.error : cores.textSecondary}
                weight={totalCurtidas > 0 ? 'fill' : 'regular'}
              />
              <Text style={styles.curtidasTexto}>
                {totalCurtidas === 1 ? '1 curtida' : `${totalCurtidas} curtidas`}
              </Text>
            </View>

            <Pressable
              style={({ pressed }) => [
                styles.botaoCurtir,
                jaCurtiu && styles.botaoCurtirAtivo,
                { opacity: pressed ? 0.7 : 1 },
              ]}
              onPress={toggleCurtida}
            >
              <HeartIcon
                size={16}
                color={jaCurtiu ? cores.error : cores.primary}
                weight={jaCurtiu ? 'fill' : 'regular'}
              />
              <Text style={[styles.botaoCurtirTexto, jaCurtiu && styles.botaoCurtirTextoAtivo]}>
                {jaCurtiu ? 'Curtido' : 'Curtir'}
              </Text>
            </Pressable>
          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
