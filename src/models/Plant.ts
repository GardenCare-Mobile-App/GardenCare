export interface Plant {
  id: string;
  nome: string;
  especie: string;
  imagemUrl: string;
  frequenciaRegaDias: number;
  ultimaRega: string;
  statusSaude: 'saudavel' | 'atencao' | 'critico';
  observacoes: string;
  favorita?: boolean;
}