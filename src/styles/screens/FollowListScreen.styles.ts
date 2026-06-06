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
  lista: {
    padding: SIZES.padding,
    paddingBottom: 32,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    gap: 12,
    borderBottomWidth: 1,
    borderBottomColor: cores.border,
  },
  itemNome: {
    flex: 1,
    fontSize: SIZES.fontBody,
    fontWeight: '600',
    color: cores.textPrimary,
  },
  itemPronomes: {
    fontSize: SIZES.fontSmall,
    color: cores.textSecondary,
  },
  loader: {
    marginTop: 40,
  },
  vazio: {
    textAlign: 'center',
    marginTop: 40,
    fontSize: SIZES.fontBody,
    color: cores.textSecondary,
  },
  erro: {
    textAlign: 'center',
    marginTop: 40,
    fontSize: SIZES.fontBody,
    color: cores.error,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: SIZES.padding,
    paddingHorizontal: 14,
    height: 44,
    borderRadius: SIZES.radius,
    backgroundColor: cores.cardBackground,
    borderWidth: 1,
    borderColor: cores.border,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: SIZES.fontBody,
    color: cores.textPrimary,
  },
});
