import { useReducer, useEffect, useCallback } from 'react';
import { ProfileBusiness } from '../business/ProfileBusiness';
import { SensorLimitesBusiness, LimitesSensor, LIMITES_PADRAO } from '../business/SensorLimitesBusiness';
import { useAuth } from '../context/AuthContext';
import { useTheme, TipoTema } from '../context/Themecontext';

const profileBusiness = new ProfileBusiness();
const sensorLimitesBusiness = new SensorLimitesBusiness();

interface SettingsState {
  limites: LimitesSensor;
  salvandoLimites: boolean;
  erroLimites: string | null;
  sucessoLimites: boolean;
  excluindo: boolean;
  erro: string | null;
}

type SettingsAction =
  | { type: 'CARREGAR_LIMITES'; limites: LimitesSensor }
  | { type: 'SET_LIMITE'; campo: keyof LimitesSensor; valor: number }
  | { type: 'SALVAR_LIMITES_INICIO' }
  | { type: 'SALVAR_LIMITES_SUCESSO' }
  | { type: 'SALVAR_LIMITES_ERRO'; erro: string }
  | { type: 'EXCLUIR_INICIO' }
  | { type: 'EXCLUIR_ERRO'; erro: string };

const estadoInicial: SettingsState = {
  limites: LIMITES_PADRAO,
  salvandoLimites: false,
  erroLimites: null,
  sucessoLimites: false,
  excluindo: false,
  erro: null,
};

function settingsReducer(state: SettingsState, action: SettingsAction): SettingsState {
  switch (action.type) {
    case 'CARREGAR_LIMITES':
      return { ...state, limites: action.limites };

    case 'SET_LIMITE':
      return { ...state, limites: { ...state.limites, [action.campo]: action.valor } };

    case 'SALVAR_LIMITES_INICIO':
      return { ...state, salvandoLimites: true, erroLimites: null, sucessoLimites: false };

    case 'SALVAR_LIMITES_SUCESSO':
      return { ...state, salvandoLimites: false, sucessoLimites: true };

    case 'SALVAR_LIMITES_ERRO':
      return { ...state, salvandoLimites: false, erroLimites: action.erro };

    case 'EXCLUIR_INICIO':
      return { ...state, excluindo: true, erro: null };

    case 'EXCLUIR_ERRO':
      return { ...state, excluindo: false, erro: action.erro };

    default:
      return state;
  }
}

export function useSettingsViewModel() {
  const [state, dispatch] = useReducer(settingsReducer, estadoInicial);
  const { logout } = useAuth();
  const { tipoTema, mudarTema, estaEscuro } = useTheme();

  useEffect(() => {
    carregarLimites();
  }, []);

  async function carregarLimites() {
    const limites = await sensorLimitesBusiness.getLimites();
    dispatch({ type: 'CARREGAR_LIMITES', limites });
  }

  async function salvarLimites() {
    dispatch({ type: 'SALVAR_LIMITES_INICIO' });
    try {
      await sensorLimitesBusiness.salvarLimites(state.limites);
      dispatch({ type: 'SALVAR_LIMITES_SUCESSO' });
    } catch (e: any) {
      dispatch({ type: 'SALVAR_LIMITES_ERRO', erro: e.message ?? 'Erro ao salvar limites.' });
    }
  }

  async function excluirConta(senha: string) {
    dispatch({ type: 'EXCLUIR_INICIO' });
    try {
      await profileBusiness.reautenticar(senha);
      await profileBusiness.excluirConta();
      await logout();
    } catch (e: any) {
      const msg = (e.code === 'auth/invalid-credential' || e.code === 'auth/wrong-password')
        ? 'Senha incorreta. Tente novamente.'
        : e.message ?? 'Erro ao excluir conta.';
      dispatch({ type: 'EXCLUIR_ERRO', erro: msg });
    }
  }

  function setLimite(campo: keyof LimitesSensor, valor: number) {
    dispatch({ type: 'SET_LIMITE', campo, valor });
  }

  return {
    ...state,
    tipoTema,
    estaEscuro,
    mudarTema,
    logout,
    salvarLimites,
    excluirConta,
    setLimite,
  };
}