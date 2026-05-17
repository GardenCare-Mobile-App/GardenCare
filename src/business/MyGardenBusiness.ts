import { Plant } from '../models/Plant';

const mockPlantas: Plant[] = [
  {
    id: '1',
    nome: 'Samambaia',
    especie: 'Nephrolepis exaltata',
    imagemUrl: 'https://picsum.photos/seed/fern/300/300',
    frequenciaRegaDias: 2,
    ultimaRega: '2025-03-27',
    statusSaude: 'saudavel',
    observacoes: 'Gosta de sombra e umidade.',
    favorita: true,
  },
  {
    id: '2',
    nome: 'Orquídea',
    especie: 'Phalaenopsis sp.',
    imagemUrl: 'https://picsum.photos/seed/orchid/300/300',
    frequenciaRegaDias: 7,
    ultimaRega: '2025-03-22',
    statusSaude: 'saudavel',
    observacoes: 'Regar apenas quando o substrato estiver seco.',
    favorita: true,
  },
  {
    id: '3',
    nome: 'Cacto',
    especie: 'Mammillaria gracilis',
    imagemUrl: 'https://picsum.photos/seed/cactus/300/300',
    frequenciaRegaDias: 14,
    ultimaRega: '2025-03-15',
    statusSaude: 'saudavel',
    observacoes: 'Precisa de muito sol direto.',
    favorita: false,
  },
];

export class GardenBusiness {
  async getPlants(): Promise<Plant[]> {
    return Promise.resolve(mockPlantas);
  }

  async toggleFavorita(id: string, valor: boolean): Promise<void> {
    const planta = mockPlantas.find((p) => p.id === id);
    if (planta) planta.favorita = valor;
  }
}