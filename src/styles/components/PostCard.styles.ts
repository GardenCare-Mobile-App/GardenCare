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
    backgroundColor: cores.acao,
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

  acoesBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    paddingVertical: 4,
  },
  acaoBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  acaoTexto: {
    fontSize: SIZES.fontSubtitle,
    color: cores.textSecondary,
  },
  curtidaAtiva: {
    color: cores.error,
    fontWeight: 'bold',
  },
  comentarioAtivo: {
    color: cores.verdeEscuro,
    fontWeight: 'bold',
  },

  comentariosContainer: {
    marginTop: 12,
    borderTopWidth: 1,
    borderTopColor: cores.border,
    paddingTop: 12,
    gap: 10,
  },
  comentarioItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  comentarioAvatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  comentarioAvatarPlaceholder: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: cores.acao,
    alignItems: 'center',
    justifyContent: 'center',
  },
  comentarioAvatarLetra: {
    color: cores.white,
    fontWeight: 'bold',
    fontSize: 12,
  },
  comentarioBalao: {
    flex: 1,
    backgroundColor: cores.background,
    borderRadius: SIZES.radiusSmall,
    padding: 8,
    borderWidth: 1,
    borderColor: cores.border,
  },
  comentarioAutor: {
    fontWeight: 'bold',
    fontSize: 12,
    color: cores.textPrimary,
    marginBottom: 2,
  },
  comentarioTexto: {
    fontSize: SIZES.fontBody,
    color: cores.textPrimary,
    lineHeight: 20,
  },
  semComentarios: {
    fontSize: SIZES.fontSubtitle,
    color: cores.textSecondary,
    textAlign: 'center',
    paddingVertical: 8,
  },

  inputComentarioContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 8,
    marginTop: 4,
  },
  inputComentario: {
    flex: 1,
    borderWidth: 1,
    borderColor: cores.border,
    borderRadius: SIZES.radiusSmall,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: SIZES.fontBody,
    color: cores.textPrimary,
    maxHeight: 100,
  },
  btnEnviarComentario: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: cores.acao,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnEnviarDesabilitado: {
    opacity: 0.45,
  },
});
