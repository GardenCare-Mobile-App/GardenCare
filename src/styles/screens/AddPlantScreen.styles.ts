import { StyleSheet, Platform } from 'react-native';
import { SIZES } from '../globalStyles';
import { Cores } from '../ThemeStyles';

export const createStyles = (cores: Cores, escuro: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: cores.background,
    },

    header: {
      backgroundColor: cores.primary,
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
    headerLogo: {
      width: 80,
      height: 40,
      resizeMode: 'contain',
      transform: [{ rotate: '-10deg' }],
      opacity: 0.9,
    },

    fotoCard: {
      margin: SIZES.padding,
      marginBottom: 8,
      height: 180,
      borderRadius: SIZES.radius,
      overflow: 'hidden',
      borderWidth: 1.5,
      borderStyle: 'dashed',
      borderColor: cores.verdeEscuro,
      backgroundColor: escuro ? '#1A2E1A' : '#F0F7E8',
    },
    fotoImagem: {
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
    },
    fotoPlaceholder: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      gap: 10,
    },
    fotoPlaceholderTexto: {
      fontSize: SIZES.fontSmall,
      color: cores.verdeEscuro,
      textAlign: 'center',
      paddingHorizontal: 32,
      lineHeight: 18,
    },
    fotoEditarBadge: {
      position: 'absolute',
      bottom: 10,
      right: 10,
      backgroundColor: 'rgba(0,0,0,0.45)',
      borderRadius: 16,
      padding: 7,
    },
    fotoRemoverBotao: {
      position: 'absolute',
      top: 8,
      right: 8,
    },

    form: {
      paddingHorizontal: SIZES.padding,
      paddingBottom: SIZES.padding * 2,
      gap: 14,
    },
    secaoTitulo: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
      marginTop: 6,
      paddingBottom: 6,
      borderBottomWidth: 1,
      borderBottomColor: cores.border,
    },
    secaoTituloTexto: {
      fontSize: SIZES.fontSubtitle,
      fontWeight: '700',
      color: cores.verdeEscuro,
      letterSpacing: 0.3,
    },
    campo: {
      gap: 6,
    },
    labelRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    label: {
      fontSize: SIZES.fontCaption,
      fontWeight: '600',
      color: cores.textSecondary,
    },
    sugeridoBadge: {
      backgroundColor: escuro ? '#1A3A1A' : '#E4F4D8',
      paddingHorizontal: 8,
      paddingVertical: 2,
      borderRadius: SIZES.radiusLarge,
    },
    sugeridoTexto: {
      fontSize: 9,
      color: cores.verdeEscuro,
      fontWeight: '600',
    },
    input: {
      backgroundColor: cores.cardBackground,
      borderRadius: SIZES.radius,
      paddingHorizontal: 14,
      paddingVertical: 13,
      fontSize: SIZES.fontBody,
      color: cores.textPrimary,
      borderWidth: 0.5,
      borderColor: cores.border,
      ...Platform.select({
        ios: {
          shadowColor: cores.black,
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.05,
          shadowRadius: 2,
        },
        android: { elevation: 1 },
      }),
    },
    inputMultiline: {
      height: 90,
      textAlignVertical: 'top',
      paddingTop: 12,
    },

    chips: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 8,
    },
    chip: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 5,
      paddingVertical: 9,
      paddingHorizontal: 14,
      borderRadius: SIZES.radiusLarge,
      borderWidth: 1.5,
      borderColor: cores.border,
      backgroundColor: cores.cardBackground,
    },
    chipAtivo: {
      backgroundColor: cores.verdeEscuro,
      borderColor: cores.verdeEscuro,
    },
    chipTexto: {
      fontSize: SIZES.fontCaption,
      color: cores.textSecondary,
      fontWeight: '500',
    },
    chipTextoAtivo: {
      color: cores.white,
      fontWeight: '600',
    },
    sugestoesCard: {
      borderRadius: SIZES.radius,
      borderWidth: 1,
      borderColor: cores.border,
      backgroundColor: escuro ? '#1A2E1A' : '#F0F7E8',
      padding: 14,
      gap: 10,
    },
    sugestoesCardTitulo: {
      fontSize: SIZES.fontCaption,
      fontWeight: '700',
      color: cores.verdeEscuro,
      marginBottom: 2,
    },
    sugestoesLinha: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    sugestoesTexto: {
      fontSize: SIZES.fontSmall,
      color: cores.textPrimary,
    },

    erroTexto: {
      fontSize: SIZES.fontCaption,
      color: cores.error,
      textAlign: 'center',
    },

    salvarButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      backgroundColor: cores.primary,
      borderRadius: SIZES.radiusLarge,
      paddingVertical: 16,
      marginTop: 6,
      ...Platform.select({
        ios: {
          shadowColor: cores.primary,
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 8,
        },
        android: { elevation: 4 },
      }),
    },
    salvarButtonDesabilitado: {
      opacity: 0.5,
    },
    salvarButtonTexto: {
      fontSize: SIZES.fontBody,
      fontWeight: 'bold',
      color: cores.white,
    },
  });