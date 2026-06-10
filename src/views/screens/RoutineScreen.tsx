import React from 'react';
import { View, Text, ScrollView, Pressable, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useRoutineViewModel } from '../../viewmodels/RoutineViewModel';
import { Routine, RoutineType } from '../../models/Routine';
import { ROUTINE_TYPE_LABELS, ROUTINE_REPEAT_LABELS } from '../../business/RoutineBusiness';
import { createStyles } from '../../styles/screens/RoutineScreen.styles';
import { useTheme } from '../../context/Themecontext';

type NavProp = NativeStackNavigationProp<{ AddRoutine: undefined }, 'AddRoutine'>;

const TYPE_ICONS: Record<RoutineType, string> = {
  rega:  'water-outline',
  adubo: 'flask-outline',
  poda:  'cut-outline',
  livre: 'create-outline',
};

const TYPE_COLORS: Record<RoutineType, string> = {
  rega:  '#1565C0',
  adubo: '#2E7D32',
  poda:  '#6A1B9A',
  livre: '#E65100',
};

function RoutineCard({
  routine,
  onDone,
  onDelete,
  styles,
}: {
  routine: Routine;
  onDone: () => void;
  onDelete: () => void;
  styles: ReturnType<typeof createStyles>;
}) {
  const color = TYPE_COLORS[routine.type];

  return (
    <View style={[styles.card, routine.done && styles.cardDone]}>
      <View style={[styles.cardAccent, { backgroundColor: color }]} />

      <View style={styles.cardIcon}>
        <Ionicons name={TYPE_ICONS[routine.type] as any} size={20} color={color} />
      </View>

      <View style={styles.cardContent}>
        <Text style={[styles.cardTitle, routine.done && styles.cardTitleDone]}>
          {routine.title}
        </Text>
        <Text style={styles.cardMeta}>
          {ROUTINE_TYPE_LABELS[routine.type]}
          {routine.plantName ? `  ·  ${routine.plantName}` : ''}
        </Text>
        <Text style={styles.cardDate}>
          {routine.date.split('-').reverse().join('/')}  {routine.time}
          {'  ·  '}{ROUTINE_REPEAT_LABELS[routine.repeat]}
        </Text>
      </View>

      <View style={styles.cardActions}>
        {!routine.done && (
          <Pressable onPress={onDone} style={styles.doneButton}>
            <Ionicons name="checkmark-circle-outline" size={24} color="#2E7D32" />
          </Pressable>
        )}
        <Pressable onPress={onDelete} style={styles.deleteButton}>
          <Ionicons name="trash-outline" size={20} color="#B00020" />
        </Pressable>
      </View>
    </View>
  );
}

export default function RoutineScreen() {
  const navigation = useNavigation<NavProp>();
  const { cores } = useTheme();
  const styles = createStyles(cores);
  const { pending, done, loading, error, markDone, remove, reload } = useRoutineViewModel();

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={cores.primary} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
        <Pressable style={styles.retryButton} onPress={reload}>
          <Text style={styles.retryButtonText}>Tentar novamente</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={cores.white} />
        </Pressable>
        <Text style={styles.headerTitle}>Minhas Rotinas</Text>
        <View style={{ width: 32 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>

        {pending.length === 0 && done.length === 0 && (
          <View style={styles.emptyContainer}>
            <Ionicons name="calendar-outline" size={56} color={cores.textSecondary} />
            <Text style={styles.emptyText}>Nenhuma rotina criada ainda.</Text>
            <Text style={styles.emptySubText}>Toque no botão abaixo para adicionar.</Text>
          </View>
        )}

        {pending.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>Pendentes</Text>
            {pending.map(r => (
              <RoutineCard
                key={r.id}
                routine={r}
                onDone={() => markDone(r)}
                onDelete={() => remove(r)}
                styles={styles}
              />
            ))}
          </>
        )}

        {done.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>Concluídas</Text>
            {done.map(r => (
              <RoutineCard
                key={r.id}
                routine={r}
                onDone={() => {}}
                onDelete={() => remove(r)}
                styles={styles}
              />
            ))}
          </>
        )}

      </ScrollView>

      <Pressable
        style={styles.fab}
        onPress={() => navigation.navigate('AddRoutine')}
      >
        <Ionicons name="add" size={28} color={cores.white} />
      </Pressable>
    </SafeAreaView>
  );
}