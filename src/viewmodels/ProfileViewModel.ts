import { useReducer, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { PerfilUsuario } from '../models/User';
import { Plant } from '../models/Plant';
import { ProfileBusiness } from '../business/ProfileBusiness';
import { GardenBusiness } from '../business/MyGardenBusiness';
import { NotificacaoBusiness, PreferenciasNotificacao } from '../business/NotificacaoBusiness';
import { useAuth } from '../context/AuthContext';

const profileBusiness = new ProfileBusiness();
const gardenBusiness = new GardenBusiness();
const notificacaoBusiness = new NotificacaoBusiness();

interface ProfileState {
  perfil: PerfilUsuario | null;
  plantas: Plant[];
  totalPosts: number;
  totalSeguidores: number;
  notificacoes: PreferenciasNotificacao;
  loading: boolean;
  error: string | null;
}

type ProfileAction =
  | { type: 'CARREGAR_INICIO' }
  | {
      type: 'CARREGAR_SUCESSO';
      perfil: PerfilUsuario;
      plantas: Plant[];
      notificacoes: PreferenciasNotificacao;
    }
  | { type: 'CARREGAR_ERRO'; error: string }
  | { type: 'TOGGLE_FAVORITA'; id: string; valor: boolean }
  | { type: 'ALTERAR_NOTIFICACAO'; chave: keyof PreferenciasNotificacao; valor: boolean };

const estadoInicial: ProfileState = {
  perfil: null,
  plantas: [],
  totalPosts: 0,
  totalSeguidores: 0,
  notificacoes: {
    lembreteDeRega: true,
    alertasSensor: true,
    novosPosts: false,
  },
  loading: true,
  error: null,
};

function profileReducer(state: ProfileState, action: ProfileAction): ProfileState {
  switch (action.type) {
    case 'CARREGAR_INICIO':
      return { ...state, loading: true, error: null };

    case 'CARREGAR_SUCESSO':
      return {
        ...state,
        loading: false,
        perfil: action.perfil,
        plantas: action.plantas,
        notificacoes: action.notificacoes,
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

    case 'ALTERAR_NOTIFICACAO':
      return {
        ...state,
        notificacoes: { ...state.notificacoes, [action.chave]: action.valor },
      };

    default:
      return state;
  }
}

export function useProfileViewModel() {
  const [state, dispatch] = useReducer(profileReducer, estadoInicial);
  const { usuario, login, logout } = useAuth();

  useFocusEffect(
    useCallback(() => {
      carregarPerfil();
    }, [])
  );

  async function carregarPerfil() {
    dispatch({ type: 'CARREGAR_INICIO' });
    try {
      const uid = usuario?.uid;

      if (!uid) {
        dispatch({ type: 'CARREGAR_ERRO', error: 'Usuário não autenticado.' });
        return;
      }

      const [dadosPerfil, dadosPlantas, dadosNotificacoes] = await Promise.all([
        profileBusiness.getPerfil(),
        gardenBusiness.getPlants(),
        notificacaoBusiness.getPreferencias(uid),
      ]);

      dispatch({
        type: 'CARREGAR_SUCESSO',
        perfil: dadosPerfil,
        plantas: dadosPlantas,
        notificacoes: dadosNotificacoes,
      });
    } catch (e: any) {
      dispatch({
        type: 'CARREGAR_ERRO',
        error: e.message ?? 'Erro ao carregar perfil. Tente novamente.',
      });
    }
  }

  async function toggleFavorita(id: string, valor: boolean) {
    await gardenBusiness.toggleFavorita(id, valor);
    dispatch({ type: 'TOGGLE_FAVORITA', id, valor });
  }

  async function alterarNotificacao(
    chave: keyof PreferenciasNotificacao,
    valor: boolean
  ) {
    dispatch({ type: 'ALTERAR_NOTIFICACAO', chave, valor });
    const uid = usuario?.uid;
    if (uid) {
      await notificacaoBusiness.salvarPreferencias(uid, {
        ...state.notificacoes,
        [chave]: valor,
      });
    }
  }

  const plantasFavoritas = state.plantas.filter((p) => p.favorita);
  const totalPlantas = state.plantas.length;

  return {
    ...state,
    totalPlantas,
    plantasFavoritas,
    toggleFavorita,
    alterarNotificacao,
    recarregar: carregarPerfil,
  };
}