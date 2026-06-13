import { useReducer, useCallback } from 'react';
import { Post } from '../models/Post';
import { Comentario } from '../models/Comentario';
import { PostDetailBusiness } from '../business/PostDetailBusiness';
import { useAuth } from '../context/AuthContext';

interface State {
  post: Post | null;
  loading: boolean;
  error: string | null;
  comentarios: Comentario[];
  loadingComentarios: boolean;
  enviando: boolean;
  textoComentario: string;
}

type Action =
  | { type: 'CARREGAR_INICIO' }
  | { type: 'CARREGAR_SUCESSO'; post: Post }
  | { type: 'CARREGAR_ERRO'; error: string }
  | { type: 'ATUALIZAR_CURTIDAS'; curtidas: string[] }
  | { type: 'COMENTARIOS_INICIO' }
  | { type: 'COMENTARIOS_SUCESSO'; comentarios: Comentario[] }
  | { type: 'SET_TEXTO'; texto: string }
  | { type: 'ENVIAR_INICIO' }
  | { type: 'ENVIAR_SUCESSO'; comentario: Comentario }
  | { type: 'ENVIAR_ERRO' };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'CARREGAR_INICIO':
      return { ...state, loading: true, error: null };
    case 'CARREGAR_SUCESSO':
      return { ...state, loading: false, post: action.post };
    case 'CARREGAR_ERRO':
      return { ...state, loading: false, error: action.error };
    case 'ATUALIZAR_CURTIDAS':
      return {
        ...state,
        post: state.post ? { ...state.post, curtidas: action.curtidas } : null,
      };
    case 'COMENTARIOS_INICIO':
      return { ...state, loadingComentarios: true };
    case 'COMENTARIOS_SUCESSO':
      return { ...state, loadingComentarios: false, comentarios: action.comentarios };
    case 'SET_TEXTO':
      return { ...state, textoComentario: action.texto };
    case 'ENVIAR_INICIO':
      return { ...state, enviando: true };
    case 'ENVIAR_SUCESSO':
      return {
        ...state,
        enviando: false,
        textoComentario: '',
        comentarios: [...state.comentarios, action.comentario],
        post: state.post
          ? { ...state.post, totalComentarios: (state.post.totalComentarios ?? 0) + 1 }
          : null,
      };
    case 'ENVIAR_ERRO':
      return { ...state, enviando: false };
    default:
      return state;
  }
}

const business = new PostDetailBusiness();

export function usePostDetailViewModel(postId: string) {
  const { usuario } = useAuth();
  const [state, dispatch] = useReducer(reducer, {
    post: null,
    loading: true,
    error: null,
    comentarios: [],
    loadingComentarios: true,
    enviando: false,
    textoComentario: '',
  });

  const carregarPost = useCallback(async () => {
    dispatch({ type: 'CARREGAR_INICIO' });
    try {
      const post = await business.getPost(postId);
      if (!post) {
        dispatch({ type: 'CARREGAR_ERRO', error: 'Post não encontrado.' });
        return;
      }
      dispatch({ type: 'CARREGAR_SUCESSO', post });
    } catch {
      dispatch({ type: 'CARREGAR_ERRO', error: 'Erro ao carregar o post.' });
    }
  }, [postId]);

  const carregarComentarios = useCallback(async () => {
    dispatch({ type: 'COMENTARIOS_INICIO' });
    try {
      const comentarios = await business.getComentarios(postId);
      dispatch({ type: 'COMENTARIOS_SUCESSO', comentarios });
    } catch (e) {
      console.error('[PostDetail] erro ao carregar comentários:', e);
      dispatch({ type: 'COMENTARIOS_SUCESSO', comentarios: [] });
    }
  }, [postId]);

  const toggleCurtida = useCallback(async () => {
    if (!state.post || !usuario) return;
    const uid = usuario.uid;
    const jaCurtiu = state.post.curtidas.includes(uid);
    const curtidasOriginais = state.post.curtidas;
    const novasCurtidas = jaCurtiu
      ? curtidasOriginais.filter((id) => id !== uid)
      : [...curtidasOriginais, uid];
    dispatch({ type: 'ATUALIZAR_CURTIDAS', curtidas: novasCurtidas });
    try {
      await business.toggleCurtida(state.post.id, uid, jaCurtiu);
    } catch {
      dispatch({ type: 'ATUALIZAR_CURTIDAS', curtidas: curtidasOriginais });
    }
  }, [state.post, usuario]);

  const deletarPost = useCallback(async () => {
    if (!state.post) return;
    await business.deletarPost(state.post.id);
  }, [state.post]);

  const enviarComentario = useCallback(async () => {
    if (!usuario || !state.textoComentario.trim() || state.enviando) return;
    const conteudo = state.textoComentario.trim();
    dispatch({ type: 'ENVIAR_INICIO' });
    try {
      await business.comentarPost(postId, usuario.uid, usuario.nome, usuario.fotoURL, conteudo);
      const novoComentario: Comentario = {
        id: Date.now().toString(),
        autorId: usuario.uid,
        autorNome: usuario.nome,
        autorFotoURL: usuario.fotoURL,
        conteudo,
        criadoEm: new Date(),
      };
      dispatch({ type: 'ENVIAR_SUCESSO', comentario: novoComentario });
    } catch {
      dispatch({ type: 'ENVIAR_ERRO' });
    }
  }, [state.textoComentario, state.enviando, usuario, postId]);

  const jaCurtiu = state.post && usuario
    ? state.post.curtidas.includes(usuario.uid)
    : false;

  const ehAutor = state.post && usuario
    ? state.post.autorId === usuario.uid
    : false;

  return {
    ...state,
    jaCurtiu,
    ehAutor,
    carregarPost,
    carregarComentarios,
    toggleCurtida,
    deletarPost,
    enviarComentario,
    setTextoComentario: (texto: string) => dispatch({ type: 'SET_TEXTO', texto }),
  };
}