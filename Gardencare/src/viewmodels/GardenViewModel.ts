import { useReducer, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { Plant } from '../models/Plant';
import { SensorData } from '../models/SensorData';
import { GardenBusiness } from '../business/MyGardenBusiness';
import { ESP32Business } from '../business/ESP32Business';
import { SensorLimitesBusiness } from '../business/SensorLimitesBusiness';

const gardenBusiness = new GardenBusiness();
const esp32Business = new ESP32Business();
const sensorLimitesBusiness = new SensorLimitesBusiness();

export type Ordenacao = 'nome_asc' | 'status_critico' | 'status_saudavel';

interface GardenState {
  plantas: Plant[];
  sensorData: SensorData | null;
  alertas: string[];
  loading: boolean;
  error: string | null;
  modoSelecao: boolean;
  selecionadas: string[];
  ordenacao: Ordenacao;
}

type GardenAction =
  | { type: 'CARREGAR_INICIO' }
  | { type: 'CARREGAR_SUCESSO'; plantas: Plant[]; sensorData: SensorData; alertas: string[] }
  | { type: 'CARREGAR_ERRO'; error: string }
  | { type: 'TOGGLE_FAVORITA'; id: string; valor: boolean }
  | { type: 'REMOVER_PLANTAS'; ids: string[] }
  | { type: 'ENTRAR_MODO_SELECAO' }
  | { type: 'SAIR_MODO_SELECAO' }
  | { type: 'TOGGLE_SELECAO'; id: string }
  | { type: 'SELECIONAR_TODAS' }
  | { type: 'DESSELECIONAR_TODAS' }
  | { type: 'MUDAR_ORDENACAO'; ordenacao: Ordenacao };

const estadoInicial: GardenState = {
  plantas: [],
  sensorData: null,
  alertas: [],
  loading: true,
  error: null,
  modoSelecao: false,
  selecionadas: [],
  ordenacao: 'nome_asc',
};

const statusPeso: Record<Plant['statusSaude'], number> = {
  critico: 0,
  atencao: 1,
  saudavel: 2,
};

function ordenarPlantas(plantas: Plant[], ordenacao: Ordenacao): Plant[] {
  return [...plantas].sort((a, b) => {
    switch (ordenacao) {
      case 'nome_asc':
        return a.nome.localeCompare(b.nome, 'pt-BR');
      case 'status_critico':
        return statusPeso[a.statusSaude] - statusPeso[b.statusSaude];
      case 'status_saudavel':
        return statusPeso[b.statusSaude] - statusPeso[a.statusSaude];
    }
  });
}

function gardenReducer(state: GardenState, action: GardenAction): GardenState {
  switch (action.type) {
    case 'CARREGAR_INICIO':
      return { ...state, loading: true, error: null };

    case 'CARREGAR_SUCESSO':
      return {
        ...state,
        loading: false,
        plantas: action.plantas,
        sensorData: action.sensorData,
        alertas: action.alertas,
        modoSelecao: false,
        selecionadas: [],
      };

    case 'CARREGAR_ERRO':
      return { ...state, loading: false, error: action.error };

    case 'TOGGLE_FAVORITA':
      return {
        ...state,
        plantas: state.plantas.map((p) =>
          p.id === action.id ? { ...p, favorita: action.valor } : p
        ),
      };

    case 'REMOVER_PLANTAS':
      return {
        ...state,
        plantas: state.plantas.filter((p) => !action.ids.includes(p.id)),
        modoSelecao: false,
        selecionadas: [],
      };

    case 'ENTRAR_MODO_SELECAO':
      return { ...state, modoSelecao: true, selecionadas: [] };

    case 'SAIR_MODO_SELECAO':
      return { ...state, modoSelecao: false, selecionadas: [] };

    case 'TOGGLE_SELECAO':
      return {
        ...state,
        selecionadas: state.selecionadas.includes(action.id)
          ? state.selecionadas.filter((id) => id !== action.id)
          : [...state.selecionadas, action.id],
      };

    case 'SELECIONAR_TODAS':
      return { ...state, selecionadas: state.plantas.map((p) => p.id) };

    case 'DESSELECIONAR_TODAS':
      return { ...state, selecionadas: [] };

    case 'MUDAR_ORDENACAO':
      return { ...state, ordenacao: action.ordenacao };

    default:
      return state;
  }
}

export function useGardenViewModel() {
  const [state, dispatch] = useReducer(gardenReducer, estadoInicial);

  useFocusEffect(
    useCallback(() => {
      carregarDados();
    }, [])
  );

  async function carregarDados() {
    dispatch({ type: 'CARREGAR_INICIO' });
    try {
      const [dadosPlantas, dadosSensor, limites] = await Promise.all([
        gardenBusiness.getPlants(),
        esp32Business.getSensorData(),
        sensorLimitesBusiness.getLimites(),
      ]);
      const alertas = gardenBusiness.verificarAlertas(dadosPlantas, dadosSensor, limites);
      dispatch({ type: 'CARREGAR_SUCESSO', plantas: dadosPlantas, sensorData: dadosSensor, alertas });
    } catch (e) {
      dispatch({ type: 'CARREGAR_ERRO', error: 'Erro ao carregar jardim. Tente novamente.' });
    }
  }

  async function toggleFavorita(id: string, valor: boolean) {
    await gardenBusiness.toggleFavorita(id, valor);
    dispatch({ type: 'TOGGLE_FAVORITA', id, valor });
  }

  async function deletarPlantas(ids: string[]): Promise<void> {
    await Promise.all(ids.map((id) => gardenBusiness.deletarPlanta(id)));
    dispatch({ type: 'REMOVER_PLANTAS', ids });
  }

  const plantasOrdenadas = ordenarPlantas(state.plantas, state.ordenacao);
  const totalSaudaveis = state.plantas.filter((p) => p.statusSaude === 'saudavel').length;
  const totalAtencao = state.plantas.filter((p) => p.statusSaude === 'atencao').length;
  const totalCritico = state.plantas.filter((p) => p.statusSaude === 'critico').length;
  const todasSelecionadas = state.plantas.length > 0 && state.selecionadas.length === state.plantas.length;

  return {
    ...state,
    plantas: plantasOrdenadas,
    totalSaudaveis,
    totalAtencao,
    totalCritico,
    todasSelecionadas,
    toggleFavorita,
    deletarPlantas,
    mudarOrdenacao: (o: Ordenacao) => dispatch({ type: 'MUDAR_ORDENACAO', ordenacao: o }),
    entrarModoSelecao: () => dispatch({ type: 'ENTRAR_MODO_SELECAO' }),
    sairModoSelecao: () => dispatch({ type: 'SAIR_MODO_SELECAO' }),
    toggleSelecao: (id: string) => dispatch({ type: 'TOGGLE_SELECAO', id }),
    selecionarTodas: () => dispatch({ type: 'SELECIONAR_TODAS' }),
    desselecionarTodas: () => dispatch({ type: 'DESSELECIONAR_TODAS' }),
    recarregar: carregarDados,
  };
}