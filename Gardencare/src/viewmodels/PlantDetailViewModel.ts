import { useReducer, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { Plant } from '../models/Plant';
import { SensorData } from '../models/SensorData';
import { PlantDetailBusiness } from '../business/PlantDetailBusiness';

const business = new PlantDetailBusiness();

interface PlantDetailState {
  planta: Plant | null;
  sensorData: SensorData | null;
  loading: boolean;
  error: string | null;
}

type PlantDetailAction =
  | { type: 'CARREGAR_INICIO' }
  | { type: 'CARREGAR_SUCESSO'; planta: Plant; sensorData: SensorData }
  | { type: 'CARREGAR_ERRO'; error: string }
  | { type: 'TOGGLE_FAVORITA'; valor: boolean }
  | { type: 'REGISTRAR_REGA'; novoStatus: Plant['statusSaude'] };

const estadoInicial: PlantDetailState = {
  planta: null,
  sensorData: null,
  loading: true,
  error: null,
};

function plantDetailReducer(state: PlantDetailState, action: PlantDetailAction): PlantDetailState {
  switch (action.type) {
    case 'CARREGAR_INICIO':
      return { ...state, loading: true, error: null };
    case 'CARREGAR_SUCESSO':
      return { ...state, loading: false, planta: action.planta, sensorData: action.sensorData };
    case 'CARREGAR_ERRO':
      return { ...state, loading: false, error: action.error };
    case 'TOGGLE_FAVORITA':
      if (!state.planta) return state;
      return { ...state, planta: { ...state.planta, favorita: action.valor } };
    case 'REGISTRAR_REGA':
      if (!state.planta) return state;
      return {
        ...state,
        planta: {
          ...state.planta,
          ultimaRega: new Date().toISOString().split('T')[0],
          statusSaude: action.novoStatus,
        },
      };
    default:
      return state;
  }
}

export function usePlantDetailViewModel(plantaId: string) {
  const [state, dispatch] = useReducer(plantDetailReducer, estadoInicial);

  useFocusEffect(
    useCallback(() => {
      carregarDados();
    }, [plantaId])
  );

  async function carregarDados() {
    dispatch({ type: 'CARREGAR_INICIO' });
    try {
      const [planta, sensorData] = await Promise.all([
        business.getPlanta(plantaId),
        business.getSensorData(),
      ]);
      if (!planta) throw new Error('Planta não encontrada.');
      dispatch({ type: 'CARREGAR_SUCESSO', planta, sensorData });
    } catch (e: any) {
      dispatch({ type: 'CARREGAR_ERRO', error: e.message ?? 'Erro ao carregar.' });
    }
  }

  async function toggleFavorita(valor: boolean) {
    if (!state.planta) return;
    dispatch({ type: 'TOGGLE_FAVORITA', valor });
    await business.toggleFavorita(state.planta.id, valor);
  }

  async function registrarRega() {
    if (!state.planta) return;
    const novoStatus = business.calcularStatus(state.planta, state.sensorData);
    dispatch({ type: 'REGISTRAR_REGA', novoStatus });
    await business.registrarRega(state.planta, state.sensorData);
  }

  const precisaRegar =
    state.planta && state.sensorData
      ? business.precisaRegar(state.planta, state.sensorData)
      : false;

  const frequenciaRega = state.planta
    ? business.calcularFrequenciaRega(state.planta.tipo, state.sensorData?.temperatura)
    : 0;

  const umidadePorcentagem =
    state.planta && state.sensorData
      ? business.calcularUmidadePorcentagem(state.sensorData, state.planta)
      : 0;

  async function deletarPlanta(): Promise<void> {
    if (!state.planta) return;
    await business.deletarPlanta(state.planta.id);
  }

  return {
    ...state,
    precisaRegar,
    frequenciaRega,
    umidadePorcentagem,
    toggleFavorita,
    registrarRega,
    deletarPlanta,
    recarregar: carregarDados,
  };
}