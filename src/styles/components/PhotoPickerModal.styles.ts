import { StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../globalStyles';

export const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  container: {
    backgroundColor: COLORS.cardBackground,
    borderTopLeftRadius: SIZES.radiusLarge,
    borderTopRightRadius: SIZES.radiusLarge,
    paddingHorizontal: SIZES.padding,
    paddingBottom: 32,
    paddingTop: SIZES.padding,
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: COLORS.border,
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: SIZES.padding,
  },
  titulo: {
    fontSize: SIZES.fontBody,
    fontWeight: 'bold',
    color: COLORS.primary,
    textAlign: 'center',
    marginBottom: 4,
  },
  subtitulo: {
    fontSize: SIZES.fontCaption,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: SIZES.padding,
  },
  opcao: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    backgroundColor: COLORS.background,
    borderRadius: SIZES.radius,
    padding: 16,
    marginBottom: 10,
  },
  opcaoTexto: {
    fontSize: SIZES.fontBody,
    color: COLORS.primary,
    fontWeight: '500',
  },
  cancelar: {
    alignItems: 'center',
    padding: 14,
    marginTop: 4,
  },
  cancelarTexto: {
    fontSize: SIZES.fontBody,
    color: COLORS.error,
    fontWeight: '500',
  },
});