import { StyleSheet } from 'react-native';
import { SIZES } from '../globalStyles';
import { Cores } from '../ThemeStyles';

export const createStyles = (cores: Cores) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: cores.background,
  },

  header: {
    backgroundColor: cores.primary,
    paddingVertical: SIZES.padding,
    paddingHorizontal: SIZES.padding,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    flex: 1,
    fontSize: SIZES.fontTitle,
    fontWeight: 'bold',
    color: cores.white,
    textAlign: 'center',
  },

  scroll: {
    padding: SIZES.padding,
    paddingBottom: 40,
  },

  label: {
    fontSize: SIZES.fontSubtitle,
    fontWeight: '700',
    color: cores.textSecondary,
    marginBottom: 8,
    marginTop: 16,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },

  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: SIZES.radiusLarge,
    backgroundColor: cores.cardBackground,
    borderWidth: 1.5,
    borderColor: cores.border,
  },
  chipActive: {
    backgroundColor: cores.primary,
    borderColor: cores.primary,
  },
  chipText: {
    fontSize: SIZES.fontCaption,
    fontWeight: '600',
    color: cores.textSecondary,
  },
  chipTextActive: {
    color: cores.white,
  },

  input: {
    backgroundColor: cores.cardBackground,
    borderRadius: SIZES.radius,
    borderWidth: 1,
    borderColor: cores.border,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: SIZES.fontBody,
    color: cores.textPrimary,
  },

  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#FFEBEE',
    borderRadius: SIZES.radius,
    padding: 12,
    marginTop: 16,
  },
  errorText: {
    fontSize: SIZES.fontCaption,
    color: '#B00020',
    flex: 1,
  },

  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: cores.primary,
    borderRadius: SIZES.radius,
    paddingVertical: 14,
    marginTop: 24,
  },
  saveButtonDisabled: {
    opacity: 0.6,
  },
  saveButtonText: {
    color: cores.white,
    fontWeight: '700',
    fontSize: SIZES.fontBody,
  },
});
