import { StyleSheet } from "react-native";
import { SIZES } from "../globalStyles";
import { Cores } from "../ThemeStyles";

export const createStyles = (cores: Cores) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: cores.background,
    },

    header: {
      backgroundColor: cores.acao,
      paddingVertical: SIZES.padding,
      paddingHorizontal: SIZES.padding,
      flexDirection: "row",
      alignItems: "center",
      gap: SIZES.radius,
    },
    headerTitle: {
      flex: 1,
      fontSize: SIZES.fontTitle,
      fontWeight: "bold",
      color: cores.white,
    },

    scroll: {
      flexGrow: 1,
      padding: SIZES.padding,
      backgroundColor: cores.background,
    },

    botaoFoto: {
      backgroundColor: cores.acao,
      padding: SIZES.padding - 4,
      borderRadius: SIZES.radiusSmall,
      width: "100%",
      alignItems: "center",
      marginBottom: SIZES.padding,
    },
    botaoFotoDesabilitado: {
      backgroundColor: cores.border,
    },
    botaoFotoTexto: {
      color: cores.white,
      fontSize: SIZES.fontBody,
      fontWeight: "bold",
    },

    loadingContainer: {
      marginVertical: SIZES.padding,
      alignItems: "center",
    },
    loadingTexto: {
      marginTop: 10,
      color: cores.textSecondary,
    },

    erroContainer: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
      marginVertical: 10,
    },
    erroTexto: {
      color: cores.error,
      fontWeight: "bold",
      flex: 1,
    },

    listaVazia: {
      textAlign: "center",
      color: cores.textSecondary,
      marginTop: SIZES.padding,
      fontSize: SIZES.fontCaption,
    },

    card: {
      width: "100%",
      backgroundColor: cores.cardBackground,
      padding: SIZES.padding,
      borderRadius: SIZES.radius,
      borderWidth: 1,
      borderColor: cores.border,
      marginBottom: SIZES.padding,
    },
    cardHeader: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 10,
    },
    cardHeaderTextos: {
      flex: 1,
    },
    excluirBotao: {
      padding: 6,
    },

    fotoPrincipal: {
      width: "100%",
      height: 180,
      borderRadius: SIZES.radiusSmall,
      marginBottom: 12,
      backgroundColor: cores.border,
    },

    labelEncontrada: {
      fontSize: SIZES.fontSmall,
      color: cores.acao,
      fontWeight: "bold",
      textTransform: "uppercase",
    },
    nomeComum: {
      fontSize: SIZES.fontLarge,
      fontWeight: "bold",
      color: cores.textPrimary,
    },
    nomeCientifico: {
      fontSize: SIZES.fontSubtitle,
      fontStyle: "italic",
      color: cores.textSecondary,
      marginBottom: 10,
    },

    labelSobre: {
      fontSize: SIZES.fontCaption,
      fontWeight: "bold",
      color: cores.textPrimary,
    },
    descricao: {
      fontSize: SIZES.fontSubtitle,
      color: cores.textSecondary,
      marginTop: 4,
      lineHeight: 22,
    },

    precisaoBadge: {
      marginTop: 12,
      backgroundColor: cores.border,
      padding: 8,
      borderRadius: SIZES.radiusSmall,
      marginBottom: 12,
    },
    precisaoTexto: {
      color: cores.acao,
      fontWeight: "bold",
      fontSize: SIZES.fontCaption,
    },

    labelSemelhantes: {
      fontSize: SIZES.fontCaption,
      fontWeight: "bold",
      color: cores.acao,
      marginBottom: 8,
    },
    fotoSemelhante: {
      width: 120,
      height: 90,
      borderRadius: SIZES.radiusSmall,
      marginRight: 10,
      backgroundColor: cores.border,
    },
  });