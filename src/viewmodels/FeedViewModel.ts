import { useReducer, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { FeedBusiness } from '../business/FeedBusiness';
import { Post } from '../models/Post';
import { Comentario } from '../models/Comentario';
import { useAuth } from '../context/AuthContext';

const feedBusiness = new FeedBusiness();

interface FeedState {
  posts: Post[];
  carregando: boolean;
  erro: string | null;
  enviando: boolean;
  comentarios: Record<string, Comentario[]>;
  carregandoComentarios: Record<string, boolean>;
}

type FeedAction =
  | { type: 'CARREGAR_INICIO' }
  | { type: 'CARREGAR_SUCESSO'; posts: Post[] }
  | { type: 'CARREGAR_ERRO'; erro: string }
  | { type: 'ENVIAR_INICIO' }
  | { type: 'ENVIAR_FIM' }
  | { type: 'ENVIAR_ERRO'; erro: string }
  | { type: 'COMENTARIOS_INICIO'; postId: string }
  | { type: 'COMENTARIOS_SUCESSO'; postId: string; comentarios: Comentario[] }
  | { type: 'COMENTARIOS_ERRO'; postId: string };

const estadoInicial: FeedState = {
  posts: [],
  carregando: false,
  erro: null,
  enviando: false,
  comentarios: {},
  carregandoComentarios: {},
};

function feedReducer(state: FeedState, action: FeedAction): FeedState {
  switch (action.type) {
    case 'CARREGAR_INICIO':
      return { ...state, carregando: true, erro: null };
    case 'CARREGAR_SUCESSO':
      return { ...state, carregando: false, posts: action.posts };
    case 'CARREGAR_ERRO':
      return { ...state, carregando: false, erro: action.erro };
    case 'ENVIAR_INICIO':
      return { ...state, enviando: true, erro: null };
    case 'ENVIAR_FIM':
      return { ...state, enviando: false };
    case 'ENVIAR_ERRO':
      return { ...state, enviando: false, erro: action.erro };
    case 'COMENTARIOS_INICIO':
      return {
        ...state,
        carregandoComentarios: { ...state.carregandoComentarios, [action.postId]: true },
      };
    case 'COMENTARIOS_SUCESSO':
      return {
        ...state,
        carregandoComentarios: { ...state.carregandoComentarios, [action.postId]: false },
        comentarios: { ...state.comentarios, [action.postId]: action.comentarios },
      };
    case 'COMENTARIOS_ERRO':
      return {
        ...state,
        carregandoComentarios: { ...state.carregandoComentarios, [action.postId]: false },
      };
    default:
      return state;
  }
}

export function useFeedViewModel() {
  const [state, dispatch] = useReducer(feedReducer, estadoInicial);
  const { usuario } = useAuth();
  const uid = usuario?.uid ?? '';
  const autorNome = usuario?.nome ?? '';
  const autorFotoURL = usuario?.fotoURL;

  useFocusEffect(
    useCallback(() => {
      carregarPosts();
    }, [])
  );

  async function carregarPosts() {
    dispatch({ type: 'CARREGAR_INICIO' });
    try {
      const posts = await feedBusiness.getPosts();
      dispatch({ type: 'CARREGAR_SUCESSO', posts });
    } catch {
      dispatch({ type: 'CARREGAR_ERRO', erro: 'Não foi possível carregar o feed.' });
    }
  }

  async function publicar(conteudo: string, imagemUri?: string) {
    if (!conteudo.trim()) return;
    dispatch({ type: 'ENVIAR_INICIO' });
    try {
      await feedBusiness.criarPost(uid, autorNome, autorFotoURL, conteudo, imagemUri);
      await carregarPosts();
    } catch {
      dispatch({ type: 'ENVIAR_ERRO', erro: 'Erro ao publicar. Tente novamente.' });
    } finally {
      dispatch({ type: 'ENVIAR_FIM' });
    }
  }

  async function toggleCurtida(post: Post) {
    const jaCurtiu = post.curtidas.includes(uid);
    try {
      if (jaCurtiu) {
        await feedBusiness.descurtirPost(post.id, uid);
      } else {
        await feedBusiness.curtirPost(post.id, uid);
      }
      await carregarPosts();
    } catch {
      dispatch({ type: 'CARREGAR_ERRO', erro: 'Erro ao curtir. Tente novamente.' });
    }
  }

  async function carregarComentarios(postId: string) {
    dispatch({ type: 'COMENTARIOS_INICIO', postId });
    try {
      const comentarios = await feedBusiness.getComentarios(postId);
      dispatch({ type: 'COMENTARIOS_SUCESSO', postId, comentarios });
    } catch {
      dispatch({ type: 'COMENTARIOS_ERRO', postId });
    }
  }

  async function comentar(postId: string, conteudo: string) {
    if (!conteudo.trim()) return;
    try {
      await feedBusiness.comentarPost(postId, uid, autorNome, autorFotoURL, conteudo);
      await Promise.all([carregarComentarios(postId), carregarPosts()]);
    } catch {
      dispatch({ type: 'CARREGAR_ERRO', erro: 'Erro ao comentar. Tente novamente.' });
    }
  }

  return { ...state, uid, carregarPosts, publicar, toggleCurtida, carregarComentarios, comentar };
}