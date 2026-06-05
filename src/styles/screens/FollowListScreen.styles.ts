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
    backgroundColor: cores.primary,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: SIZES.fontTitle,
    fontWeight: 'bold',
    color: cores.white,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: SIZES.padding * 2,
  },
  emptyTitle: {
    fontSize: SIZES.fontBody,
    fontWeight: 'bold',
    color: cores.textPrimary,
  },
});
