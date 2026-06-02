import { useReducer, useCallback } from 'react';
import { TipoPlanta } from '../models/Plant';
import { GardenBusiness } from '../business/MyGardenBusiness';

const business = new GardenBusiness();

function dataHaMaisDias(dias: number): string {
  const d = new Date();
  d.setDate(d.getDate() - dias);
  return d.toISOString().split('T')[0];
}

export const OPCOES_ULTIMA_REGA = [
  { label: 'Hoje',      dias: 0 },
  { label: 'Ontem',     dias: 1 },
  { label: 'Há 3 dias', dias: 3 },
  { label: 'Há 1 sem.', dias: 7 },
];

interface Sugestoes {
  umidade: number;
  temperatura: { min: number; max: number };
  luminosidade: number;
}

interface State {
  nome: string;
  especie: string;
  tipo: TipoPlanta | '';
  limiteUmidade: string;
  limiteTemperatura: string;
  limiteLuminosidade: string;
  limiteAutoPreenchido: boolean;
  sugestoes: Sugestoes | null;
  observacoes: string;
  imagemUri: string | null;
  imagemBase64: string | null;
  ultimaRegaDias: number;
  modalVisivel: boolean;
  salvando: boolean;
  erro: string | null;
}

type Action =
  | { type: 'SET_NOME'; valor: string }
  | { type: 'SET_ESPECIE'; valor: string }
  | { type: 'SET_TIPO'; tipo: TipoPlanta; limiteUmidade: string; limiteTemperatura: string; limiteLuminosidade: string; sugestoes: Sugestoes }
  | { type: 'SET_LIMITE_UMIDADE'; valor: string }
  | { type: 'SET_LIMITE_TEMPERATURA'; valor: string }
  | { type: 'SET_LIMITE_LUMINOSIDADE'; valor: string }
  | { type: 'SET_OBSERVACOES'; valor: string }
  | { type: 'SET_IMAGEM'; uri: string; base64: string }
  | { type: 'REMOVER_IMAGEM' }
  | { type: 'SET_ULTIMA_REGA'; dias: number }
  | { type: 'TOGGLE_MODAL'; visivel: boolean }
  | { type: 'SALVAR_INICIO' }
  | { type: 'SALVAR_SUCESSO' }
  | { type: 'SALVAR_ERRO'; erro: string }
  | { type: 'SET_ERRO'; erro: string };

const estadoInicial: State = {
  nome: '',
  especie: '',
  tipo: '',
  limiteUmidade: '',
  limiteTemperatura: '',
  limiteLuminosidade: '',
  limiteAutoPreenchido: false,
  sugestoes: null,
  observacoes: '',
  imagemUri: null,
  imagemBase64: null,
  ultimaRegaDias: 0,
  modalVisivel: false,
  salvando: false,
  erro: null,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_NOME':
      return { ...state, nome: action.valor };
    case 'SET_ESPECIE':
      return { ...state, especie: action.valor };
    case 'SET_TIPO':
      return {
        ...state,
        tipo: action.tipo,
        limiteUmidade: action.limiteUmidade,
        limiteTemperatura: action.limiteTemperatura,
        limiteLuminosidade: action.limiteLuminosidade,
        limiteAutoPreenchido: true,
        sugestoes: action.sugestoes,
      };
    case 'SET_LIMITE_UMIDADE':
      return { ...state, limiteUmidade: action.valor, limiteAutoPreenchido: false };
    case 'SET_LIMITE_TEMPERATURA':
      return { ...state, limiteTemperatura: action.valor, limiteAutoPreenchido: false };
    case 'SET_LIMITE_LUMINOSIDADE':
      return { ...state, limiteLuminosidade: action.valor, limiteAutoPreenchido: false };
    case 'SET_OBSERVACOES':
      return { ...state, observacoes: action.valor };
    case 'SET_IMAGEM':
      return { ...state, imagemUri: action.uri, imagemBase64: action.base64 };
    case 'REMOVER_IMAGEM':
      return { ...state, imagemUri: null, imagemBase64: null };
    case 'SET_ULTIMA_REGA':
      return { ...state, ultimaRegaDias: action.dias };
    case 'TOGGLE_MODAL':
      return { ...state, modalVisivel: action.visivel };
    case 'SALVAR_INICIO':
      return { ...state, salvando: true, erro: null };
    case 'SALVAR_SUCESSO':
      return { ...state, salvando: false };
    case 'SALVAR_ERRO':
      return { ...state, salvando: false, erro: action.erro };
    case 'SET_ERRO':
      return { ...state, erro: action.erro };
    default:
      return state;
  }
}

