import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, Pressable, ActivityIndicator, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import { useAddRoutineViewModel } from '../../viewmodels/AddRoutineViewModel';
import { RoutineType, RoutineRepeat } from '../../models/Routine';
import { ROUTINE_TYPE_LABELS, ROUTINE_REPEAT_LABELS } from '../../business/RoutineBusiness';
import { createStyles } from '../../styles/screens/AddRoutineScreen.styles';
import { useTheme } from '../../context/Themecontext';

const TYPES: RoutineType[]     = ['rega', 'adubo', 'poda', 'livre'];
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

  const [showDateModal, setShowDateModal] = useState(false);
  const [showTimeModal, setShowTimeModal] = useState(false);
  const [tempDate, setTempDate] = useState(new Date());

  function openDatePicker() {
    const base = date ? new Date(`${date}T${time || '00:00'}`) : new Date();
    setTempDate(base);
    setShowDateModal(true);
  }

  function openTimePicker() {
    const base = date ? new Date(`${date}T${time || '00:00'}`) : new Date();
    setTempDate(base);
    setShowTimeModal(true);
  }

  function confirmDate() {
    const yyyy = tempDate.getFullYear();
    const mm   = String(tempDate.getMonth() + 1).padStart(2, '0');
    const dd   = String(tempDate.getDate()).padStart(2, '0');
    setDate(`${yyyy}-${mm}-${dd}`);
    setShowDateModal(false);
  }

  function confirmTime() {
    const hh  = String(tempDate.getHours()).padStart(2, '0');
    const min = String(tempDate.getMinutes()).padStart(2, '0');
    setTime(`${hh}:${min}`);
    setShowTimeModal(false);
  }

  function formatDate(raw: string) {
    if (!raw) return 'Selecionar data';
    const [yyyy, mm, dd] = raw.split('-');
    return `${dd}/${mm}/${yyyy}`;
  }

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
        <View style={styles.input}>
          <Ionicons name="pencil-outline" size={16} color={cores.textSecondary} />
          <TextInput
            style={styles.inputText}
            value={title}
            onChangeText={setTitle}
            placeholder="Ex: Regar o cacto"
            placeholderTextColor={cores.textSecondary}
            maxLength={60}
          />
        </View>

        <Text style={styles.label}>Data</Text>
        <Pressable style={styles.input} onPress={openDatePicker}>
          <Ionicons name="calendar-outline" size={16} color={cores.textSecondary} />
          <Text style={[styles.inputText, !date && { color: cores.textSecondary }]}>
            {formatDate(date)}
          </Text>
        </Pressable>

        <Text style={styles.label}>Hora</Text>
        <Pressable style={styles.input} onPress={openTimePicker}>
          <Ionicons name="time-outline" size={16} color={cores.textSecondary} />
          <Text style={[styles.inputText, !time && { color: cores.textSecondary }]}>
            {time || 'Selecionar hora'}
          </Text>
        </Pressable>

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

      {/* Modal de Data */}
      <Modal visible={showDateModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Pressable onPress={() => setShowDateModal(false)}>
                <Text style={styles.modalCancel}>Cancelar</Text>
              </Pressable>
              <Text style={styles.modalTitle}>Selecionar Data</Text>
              <Pressable onPress={confirmDate}>
                <Text style={styles.modalConfirm}>Confirmar</Text>
              </Pressable>
            </View>
            <DateTimePicker
              value={tempDate}
              mode="date"
              display="spinner"
              onChange={(_, selected) => selected && setTempDate(selected)}
              minimumDate={new Date()}
              textColor={cores.textPrimary}
              locale="pt-BR"
            />
          </View>
        </View>
      </Modal>

      {/* Modal de Hora */}
      <Modal visible={showTimeModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Pressable onPress={() => setShowTimeModal(false)}>
                <Text style={styles.modalCancel}>Cancelar</Text>
              </Pressable>
              <Text style={styles.modalTitle}>Selecionar Hora</Text>
              <Pressable onPress={confirmTime}>
                <Text style={styles.modalConfirm}>Confirmar</Text>
              </Pressable>
            </View>
            <DateTimePicker
              value={tempDate}
              mode="time"
              display="spinner"
              onChange={(_, selected) => selected && setTempDate(selected)}
              is24Hour
              textColor={cores.textPrimary}
              locale="pt-BR"
            />
          </View>
        </View>
      </Modal>

    </SafeAreaView>
  );
}