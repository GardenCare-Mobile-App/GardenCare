import { StyleSheet, Platform } from "react-native";
import { COLORS, SIZES } from "../globalStyles";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    backgroundColor: COLORS.primary,
    paddingTop: SIZES.padding,
    paddingBottom: SIZES.padding + 4,
    paddingHorizontal: SIZES.padding,
    alignItems: "center",
  },
  headerActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    width: "100%",
    marginBottom: SIZES.radius,
  },
  settingsButton: {
    padding: 4,
  },
  avatar: {
    width: SIZES.avatarSize,
    height: SIZES.avatarSize,
    borderRadius: SIZES.avatarSize / 2,
    borderWidth: 3,
    borderColor: COLORS.verdeClaro,
    marginBottom: SIZES.radius,
  },
  avatarFallback: {
    width: SIZES.avatarSize,
    height: SIZES.avatarSize,
    borderRadius: SIZES.avatarSize / 2,
    borderWidth: 3,
    borderColor: COLORS.verdeClaro,
    backgroundColor: COLORS.verdeEscuro,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: SIZES.radius,
  },
  avatarFallbackText: {
    fontSize: SIZES.fontTitle + 4,
    fontWeight: "bold",
    color: COLORS.amareloMuitoClaro,
  },
  name: {
    fontSize: SIZES.fontTitle,
    fontWeight: "bold",
    color: COLORS.white,
    marginBottom: 2,
  },
  pronomes: {
    fontSize: SIZES.fontSubtitle,
    color: COLORS.verdeClaro,
    marginBottom: SIZES.padding,
  },
  headerButtons: {
    flexDirection: "row",
    gap: 10,
  },
  editButton: {
    backgroundColor: COLORS.verdeClaro,
    paddingHorizontal: SIZES.padding,
    paddingVertical: 8,
    borderRadius: SIZES.radiusLarge,
  },
  editButtonText: {
    color: COLORS.primary,
    fontWeight: "bold",
    fontSize: SIZES.fontCaption,
  },
  gardenButton: {
    backgroundColor: COLORS.verdeEscuro,
    paddingHorizontal: SIZES.padding,
    paddingVertical: 8,
    borderRadius: SIZES.radiusLarge,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  gardenButtonText: {
    color: COLORS.white,
    fontWeight: "bold",
    fontSize: SIZES.fontCaption,
  },

  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: COLORS.error,
    fontSize: SIZES.fontBody,
    textAlign: "center",
    marginBottom: SIZES.radius,
  },
  retryButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: SIZES.padding + 4,
    paddingVertical: 10,
    borderRadius: SIZES.radiusLarge,
  },
  retryButtonText: {
    color: COLORS.white,
    fontWeight: "bold",
  },
});
