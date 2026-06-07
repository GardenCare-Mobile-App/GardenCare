import { StyleSheet } from 'react-native';
import { SIZES } from '../globalStyles';

export const styles = StyleSheet.create({
  container: {
    gap: 4,
    marginTop: 4,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  texto: {
    fontSize: SIZES.fontSmall,
  },
});