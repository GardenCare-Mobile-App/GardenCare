import { useReducer, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { PerfilUsuario } from '../models/User';
import { Plant } from '../models/Plant';
import { Post } from '../models/Post';
import { ProfileBusiness } from '../business/ProfileBusiness';
import { GardenBusiness } from '../business/MyGardenBusiness';
import { FeedRepository } from '../repository/FeedRepository';
import { NotificacaoBusiness, PreferenciasNotificacao } from '../business/NotificacaoBusiness';
import { useAuth } from '../context/AuthContext';
import { FollowBusiness } from '../business/FollowBusiness';

const profileBusiness = new ProfileBusiness();
const gardenBusiness = new GardenBusiness();
const feedRepository = new FeedRepository();
const notificacaoBusiness = new NotificacaoBusiness();

interface ProfileState {
  perfil: PerfilUsuario | null;
  plantas: Plant[];
  posts: Post[];
  totalSeguidores: number;
  totalSeguindo: number;
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
      posts: Post[];
      notificacoes: PreferenciasNotificacao;
      totalSeguidores: number;
      totalSeguindo: number;
    }
  | { type: 'CARREGAR_ERRO'; error: string }
  | { type: 'TOGGLE_FAVORITA'; id: string; valor: boolean }
  | { type: 'ALTERAR_NOTIFICACAO'; chave: keyof PreferenciasNotificacao; valor: boolean };

const estadoInicial: ProfileState = {
  perfil: null,
  plantas: [],
  posts: [],
  totalSeguidores: 0,
  totalSeguindo: 0,
  notificacoes: {
    alertasSensor: true,
    rotinas: true,
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
        posts: action.posts,
        notificacoes: action.notificacoes,
        totalSeguidores: action.totalSeguidores,
        totalSeguindo: action.totalSeguindo,
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
  const { usuario, login, logout, atualizarPerfil } = useAuth();

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

      const [dadosPerfil, dadosPlantas, dadosPosts, dadosNotificacoes, totalSeguidores, totalSeguindo] = await Promise.all([
        profileBusiness.getPerfil(),
        gardenBusiness.getPlants(),
        feedRepository.getPostsByUser(uid),
        notificacaoBusiness.getPreferencias(uid),
        FollowBusiness.contarSeguidores(uid),
        FollowBusiness.contarSeguindo(uid),
      ]);

      dispatch({
        type: 'CARREGAR_SUCESSO',
        perfil: dadosPerfil,
        plantas: dadosPlantas,
        posts: dadosPosts,
        notificacoes: dadosNotificacoes,
        totalSeguidores,
        totalSeguindo,
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

  async function atualizarFoto(base64: string) {
    const novaUrl = await profileBusiness.atualizarFoto(base64);
    if (state.perfil) {
      const perfilAtualizado = { ...state.perfil, fotoURL: novaUrl };
      await atualizarPerfil(perfilAtualizado);
      await feedRepository.atualizarFotoAutor(state.perfil.uid, novaUrl);
      dispatch({ type: 'CARREGAR_SUCESSO', perfil: perfilAtualizado, plantas: state.plantas, posts: state.posts, notificacoes: state.notificacoes, totalSeguidores: state.totalSeguidores, totalSeguindo: state.totalSeguindo });
    }
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
  const totalPosts = state.posts.length;

  return {
    ...state,
    totalPlantas,
    totalPosts,
    plantasFavoritas,
    toggleFavorita,
    alterarNotificacao,
    atualizarFoto,
    recarregar: carregarPerfil,
  };
}