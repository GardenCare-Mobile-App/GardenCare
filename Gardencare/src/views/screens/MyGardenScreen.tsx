import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useGardenViewModel } from '../../viewmodels/GardenViewModel';
import { Plant } from '../../models/Plant';
import { getStatusColor, getStatusLabel, diasDesdeRega } from '../../utils/PlantUtils';
import { styles } from '../../styles/screens/MyGardenScreen.styles';
import { COLORS } from '../../styles/globalStyles';

type RootStackParamList = {
  Profile: undefined;
  MyGarden: undefined;
  CadastroPlanta: undefined;
  PlantDetail: { plantaId: string };
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'MyGarden'>;

function PlantaCard({
  planta,
  onToggleFavorita,
  onVerDetalhes,
}: {
  planta: Plant;
  onToggleFavorita: (id: string, valor: boolean) => void;
  onVerDetalhes: (id: string) => void;
}) {
  return (
    <Pressable style={styles.plantaCard} onPress={() => onVerDetalhes(planta.id)}>
      {planta.imagemUrl ? (
        <Image source={{ uri: planta.imagemUrl }} style={styles.plantaImagem} />
      ) : (
        <View style={styles.plantaImagemFallback}>
          <Ionicons name="leaf-outline" size={24} color={COLORS.white} />
        </View>
      )}

      <View style={styles.plantaInfo}>
        <Text style={styles.plantaNome}>{planta.nome}</Text>
        <Text style={styles.plantaUltimaRega}>
          {diasDesdeRega(planta.ultimaRega)}
        </Text>
      </View>

      <View style={[
        styles.statusBadge,
        { backgroundColor: getStatusColor(planta.statusSaude) },
      ]}>
        <Text style={styles.statusTexto}>
          {getStatusLabel(planta.statusSaude)}
        </Text>
      </View>

      <Pressable
        style={styles.favButton}
        onPress={() => onToggleFavorita(planta.id, !planta.favorita)}
      >
        <Ionicons
          name={planta.favorita ? 'heart' : 'heart-outline'}
          size={20}
          color={planta.favorita ? COLORS.error : COLORS.textSecondary}
        />
      </Pressable>

      <Ionicons name="chevron-forward" size={18} color={COLORS.textSecondary} />
    </Pressable>
  );
}
export default function MyGardenScreen() {
  const navigation = useNavigation<NavigationProp>();
  const {
    plantas,
    sensorData,
    alertas,
    loading,
    error,
    totalSaudaveis,
    totalAtencao,
    totalCritico,
    toggleFavorita,
    recarregar,
  } = useGardenViewModel();

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={COLORS.primary} />
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
          <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color={COLORS.white} />
          </Pressable>
          <Text style={styles.headerTitle}>Meu Jardim</Text>

          <View style={styles.arduinobadge}>
            <View style={[
              styles.arduinoDot,
              { backgroundColor: sensorData?.arduinoOnline ? COLORS.verdeClaro : COLORS.error },
            ]} />
            <Text style={styles.arduinoText}>
              {sensorData?.arduinoOnline ? 'Online' : 'Offline'}
            </Text>
          </View>
        </View>

        {sensorData && (
          <View style={styles.sensoresContainer}>
            <View style={[styles.sensorCard, { backgroundColor: '#EAF3DE' }]}>
              <Ionicons name="water-outline" size={20} color="#3B6D11" />
              <Text style={[styles.sensorValor, { color: '#27500A' }]}>
                {sensorData.umidade}%
              </Text>
              <Text style={[styles.sensorLabel, { color: '#3B6D11' }]}>
                Umidade
              </Text>
            </View>

            <View style={[styles.sensorCard, { backgroundColor: '#FFF8E1' }]}>
              <Ionicons name="thermometer-outline" size={20} color="#854F0B" />
              <Text style={[styles.sensorValor, { color: '#633806' }]}>
                {sensorData.temperatura}°C
              </Text>
              <Text style={[styles.sensorLabel, { color: '#854F0B' }]}>
                Temperatura
              </Text>
            </View>

            <View style={[styles.sensorCard, { backgroundColor: '#FFF3E0' }]}>
              <Ionicons name="sunny-outline" size={20} color="#BA7517" />
              <Text style={[styles.sensorValor, { color: '#412402' }]}>
                {sensorData.luminosidade} lx
              </Text>
              <Text style={[styles.sensorLabel, { color: '#BA7517' }]}>
                Luminosidade
              </Text>
            </View>
          </View>
        )}

        {alertas.map((alerta, index) => (
          <View key={index} style={styles.alertaContainer}>
            <Ionicons name="alert-circle-outline" size={16} color="#BA7517" />
            <Text style={styles.alertaTexto}>{alerta}</Text>
          </View>
        ))}

        <View style={styles.plantasSection}>
          <View style={styles.plantasHeader}>
            <Text style={styles.plantasSectionTitle}>Plantas</Text>
            <View style={styles.plantasResumo}>
              <View style={[styles.resumoDot, { backgroundColor: COLORS.verdeClaro }]} />
              <Text style={styles.resumoTexto}>{totalSaudaveis} saudáveis</Text>
              {totalAtencao > 0 && (
                <>
                  <View style={[styles.resumoDot, { backgroundColor: COLORS.attention }]} />
                  <Text style={styles.resumoTexto}>{totalAtencao} atenção</Text>
                </>
              )}
              {totalCritico > 0 && (
                <>
                  <View style={[styles.resumoDot, { backgroundColor: COLORS.critical }]} />
                  <Text style={styles.resumoTexto}>{totalCritico} crítico</Text>
                </>
              )}
            </View>
          </View>

          {plantas.map((planta) => (
            <PlantaCard
              key={planta.id}
              planta={planta}
              onToggleFavorita={toggleFavorita}
              onVerDetalhes={(id) => navigation.navigate('PlantDetail', { plantaId: id })}
            />
          ))}
        </View>

        <Pressable
          style={styles.adicionarButton}
          onPress={() => navigation.navigate('CadastroPlanta')}
        >
          <Ionicons name="add-circle-outline" size={20} color={COLORS.white} />
          <Text style={styles.adicionarButtonTexto}>Adicionar planta</Text>
        </Pressable>

      </ScrollView>
    </SafeAreaView>
  );
}