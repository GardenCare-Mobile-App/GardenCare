export type TipoPlanta = 'tropical' | 'exterior' | 'interior' | 'suculenta' | 'aquatica';

export interface Plant {
  id: string;
  nome: string;
  especie: string;
  imagemUrl?: string;
  tipo: TipoPlanta;
  limiteUmidade: number;
  limiteTemperatura?: number;
  limiteLuminosidade?: number;
  observacoes: string;
  ultimaRega: string;
  statusSaude: 'saudavel' | 'atencao' | 'critico';
  favorita?: boolean;
}