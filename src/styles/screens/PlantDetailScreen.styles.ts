import { StyleSheet, Platform, Dimensions } from 'react-native';
import { SIZES } from '../globalStyles';
import { Cores } from '../ThemeStyles';

const { width } = Dimensions.get('window');

export const createStyles = (cores: Cores, escuro: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: cores.background,
    },
    centered: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: cores.background,
      gap: 12,
    },
    errorText: {
      fontSize: SIZES.fontBody,
      color: cores.error,
      textAlign: 'center',
      paddingHorizontal: SIZES.padding,
    },
    retryButton: {
      backgroundColor: cores.acao,
      paddingHorizontal: 24,
      paddingVertical: 10,
      borderRadius: SIZES.radiusLarge,
    },
    retryButtonText: {
      color: cores.white,
      fontWeight: 'bold',
      fontSize: SIZES.fontCaption,
    },
    header: {
      backgroundColor: cores.acao,
      paddingTop: SIZES.padding,
      paddingBottom: SIZES.padding,
      paddingHorizontal: SIZES.padding,
      flexDirection: 'row',
      alignItems: 'center',
      gap: SIZES.radius,
    },
    backButton: {
      padding: 4,
    },
    headerTitle: {
      flex: 1,
      fontSize: SIZES.fontTitle,
      fontWeight: 'bold',
      color: cores.white,
    },
    favButton: {
      padding: 6,
    },

    heroContainer: {
      width,
      height: 260,
      position: 'relative',
    },
    heroImage: {
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
    },
    heroFallback: {
      width: '100%',
      height: '100%',
      backgroundColor: cores.verdeEscuro,
      alignItems: 'center',
      justifyContent: 'center',
      paddingBottom: 80,
    },
    heroOverlay: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      height: 130,
    },
    heroInfo: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      padding: 16,
      gap: 3,
    },
    statusBadge: {
      alignSelf: 'flex-start',
      paddingHorizontal: 10,
      paddingVertical: 4,
      borderRadius: SIZES.radiusLarge,
      marginBottom: 6,
    },
    statusBadgeText: {
      color: cores.white,
      fontSize: SIZES.fontSmall,
      fontWeight: 'bold',
    },
    heroNome: {
      fontSize: SIZES.fontLarge,
      fontWeight: 'bold',
      color: '#FFFFFF',
    },
    heroEspecie: {
      fontSize: SIZES.fontSmall,
      color: 'rgba(255,255,255,0.75)',
      fontStyle: 'italic',
    },

    card: {
      backgroundColor: cores.cardBackground,
      borderRadius: SIZES.radius,
      borderWidth: 0.5,
      borderColor: cores.border,
      padding: 14,
      marginHorizontal: SIZES.padding,
      marginTop: 12,
      ...Platform.select({
        ios: {
          shadowColor: cores.black,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.06,
          shadowRadius: 4,
        },
        android: { elevation: 2 },
      }),
    },
    cardTitulo: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      marginBottom: 12,
    },
    cardTituloTexto: {
      fontSize: SIZES.fontCaption,
      fontWeight: 'bold',
      color: cores.primary,
    },

    infoLinha: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 8,
      borderBottomWidth: 0.5,
      borderBottomColor: cores.border,
    },
    infoLinhaUltima: {
      borderBottomWidth: 0,
      paddingBottom: 0,
    },
    infoLabelRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
    },
    infoLabelTexto: {
      fontSize: SIZES.fontSmall,
      color: cores.textSecondary,
    },
    infoValor: {
      fontSize: SIZES.fontSmall,
      fontWeight: '600',
      color: cores.textPrimary,
      maxWidth: '55%',
      textAlign: 'right',
    },

    arduinoRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
      marginBottom: 12,
    },
    arduinoDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
    },
    arduinoText: {
      fontSize: SIZES.fontSmall,
      color: cores.textSecondary,
    },
    sensorRow: {
      flexDirection: 'row',
      gap: 8,
      marginBottom: 14,
    },
    sensorCard: {
      flex: 1,
      borderRadius: SIZES.radiusSmall,
      padding: 10,
      alignItems: 'center',
      gap: 4,
    },
    sensorCardUmidade: {
      backgroundColor: escuro ? '#1A3D28' : '#E6F4EB',
    },
    sensorCardTemp: {
      backgroundColor: escuro ? '#3D2E0A' : '#FFF8E1',
    },
    sensorCardLuz: {
      backgroundColor: escuro ? '#3D2A0A' : '#FFF3E0',
    },
    sensorValor: {
      fontSize: SIZES.fontCaption,
      fontWeight: 'bold',
      color: cores.textPrimary,
    },
    sensorLabel: {
      fontSize: 10,
      color: cores.textSecondary,
    },

    umidadeBarContainer: {
      marginBottom: 12,
    },
    umidadeBarLabelRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 6,
    },
    umidadeBarLabelTexto: {
      fontSize: SIZES.fontSmall,
      color: cores.textSecondary,
    },
    umidadeBarPorcentagem: {
      fontSize: SIZES.fontSmall,
      fontWeight: '600',
      color: cores.textPrimary,
    },
    umidadeBarBackground: {
      height: 8,
      backgroundColor: cores.border,
      borderRadius: 4,
      overflow: 'hidden',
    },
    umidadeBarFill: {
      height: '100%',
      borderRadius: 4,
    },

    regaStatusCard: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      paddingVertical: 10,
      paddingHorizontal: 12,
      borderRadius: SIZES.radiusSmall,
    },
    regaStatusOk: {
      backgroundColor: escuro ? '#1A3D1A' : '#E8F5E4',
    },
    regaStatusAlerta: {
      backgroundColor: escuro ? '#3D2A0A' : '#FFF3E0',
    },
    regaStatusTextoOk: {
      fontSize: SIZES.fontCaption,
      fontWeight: '600',
      color: escuro ? '#91BF63' : '#2E7D32',
    },
    regaStatusTextoAlerta: {
      fontSize: SIZES.fontCaption,
      fontWeight: '600',
      color: '#E65100',
    },

    regaButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 6,
      marginTop: 10,
      paddingVertical: 10,
      borderRadius: SIZES.radiusSmall,
      backgroundColor: cores.acao,
    },
    regaButtonText: {
      fontSize: SIZES.fontCaption,
      fontWeight: '600',
      color: cores.white,
    },

    observacoesTexto: {
      fontSize: SIZES.fontSmall,
      color: cores.textPrimary,
      lineHeight: 20,
    },

    excluirButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      marginHorizontal: SIZES.padding,
      marginTop: 8,
      paddingVertical: 14,
      borderRadius: SIZES.radius,
      borderWidth: 1.5,
      borderColor: cores.error,
    },
    excluirButtonTexto: {
      fontSize: SIZES.fontBody,
      fontWeight: '600',
      color: cores.error,
    },

    bottomPadding: {
      height: SIZES.padding,
    },
  });
