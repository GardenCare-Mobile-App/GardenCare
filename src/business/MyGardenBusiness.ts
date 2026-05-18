import { Plant, TipoPlanta } from '../models/Plant';
import { SensorData } from '../models/SensorData';
import { GardenRepository } from '../repository/GardenRepository';

const gardenRepository = new GardenRepository();

const FREQUENCIA_REGA_BASE: Record<TipoPlanta, number> = {
  tropical: 2,
  interior: 3,
  exterior: 4,
  suculenta: 14,
  aquatica: 1,
};

const LIMITE_UMIDADE_PADRAO: Record<TipoPlanta, number> = {
  tropical: 60,
  interior: 40,
  exterior: 35,
  suculenta: 20,
  aquatica: 80,
};

export class GardenBusiness {

  async getPlants(): Promise<Plant[]> {
    return gardenRepository.getPlantas();
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
  calcularFrequenciaRega(tipo: TipoPlanta, temperatura?: number): number {
    let dias = FREQUENCIA_REGA_BASE[tipo];
    if (temperatura && temperatura > 30) {
      dias = Math.max(1, Math.floor(dias / 2));
    }
    return dias;
  }
  precisaRegar(planta: Plant, sensorData: SensorData): boolean {
    const hoje = new Date();
    const ultimaRega = new Date(planta.ultimaRega);
    const diasSemRegar = Math.floor(
      (hoje.getTime() - ultimaRega.getTime()) / (1000 * 60 * 60 * 24)
    );
    const frequencia = this.calcularFrequenciaRega(planta.tipo, sensorData.temperatura);
    return diasSemRegar >= frequencia || sensorData.umidade < planta.limiteUmidade;
  }
  verificarAlertas(plantas: Plant[], sensorData: SensorData): string[] {
    const alertas: string[] = [];

    plantas.forEach((planta) => {
      if (sensorData.umidade < planta.limiteUmidade) {
        alertas.push(
          `Umidade baixa para ${planta.nome} (${sensorData.umidade}% < ${planta.limiteUmidade}%)`
        );
      }
    });

    if (sensorData.temperatura > 35) {
      alertas.push(`Temperatura muito alta: ${sensorData.temperatura}°C`);
    }

    if (sensorData.luminosidade < 200) {
      alertas.push(`Luminosidade baixa: ${sensorData.luminosidade} lux`);
    }

    return alertas;
  }

  getLimiteUmidadePadrao(tipo: TipoPlanta): number {
    return LIMITE_UMIDADE_PADRAO[tipo];
  }
}