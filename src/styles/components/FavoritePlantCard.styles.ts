import { StyleSheet } from 'react-native';
import { Cores } from '../ThemeStyles';
import { SIZES } from '../globalStyles';

export const createStyles = (cores: Cores) => StyleSheet.create({
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
    color: cores.textPrimary,
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
});