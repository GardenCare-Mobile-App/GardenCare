import React from "react";
import { View, Text, Pressable } from "react-native";
import { useTheme } from "../../context/Themecontext";
import { createStyles } from "../../styles/components/ProfileStatsBar.styles";

type Props = {
  totalPosts: number;
  totalSeguidores: number;
  totalSeguindo: number;
  onPosts?: () => void;
  onSeguidores?: () => void;
  onSeguindo?: () => void;
};

export function ProfileStatsBar({
  totalPosts,
  totalSeguidores,
  totalSeguindo,
  onPosts,
  onSeguidores,
  onSeguindo,
}: Props) {
  const { cores } = useTheme();
  const styles = createStyles(cores);

  return (
    <View style={styles.statsBar}>
      <Pressable style={styles.statItem} onPress={onPosts} disabled={!onPosts}>
        <Text style={styles.statValue}>{totalPosts}</Text>
        <Text style={styles.statLabel}>Posts</Text>
      </Pressable>
      <View style={styles.statDivider} />
      <Pressable
        style={styles.statItem}
        onPress={onSeguidores}
        disabled={!onSeguidores}
      >
        <Text style={styles.statValue}>{totalSeguidores}</Text>
        <Text style={styles.statLabel}>Seguidores</Text>
      </Pressable>
      <View style={styles.statDivider} />
      <Pressable
        style={styles.statItem}
        onPress={onSeguindo}
        disabled={!onSeguindo}
      >
        <Text style={styles.statValue}>{totalSeguindo}</Text>
        <Text style={styles.statLabel}>Seguindo</Text>
      </Pressable>
    </View>
  );
}