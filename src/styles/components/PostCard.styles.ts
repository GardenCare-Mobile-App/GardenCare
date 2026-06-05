import { StyleSheet } from 'react-native';
import { Cores } from '../ThemeStyles';
import { SIZES } from '../globalStyles';

export const createStyles = (cores: Cores) => StyleSheet.create({
  card: {
    backgroundColor: cores.cardBackground,
    borderRadius: SIZES.radius,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: cores.border,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  avatarPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: cores.verdeClaro,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  avatarLetra: {
    color: cores.white,
    fontWeight: 'bold',
    fontSize: SIZES.fontBody,
  },
  autorNome: {
    fontWeight: 'bold',
    color: cores.textPrimary,
    fontSize: SIZES.fontSubtitle,
  },
  conteudo: {
    fontSize: SIZES.fontBody,
    color: cores.textPrimary,
    marginBottom: 10,
    lineHeight: 22,
  },
  imagemPost: {
    width: '100%',
    height: 200,
    borderRadius: SIZES.radiusSmall,
    marginBottom: 10,
  },
  curtidaBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: 6,
    paddingVertical: 4,
  },
  curtidaTexto: {
    fontSize: SIZES.fontSubtitle,
    color: cores.textSecondary,
  },
  curtidaAtiva: {
    color: cores.error,
    fontWeight: 'bold',
  },
});
