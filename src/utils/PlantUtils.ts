import { Plant, TipoPlanta } from '../models/Plant';
import { COLORS } from '../styles/globalStyles';

export function getStatusColor(status: Plant['statusSaude']): string {
  switch (status) {
    case 'saudavel': return COLORS.verdeClaro;
    case 'atencao': return COLORS.attention;
    case 'critico': return COLORS.critical;
    default: return COLORS.error;
  }
}

export function getStatusLabel(status: Plant['statusSaude']): string {
  switch (status) {
    case 'saudavel': return 'Saudável';
    case 'atencao': return 'Atenção';
    case 'critico': return 'Crítico';
    default: return '';
  }
}

export function numeroDiasDesdeRega(ultimaRega: string): number {
  const hoje = new Date();
  const rega = new Date(ultimaRega);
  return Math.floor((hoje.getTime() - rega.getTime()) / (1000 * 60 * 60 * 24));
}

export function diasDesdeRega(ultimaRega: string): string {
  const dias = numeroDiasDesdeRega(ultimaRega);
  if (dias === 0) return 'Regada hoje';
  if (dias === 1) return 'Regada há 1 dia';
  return `Regada há ${dias} dias`;
}

export function getTipoLabel(tipo: TipoPlanta): string {
  const labels: Record<TipoPlanta, string> = {
    tropical: 'Tropical',
    interior: 'Interior',
    exterior: 'Exterior',
    suculenta: 'Suculenta',
    aquatica: 'Aquática',
  };
  return labels[tipo];
}