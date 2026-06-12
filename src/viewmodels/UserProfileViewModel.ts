import { useReducer, useCallback } from 'react';
import { useNavigation, useRoute, RouteProp, useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { FeedRepository } from '../repository/FeedRepository';
import { ProfileBusiness } from '../business/ProfileBusiness';
import { GardenBusiness } from '../business/MyGardenBusiness';
import { FollowBusiness } from '../business/FollowBusiness';
import { PerfilUsuario } from '../models/User';
import { Post } from '../models/Post';
import { Plant } from '../models/Plant';
import { AppStackParamList } from '../navigation/AppNavigator';
import { useAuth } from '../context/AuthContext';

type Nav = NativeStackNavigationProp<AppStackParamList>;
type RouteP = RouteProp<AppStackParamList, 'UserProfile'>;

const feedRepository = new FeedRepository();
const profileBusiness = new ProfileBusiness();
const gardenBusiness = new GardenBusiness();

type State = {
  perfil: PerfilUsuario | null;
  posts: Post[];
  plantasFavoritas: Plant[];
  estaSeguindo: boolean;
  totalSeguidores: number;
  totalSeguindo: number;
  loading: boolean;
  seguindoLoading: boolean;
  erro: string | null;
};

type Action =
  | { type: 'INICIO' }
  | { type: 'SUCESSO'; perfil: PerfilUsuario; posts: Post[]; plantasFavoritas: Plant[]; estaSeguindo: boolean; totalSeguidores: number; totalSeguindo: number }
  | { type: 'ERRO'; erro: string }
  | { type: 'SEGUIR_INICIO' }
  | { type: 'SEGUIR_SUCESSO'; estaSeguindo: boolean; totalSeguidores: number };

const estadoInicial: State = {
  perfil: null,
  posts: [],
  plantasFavoritas: [],
  estaSeguindo: false,
  totalSeguidores: 0,
  totalSeguindo: 0,
  loading: true,
  seguindoLoading: false,
  erro: null,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'INICIO':
      return { ...state, loading: true, erro: null };
    case 'SUCESSO':
      return {
        ...state, loading: false,
        perfil: action.perfil,
        posts: action.posts,
        plantasFavoritas: action.plantasFavoritas,
        estaSeguindo: action.estaSeguindo,
        totalSeguidores: action.totalSeguidores,
        totalSeguindo: action.totalSeguindo,
      };
    case 'ERRO':
      return { ...state, loading: false, erro: action.erro };
    case 'SEGUIR_INICIO':
      return { ...state, seguindoLoading: true };
    case 'SEGUIR_SUCESSO':
      return { ...state, seguindoLoading: false, estaSeguindo: action.estaSeguindo, totalSeguidores: action.totalSeguidores };
    default:
      return state;
  }
}

export function useUserProfileViewModel() {
  const navigation = useNavigation<Nav>();
  const route = useRoute<RouteP>();
  const { usuario } = useAuth();
  const [state, dispatch] = useReducer(reducer, estadoInicial);

  const { uid } = route.params;
  const ehProprioPerfil = uid === usuario?.uid;

  useFocusEffect(
    useCallback(() => {
      carregar();
    }, [uid])
  );

  async function carregar() {
    dispatch({ type: 'INICIO' });
    try {
      const [perfil, posts, plantasFavoritas, seguindo, totalSeguidores, totalSeguindo] = await Promise.all([
        profileBusiness.buscarPerfilPorUid(uid),
        feedRepository.getPostsByUser(uid),
        gardenBusiness.getPlantasFavoritasPorUid(uid),
        FollowBusiness.estaSeguindo(uid),
        FollowBusiness.contarSeguidores(uid),
        FollowBusiness.contarSeguindo(uid),
      ]);
      if (!perfil) throw new Error('Perfil não encontrado.');
      dispatch({ type: 'SUCESSO', perfil, posts, plantasFavoritas, estaSeguindo: seguindo, totalSeguidores, totalSeguindo });
    } catch (e: any) {
      dispatch({ type: 'ERRO', erro: e.message ?? 'Erro ao carregar perfil.' });
    }
  }

  async function toggleSeguir() {
    dispatch({ type: 'SEGUIR_INICIO' });
    try {
      if (state.estaSeguindo) {
        await FollowBusiness.deixarDeSeguir(uid);
      } else {
        await FollowBusiness.seguir(uid);
      }
      const novoStatus = !state.estaSeguindo;
      const novoTotal = state.totalSeguidores + (novoStatus ? 1 : -1);
      dispatch({ type: 'SEGUIR_SUCESSO', estaSeguindo: novoStatus, totalSeguidores: novoTotal });
    } catch {
      dispatch({ type: 'SEGUIR_SUCESSO', estaSeguindo: state.estaSeguindo, totalSeguidores: state.totalSeguidores });
    }
  }

  return {
    perfil: state.perfil,
    posts: state.posts,
    plantasFavoritas: state.plantasFavoritas,
    estaSeguindo: state.estaSeguindo,
    totalSeguidores: state.totalSeguidores,
    totalSeguindo: state.totalSeguindo,
    totalPosts: state.posts.length,
    loading: state.loading,
    seguindoLoading: state.seguindoLoading,
    erro: state.erro,
    ehProprioPerfil,
    uid,
    toggleSeguir,
    voltar: () => navigation.goBack(),
    irParaFollowList: (tipo: 'seguidores' | 'seguindo') => navigation.navigate('FollowList', { tipo, uid }),
  };
}