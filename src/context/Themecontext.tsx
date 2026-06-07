import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TEMA_CLARO, TEMA_ESCURO, Cores } from '../styles/ThemeStyles';

const CHAVE_TEMA = '@gardencare:tema';

export type TipoTema = 'claro' | 'escuro' | 'auto';

interface ThemeState {
  tipoTema: TipoTema;
  temaAtivo: 'claro' | 'escuro';
  cores: Cores;
  carregando: boolean;
}

type ThemeAction =
  | { type: 'CARREGAR_TEMA'; tipoTema: TipoTema; temaAtivo: 'claro' | 'escuro' }
  | { type: 'MUDAR_TEMA'; tipoTema: TipoTema; temaAtivo: 'claro' | 'escuro' };

interface ThemeContextType extends ThemeState {
  mudarTema: (tipo: TipoTema) => Promise<void>;
  estaEscuro: boolean;
}
function themeReducer(state: ThemeState, action: ThemeAction): ThemeState {
  switch (action.type) {
    case 'CARREGAR_TEMA':
    case 'MUDAR_TEMA':
      return {
        ...state,
        tipoTema: action.tipoTema,
        temaAtivo: action.temaAtivo,
        cores: action.temaAtivo === 'escuro' ? TEMA_ESCURO : TEMA_CLARO,
        carregando: false,
      };
    default:
      return state;
  }
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const sistemaTema = useColorScheme(); 

  const [state, dispatch] = useReducer(themeReducer, {
    tipoTema: 'auto',
    temaAtivo: sistemaTema === 'dark' ? 'escuro' : 'claro',
    cores: sistemaTema === 'dark' ? TEMA_ESCURO : TEMA_CLARO,
    carregando: true,
  });

  useEffect(() => {
    carregarTema();
  }, []);

  useEffect(() => {
    if (state.tipoTema === 'auto') {
      const temaAtivo = sistemaTema === 'dark' ? 'escuro' : 'claro';
      dispatch({ type: 'MUDAR_TEMA', tipoTema: 'auto', temaAtivo });
    }
  }, [sistemaTema]);

  async function carregarTema() {
    try {
      const temaSalvo = await AsyncStorage.getItem(CHAVE_TEMA) as TipoTema | null;
      const tipo = temaSalvo ?? 'auto';
      const temaAtivo = resolverTema(tipo);
      dispatch({ type: 'CARREGAR_TEMA', tipoTema: tipo, temaAtivo });
    } catch {
      dispatch({ type: 'CARREGAR_TEMA', tipoTema: 'auto', temaAtivo: 'claro' });
    }
  }

  function resolverTema(tipo: TipoTema): 'claro' | 'escuro' {
    if (tipo === 'auto') return sistemaTema === 'dark' ? 'escuro' : 'claro';
    return tipo;
  }

  async function mudarTema(tipo: TipoTema) {
    await AsyncStorage.setItem(CHAVE_TEMA, tipo);
    const temaAtivo = resolverTema(tipo);
    dispatch({ type: 'MUDAR_TEMA', tipoTema: tipo, temaAtivo });
  }

  return (
    <ThemeContext.Provider value={{
      ...state,
      mudarTema,
      estaEscuro: state.temaAtivo === 'escuro',
    }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme deve ser usado dentro do ThemeProvider');
  }
  return context;
}