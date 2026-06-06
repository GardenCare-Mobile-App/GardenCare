import { StyleSheet } from 'react-native';
import { Cores } from '../ThemeStyles';
import { SIZES } from '../globalStyles';

export const createStyles = (cores: Cores) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: cores.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SIZES.padding,
    paddingVertical: SIZES.padding,
    gap: 12,
    backgroundColor: cores.acao,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: SIZES.fontTitle,
    fontWeight: 'bold',
    color: cores.white,
  },
  loader: {
    marginTop: 40,
  },
  lista: {
    padding: SIZES.padding,
    paddingBottom: 32,
  },
  vazio: {
    textAlign: 'center',
    marginTop: 40,
    fontSize: SIZES.fontBody,
    color: cores.textSecondary,
  },
});
