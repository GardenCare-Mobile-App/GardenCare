import { StyleSheet } from 'react-native';
import { Cores } from '../ThemeStyles';
import { SIZES } from '../globalStyles';

export const createStyles = (cores: Cores) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: cores.background,
  },

  header: {
    backgroundColor: cores.acao,
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
    color: cores.white,
  },

  novoPost: {
    backgroundColor: cores.cardBackground,
    margin: SIZES.padding,
    marginBottom: SIZES.radius,
    borderRadius: SIZES.radius,
    padding: 14,
    borderWidth: 1,
    borderColor: cores.border,
  },
  input: {
    fontSize: SIZES.fontBody,
    color: cores.textPrimary,
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
    color: cores.error,
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
    borderColor: cores.verdeClaro,
  },
  btnFotoTexto: {
    fontSize: SIZES.fontSubtitle,
    color: cores.verdeEscuro,
  },
  btnPublicar: {
    backgroundColor: cores.acao,
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: SIZES.radiusSmall,
  },
  btnPublicarTexto: {
    fontSize: SIZES.fontSubtitle,
    color: cores.white,
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
    color: cores.textSecondary,
    marginTop: 40,
    fontSize: SIZES.fontBody,
  },
  erro: {
    color: cores.error,
    textAlign: 'center',
    marginBottom: 8,
    fontSize: SIZES.fontSmall,
    marginHorizontal: SIZES.padding,
  },
});
