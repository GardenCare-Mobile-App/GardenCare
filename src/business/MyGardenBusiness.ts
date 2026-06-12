import { Plant, TipoPlanta } from '../models/Plant';
import { SensorData } from '../models/SensorData';
import { GardenRepository } from '../repository/GardenRepository';
import { LIMITE_UMIDADE_PADRAO, TEMPERATURA_IDEAL_PADRAO, LUMINOSIDADE_IDEAL_PADRAO, calcularFrequenciaRega, calcularStatus, precisaRegar, } from '../utils/PlantBusinessUtils';

const gardenRepository = new GardenRepository();

export class GardenBusiness {

  async getPlants(): Promise<Plant[]> {
    return gardenRepository.getPlantas();
  }

  async getPlantasFavoritasPorUid(uid: string): Promise<Plant[]> {
    return gardenRepository.getPlantasFavoritasPorUid(uid);
  }

  async getPlanta(id: string): Promise<Plant | null> {
    return gardenRepository.getPlanta(id);
  }

  async cadastrarPlanta(
    planta: Omit<Plant, 'id' | 'uid'| 'statusSaude' | 'ultimaRega'>,
    imagemBase64?: string,
    ultimaRega?: string
  ): Promise<Plant> {
    return gardenRepository.adicionarPlanta(planta, imagemBase64, ultimaRega);
  }

  async toggleFavorita(id: string, valor: boolean): Promise<void> {
    return gardenRepository.atualizarFavorita(id, valor);
  }

  async deletarPlanta(id: string): Promise<void> {
    return gardenRepository.deletarPlanta(id);
  }

  async registrarRega(planta: Plant, sensorData: SensorData | null): Promise<void> {
    const novoStatus = calcularStatus(planta, sensorData);
    return gardenRepository.registrarRega(planta.id, novoStatus);
  }

  calcularFrequenciaRega(tipo: TipoPlanta, temperatura?: number): number {
    return calcularFrequenciaRega(tipo, temperatura);
  }

  calcularStatus(planta: Plant, sensorData: SensorData | null): Plant['statusSaude'] {
    return calcularStatus(planta, sensorData);
  }

  precisaRegar(planta: Plant, sensorData: SensorData): boolean {
    return precisaRegar(planta, sensorData);
  }

  verificarAlertas(plantas: Plant[], sensorData: SensorData, limites?: {
    temperaturaMax: number;
    umidadeMin: number;
  }): string[] {
    const alertas: string[] = [];
    const tempMax = limites?.temperaturaMax ?? 35;
    const umidadeMin = limites?.umidadeMin ?? 30;

    plantas.forEach((planta) => {
      if (sensorData.umidade < planta.limiteUmidade) {
        alertas.push(
          `Umidade baixa para ${planta.nome} (${sensorData.umidade}% < ${planta.limiteUmidade}%)`
        );
      }
    });

    if (sensorData.temperatura > tempMax) {
      alertas.push(`Temperatura muito alta: ${sensorData.temperatura}°C`);
    }

    if (sensorData.umidade < umidadeMin) {
      alertas.push(`Umidade do ambiente baixa: ${sensorData.umidade}%`);
    }

    if (sensorData.luminosidade === 0) {
      alertas.push('Plantas sem luz — leve para um local mais iluminado.');
    }

    return alertas;
  }

  getLimiteUmidadePadrao(tipo: TipoPlanta): number {
    return LIMITE_UMIDADE_PADRAO[tipo];
  }

  getSugestoesTipo(tipo: TipoPlanta) {
    return {
      umidade: LIMITE_UMIDADE_PADRAO[tipo],
      temperatura: TEMPERATURA_IDEAL_PADRAO[tipo],
      luminosidade: LUMINOSIDADE_IDEAL_PADRAO[tipo],
    };
  }
}
