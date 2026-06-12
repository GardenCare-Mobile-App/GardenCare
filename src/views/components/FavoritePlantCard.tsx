import React from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Plant } from '../../models/Plant';
import { getStatusColor, getStatusLabel } from '../../utils/PlantUtils';
import { useTheme } from '../../context/Themecontext';
import { createStyles } from '../../styles/components/FavoritePlantCard.styles';

type Props = {
  planta: Plant;
  isLast?: boolean;
  onToggleFavorita?: (id: string, valor: boolean) => void;
};

export function FavoritePlantCard({ planta, isLast, onToggleFavorita }: Props) {
  const { cores } = useTheme();
  const styles = createStyles(cores);

  return (
    <View style={[styles.plantCard, isLast && styles.plantCardLast]}>
      {planta.imagemUrl ? (
        <Image source={{ uri: planta.imagemUrl }} style={styles.plantImage} />
      ) : (
        <View style={[styles.plantImage, { backgroundColor: '#C8E6C9', alignItems: 'center', justifyContent: 'center' }]}>
          <Ionicons name="leaf-outline" size={20} color="#2E7D32" />
        </View>
      )}
      <View style={styles.plantInfo}>
        <Text style={styles.plantName}>{planta.nome}</Text>
        <Text style={styles.plantSpecies}>{planta.especie}</Text>
      </View>
      <View style={[styles.statusBadge, { backgroundColor: getStatusColor(planta.statusSaude) }]}>
        <Text style={styles.statusText}>{getStatusLabel(planta.statusSaude)}</Text>
      </View>
      {onToggleFavorita && (
        <Pressable style={styles.favButton} onPress={() => onToggleFavorita(planta.id, false)}>
          <Ionicons name="heart" size={20} color={cores.error} />
        </Pressable>
      )}
    </View>
  );
}