import { useReducer, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { Plant } from '../models/Plant';
import { SensorData } from '../models/SensorData';
import { GardenBusiness } from '../business/MyGardenBusiness';
import { ArduinoBusiness } from '../business/ArduinoBusiness';

const gardenBusiness = new GardenBusiness();
const arduinoBusiness = new ArduinoBusiness();

interface GardenState {
  plantas: Plant[];
  sensorData: SensorData | null;
  alertas: string[];
  loading: boolean;
  error: string | null;
}

type GardenAction =
  | { type: 'CARREGAR_INICIO' }
  | { type: 'CARREGAR_SUCESSO'; plantas: Plant[]; sensorData: SensorData; alertas: string[] }
  | { type: 'CARREGAR_ERRO'; error: string }
  | { type: 'TOGGLE_FAVORITA'; id: string; valor: boolean };

const estadoInicial: GardenState = {
  plantas: [],
  sensorData: null,
  alertas: [],
  loading: true,
  error: null,
};
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
      const [dadosPlantas, dadosSensor] = await Promise.all([
        gardenBusiness.getPlants(),
        arduinoBusiness.getSensorData(),
      ]);
      const alertas = gardenBusiness.verificarAlertas(dadosPlantas, dadosSensor);
      dispatch({ type: 'CARREGAR_SUCESSO', plantas: dadosPlantas, sensorData: dadosSensor, alertas });
    } catch (e) {
      dispatch({ type: 'CARREGAR_ERRO', error: 'Erro ao carregar jardim. Tente novamente.' });
    }
  }

  async function toggleFavorita(id: string, valor: boolean) {
    await gardenBusiness.toggleFavorita(id, valor);
    dispatch({ type: 'TOGGLE_FAVORITA', id, valor });
  }

  const totalSaudaveis = state.plantas.filter((p) => p.statusSaude === 'saudavel').length;
  const totalAtencao = state.plantas.filter((p) => p.statusSaude === 'atencao').length;
  const totalCritico = state.plantas.filter((p) => p.statusSaude === 'critico').length;

  return {
    ...state,
    totalSaudaveis,
    totalAtencao,
    totalCritico,
    toggleFavorita,
    recarregar: carregarDados,
  };
}