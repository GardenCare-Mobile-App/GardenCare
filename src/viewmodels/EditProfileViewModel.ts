import { useReducer } from 'react';
import { EditProfileBusiness, RegraValidacao } from '../business/EditProfilebusiness';
import { PerfilUsuario } from '../models/User';
import { verificarPermissoesParaFoto } from '../utils/PermissionUtils';
import { FeedRepository } from '../repository/FeedRepository';

const editProfileBusiness = new EditProfileBusiness();
const feedRepository = new FeedRepository();

const LIMITE_BIO = 25;

interface EditProfileState {
  nome: string;
  pronomes: string;
  bio: string;
  fotoUri: string | undefined;
  fotoBase64: string | undefined;
  modalVisivel: boolean;
  salvando: boolean;
  erro: string | null;
  sucesso: boolean;
  nomeTocado: boolean;
  pronomesTocado: boolean;
  bioTocado: boolean;
}

type EditProfileAction =
  | { type: 'SET_NOME'; valor: string }
  | { type: 'SET_PRONOMES'; valor: string }
  | { type: 'SET_BIO'; valor: string }
  | { type: 'SET_FOTO'; uri: string; base64: string }
  | { type: 'ABRIR_MODAL' }
  | { type: 'FECHAR_MODAL' }
  | { type: 'SALVAR_INICIO' }
  | { type: 'SALVAR_SUCESSO' }
  | { type: 'SALVAR_ERRO'; erro: string };

function editProfileReducer(
  state: EditProfileState,
  action: EditProfileAction
): EditProfileState {
  switch (action.type) {
    case 'SET_NOME':
      return { ...state, nome: action.valor, nomeTocado: true };
    case 'SET_PRONOMES':
      return { ...state, pronomes: action.valor, pronomesTocado: true };
    case 'SET_BIO':
      return { ...state, bio: action.valor.replace(/['"]/g, '').slice(0, LIMITE_BIO), bioTocado: true };
    case 'SET_FOTO':
      return { ...state, fotoUri: action.uri, fotoBase64: action.base64 };
    case 'ABRIR_MODAL':
      return { ...state, modalVisivel: true };
    case 'FECHAR_MODAL':
      return { ...state, modalVisivel: false };
    case 'SALVAR_INICIO':
      return { ...state, salvando: true, erro: null, sucesso: false };
    case 'SALVAR_SUCESSO':
      return { ...state, salvando: false, sucesso: true };
    case 'SALVAR_ERRO':
      return { ...state, salvando: false, erro: action.erro };
    default:
      return state;
  }
}

export function useEditProfileViewModel(perfil: PerfilUsuario) {
  const [state, dispatch] = useReducer(editProfileReducer, {
    nome: perfil.nome,
    pronomes: perfil.pronomes,
    bio: perfil.bio ?? '',
    fotoUri: perfil.fotoURL,
    fotoBase64: undefined,
    modalVisivel: false,
    salvando: false,
    erro: null,
    sucesso: false,
    nomeTocado: false,
    pronomesTocado: false,
    bioTocado: false,
  });

  const regrasNome: RegraValidacao[] = editProfileBusiness.validarNome(state.nome);
  const regrasPronomes: RegraValidacao[] = editProfileBusiness.validarPronomes(state.pronomes);
  const regrasBio: RegraValidacao[] = editProfileBusiness.validarBio(state.bio);

  const formularioValido = editProfileBusiness.formularioValido(
    state.nome,
    state.pronomes,
    state.bio
  );

  function onFotoSelecionada(uri: string, base64: string) {
    dispatch({ type: 'SET_FOTO', uri, base64 });
  }

  async function salvar() {
    if (!formularioValido) {
      dispatch({ type: 'SALVAR_ERRO', erro: 'Corrija os campos antes de salvar.' });
      return;
    }
    dispatch({ type: 'SALVAR_INICIO' });
    try {
      if (state.fotoBase64) {
        const novaFotoURL = await editProfileBusiness.uploadFoto(state.fotoBase64);
        await feedRepository.atualizarFotoAutor(perfil.uid, novaFotoURL);
      }
      await editProfileBusiness.salvarPerfil({
        nome: state.nome,
        pronomes: state.pronomes,
        bio: state.bio,
      });
      if (state.nome.trim() !== perfil.nome.trim()) {
        await feedRepository.atualizarNomeAutor(perfil.uid, state.nome.trim());
      }
      dispatch({ type: 'SALVAR_SUCESSO' });
    } catch (e: any) {
      dispatch({ type: 'SALVAR_ERRO', erro: e.message ?? 'Erro ao salvar.' });
    }
  }

  async function abrirModal() {
    const temPermissao = await verificarPermissoesParaFoto();
    if (temPermissao) {
      dispatch({ type: 'ABRIR_MODAL' });
    }
  }

  return {
    ...state,
    limiteBio: LIMITE_BIO,
    regrasNome,
    regrasPronomes,
    regrasBio,
    formularioValido,
    setNome: (valor: string) => dispatch({ type: 'SET_NOME', valor }),
    setPronomes: (valor: string) => dispatch({ type: 'SET_PRONOMES', valor }),
    setBio: (valor: string) => dispatch({ type: 'SET_BIO', valor }),
    abrirModal,
    fecharModal: () => dispatch({ type: 'FECHAR_MODAL' }),
    onFotoSelecionada,
    salvar,
  };
}