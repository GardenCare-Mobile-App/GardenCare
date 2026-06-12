import { StyleSheet } from 'react-native';
import { SIZES } from '../globalStyles';
import { Cores } from '../ThemeStyles';

export const createStyles = (cores: Cores) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: cores.background,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: cores.background,
    gap: 12,
  },
  header: {
    backgroundColor: cores.primary,
    paddingVertical: SIZES.padding,
    paddingHorizontal: SIZES.padding,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: { padding: 4 },
  headerTitle: {
    flex: 1,
    fontSize: SIZES.fontTitle,
    fontWeight: 'bold',
    color: cores.white,
    textAlign: 'center',
  },
  scroll: {
    padding: SIZES.padding,
    paddingBottom: 100,
  },
  sectionTitle: {
    fontSize: SIZES.fontSubtitle,
    fontWeight: '700',
    color: cores.textSecondary,
    marginTop: 8,
    marginBottom: 10,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: cores.cardBackground,
    borderRadius: SIZES.radius,
    marginBottom: 10,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  cardDone: {
    opacity: 0.55,
  },
  cardAccent: {
    width: 4,
    alignSelf: 'stretch',
  },
  cardIcon: {
    padding: 14,
  },
  cardContent: {
    flex: 1,
    paddingVertical: 12,
    paddingRight: 8,
  },
  cardTitle: {
    fontSize: SIZES.fontBody,
    fontWeight: '600',
    color: cores.textPrimary,
    marginBottom: 2,
  },
  cardTitleDone: {
    textDecorationLine: 'line-through',
    color: cores.textSecondary,
  },
  cardMeta: {
    fontSize: SIZES.fontCaption,
    color: cores.textSecondary,
    marginBottom: 2,
  },
  cardDate: {
    fontSize: SIZES.fontSmall,
    color: cores.textSecondary,
  },
  cardActions: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 8,
    gap: 4,
  },
  doneButton: { padding: 6 },
  deleteButton: { padding: 6 },
  emptyContainer: {
    alignItems: 'center',
    marginTop: 60,
    gap: 8,
  },
  emptyText: {
    fontSize: SIZES.fontBody,
    color: cores.textSecondary,
    fontWeight: '600',
  },
  emptySubText: {
    fontSize: SIZES.fontCaption,
    color: cores.textSecondary,
  },
  fab: {
    position: 'absolute',
    bottom: 28,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: cores.primary,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  errorText: {
    fontSize: SIZES.fontBody,
    color: '#B00020',
    textAlign: 'center',
  },
  retryButton: {
    backgroundColor: cores.primary,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: SIZES.radius,
  },
  retryButtonText: {
    color: cores.white,
    fontWeight: '600',
  },
});