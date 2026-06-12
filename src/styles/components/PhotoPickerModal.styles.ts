import { StyleSheet } from 'react-native';
import { Cores } from '../ThemeStyles';
import { SIZES } from '../globalStyles';

export const createStyles = (cores: Cores) => StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  container: {
    backgroundColor: cores.cardBackground,
    borderTopLeftRadius: SIZES.radiusLarge,
    borderTopRightRadius: SIZES.radiusLarge,
    paddingHorizontal: SIZES.padding,
    paddingBottom: 32,
    paddingTop: SIZES.padding,
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: cores.border,
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: SIZES.padding,
  },
  titulo: {
    fontSize: SIZES.fontBody,
    fontWeight: 'bold',
    color: cores.textPrimary,
    textAlign: 'center',
    marginBottom: 4,
  },
  subtitulo: {
    fontSize: SIZES.fontCaption,
    color: cores.textSecondary,
    textAlign: 'center',
    marginBottom: SIZES.padding,
  },
  opcao: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    backgroundColor: cores.background,
    borderRadius: SIZES.radius,
    padding: 16,
    marginBottom: 10,
  },
  opcaoTexto: {
    fontSize: SIZES.fontBody,
    color: cores.textPrimary,
    fontWeight: '500',
  },
  cancelar: {
    alignItems: 'center',
    padding: 14,
    marginTop: 4,
  },
  cancelarTexto: {
    fontSize: SIZES.fontBody,
    color: cores.error,
    fontWeight: '500',
  },
});
