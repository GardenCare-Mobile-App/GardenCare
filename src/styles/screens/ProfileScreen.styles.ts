import { StyleSheet, Platform } from 'react-native';
import { SIZES } from '../globalStyles';
import { Cores } from '../ThemeStyles';

export const createStyles = (cores: Cores) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: cores.background,
  },

  header: {
    backgroundColor: cores.primary,
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
    color: cores.white,
    marginBottom: 2,
  },
  pronomes: {
    fontSize: SIZES.fontSubtitle,
    color: cores.verdeClaro,
    marginBottom: 8,
  },
  bio: {
    fontSize: SIZES.fontCaption,
    color: cores.verdeClaro,
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
    backgroundColor: cores.verdeClaro,
    paddingHorizontal: SIZES.padding,
    paddingVertical: 8,
    borderRadius: SIZES.radiusLarge,
  },
  editButtonText: {
    color: cores.primary,
    fontWeight: 'bold',
    fontSize: SIZES.fontCaption,
  },
  gardenButton: {
    backgroundColor: cores.verdeEscuro,
    paddingHorizontal: SIZES.padding,
    paddingVertical: 8,
    borderRadius: SIZES.radiusLarge,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  gardenButtonText: {
    color: cores.white,
    fontWeight: 'bold',
    fontSize: SIZES.fontCaption,
  },

  statsContainer: {
    flexDirection: 'row',
    backgroundColor: cores.cardBackground,
    marginHorizontal: SIZES.padding,
    marginTop: -SIZES.radius,
    borderRadius: SIZES.radius,
    paddingVertical: SIZES.padding,
    ...Platform.select({
      ios: {
        shadowColor: cores.black,
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
    backgroundColor: cores.border,
  },
  statValue: {
    fontSize: SIZES.fontLarge,
    fontWeight: 'bold',
    color: cores.primary,
  },
  statLabel: {
    fontSize: SIZES.fontSmall,
    color: cores.textSecondary,
    marginTop: 2,
  },

  section: {
    marginTop: SIZES.padding,
    marginHorizontal: SIZES.padding,
    backgroundColor: cores.cardBackground,
    borderRadius: SIZES.radius,
    padding: SIZES.padding,
    ...Platform.select({
      ios: {
        shadowColor: cores.black,
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
    color: cores.primary,
    marginBottom: SIZES.radius,
  },
  emptyText: {
    fontSize: SIZES.fontCaption,
    color: cores.verdeClaro,
    textAlign: 'center',
    paddingVertical: 8,
  },

  plantCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: cores.border,
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
    color: cores.primary,
  },
  plantSpecies: {
    fontSize: SIZES.fontSmall,
    color: cores.textSecondary,
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
    color: cores.white,
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
    color: cores.textPrimary,
  },
  notificationDivider: {
    height: 0.5,
    backgroundColor: cores.border,
    marginVertical: 4,
  },

  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: cores.error,
    fontSize: SIZES.fontBody,
    textAlign: 'center',
    marginBottom: SIZES.radius,
  },
  retryButton: {
    backgroundColor: cores.primary,
    paddingHorizontal: SIZES.padding + 4,
    paddingVertical: 10,
    borderRadius: SIZES.radiusLarge,
  },
  retryButtonText: {
    color: cores.white,
    fontWeight: 'bold',
  },
});
