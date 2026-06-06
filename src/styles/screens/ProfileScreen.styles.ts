import { StyleSheet, Platform } from "react-native";
import { SIZES } from "../globalStyles";
import { Cores } from "../ThemeStyles";

export const createStyles = (cores: Cores) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: cores.background,
    },

    topBar: {
      flexDirection: "row",
      justifyContent: "flex-end",
      paddingHorizontal: SIZES.padding,
      paddingVertical: 12,
    },

    profileRow: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: SIZES.padding,
      gap: SIZES.padding,
      paddingBottom: SIZES.padding,
    },
    avatarWrapper: {
      position: "relative",
    },
    cameraIcon: {
      position: "absolute",
      bottom: 0,
      right: 0,
      backgroundColor: cores.acao,
      borderRadius: 12,
      width: 24,
      height: 24,
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 2,
      borderColor: cores.background,
    },
    infoSection: {
      flex: 1,
      gap: 3,
    },
    name: {
      fontSize: SIZES.fontBody,
      fontWeight: "bold",
      color: cores.textPrimary,
    },
    pronomes: {
      fontSize: SIZES.fontSmall,
      color: cores.textSecondary,
    },
    bio: {
      fontSize: SIZES.fontCaption,
      color: cores.textPrimary,
      lineHeight: 19,
      marginTop: 2,
    },

    editButton: {
      marginHorizontal: SIZES.padding,
      marginBottom: SIZES.padding,
      paddingVertical: 8,
      borderRadius: SIZES.radiusSmall,
      alignItems: "center",
      backgroundColor: cores.acao,
    },
    editButtonText: {
      fontSize: SIZES.fontCaption,
      fontWeight: "600",
      color: cores.background,
    },

    section: {
      marginBottom: SIZES.padding,
      marginHorizontal: SIZES.padding,
      backgroundColor: cores.cardBackground,
      borderRadius: SIZES.radius,
      padding: SIZES.padding,
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
    sectionLast: {
      marginBottom: SIZES.padding,
    },
    sectionTitle: {
      fontSize: SIZES.fontBody,
      fontWeight: "bold",
      color: cores.primary,
      marginBottom: SIZES.radius,
    },
    emptyText: {
      fontSize: SIZES.fontCaption,
      color: cores.textSecondary,
      textAlign: "center",
      paddingVertical: 8,
    },

    plantCard: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
      paddingVertical: 10,
      borderBottomWidth: 0.5,
      borderBottomColor: cores.border,
    },
    plantCardLast: { borderBottomWidth: 0 },
    plantImage: {
      width: 44,
      height: 44,
      borderRadius: SIZES.radiusSmall,
      resizeMode: "cover",
    },
    plantInfo: { flex: 1 },
    plantName: {
      fontSize: SIZES.fontCaption,
      fontWeight: "bold",
      color: cores.textPrimary,
    },
    plantSpecies: {
      fontSize: SIZES.fontSmall,
      color: cores.textSecondary,
      fontStyle: "italic",
    },
    statusBadge: {
      paddingHorizontal: 8,
      paddingVertical: 3,
      borderRadius: 10,
    },
    statusText: {
      fontSize: SIZES.fontSmall,
      fontWeight: "bold",
      color: cores.white,
    },
    favButton: { padding: 4 },

    notificationItem: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingVertical: 4,
    },
    notificationLabel: {
      fontSize: SIZES.fontCaption,
      color: cores.textPrimary,
    },
    notificationDivider: {
      height: 0.5,
      backgroundColor: cores.border,
      marginVertical: 4,
    },

    centered: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    errorText: {
      color: cores.error,
      fontSize: SIZES.fontBody,
      textAlign: "center",
      marginBottom: SIZES.radius,
    },
    retryButton: {
      backgroundColor: cores.acao,
      paddingHorizontal: SIZES.padding + 4,
      paddingVertical: 10,
      borderRadius: SIZES.radiusLarge,
    },
    retryButtonText: {
      color: cores.white,
      fontWeight: "bold",
    },
  });