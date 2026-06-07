import { StyleSheet, Platform } from 'react-native';
import { COLORS, SIZES } from '../globalStyles';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  header: {
    backgroundColor: COLORS.primary,
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
    color: COLORS.white,
  },

  fotoContainer: {
    alignItems: 'center',
    paddingVertical: SIZES.padding + 4,
  },
  fotoWrapper: {
    position: 'relative',
    width: SIZES.avatarSize,
    height: SIZES.avatarSize,
  },
  cameraButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.primary,
    borderWidth: 2,
    borderColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fotoLabel: {
    marginTop: 8,
    fontSize: SIZES.fontSmall,
    color: COLORS.textSecondary,
  },

  form: {
    paddingHorizontal: SIZES.padding,
    gap: SIZES.padding,
  },
  campo: {
    gap: 6,
  },
  label: {
    fontSize: SIZES.fontCaption,
    color: COLORS.textSecondary,
  },
  input: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: SIZES.radius,
    padding: SIZES.radius,
    fontSize: SIZES.fontBody,
    color: COLORS.textPrimary,
    borderWidth: 0.5,
    borderColor: COLORS.border,
    ...Platform.select({
      ios: {
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
      },
      android: {
        elevation: 1,
      },
    }),
  },
  inputBio: {
    height: 80,
    textAlignVertical: 'top',
  },
  contadorBio: {
    fontSize: SIZES.fontSmall,
    color: COLORS.textSecondary,
    textAlign: 'right',
    marginTop: 2,
  },
  contadorBioLimite: {
    color: COLORS.error,
  },

  erroTexto: {
    fontSize: SIZES.fontCaption,
    color: COLORS.error,
    textAlign: 'center',
  },

  salvarButton: {
    backgroundColor: COLORS.primary,
    marginHorizontal: SIZES.padding,
    marginTop: SIZES.padding,
    marginBottom: SIZES.padding,
    borderRadius: SIZES.radiusLarge,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  salvarButtonTexto: {
    fontSize: SIZES.fontBody,
    fontWeight: 'bold',
    color: COLORS.white,
  },
});
