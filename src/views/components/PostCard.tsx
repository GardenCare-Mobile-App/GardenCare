import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Post } from '../../models/Post';
import { useTheme } from '../../context/Themecontext';
import { createStyles } from '../../styles/components/PostCard.styles';
import { AppStackParamList } from '../../navigation/AppNavigator';

type Nav = NativeStackNavigationProp<AppStackParamList>;

interface Props {
  post: Post;
  uid: string;
  onCurtida?: (post: Post) => void;
}

export function PostCard({ post, uid, onCurtida }: Props) {
  const navigation = useNavigation<Nav>();
  const { cores } = useTheme();
  const styles = createStyles(cores);
  const jaCurtiu = post.curtidas.includes(uid);

  return (
    <View style={styles.card}>
      <TouchableOpacity
        style={styles.cardHeader}
        onPress={() => {
          if (post.autorId === uid) {
            navigation.navigate('MainTabs', { screen: 'Profile' });
          } else {
            navigation.navigate('UserProfile', { uid: post.autorId });
          }
        }}
      >
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

      <TouchableOpacity
        style={styles.curtidaBtn}
        onPress={() => onCurtida?.(post)}
        disabled={!onCurtida}
      >
        <Text style={[styles.curtidaTexto, jaCurtiu && styles.curtidaAtiva]}>
          {jaCurtiu ? '❤️' : '🤍'} {post.curtidas.length}{' '}
          {post.curtidas.length === 1 ? 'curtida' : 'curtidas'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
