import { StyleSheet, Platform } from 'react-native';
import { SIZES } from '../globalStyles';
import { Cores } from '../ThemeStyles';

export const createStyles = (cores: Cores) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: cores.background,
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
    backgroundColor: cores.acao,
    borderWidth: 2,
    borderColor: cores.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fotoLabel: {
    marginTop: 8,
    fontSize: SIZES.fontSmall,
    color: cores.textSecondary,
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
    color: cores.textSecondary,
  },
  input: {
    backgroundColor: cores.cardBackground,
    borderRadius: SIZES.radius,
    padding: SIZES.radius,
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
    color: cores.textSecondary,
    textAlign: 'right',
    marginTop: 2,
  },
  contadorBioLimite: {
    color: cores.error,
  },

  erroTexto: {
    fontSize: SIZES.fontCaption,
    color: cores.error,
    textAlign: 'center',
  },

  salvarButton: {
    backgroundColor: cores.acao,
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
    color: cores.white,
  },
});
