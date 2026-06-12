import React, { useMemo } from 'react';
import { View, Text, TextInput, ScrollView, Pressable, Image, ActivityIndicator, KeyboardAvoidingView, Platform, } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../context/Themecontext';
import { PhotoPickerModal } from '../components/PhotoPickerModal';
import { useAddPlantViewModel, OPCOES_ULTIMA_REGA } from '../../viewmodels/AddPlantViewModel';
import { TipoPlanta } from '../../models/Plant';
import { createStyles } from '../../styles/screens/AddPlantScreen.styles';


const TIPOS: { valor: TipoPlanta; label: string; icone: string }[] = [
  { valor: 'tropical',  label: 'Tropical',  icone: 'leaf-outline' },
  { valor: 'interior',  label: 'Interior',  icone: 'home-outline' },
  { valor: 'exterior',  label: 'Exterior',  icone: 'partly-sunny-outline' },
  { valor: 'suculenta', label: 'Suculenta', icone: 'flower-outline' },
  { valor: 'aquatica',  label: 'Aquática',  icone: 'water-outline' },
];

export default function AddPlantScreen() {
  const navigation = useNavigation();
  const { cores, estaEscuro } = useTheme();
  const styles = useMemo(() => createStyles(cores, estaEscuro), [cores, estaEscuro]);

  const {
    nome, setNome,
    especie, setEspecie,
    tipo, selecionarTipo,
    limiteUmidade, setLimiteUmidade,
    limiteTemperatura, setLimiteTemperatura,
    limiteLuminosidade, setLimiteLuminosidade,
    limiteAutoPreenchido,
    sugestoes,
    observacoes, setObservacoes,
    imagemUri, onFotoSelecionada, removerImagem,
    modalVisivel, setModalVisivel,
    ultimaRegaDias, setUltimaRegaDias,
    salvando, erro, formularioValido,
    salvar,
  } = useAddPlantViewModel();

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >

        <View style={styles.header}>
          <Pressable
            style={({ pressed }) => [styles.backButton, { opacity: pressed ? 0.6 : 1 }]}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color={cores.white} />
          </Pressable>
          <Text style={styles.headerTitle}>Adicionar Planta</Text>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <Pressable style={styles.fotoCard} onPress={() => setModalVisivel(true)}>
            {imagemUri ? (
              <Image source={{ uri: imagemUri }} style={styles.fotoImagem} />
            ) : (
              <View style={styles.fotoPlaceholder}>
                <Ionicons name="camera-outline" size={38} color={cores.verdeEscuro} />
                <Text style={styles.fotoPlaceholderTexto}>
                  Toque para adicionar uma foto da planta
                </Text>
              </View>
            )}
            {imagemUri && (
              <>
                <View style={styles.fotoEditarBadge}>
                  <Ionicons name="camera" size={14} color={cores.white} />
                </View>
                <Pressable
                  style={styles.fotoRemoverBotao}
                  onPress={(e) => { e.stopPropagation(); removerImagem(); }}
                  hitSlop={8}
                >
                  <Ionicons name="close-circle" size={26} color={cores.white} />
                </Pressable>
              </>
            )}
          </Pressable>

          <PhotoPickerModal
            visivel={modalVisivel}
            onFechar={() => setModalVisivel(false)}
            onFotoSelecionada={onFotoSelecionada}
          />

          <View style={styles.form}>

            <View style={styles.secaoTitulo}>
              <Ionicons name="leaf-outline" size={15} color={cores.verdeEscuro} />
              <Text style={styles.secaoTituloTexto}>Sobre a planta</Text>
            </View>

            <View style={styles.campo}>
              <Text style={styles.label}>Nome</Text>
              <TextInput
                style={styles.input}
                value={nome}
                onChangeText={setNome}
                placeholder="Ex: Samambaia, Costela de Adão..."
                placeholderTextColor={cores.textSecondary}
              />
            </View>

            <View style={styles.campo}>
              <Text style={styles.label}>Espécie</Text>
              <TextInput
                style={styles.input}
                value={especie}
                onChangeText={setEspecie}
                placeholder="Ex: Nephrolepis exaltata"
                placeholderTextColor={cores.textSecondary}
              />
            </View>

            <View style={styles.secaoTitulo}>
              <Ionicons name="color-palette-outline" size={15} color={cores.verdeEscuro} />
              <Text style={styles.secaoTituloTexto}>Tipo</Text>
            </View>

            <View style={styles.chips}>
              {TIPOS.map((t) => (
                <Pressable
                  key={t.valor}
                  style={({ pressed }) => [
                    styles.chip,
                    tipo === t.valor && styles.chipAtivo,
                    { opacity: pressed ? 0.75 : 1 },
                  ]}
                  onPress={() => selecionarTipo(t.valor)}
                >
                  <Ionicons
                    name={t.icone as any}
                    size={14}
                    color={tipo === t.valor ? cores.white : cores.textSecondary}
                  />
                  <Text style={[styles.chipTexto, tipo === t.valor && styles.chipTextoAtivo]}>
                    {t.label}
                  </Text>
                </Pressable>
              ))}
            </View>

            {sugestoes && (
              <View style={styles.sugestoesCard}>
                <Text style={styles.sugestoesCardTitulo}>Condições ideais para este tipo</Text>
                <View style={styles.sugestoesLinha}>
                  <Ionicons name="water-outline" size={14} color={cores.verdeEscuro} />
                  <Text style={styles.sugestoesTexto}>
                    Umidade mínima:{' '}
                    <Text style={{ fontWeight: '600' }}>{sugestoes.umidade}%</Text>
                  </Text>
                </View>
                <View style={styles.sugestoesLinha}>
                  <Ionicons name="thermometer-outline" size={14} color={cores.attention} />
                  <Text style={styles.sugestoesTexto}>
                    Temperatura:{' '}
                    <Text style={{ fontWeight: '600' }}>{sugestoes.temperatura.min}°C – {sugestoes.temperatura.max}°C</Text>
                  </Text>
                </View>
                <View style={styles.sugestoesLinha}>
                  <Ionicons name="sunny-outline" size={14} color="#BA7517" />
                  <Text style={styles.sugestoesTexto}>
                    Luminosidade mínima:{' '}
                    <Text style={{ fontWeight: '600' }}>{sugestoes.luminosidade} lx</Text>
                  </Text>
                </View>
              </View>
            )}

            <View style={styles.secaoTitulo}>
              <Ionicons name="water-outline" size={15} color={cores.verdeEscuro} />
              <Text style={styles.secaoTituloTexto}>Cuidados</Text>
            </View>

            <View style={styles.campo}>
              <Text style={styles.label}>Última rega</Text>
              <View style={styles.chips}>
                {OPCOES_ULTIMA_REGA.map((op) => (
                  <Pressable
                    key={op.dias}
                    style={({ pressed }) => [
                      styles.chip,
                      ultimaRegaDias === op.dias && styles.chipAtivo,
                      { opacity: pressed ? 0.75 : 1 },
                    ]}
                    onPress={() => setUltimaRegaDias(op.dias)}
                  >
                    <Text style={[styles.chipTexto, ultimaRegaDias === op.dias && styles.chipTextoAtivo]}>
                      {op.label}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </View>

            <View style={styles.campo}>
              <View style={styles.labelRow}>
                <Text style={styles.label}>Limite de umidade (%)</Text>
                {limiteAutoPreenchido && (
                  <View style={styles.sugeridoBadge}>
                    <Text style={styles.sugeridoTexto}>sugerido pelo tipo</Text>
                  </View>
                )}
              </View>
              <TextInput
                style={styles.input}
                value={limiteUmidade}
                onChangeText={setLimiteUmidade}
                placeholder="Ex: 60"
                placeholderTextColor={cores.textSecondary}
                keyboardType="numeric"
              />
            </View>

            <View style={styles.campo}>
              <View style={styles.labelRow}>
                <Text style={styles.label}>Temperatura máxima (°C)</Text>
                {limiteAutoPreenchido && limiteTemperatura !== '' && (
                  <View style={styles.sugeridoBadge}>
                    <Text style={styles.sugeridoTexto}>sugerido pelo tipo</Text>
                  </View>
                )}
              </View>
              <TextInput
                style={styles.input}
                value={limiteTemperatura}
                onChangeText={setLimiteTemperatura}
                placeholder="Ex: 30"
                placeholderTextColor={cores.textSecondary}
                keyboardType="numeric"
              />
            </View>

            <View style={styles.campo}>
              <View style={styles.labelRow}>
                <Text style={styles.label}>Luminosidade mínima (lx)</Text>
                {limiteAutoPreenchido && limiteLuminosidade !== '' && (
                  <View style={styles.sugeridoBadge}>
                    <Text style={styles.sugeridoTexto}>sugerido pelo tipo</Text>
                  </View>
                )}
              </View>
              <TextInput
                style={styles.input}
                value={limiteLuminosidade}
                onChangeText={setLimiteLuminosidade}
                placeholder="Ex: 800"
                placeholderTextColor={cores.textSecondary}
                keyboardType="numeric"
              />
            </View>

            <View style={styles.campo}>
              <Text style={styles.label}>Observações (opcional)</Text>
              <TextInput
                style={[styles.input, styles.inputMultiline]}
                value={observacoes}
                onChangeText={setObservacoes}
                placeholder="Dicas de cuidado, localização preferida..."
                placeholderTextColor={cores.textSecondary}
                multiline
                numberOfLines={3}
              />
            </View>

            {erro ? <Text style={styles.erroTexto}>{erro}</Text> : null}

            <Pressable
              style={({ pressed }) => [
                styles.salvarButton,
                !formularioValido && styles.salvarButtonDesabilitado,
                { opacity: pressed && formularioValido ? 0.85 : 1 },
              ]}
              onPress={() => salvar(() => navigation.goBack())}
              disabled={salvando || !formularioValido}
            >
              {salvando ? (
                <ActivityIndicator color={cores.white} />
              ) : (
                <>
                  <Ionicons name="leaf" size={18} color={cores.white} />
                  <Text style={styles.salvarButtonTexto}>Adicionar ao jardim</Text>
                </>
              )}
            </Pressable>

          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}