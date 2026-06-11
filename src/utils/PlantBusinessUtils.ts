import { Plant, TipoPlanta } from '../models/Plant';
import { SensorData } from '../models/SensorData';

export const FREQUENCIA_REGA_BASE: Record<TipoPlanta, number> = {
  tropical: 2,
  interior: 3,
  exterior: 4,
  suculenta: 14,
  aquatica: 1,
};

export const LIMITE_UMIDADE_PADRAO: Record<TipoPlanta, number> = {
  tropical: 60,
  interior: 40,
  exterior: 35,
  suculenta: 20,
  aquatica: 80,
};

export const TEMPERATURA_IDEAL_PADRAO: Record<TipoPlanta, { min: number; max: number }> = {
  tropical:  { min: 18, max: 30 },
  interior:  { min: 15, max: 27 },
  exterior:  { min: 5,  max: 38 },
  suculenta: { min: 15, max: 40 },
  aquatica:  { min: 20, max: 30 },
};

export const LUMINOSIDADE_IDEAL_PADRAO: Record<TipoPlanta, number> = {
  tropical:  800,
  interior:  300,
  exterior:  5000,
  suculenta: 3000,
  aquatica:  500,
};

export function calcularFrequenciaRega(tipo: TipoPlanta, temperatura?: number): number {
  let dias = FREQUENCIA_REGA_BASE[tipo];
  if (temperatura && temperatura > 30) {
    dias = Math.max(1, Math.floor(dias / 2));
  }
  return dias;
}

export function calcularStatus(planta: Plant, sensorData: SensorData | null): Plant['statusSaude'] {
  if (!sensorData) return 'saudavel';
  if (sensorData.umidade >= planta.limiteUmidade) return 'saudavel';
  if (sensorData.umidade >= planta.limiteUmidade * 0.6) return 'atencao';
  return 'critico';
}

export function precisaRegar(planta: Plant, sensorData: SensorData): boolean {
  const hoje = new Date();
  const ultimaRega = new Date(planta.ultimaRega);
  const diasSemRegar = Math.floor(
    (hoje.getTime() - ultimaRega.getTime()) / (1000 * 60 * 60 * 24)
  );
  const frequencia = calcularFrequenciaRega(planta.tipo, sensorData.temperatura);
  return diasSemRegar >= frequencia || sensorData.umidade < planta.limiteUmidade;
}

export function calcularUmidadePorcentagem(sensorData: SensorData, planta: Plant): number {
  return Math.min(100, Math.round((sensorData.umidade / planta.limiteUmidade) * 100));
}
