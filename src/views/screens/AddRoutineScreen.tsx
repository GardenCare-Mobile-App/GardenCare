import React from 'react';
import { View, Text, TextInput, ScrollView, Pressable, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useAddRoutineViewModel } from '../../viewmodels/AddRoutineViewModel';
import { RoutineType, RoutineRepeat } from '../../models/Routine';
import { ROUTINE_TYPE_LABELS, ROUTINE_REPEAT_LABELS } from '../../business/RoutineBusiness';
import { createStyles } from '../../styles/screens/AddRoutineScreen.styles';
import { useTheme } from '../../context/Themecontext';

const TYPES: RoutineType[]   = ['rega', 'adubo', 'poda', 'livre'];
const REPEATS: RoutineRepeat[] = ['nunca', 'diario', 'semanal', 'mensal'];

const TYPE_ICONS: Record<RoutineType, string> = {
  rega:  'water-outline',
  adubo: 'flask-outline',
  poda:  'cut-outline',
  livre: 'create-outline',
};

export default function AddRoutineScreen() {
  const navigation = useNavigation();
  const { cores } = useTheme();
  const styles = createStyles(cores);

  const {
    title, type, date, time, repeat,
    saving, error,
    setTitle, setType, setDate, setTime, setRepeat,
    save,
  } = useAddRoutineViewModel();

  async function handleSave() {
    const ok = await save();
    if (ok) navigation.goBack();
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={cores.white} />
        </Pressable>
        <Text style={styles.headerTitle}>Nova Rotina</Text>
        <View style={{ width: 32 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>

        <Text style={styles.label}>Tipo</Text>
        <View style={styles.chipRow}>
          {TYPES.map(t => (
            <Pressable
              key={t}
              style={[styles.chip, type === t && styles.chipActive]}
              onPress={() => setType(t)}
            >
              <Ionicons
                name={TYPE_ICONS[t] as any}
                size={14}
                color={type === t ? cores.white : cores.textSecondary}
              />
              <Text style={[styles.chipText, type === t && styles.chipTextActive]}>
                {ROUTINE_TYPE_LABELS[t]}
              </Text>
            </Pressable>
          ))}
        </View>

        <Text style={styles.label}>Título</Text>
        <TextInput
          style={styles.input}
          value={title}
          onChangeText={setTitle}
          placeholder="Ex: Regar o cacto"
          placeholderTextColor={cores.textSecondary}
          maxLength={60}
        />

        <Text style={styles.label}>Data</Text>
        <TextInput
          style={styles.input}
          value={date}
          onChangeText={setDate}
          placeholder="AAAA-MM-DD"
          placeholderTextColor={cores.textSecondary}
          keyboardType="numeric"
          maxLength={10}
        />

        <Text style={styles.label}>Hora</Text>
        <TextInput
          style={styles.input}
          value={time}
          onChangeText={setTime}
          placeholder="HH:MM"
          placeholderTextColor={cores.textSecondary}
          keyboardType="numeric"
          maxLength={5}
        />

        <Text style={styles.label}>Repetir</Text>
        <View style={styles.chipRow}>
          {REPEATS.map(r => (
            <Pressable
              key={r}
              style={[styles.chip, repeat === r && styles.chipActive]}
              onPress={() => setRepeat(r)}
            >
              <Text style={[styles.chipText, repeat === r && styles.chipTextActive]}>
                {ROUTINE_REPEAT_LABELS[r]}
              </Text>
            </Pressable>
          ))}
        </View>

        {error && (
          <View style={styles.errorContainer}>
            <Ionicons name="alert-circle-outline" size={16} color="#B00020" />
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}

        <Pressable
          style={[styles.saveButton, saving && styles.saveButtonDisabled]}
          onPress={handleSave}
          disabled={saving}
        >
          {saving
            ? <ActivityIndicator color={cores.white} />
            : <>
                <Ionicons name="checkmark-outline" size={20} color={cores.white} />
                <Text style={styles.saveButtonText}>Salvar rotina</Text>
              </>
          }
        </Pressable>

      </ScrollView>
    </SafeAreaView>
  );
}
