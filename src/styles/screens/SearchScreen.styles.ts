import { StyleSheet } from 'react-native';
import { Cores } from '../ThemeStyles';
import { SIZES } from '../globalStyles';

export const createStyles = (cores: Cores) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: cores.background,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: cores.verdeEscuro,
  },
  headerTitle: {
    fontSize: SIZES.fontTitle,
    fontWeight: 'bold',
    color: cores.white,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: cores.cardBackground,
    borderRadius: SIZES.radius,
    borderWidth: 1,
    borderColor: cores.border,
    marginHorizontal: 16,
    marginTop: 16,
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 8,
  },
  inputIcon: {
    marginRight: 4,
  },
  input: {
    flex: 1,
    fontSize: SIZES.fontBody,
    color: cores.textPrimary,
  },
  btnBuscar: {
    backgroundColor: cores.verdeEscuro,
    borderRadius: SIZES.radius,
    marginHorizontal: 16,
    marginTop: 10,
    paddingVertical: 12,
    alignItems: 'center',
  },
  btnDesabilitado: {
    opacity: 0.45,
  },
  btnBuscarTexto: {
    color: cores.white,
    fontWeight: 'bold',
    fontSize: SIZES.fontBody,
  },
  lista: {
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  itemUsuario: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: cores.cardBackground,
    borderRadius: SIZES.radius,
    borderWidth: 1,
    borderColor: cores.border,
    padding: 12,
    marginBottom: 10,
    gap: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  avatarPlaceholder: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: cores.verdeClaro,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarLetra: {
    color: cores.white,
    fontWeight: 'bold',
    fontSize: SIZES.fontSubtitle,
  },
  infoUsuario: {
    flex: 1,
    gap: 2,
  },
  nomeUsuario: {
    fontWeight: 'bold',
    fontSize: SIZES.fontSubtitle,
    color: cores.textPrimary,
  },
  pronomes: {
    fontSize: 12,
    color: cores.textSecondary,
  },
  bio: {
    fontSize: 12,
    color: cores.textSecondary,
  },
  erro: {
    color: cores.error,
    textAlign: 'center',
    marginTop: 16,
    fontSize: SIZES.fontBody,
  },
  vazio: {
    textAlign: 'center',
    color: cores.textSecondary,
    marginTop: 32,
    fontSize: SIZES.fontBody,
  },
});