export function useAddPlantViewModel() {
  const [state, dispatch] = useReducer(reducer, estadoInicial);

  const selecionarTipo = useCallback((tipo: TipoPlanta) => {
    const sugestoes = business.getSugestoesTipo(tipo);
    dispatch({
      type: 'SET_TIPO',
      tipo,
      limiteUmidade: String(sugestoes.umidade),
      limiteTemperatura: String(sugestoes.temperatura.max),
      limiteLuminosidade: String(sugestoes.luminosidade),
      sugestoes,
    });
  }, []);

  const salvar = useCallback(async (onSucesso: () => void) => {
    const {
      nome, especie, tipo,
      limiteUmidade, limiteTemperatura, limiteLuminosidade,
      observacoes, imagemBase64, ultimaRegaDias,
    } = state;

    if (!nome.trim()) { dispatch({ type: 'SET_ERRO', erro: 'Informe o nome da planta.' }); return; }
    if (!especie.trim()) { dispatch({ type: 'SET_ERRO', erro: 'Informe a espécie.' }); return; }
    if (!tipo) { dispatch({ type: 'SET_ERRO', erro: 'Selecione o tipo da planta.' }); return; }

    dispatch({ type: 'SALVAR_INICIO' });
    try {
      await business.cadastrarPlanta(
        {
          nome: nome.trim(),
          especie: especie.trim(),
          tipo: tipo as TipoPlanta,
          limiteUmidade: limiteUmidade ? Number(limiteUmidade) : business.getLimiteUmidadePadrao(tipo as TipoPlanta),
          limiteTemperatura: limiteTemperatura ? Number(limiteTemperatura) : undefined,
          limiteLuminosidade: limiteLuminosidade ? Number(limiteLuminosidade) : undefined,
          observacoes: observacoes.trim(),
          favorita: false,
        },
        imagemBase64 ?? undefined,
        dataHaMaisDias(ultimaRegaDias)
      );
      dispatch({ type: 'SALVAR_SUCESSO' });
      onSucesso();
    } catch (e: any) {
      const msg = e?.message ?? '';
      const erroFoto = msg.includes('storage') || msg.includes('unauthorized') || msg.includes('permission');
      dispatch({
        type: 'SALVAR_ERRO',
        erro: erroFoto
          ? 'Erro ao enviar foto. Verifique as regras do Firebase Storage (Console > Storage > Rules).'
          : `Erro ao adicionar planta: ${msg || 'Tente novamente.'}`,
      });
    }
  }, [state]);

  const formularioValido = state.nome.trim().length > 0 && state.especie.trim().length > 0 && !!state.tipo;

  return {
    ...state,
    formularioValido,
    selecionarTipo,
    setNome:              (valor: string) => dispatch({ type: 'SET_NOME', valor }),
    setEspecie:           (valor: string) => dispatch({ type: 'SET_ESPECIE', valor }),
    setLimiteUmidade:     (valor: string) => dispatch({ type: 'SET_LIMITE_UMIDADE', valor }),
    setLimiteTemperatura: (valor: string) => dispatch({ type: 'SET_LIMITE_TEMPERATURA', valor }),
    setLimiteLuminosidade:(valor: string) => dispatch({ type: 'SET_LIMITE_LUMINOSIDADE', valor }),
    setObservacoes:       (valor: string) => dispatch({ type: 'SET_OBSERVACOES', valor }),
    onFotoSelecionada:    (uri: string, base64: string) => dispatch({ type: 'SET_IMAGEM', uri, base64 }),
    removerImagem:        ()              => dispatch({ type: 'REMOVER_IMAGEM' }),
    setModalVisivel:      (visivel: boolean) => dispatch({ type: 'TOGGLE_MODAL', visivel }),
    setUltimaRegaDias:    (dias: number)  => dispatch({ type: 'SET_ULTIMA_REGA', dias }),
    salvar,
  };
}