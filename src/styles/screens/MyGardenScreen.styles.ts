import { StyleSheet, Platform } from 'react-native';
import { SIZES } from '../globalStyles';
import { Cores } from '../ThemeStyles';

export const createStyles = (cores: Cores) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: cores.background,
  },

  header: {
    backgroundColor: cores.acao,
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
    color: cores.white,
  },
  arduinobadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: cores.verdeEscuro,
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
    color: cores.amareloMuitoClaro,
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
        shadowColor: cores.black,
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
    color: cores.primary,
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
    color: cores.textSecondary,
  },

  plantaCard: {
    backgroundColor: cores.cardBackground,
    borderRadius: SIZES.radius,
    marginBottom: SIZES.radius,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    gap: 10,
    ...Platform.select({
      ios: {
        shadowColor: cores.black,
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
    backgroundColor: cores.verdeEscuro,
    alignItems: 'center',
    justifyContent: 'center',
  },
  plantaInfo: {
    flex: 1,
  },
  plantaNome: {
    fontSize: SIZES.fontCaption,
    fontWeight: 'bold',
    color: cores.primary,
  },
  plantaUltimaRega: {
    fontSize: SIZES.fontSmall,
    color: cores.textSecondary,
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
    color: cores.white,
  },
  favButton: {
    padding: 4,
  },
  detalhesButton: {
    padding: 4,
  },

  adicionarButton: {
    backgroundColor: cores.acao,
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
    color: cores.white,
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
    backgroundColor: cores.acao,
    paddingHorizontal: SIZES.padding + 4,
    paddingVertical: 10,
    borderRadius: SIZES.radiusLarge,
  },
  retryButtonText: {
    color: cores.white,
    fontWeight: 'bold',
  },

  ordenacaoRow: {
    marginBottom: SIZES.radius,
  },
  chipOrdenacao: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: SIZES.radiusLarge,
    borderWidth: 1,
    borderColor: cores.border,
    backgroundColor: cores.cardBackground,
  },
  chipOrdenacaoAtivo: {
    backgroundColor: cores.acao,
    borderColor: cores.acao,
  },
  chipOrdenacaoTexto: {
    fontSize: SIZES.fontSmall,
    color: cores.textSecondary,
    fontWeight: '600',
  },
  chipOrdenacaoTextoAtivo: {
    color: cores.white,
  },

  plantaCardSelecionada: {
    borderWidth: 2,
    borderColor: cores.error,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: cores.textSecondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxSelecionado: {
    backgroundColor: cores.error,
    borderColor: cores.error,
  },
  selecaoBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SIZES.radius,
  },
  selecionarTudoTexto: {
    fontSize: SIZES.fontSmall,
    color: cores.verdeEscuro,
    fontWeight: 'bold',
  },
  contadorSelecao: {
    fontSize: SIZES.fontSmall,
    color: cores.textSecondary,
  },
  cancelarTexto: {
    fontSize: SIZES.fontBody,
    color: cores.amareloMuitoClaro,
    fontWeight: 'bold',
  },
  excluirButton: {
    backgroundColor: cores.error,
    marginHorizontal: SIZES.padding,
    marginBottom: SIZES.padding,
    borderRadius: SIZES.radiusLarge,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  excluirButtonDisabled: {
    opacity: 0.4,
  },
  excluirButtonTexto: {
    fontSize: SIZES.fontBody,
    fontWeight: 'bold',
    color: cores.white,
  },

  controleContainer: {
    marginHorizontal: SIZES.padding,
    marginTop: SIZES.radius,
    backgroundColor: cores.cardBackground,
    borderRadius: SIZES.radius,
    padding: SIZES.padding,
    gap: 10,
    ...Platform.select({
      ios: {
        shadowColor: cores.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
      },
      android: { elevation: 2 },
    }),
  },
  controleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 2,
  },
  controleTitulo: {
    fontSize: SIZES.fontCaption,
    fontWeight: 'bold',
    color: cores.primary,
  },
  controleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8,
  },
  controleLabel: {
    fontSize: SIZES.fontCaption,
    color: cores.textSecondary,
    flex: 1,
  },
  controleButton: {
    backgroundColor: cores.acao,
    borderRadius: SIZES.radiusLarge,
    paddingVertical: 7,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  controleButtonTexto: {
    fontSize: SIZES.fontSmall,
    fontWeight: 'bold',
    color: cores.white,
  },
  controleButtonDisabled: {
    opacity: 0.45,
  },
});
