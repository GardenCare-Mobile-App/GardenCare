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

    // header
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

    // post body (flat, sem card)
    postSection: {
      paddingHorizontal: SIZES.padding,
      paddingTop: SIZES.padding,
    },
    postCard: {
      paddingHorizontal: SIZES.padding,
      paddingTop: SIZES.padding,
    },
    conteudoContainer: {
      marginTop: 12,
    },
    autorRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
      marginBottom: 12,
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
    conteudoTexto: {
      fontSize: SIZES.fontBody + 1,
      color: cores.textPrimary,
      lineHeight: 26,
    },
    imagemPost: {
      width: '100%',
      height: 260,
      resizeMode: 'cover',
      marginTop: 12,
      borderRadius: SIZES.radiusSmall,
    },

    // stats row  (ex: "12 curtidas · 4 comentários")
    statsRow: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: SIZES.padding,
      paddingVertical: 10,
      gap: 8,
    },
    statsTexto: {
      fontSize: SIZES.fontSubtitle,
      color: cores.textSecondary,
    },
    statsSeparador: {
      fontSize: SIZES.fontSubtitle,
      color: cores.textSecondary,
    },

    // divider
    divider: {
      height: 0.5,
      backgroundColor: cores.border,
      marginHorizontal: SIZES.padding,
    },

    // actions row (curtir)
    acoesRow: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: SIZES.padding,
      paddingVertical: 6,
    },
    acaoBtn: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
      paddingVertical: 8,
      paddingHorizontal: 12,
      borderRadius: SIZES.radius,
    },
    acaoTexto: {
      fontSize: SIZES.fontSubtitle,
      color: cores.textSecondary,
    },
    acaoTextoAtivo: {
      color: cores.error,
    },

    // aliases com nomes antigos (compatibilidade)
    curtidasRow: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: SIZES.padding,
      paddingVertical: 6,
    },
    curtidasInfo: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
      paddingVertical: 8,
      paddingHorizontal: 12,
      borderRadius: SIZES.radius,
    },
    curtidasTexto: {
      fontSize: SIZES.fontSubtitle,
      color: cores.textSecondary,
    },
    curtidasTextoAtivo: {
      color: cores.error,
    },

    // seção de comentários
    comentariosSection: {
      paddingTop: 4,
      paddingBottom: 80, // espaço pro input bar
    },
    semComentarios: {
      textAlign: 'center',
      color: cores.textSecondary,
      fontSize: SIZES.fontBody,
      paddingVertical: 28,
    },

    // item de comentário
    comentarioItem: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      gap: 10,
      paddingHorizontal: SIZES.padding,
      paddingVertical: 10,
      borderBottomWidth: 0.5,
      borderBottomColor: cores.border,
    },
    comentarioBalao: {
      flex: 1,
    },
    comentarioAutor: {
      fontSize: SIZES.fontCaption,
      fontWeight: 'bold',
      color: cores.textPrimary,
      marginBottom: 2,
    },
    comentarioConteudo: {
      fontSize: SIZES.fontBody,
      color: cores.textPrimary,
      lineHeight: 20,
    },
    comentarioData: {
      fontSize: SIZES.fontSmall,
      color: cores.textSecondary,
      marginTop: 3,
    },

    // barra de input (fixa no bottom)
    inputBar: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
      paddingHorizontal: SIZES.padding,
      paddingVertical: 10,
      borderTopWidth: 0.5,
      borderTopColor: cores.border,
      backgroundColor: cores.background,
      ...Platform.select({
        ios: {
          shadowColor: cores.black,
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.06,
          shadowRadius: 4,
        },
        android: { elevation: 4 },
      }),
    },
    inputBarTextInput: {
      flex: 1,
      backgroundColor: cores.cardBackground,
      borderRadius: 20,
      borderWidth: 0.5,
      borderColor: cores.border,
      paddingHorizontal: 14,
      paddingVertical: 8,
      fontSize: SIZES.fontBody,
      color: cores.textPrimary,
      maxHeight: 100,
    },
    inputBarEnviar: {
      width: 38,
      height: 38,
      borderRadius: 19,
      backgroundColor: cores.primary,
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputBarEnviarDesabilitado: {
      backgroundColor: cores.border,
    },
  });