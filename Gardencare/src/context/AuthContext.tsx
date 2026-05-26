import React, { createContext, useContext, useReducer, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PerfilUsuario } from '../models/User';

const CHAVE_USUARIO = '@gardencare:usuario';
const CHAVE_LOGADO = '@gardencare:logado';

interface AuthState {
  usuario: PerfilUsuario | null;
  estaLogado: boolean;
  carregando: boolean;
}

type AuthAction =
  | { type: 'CARREGAR_INICIO' }
  | { type: 'LOGIN_SUCESSO'; usuario: PerfilUsuario }
  | { type: 'LOGOUT' }
  | { type: 'ATUALIZAR_PERFIL'; usuario: PerfilUsuario };

interface AuthContextType extends AuthState {
  login: (usuario: PerfilUsuario) => Promise<void>;
  logout: () => Promise<void>;
  atualizarPerfil: (usuario: PerfilUsuario) => Promise<void>;
}

const estadoInicial: AuthState = {
  usuario: null,
  estaLogado: false,
  carregando: true,
};
function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'CARREGAR_INICIO':
      return { ...state, carregando: true };

    case 'LOGIN_SUCESSO':
      return {
        ...state,
        usuario: action.usuario,
        estaLogado: true,
        carregando: false,
      };

    case 'LOGOUT':
      return {
        ...state,
        usuario: null,
        estaLogado: false,
        carregando: false,
      };

    case 'ATUALIZAR_PERFIL':
      return {
        ...state,
        usuario: action.usuario,
      };

    default:
      return state;
  }
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, estadoInicial);

  useEffect(() => {
    carregarSessao();
  }, []);

  async function carregarSessao() {
    dispatch({ type: 'CARREGAR_INICIO' });
    try {
      const logado = await AsyncStorage.getItem(CHAVE_LOGADO);
      const usuarioSalvo = await AsyncStorage.getItem(CHAVE_USUARIO);

      if (logado === 'true' && usuarioSalvo) {
        const usuario: PerfilUsuario = JSON.parse(usuarioSalvo);
        dispatch({ type: 'LOGIN_SUCESSO', usuario });
      } else {
        dispatch({ type: 'LOGOUT' });
      }
    } catch (e) {
      dispatch({ type: 'LOGOUT' });
    }
  }

  async function login(usuario: PerfilUsuario) {
    await AsyncStorage.setItem(CHAVE_LOGADO, 'true');
    await AsyncStorage.setItem(CHAVE_USUARIO, JSON.stringify(usuario));
    dispatch({ type: 'LOGIN_SUCESSO', usuario });
  }

  async function logout() {
    await AsyncStorage.removeItem(CHAVE_LOGADO);
    await AsyncStorage.removeItem(CHAVE_USUARIO);
    dispatch({ type: 'LOGOUT' });
  }

  async function atualizarPerfil(usuario: PerfilUsuario) {
    await AsyncStorage.setItem(CHAVE_USUARIO, JSON.stringify(usuario));
    dispatch({ type: 'ATUALIZAR_PERFIL', usuario });
  }

  return (
    <AuthContext.Provider value={{ ...state, login, logout, atualizarPerfil }}>
      {children}
    </AuthContext.Provider>
  );
}
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro do AuthProvider');
  }
  return context;
}