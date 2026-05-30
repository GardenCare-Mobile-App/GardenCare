import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  Pressable,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useGardenViewModel, Ordenacao } from '../../viewmodels/GardenViewModel';
import { Plant } from '../../models/Plant';
import { getStatusColor, getStatusLabel, diasDesdeRega } from '../../utils/PlantUtils';
import { createStyles } from '../../styles/screens/MyGardenScreen.styles';
import { useTheme } from '../../context/Themecontext';
import { Cores } from '../../styles/ThemeStyles';

type RootStackParamList = {
  Profile: undefined;
  MyGarden: undefined;
  CadastroPlanta: undefined;
  PlantDetail: { plantaId: string };
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'MyGarden'>;

type Styles = ReturnType<typeof createStyles>;

const CHIPS: { label: string; valor: Ordenacao; icone: string }[] = [
  { label: 'A → Z',    valor: 'nome_asc',       icone: 'text-outline' },
  { label: 'Crítico',  valor: 'status_critico',  icone: 'warning-outline' },
  { label: 'Saudável', valor: 'status_saudavel', icone: 'leaf-outline' },
];

function ChipOrdenacao({
  chip,
  ativo,
  onPress,
  styles,
  cores,
}: {
  chip: typeof CHIPS[number];
  ativo: boolean;
  onPress: () => void;
  styles: Styles;
  cores: Cores;
}) {
  return (
    <Pressable
      style={[styles.chipOrdenacao, ativo && styles.chipOrdenacaoAtivo]}
      onPress={onPress}
    >
      <Ionicons
        name={chip.icone as any}
        size={12}
        color={ativo ? cores.white : cores.textSecondary}
      />
      <Text style={[styles.chipOrdenacaoTexto, ativo && styles.chipOrdenacaoTextoAtivo]}>
        {chip.label}
      </Text>
    </Pressable>
  );
}

function PlantaCard({
  planta,
  onToggleFavorita,
  onVerDetalhes,
  modoSelecao,
  selecionada,
  onToggleSelecao,
  styles,
  cores,
}: {
  planta: Plant;
  onToggleFavorita: (id: string, valor: boolean) => void;
  onVerDetalhes: (id: string) => void;
  modoSelecao: boolean;
  selecionada: boolean;
  onToggleSelecao: (id: string) => void;
  styles: Styles;
  cores: Cores;
}) {
  return (
    <Pressable
      style={[styles.plantaCard, modoSelecao && selecionada && styles.plantaCardSelecionada]}
      onPress={() => modoSelecao ? onToggleSelecao(planta.id) : onVerDetalhes(planta.id)}
    >
      {modoSelecao && (
        <View style={[styles.checkbox, selecionada && styles.checkboxSelecionado]}>
          {selecionada && <Ionicons name="checkmark" size={14} color={cores.white} />}
        </View>
      )}

      {planta.imagemUrl ? (
        <Image source={{ uri: planta.imagemUrl }} style={styles.plantaImagem} />
      ) : (
        <View style={styles.plantaImagemFallback}>
          <Ionicons name="leaf-outline" size={24} color={cores.white} />
        </View>
      )}

      <View style={styles.plantaInfo}>
        <Text style={styles.plantaNome}>{planta.nome}</Text>
        <Text style={styles.plantaUltimaRega}>{diasDesdeRega(planta.ultimaRega)}</Text>
      </View>

      <View style={[styles.statusBadge, { backgroundColor: getStatusColor(planta.statusSaude) }]}>
        <Text style={styles.statusTexto}>{getStatusLabel(planta.statusSaude)}</Text>
      </View>

      {!modoSelecao && (
        <>
          <Pressable
            style={styles.favButton}
            onPress={() => onToggleFavorita(planta.id, !planta.favorita)}
          >
            <Ionicons
              name={planta.favorita ? 'heart' : 'heart-outline'}
              size={20}
              color={planta.favorita ? cores.error : cores.textSecondary}
            />
          </Pressable>
          <Ionicons name="chevron-forward" size={18} color={cores.textSecondary} />
        </>
      )}
    </Pressable>
  );
}

export default function MyGardenScreen() {
  const navigation = useNavigation<NavigationProp>();
  const { cores } = useTheme();
  const styles = createStyles(cores);

  const {
    plantas,
    sensorData,
    alertas,
    loading,
    error,
    totalSaudaveis,
    totalAtencao,
    totalCritico,
    modoSelecao,
    selecionadas,
    todasSelecionadas,
    ordenacao,
    toggleFavorita,
    deletarPlantas,
    mudarOrdenacao,
    entrarModoSelecao,
    sairModoSelecao,
    toggleSelecao,
    selecionarTodas,
    desselecionarTodas,
    recarregar,
  } = useGardenViewModel();

  function confirmarExclusao() {
    const quantidade = selecionadas.length;
    Alert.alert(
      'Excluir plantas',
      `Deseja excluir ${quantidade} planta${quantidade > 1 ? 's' : ''}? Esta ação não pode ser desfeita.`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: () => deletarPlantas(selecionadas),
        },
      ]
    );
  }

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
        <Pressable style={styles.retryButton} onPress={recarregar}>
          <Text style={styles.retryButtonText}>Tentar novamente</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>

        <View style={styles.header}>
          {modoSelecao ? (
            <>
              <Text style={styles.headerTitle}>
                {selecionadas.length === 0
                  ? 'Selecionar'
                  : `${selecionadas.length} selecionada${selecionadas.length > 1 ? 's' : ''}`}
              </Text>
              <Pressable onPress={sairModoSelecao}>
                <Text style={styles.cancelarTexto}>Cancelar</Text>
              </Pressable>
            </>
          ) : (
            <>
              <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={24} color={cores.white} />
              </Pressable>
              <Text style={styles.headerTitle}>Meu Jardim</Text>
              <View style={styles.arduinobadge}>
                <View style={[
                  styles.arduinoDot,
                  { backgroundColor: sensorData?.esp32Online ? cores.verdeClaro : cores.error },
                ]} />
                <Text style={styles.arduinoText}>
                  {sensorData?.esp32Online ? 'Online' : 'Offline'}
                </Text>
              </View>
              {plantas.length > 0 && (
                <Pressable onPress={entrarModoSelecao} style={{ padding: 4 }}>
                  <Ionicons name="trash-outline" size={22} color={cores.white} />
                </Pressable>
              )}
            </>
          )}
        </View>

        {!modoSelecao && sensorData && (
          <View style={styles.sensoresContainer}>
            <View style={[styles.sensorCard, { backgroundColor: '#3B6D11' }]}>
              <Ionicons name="water-outline" size={20} color="#EAF3DE" />
              <Text style={[styles.sensorValor, { color: '#EAF3DE' }]}>{sensorData.umidade}%</Text>
              <Text style={[styles.sensorLabel, { color: '#EAF3DE' }]}>Umidade</Text>
            </View>
            <View style={[styles.sensorCard, { backgroundColor: '#854F0B' }]}>
              <Ionicons name="thermometer-outline" size={20} color="#FFF8E1" />
              <Text style={[styles.sensorValor, { color: '#FFF8E1' }]}>{sensorData.temperatura}°C</Text>
              <Text style={[styles.sensorLabel, { color: '#FFF8E1' }]}>Temperatura</Text>
            </View>
            <View style={[styles.sensorCard, { backgroundColor: '#BA7517' }]}>
              <Ionicons name="sunny-outline" size={20} color="#FFF3E0" />
              <Text style={[styles.sensorValor, { color: '#FFF3E0' }]}>{sensorData.luminosidade} lx</Text>
              <Text style={[styles.sensorLabel, { color: '#FFF3E0' }]}>Luminosidade</Text>
            </View>
          </View>
        )}

        {!modoSelecao && alertas.map((alerta, index) => (
          <View key={index} style={styles.alertaContainer}>
            <Ionicons name="alert-circle-outline" size={16} color="#BA7517" />
            <Text style={styles.alertaTexto}>{alerta}</Text>
          </View>
        ))}

        <View style={styles.plantasSection}>
          <View style={styles.plantasHeader}>
            <Text style={styles.plantasSectionTitle}>Plantas</Text>
            {!modoSelecao && (
              <View style={styles.plantasResumo}>
                <View style={[styles.resumoDot, { backgroundColor: cores.verdeClaro }]} />
                <Text style={styles.resumoTexto}>{totalSaudaveis} saudáveis</Text>
                {totalAtencao > 0 && (
                  <>
                    <View style={[styles.resumoDot, { backgroundColor: cores.attention }]} />
                    <Text style={styles.resumoTexto}>{totalAtencao} atenção</Text>
                  </>
                )}
                {totalCritico > 0 && (
                  <>
                    <View style={[styles.resumoDot, { backgroundColor: cores.critical }]} />
                    <Text style={styles.resumoTexto}>{totalCritico} crítico</Text>
                  </>
                )}
              </View>
            )}
          </View>

          {!modoSelecao && (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.ordenacaoRow}
              contentContainerStyle={{ gap: 8 }}
            >
              {CHIPS.map((chip) => (
                <ChipOrdenacao
                  key={chip.valor}
                  chip={chip}
                  ativo={ordenacao === chip.valor}
                  onPress={() => mudarOrdenacao(chip.valor)}
                  styles={styles}
                  cores={cores}
                />
              ))}
            </ScrollView>
          )}

          {modoSelecao && plantas.length > 0 && (
            <View style={styles.selecaoBar}>
              <Pressable onPress={todasSelecionadas ? desselecionarTodas : selecionarTodas}>
                <Text style={styles.selecionarTudoTexto}>
                  {todasSelecionadas ? 'Desmarcar tudo' : 'Selecionar tudo'}
                </Text>
              </Pressable>
              <Text style={styles.contadorSelecao}>
                {selecionadas.length} de {plantas.length}
              </Text>
            </View>
          )}

          {plantas.map((planta) => (
            <PlantaCard
              key={planta.id}
              planta={planta}
              onToggleFavorita={toggleFavorita}
              onVerDetalhes={(id) => navigation.navigate('PlantDetail', { plantaId: id })}
              modoSelecao={modoSelecao}
              selecionada={selecionadas.includes(planta.id)}
              onToggleSelecao={toggleSelecao}
              styles={styles}
              cores={cores}
            />
          ))}
        </View>

        {modoSelecao ? (
          <Pressable
            style={[styles.excluirButton, selecionadas.length === 0 && styles.excluirButtonDisabled]}
            onPress={confirmarExclusao}
            disabled={selecionadas.length === 0}
          >
            <Ionicons name="trash-outline" size={20} color={cores.white} />
            <Text style={styles.excluirButtonTexto}>
              {selecionadas.length > 0
                ? `Excluir ${selecionadas.length} planta${selecionadas.length > 1 ? 's' : ''}`
                : 'Selecione plantas para excluir'}
            </Text>
          </Pressable>
        ) : (
          <Pressable
            style={styles.adicionarButton}
            onPress={() => navigation.navigate('CadastroPlanta')}
          >
            <Ionicons name="add-circle-outline" size={20} color={cores.white} />
            <Text style={styles.adicionarButtonTexto}>Adicionar planta</Text>
          </Pressable>
        )}

      </ScrollView>
    </SafeAreaView>
  );
}
