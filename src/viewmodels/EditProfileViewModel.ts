import { useReducer, useCallback } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { EditProfileBusiness, RegraValidacao } from '../business/EditProfilebusiness';
import { PerfilUsuario } from '../models/User';

const editProfileBusiness = new EditProfileBusiness();

const LIMITE_BIO = 25;

interface EditProfileState {
  nome: string;
  pronomes: string;
  bio: string;
  fotoUri: string | undefined;
  salvando: boolean;
  erro: string | null;
  sucesso: boolean;
}

type EditProfileAction =
  | { type: 'SET_NOME'; valor: string }
  | { type: 'SET_PRONOMES'; valor: string }
  | { type: 'SET_BIO'; valor: string }
  | { type: 'SET_FOTO'; uri: string }
  | { type: 'SALVAR_INICIO' }
  | { type: 'SALVAR_SUCESSO' }
  | { type: 'SALVAR_ERRO'; erro: string };

function editProfileReducer(
  state: EditProfileState,
  action: EditProfileAction
): EditProfileState {
  switch (action.type) {
    case 'SET_NOME':
      return { ...state, nome: action.valor };
    case 'SET_PRONOMES':
      return { ...state, pronomes: action.valor };
    case 'SET_BIO':
      return { ...state, bio: action.valor.slice(0, LIMITE_BIO) };
    case 'SET_FOTO':
      return { ...state, fotoUri: action.uri };
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
    salvando: false,
    erro: null,
    sucesso: false,
  });

  const regrasNome: RegraValidacao[] = editProfileBusiness.validarNome(state.nome);
  const regrasPronomes: RegraValidacao[] = editProfileBusiness.validarPronomes(state.pronomes);
  const regrasBio: RegraValidacao[] = editProfileBusiness.validarBio(state.bio);

  const formularioValido = editProfileBusiness.formularioValido(
    state.nome,
    state.pronomes,
    state.bio
  );

  async function tirarFoto() {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      dispatch({ type: 'SALVAR_ERRO', erro: 'Permissão de câmera negada.' });
      return;
    }
    const resultado = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });
    if (!resultado.canceled) {
      dispatch({ type: 'SET_FOTO', uri: resultado.assets[0].uri });
    }
  }

  async function escolherDaGaleria() {
    const resultado = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });
    if (!resultado.canceled) {
      dispatch({ type: 'SET_FOTO', uri: resultado.assets[0].uri });
    }
  }

  async function salvar() {
    if (!formularioValido) {
      dispatch({ type: 'SALVAR_ERRO', erro: 'Corrija os campos antes de salvar.' });
      return;
    }

    dispatch({ type: 'SALVAR_INICIO' });
    try {
      if (state.fotoUri && state.fotoUri !== perfil.fotoURL) {
        await editProfileBusiness.uploadFoto(state.fotoUri);
      }
      await editProfileBusiness.salvarPerfil({
        nome: state.nome,
        pronomes: state.pronomes,
        bio: state.bio,
      });
      dispatch({ type: 'SALVAR_SUCESSO' });
    } catch (e: any) {
      dispatch({ type: 'SALVAR_ERRO', erro: e.message ?? 'Erro ao salvar.' });
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
    tirarFoto,
    escolherDaGaleria,
    salvar,
  };
}