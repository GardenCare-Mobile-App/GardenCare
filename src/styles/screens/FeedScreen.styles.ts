import { StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../globalStyles';

export const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  header: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: SIZES.padding,
    paddingVertical: SIZES.padding,
    flexDirection: 'row',
    alignItems: 'center',
    gap: SIZES.radius,
  },
  headerTitle: {
    flex: 1,
    fontSize: SIZES.fontTitle,
    fontWeight: 'bold',
    color: COLORS.white,
  },

  novoPost: {
    backgroundColor: COLORS.cardBackground,
    margin: SIZES.padding,
    marginBottom: SIZES.radius,
    borderRadius: SIZES.radius,
    padding: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  input: {
    fontSize: SIZES.fontBody,
    color: COLORS.textPrimary,
    minHeight: 60,
    textAlignVertical: 'top',
  },
  previewContainer: {
    marginTop: 8,
  },
  previewImagem: {
    width: '100%',
    height: 160,
    borderRadius: SIZES.radiusSmall,
    marginBottom: 4,
  },
  removerImagem: {
    fontSize: SIZES.fontSmall,
    color: COLORS.error,
  },
  botoesPost: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  btnFoto: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: SIZES.radiusSmall,
    borderWidth: 1,
    borderColor: COLORS.verdeClaro,
  },
  btnFotoTexto: {
    fontSize: SIZES.fontSubtitle,
    color: COLORS.verdeEscuro,
  },
  btnPublicar: {
    backgroundColor: COLORS.primary,
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: SIZES.radiusSmall,
  },
  btnPublicarTexto: {
    fontSize: SIZES.fontSubtitle,
    color: COLORS.white,
    fontWeight: 'bold',
  },
  btnDesabilitado: {
    opacity: 0.6,
  },

  lista: {
    paddingHorizontal: SIZES.padding,
    paddingBottom: 32,
  },
  vazio: {
    textAlign: 'center',
    color: COLORS.textSecondary,
    marginTop: 40,
    fontSize: SIZES.fontBody,
  },
  erro: {
    color: COLORS.error,
    textAlign: 'center',
    marginBottom: 8,
    fontSize: SIZES.fontSmall,
    marginHorizontal: SIZES.padding,
  },

  card: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: SIZES.radius,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    marginRight: 10,
  },
  avatarPlaceholder: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: COLORS.verdeClaro,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  avatarLetra: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: SIZES.fontBody,
  },
  autorNome: {
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    fontSize: SIZES.fontSubtitle,
  },
  conteudo: {
    fontSize: SIZES.fontBody,
    color: COLORS.textPrimary,
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
    alignSelf: 'flex-start',
    paddingVertical: 4,
  },
  curtidaTexto: {
    fontSize: SIZES.fontSubtitle,
    color: COLORS.textSecondary,
  },
  curtidaAtiva: {
    color: COLORS.error,
  },
});