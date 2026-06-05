import { StyleSheet } from 'react-native';
import { Cores } from '../ThemeStyles';
import { SIZES } from '../globalStyles';

export const createStyles = (cores: Cores) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: cores.background,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SIZES.padding,
  },
  errorText: {
    color: cores.error,
    textAlign: 'center',
    marginBottom: 12,
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
    flex: 1,
    fontSize: SIZES.fontTitle,
    fontWeight: 'bold',
    color: cores.white,
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SIZES.padding,
    paddingVertical: SIZES.padding,
    gap: SIZES.padding,
  },
  infoSection: {
    flex: 1,
    gap: 3,
  },
  name: {
    fontSize: SIZES.fontBody,
    fontWeight: 'bold',
    color: cores.textPrimary,
  },
  pronomes: {
    fontSize: SIZES.fontSmall,
    color: cores.textSecondary,
  },
  bio: {
    fontSize: SIZES.fontCaption,
    color: cores.textPrimary,
    lineHeight: 19,
    marginTop: 2,
  },
  followButton: {
    marginHorizontal: SIZES.padding,
    marginBottom: SIZES.padding,
    paddingVertical: 10,
    borderRadius: SIZES.radius,
    alignItems: 'center',
    backgroundColor: cores.primary,
  },
  followButtonOutline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: cores.primary,
  },
  followButtonText: {
    fontWeight: 'bold',
    fontSize: SIZES.fontSubtitle,
    color: cores.white,
  },
  followButtonTextOutline: {
    color: cores.primary,
  },
  section: {
    marginHorizontal: SIZES.padding,
    marginBottom: SIZES.padding,
    backgroundColor: cores.cardBackground,
    borderRadius: SIZES.radius,
    padding: SIZES.padding,
  },
  sectionTitle: {
    fontSize: SIZES.fontBody,
    fontWeight: 'bold',
    color: cores.primary,
    marginBottom: SIZES.radius,
  },
  emptyText: {
    fontSize: SIZES.fontCaption,
    color: cores.textSecondary,
    textAlign: 'center',
    paddingVertical: 8,
  },
  postsTitle: {
    fontSize: SIZES.fontSubtitle,
    fontWeight: 'bold',
    color: cores.textPrimary,
    paddingHorizontal: SIZES.padding,
    paddingTop: 4,
    paddingBottom: 8,
  },
  lista: {
    paddingHorizontal: SIZES.padding,
    paddingBottom: 32,
  },
  vazio: {
    textAlign: 'center',
    color: cores.textSecondary,
    marginTop: 24,
    fontSize: SIZES.fontBody,
  },
});
