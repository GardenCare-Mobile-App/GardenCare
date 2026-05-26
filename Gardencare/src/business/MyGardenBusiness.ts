import { Plant, TipoPlanta } from '../models/Plant';
import { SensorData } from '../models/SensorData';
import { GardenRepository } from '../repository/GardenRepository';
import {
  LIMITE_UMIDADE_PADRAO,
  calcularFrequenciaRega,
  calcularStatus,
  precisaRegar,
} from '../utils/PlantBusinessUtils';

const gardenRepository = new GardenRepository();

export class GardenBusiness {

  async getPlants(): Promise<Plant[]> {
    return gardenRepository.getPlantas();
  }

  async getPlanta(id: string): Promise<Plant | null> {
    return gardenRepository.getPlanta(id);
  }

  async cadastrarPlanta(
    planta: Omit<Plant, 'id' | 'statusSaude' | 'ultimaRega'>,
    imagemUri?: string
  ): Promise<Plant> {
    return gardenRepository.adicionarPlanta(planta, imagemUri);
  }

  async toggleFavorita(id: string, valor: boolean): Promise<void> {
    return gardenRepository.atualizarFavorita(id, valor);
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
    luminosidadeMin: number;
  }): string[] {
    const alertas: string[] = [];
    const tempMax = limites?.temperaturaMax ?? 35;
    const umidadeMin = limites?.umidadeMin ?? 30;
    const luzMin = limites?.luminosidadeMin ?? 200;

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

    if (sensorData.luminosidade < luzMin) {
      alertas.push(`Luminosidade baixa: ${sensorData.luminosidade} lux`);
    }

    return alertas;
  }

  getLimiteUmidadePadrao(tipo: TipoPlanta): number {
    return LIMITE_UMIDADE_PADRAO[tipo];
  }
}
