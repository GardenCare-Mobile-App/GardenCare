import { StyleSheet, Platform } from 'react-native';
import { COLORS, SIZES } from '../globalStyles';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  header: {
    backgroundColor: COLORS.primary,
    paddingTop: SIZES.padding,
    paddingBottom: SIZES.padding + 4,
    paddingHorizontal: SIZES.padding,
    alignItems: 'center',
  },
  headerActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '100%',
    marginBottom: SIZES.radius,
  },
  settingsButton: {
    padding: 4,
  },

  name: {
    fontSize: SIZES.fontTitle,
    fontWeight: 'bold',
    color: COLORS.white,
    marginBottom: 2,
  },
  pronomes: {
    fontSize: SIZES.fontSubtitle,
    color: COLORS.verdeClaro,
    marginBottom: 8,
  },
  bio: {
    fontSize: SIZES.fontCaption,
    color: COLORS.verdeClaro,
    textAlign: 'center',
    lineHeight: 20,
    paddingHorizontal: SIZES.padding,
    marginBottom: SIZES.radius,
  },

  headerButtons: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 8,
  },
  editButton: {
    backgroundColor: COLORS.verdeClaro,
    paddingHorizontal: SIZES.padding,
    paddingVertical: 8,
    borderRadius: SIZES.radiusLarge,
  },
  editButtonText: {
    color: COLORS.primary,
    fontWeight: 'bold',
    fontSize: SIZES.fontCaption,
  },
  gardenButton: {
    backgroundColor: COLORS.verdeEscuro,
    paddingHorizontal: SIZES.padding,
    paddingVertical: 8,
    borderRadius: SIZES.radiusLarge,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  gardenButtonText: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: SIZES.fontCaption,
  },

  statsContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.cardBackground,
    marginHorizontal: SIZES.padding,
    marginTop: -SIZES.radius,
    borderRadius: SIZES.radius,
    paddingVertical: SIZES.padding,
    ...Platform.select({
      ios: {
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statDivider: {
    width: 1,
    backgroundColor: COLORS.border,
  },
  statValue: {
    fontSize: SIZES.fontLarge,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  statLabel: {
    fontSize: SIZES.fontSmall,
    color: COLORS.textSecondary,
    marginTop: 2,
  },

  section: {
    marginTop: SIZES.padding,
    marginHorizontal: SIZES.padding,
    backgroundColor: COLORS.cardBackground,
    borderRadius: SIZES.radius,
    padding: SIZES.padding,
    ...Platform.select({
      ios: {
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  sectionLast: {
    marginBottom: SIZES.padding,
  },
  sectionTitle: {
    fontSize: SIZES.fontBody,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: SIZES.radius,
  },
  emptyText: {
    fontSize: SIZES.fontCaption,
    color: COLORS.verdeClaro,
    textAlign: 'center',
    paddingVertical: 8,
  },

  plantCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: COLORS.border,
  },
  plantCardLast: {
    borderBottomWidth: 0,
  },
  plantImage: {
    width: 44,
    height: 44,
    borderRadius: SIZES.radiusSmall,
    resizeMode: 'cover',
  },
  plantInfo: {
    flex: 1,
  },
  plantName: {
    fontSize: SIZES.fontCaption,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  plantSpecies: {
    fontSize: SIZES.fontSmall,
    color: COLORS.textSecondary,
    fontStyle: 'italic',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  statusText: {
    fontSize: SIZES.fontSmall,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  favButton: {
    padding: 4,
  },

  notificationItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
  },
  notificationLabel: {
    fontSize: SIZES.fontCaption,
    color: COLORS.textPrimary,
  },
  notificationDivider: {
    height: 0.5,
    backgroundColor: COLORS.border,
    marginVertical: 4,
  },

  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: COLORS.error,
    fontSize: SIZES.fontBody,
    textAlign: 'center',
    marginBottom: SIZES.radius,
  },
  retryButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: SIZES.padding + 4,
    paddingVertical: 10,
    borderRadius: SIZES.radiusLarge,
  },
  retryButtonText: {
    color: COLORS.white,
    fontWeight: 'bold',
  },
});