import { StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../globalStyles';

export const styles = StyleSheet.create({
  foto: {
    width: SIZES.avatarSize,
    height: SIZES.avatarSize,
    borderRadius: SIZES.avatarSize / 2,
    borderWidth: 3,
    borderColor: COLORS.verdeClaro,
    marginBottom: SIZES.radius,
  },
  fallback: {
    width: SIZES.avatarSize,
    height: SIZES.avatarSize,
    borderRadius: SIZES.avatarSize / 2,
    borderWidth: 3,
    borderColor: COLORS.verdeClaro,
    backgroundColor: COLORS.verdeEscuro,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SIZES.radius,
  },
  inicial: {
    fontSize: SIZES.fontTitle + 4,
    fontWeight: 'bold',
    color: COLORS.amareloMuitoClaro,
  },
});