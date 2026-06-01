import { useReducer, useCallback } from 'react';
import { Post } from '../models/Post';
import { PostDetailBusiness } from '../business/PostDetailBusiness';
import { useAuth } from '../context/AuthContext';

interface State {
    post: Post | null;
    loading: boolean;
    error: string | null;
}

type Action =
    | { type: 'CARREGAR_INICIO' }
    | { type: 'CARREGAR_SUCESSO'; post: Post }
    | { type: 'CARREGAR_ERRO'; error: string }
    | { type: 'ATUALIZAR_CURTIDAS'; curtidas: string[] };

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
    const jaCurtiu = state.post && usuario
        ? state.post.curtidas.includes(usuario.uid)
        : false;
    return {
        ...state,
        jaCurtiu,
        carregarPost,
        toggleCurtida,
    };
}