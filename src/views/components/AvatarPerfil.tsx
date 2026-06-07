import React from 'react';
import { View, Text, Image } from 'react-native';
import { styles } from '../../styles/components/AvatarPerfil.styles';
import { SIZES } from '../../styles/globalStyles';

interface AvatarPerfilProps {
  fotoURL?: string;
  nome: string;
  tamanho?: number;
}

export function AvatarPerfil({ fotoURL, nome, tamanho = SIZES.avatarSize }: AvatarPerfilProps) {
  const borderRadius = tamanho / 2;

  if (fotoURL) {
    return (
      <Image
        source={{ uri: fotoURL }}
        style={[styles.foto, { width: tamanho, height: tamanho, borderRadius }]}
      />
    );
  }

  return (
    <View style={[styles.fallback, { width: tamanho, height: tamanho, borderRadius }]}>
      <Text style={[styles.inicial, { fontSize: tamanho * 0.35 }]}>
        {nome.charAt(0).toUpperCase()}
      </Text>
    </View>
  );
}