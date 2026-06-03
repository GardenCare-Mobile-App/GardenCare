import { Plant } from '../models/Plant';
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