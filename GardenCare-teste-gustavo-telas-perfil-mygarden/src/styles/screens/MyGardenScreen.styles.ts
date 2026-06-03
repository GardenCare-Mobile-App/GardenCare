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
    paddingBottom: SIZES.padding,
    paddingHorizontal: SIZES.padding,
    flexDirection: 'row',
    alignItems: 'center',
    gap: SIZES.radius,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    flex: 1,
    fontSize: SIZES.fontTitle,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  arduinobadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: COLORS.verdeEscuro,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: SIZES.radiusLarge,
  },
  arduinoDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  arduinoText: {
    fontSize: SIZES.fontSmall,
    color: COLORS.amareloMuitoClaro,
  },

  sensoresContainer: {
    flexDirection: 'row',
    paddingHorizontal: SIZES.padding,
    paddingTop: SIZES.padding,
    gap: 8,
  },
  sensorCard: {
    flex: 1,
    borderRadius: SIZES.radius,
    padding: SIZES.radius,
    alignItems: 'center',
    gap: 4,
    ...Platform.select({
      ios: {
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  sensorValor: {
    fontSize: SIZES.fontBody,
    fontWeight: 'bold',
  },
  sensorLabel: {
    fontSize: SIZES.fontSmall,
    textAlign: 'center',
  },

  alertaContainer: {
    marginHorizontal: SIZES.padding,
    marginTop: SIZES.radius,
    backgroundColor: '#FFF3E0',
    borderRadius: SIZES.radius,
    padding: SIZES.radius,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  alertaTexto: {
    flex: 1,
    fontSize: SIZES.fontCaption,
    color: '#633806',
    lineHeight: 18,
  },

  plantasSection: {
    marginTop: SIZES.padding,
    paddingHorizontal: SIZES.padding,
  },
  plantasHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SIZES.radius,
  },
  plantasSectionTitle: {
    fontSize: SIZES.fontBody,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  plantasResumo: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  resumoDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  resumoTexto: {
    fontSize: SIZES.fontSmall,
    color: COLORS.textSecondary,
  },

  plantaCard: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: SIZES.radius,
    marginBottom: SIZES.radius,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    gap: 10,
    ...Platform.select({
      ios: {
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  plantaImagem: {
    width: 52,
    height: 52,
    borderRadius: SIZES.radiusSmall,
    resizeMode: 'cover',
  },
  plantaImagemFallback: {
    width: 52,
    height: 52,
    borderRadius: SIZES.radiusSmall,
    backgroundColor: COLORS.verdeEscuro,
    alignItems: 'center',
    justifyContent: 'center',
  },
  plantaInfo: {
    flex: 1,
  },
  plantaNome: {
    fontSize: SIZES.fontCaption,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  plantaUltimaRega: {
    fontSize: SIZES.fontSmall,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  statusTexto: {
    fontSize: SIZES.fontSmall,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  favButton: {
    padding: 4,
  },
  detalhesButton: {
    padding: 4,
  },

  adicionarButton: {
    backgroundColor: COLORS.verdeEscuro,
    marginHorizontal: SIZES.padding,
    marginBottom: SIZES.padding,
    borderRadius: SIZES.radiusLarge,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  adicionarButtonTexto: {
    fontSize: SIZES.fontBody,
    fontWeight: 'bold',
    color: COLORS.white,
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