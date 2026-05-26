import { Plant, TipoPlanta } from '../models/Plant';
import { SensorData } from '../models/SensorData';
import { PlantDetailRepository } from '../repository/PlantDetailRepository';
import {
  calcularFrequenciaRega,
  calcularStatus,
  calcularUmidadePorcentagem,
  precisaRegar,
} from '../utils/PlantBusinessUtils';

const repository = new PlantDetailRepository();

export class PlantDetailBusiness {

  async getPlanta(id: string): Promise<Plant | null> {
    return repository.getPlanta(id);
  }

  async getSensorData(): Promise<SensorData> {
    return repository.getSensorData();
  }

  async toggleFavorita(id: string, valor: boolean): Promise<void> {
    return repository.atualizarFavorita(id, valor);
  }

  async registrarRega(planta: Plant, sensorData: SensorData | null): Promise<void> {
    const ultimaRega = new Date().toISOString().split('T')[0];
    const novoStatus = calcularStatus(planta, sensorData);
    return repository.registrarRega(planta.id, ultimaRega, novoStatus);
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

  calcularUmidadePorcentagem(sensorData: SensorData, planta: Plant): number {
    return calcularUmidadePorcentagem(sensorData, planta);
  }
}
