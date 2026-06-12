import { StyleSheet, Platform } from 'react-native';
import { SIZES } from '../globalStyles';
import { Cores } from '../ThemeStyles';

export const createStyles = (cores: Cores) =>
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
    menuButton: {
      padding: 4,
    },
    headerTitle: {
      flex: 1,
      fontSize: SIZES.fontTitle,
      fontWeight: 'bold',
      color: cores.white,
    },

    postCard: {
      backgroundColor: cores.cardBackground,
      borderRadius: SIZES.radius,
      borderWidth: 0.5,
      borderColor: cores.border,
      margin: SIZES.padding,
      overflow: 'hidden',
      ...Platform.select({
        ios: {
          shadowColor: cores.black,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.08,
          shadowRadius: 6,
        },
        android: { elevation: 3 },
      }),
    },

    autorRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
      padding: SIZES.padding,
      borderBottomWidth: 0.5,
      borderBottomColor: cores.border,
    },
    autorInfo: {
      flex: 1,
    },
    autorNome: {
      fontSize: SIZES.fontSubtitle,
      fontWeight: 'bold',
      color: cores.textPrimary,
    },
    autorData: {
      fontSize: SIZES.fontSmall,
      color: cores.textSecondary,
      marginTop: 2,
    },

    conteudoContainer: {
      padding: SIZES.padding,
    },
    conteudoTexto: {
      fontSize: SIZES.fontBody,
      color: cores.textPrimary,
      lineHeight: 24,
    },

    imagemPost: {
      width: '100%',
      height: 240,
      resizeMode: 'cover',
    },

    curtidasRow: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: SIZES.padding,
      borderTopWidth: 0.5,
      borderTopColor: cores.border,
    },
    curtidasInfo: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
    },
    curtidasTexto: {
      fontSize: SIZES.fontSubtitle,
      color: cores.textSecondary,
    },
    curtidasTextoAtivo: {
      color: cores.error,
    },
  });