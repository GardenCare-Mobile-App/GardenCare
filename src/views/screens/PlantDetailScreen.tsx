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
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { usePlantDetailViewModel } from '../../viewmodels/PlantDetailViewModel';
import { useTheme } from '../../context/Themecontext';
import { createStyles } from '../../styles/screens/PlantDetailScreen.styles';
import { getStatusColor, getStatusLabel, diasDesdeRega, getTipoLabel } from '../../utils/PlantUtils';

type RootStackParamList = {
  PlantDetail: { plantaId: string };
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'PlantDetail'>;
type RoutePropType = RouteProp<RootStackParamList, 'PlantDetail'>;

export default function PlantDetailScreen() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RoutePropType>();
  const { plantaId } = route.params;

  const { cores, estaEscuro } = useTheme();
  const styles = createStyles(cores, estaEscuro);

  const {
    planta,
    sensorData,
    loading,
    error,
    precisaRegar,
    frequenciaRega,
    umidadePorcentagem,
    toggleFavorita,
    registrarRega,
    deletarPlanta,
    recarregar,
  } = usePlantDetailViewModel(plantaId);

  function confirmarExclusao() {
    Alert.alert(
      'Excluir planta',
      `Tem certeza que quer excluir "${planta?.nome}"? Essa ação não pode ser desfeita.`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            await deletarPlanta();
            navigation.goBack();
          },
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

  if (error || !planta) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error ?? 'Planta não encontrada.'}</Text>
        <Pressable style={styles.retryButton} onPress={recarregar}>
          <Text style={styles.retryButtonText}>Tentar novamente</Text>
        </Pressable>
      </View>
    );
  }

  const umidadeOk = sensorData ? sensorData.umidade >= planta.limiteUmidade : false;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>

        <View style={styles.header}>
          <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color={cores.white} />
          </Pressable>
          <View style={styles.logoHeaderWrapper}>
            <Image
              source={require('../../../assets/logoGardenCare.png')}
              style={styles.logoHeader}
            />
          </View>
          <Text style={styles.headerTitle} numberOfLines={1}>{planta.nome}</Text>
          <Pressable style={styles.favButton} onPress={() => toggleFavorita(!planta.favorita)}>
            <Ionicons
              name={planta.favorita ? 'heart' : 'heart-outline'}
              size={24}
              color={planta.favorita ? cores.error : cores.white}
            />
          </Pressable>
        </View>

        <View style={styles.heroContainer}>
          {planta.imagemUrl ? (
            <Image source={{ uri: planta.imagemUrl }} style={styles.heroImage} />
          ) : (
            <View style={styles.heroFallback}>
              <Ionicons name="leaf" size={80} color="rgba(255,255,255,0.35)" />
            </View>
          )}

          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.65)']}
            style={styles.heroOverlay}
          />

          <View style={styles.heroInfo}>
            <View style={[styles.statusBadge, { backgroundColor: getStatusColor(planta.statusSaude) }]}>
              <Text style={styles.statusBadgeText}>{getStatusLabel(planta.statusSaude)}</Text>
            </View>
            <Text style={styles.heroNome}>{planta.nome}</Text>
            <Text style={styles.heroEspecie} numberOfLines={1}>{planta.especie}</Text>
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.cardTitulo}>
            <Ionicons name="information-circle-outline" size={18} color={cores.primary} />
            <Text style={styles.cardTituloTexto}>Informações</Text>
          </View>

          <View style={styles.infoLinha}>
            <View style={styles.infoLabelRow}>
              <Ionicons name="leaf-outline" size={14} color={cores.textSecondary} />
              <Text style={styles.infoLabelTexto}>Espécie</Text>
            </View>
            <Text style={styles.infoValor}>{planta.especie}</Text>
          </View>

          <View style={styles.infoLinha}>
            <View style={styles.infoLabelRow}>
              <Ionicons name="home-outline" size={14} color={cores.textSecondary} />
              <Text style={styles.infoLabelTexto}>Tipo</Text>
            </View>
            <Text style={styles.infoValor}>{getTipoLabel(planta.tipo)}</Text>
          </View>

          <View style={styles.infoLinha}>
            <View style={styles.infoLabelRow}>
              <Ionicons name="water-outline" size={14} color={cores.textSecondary} />
              <Text style={styles.infoLabelTexto}>Última rega</Text>
            </View>
            <Text style={styles.infoValor}>{diasDesdeRega(planta.ultimaRega)}</Text>
          </View>

          <View style={[styles.infoLinha, styles.infoLinhaUltima]}>
            <View style={styles.infoLabelRow}>
              <Ionicons name="calendar-outline" size={14} color={cores.textSecondary} />
              <Text style={styles.infoLabelTexto}>Frequência de rega</Text>
            </View>
            <Text style={styles.infoValor}>
              {frequenciaRega === 1 ? 'Todo dia' : `A cada ${frequenciaRega} dias`}
            </Text>
          </View>
        </View>

        {sensorData && (
          <View style={styles.card}>
            <View style={styles.cardTitulo}>
              <Ionicons name="hardware-chip-outline" size={18} color={cores.primary} />
              <Text style={styles.cardTituloTexto}>Sensores</Text>
            </View>

            <View style={styles.arduinoRow}>
              <View style={[
                styles.arduinoDot,
                { backgroundColor: sensorData.esp32Online ? cores.verdeClaro : cores.error },
              ]} />
              <Text style={styles.arduinoText}>
                ESP32 {sensorData.esp32Online ? 'online' : 'offline'}
              </Text>
            </View>

            <View style={styles.sensorRow}>
              <View style={[styles.sensorCard, styles.sensorCardUmidade]}>
                <Ionicons name="water-outline" size={18} color="#2E7D32" />
                <Text style={styles.sensorValor}>{sensorData.umidade}%</Text>
                <Text style={styles.sensorLabel}>Umidade</Text>
              </View>
              <View style={[styles.sensorCard, styles.sensorCardTemp]}>
                <Ionicons name="thermometer-outline" size={18} color="#E65100" />
                <Text style={styles.sensorValor}>{sensorData.temperatura}°C</Text>
                <Text style={styles.sensorLabel}>Temperatura</Text>
              </View>
              <View style={[styles.sensorCard, styles.sensorCardLuz]}>
                <Ionicons name="sunny-outline" size={18} color="#BA7517" />
                <Text style={styles.sensorValor}>{sensorData.luminosidade} lx</Text>
                <Text style={styles.sensorLabel}>Luz</Text>
              </View>
            </View>

            <View style={styles.umidadeBarContainer}>
              <View style={styles.umidadeBarLabelRow}>
                <Text style={styles.umidadeBarLabelTexto}>Ar vs. mínimo da planta</Text>
                <Text style={styles.umidadeBarPorcentagem}>
                  {sensorData.umidade}% / {planta.limiteUmidade}%
                </Text>
              </View>
              <View style={styles.umidadeBarBackground}>
                <View style={[
                  styles.umidadeBarFill,
                  {
                    width: `${umidadePorcentagem}%`,
                    backgroundColor: umidadeOk ? cores.verdeClaro : cores.attention,
                  },
                ]} />
              </View>
            </View>

            <View style={[
              styles.regaStatusCard,
              precisaRegar ? styles.regaStatusAlerta : styles.regaStatusOk,
            ]}>
              <Ionicons
                name={precisaRegar ? 'water' : 'checkmark-circle'}
                size={18}
                color={precisaRegar ? '#E65100' : (estaEscuro ? '#91BF63' : '#2E7D32')}
              />
              <Text style={precisaRegar ? styles.regaStatusTextoAlerta : styles.regaStatusTextoOk}>
                {precisaRegar ? 'Rega recomendada' : 'Não precisa regar agora'}
              </Text>
            </View>

            <Pressable style={styles.regaButton} onPress={registrarRega}>
              <Ionicons name="water-outline" size={16} color={cores.white} />
              <Text style={styles.regaButtonText}>Registrar rega</Text>
            </Pressable>
          </View>
        )}

        {planta.observacoes ? (
          <View style={styles.card}>
            <View style={styles.cardTitulo}>
              <Ionicons name="document-text-outline" size={18} color={cores.primary} />
              <Text style={styles.cardTituloTexto}>Observações</Text>
            </View>
            <Text style={styles.observacoesTexto}>{planta.observacoes}</Text>
          </View>
        ) : null}

        <Pressable
          style={({ pressed }) => [styles.excluirButton, { opacity: pressed ? 0.75 : 1 }]}
          onPress={confirmarExclusao}
        >
          <Ionicons name="trash-outline" size={18} color={cores.error} />
          <Text style={styles.excluirButtonTexto}>Excluir planta</Text>
        </Pressable>

        <View style={styles.bottomPadding} />

      </ScrollView>
    </SafeAreaView>
  );
}