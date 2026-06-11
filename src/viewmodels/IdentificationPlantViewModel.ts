import { useReducer, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { PlantaIdentificada } from "../models/IdentificationPlant";
import {
  identificarESalvarPlanta,
  buscarIdentificacoes,
  excluirIdentificacao,
} from "../business/IdentificationPlantBusiness";

type State = {
  processando: boolean;
  carregando: boolean;
  erro: string | null;
  identificacoes: PlantaIdentificada[];
};

type Action =
  | { type: "CARREGAR_INICIO" }
  | { type: "CARREGAR_SUCESSO"; payload: PlantaIdentificada[] }
  | { type: "PROCESSAR_INICIO" }
  | { type: "PROCESSAR_SUCESSO"; payload: PlantaIdentificada }
  | { type: "EXCLUIR"; payload: string }
  | { type: "ERRO"; payload: string };

const estadoInicial: State = {
  processando: false,
  carregando: false,
  erro: null,
  identificacoes: [],
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "CARREGAR_INICIO":
      return { ...state, carregando: true, erro: null };
    case "CARREGAR_SUCESSO":
      return { ...state, carregando: false, identificacoes: action.payload };
    case "PROCESSAR_INICIO":
      return { ...state, processando: true, erro: null };
    case "PROCESSAR_SUCESSO":
      return {
        ...state,
        processando: false,
        identificacoes: [action.payload, ...state.identificacoes],
      };
    case "EXCLUIR":
      return {
        ...state,
        identificacoes: state.identificacoes.filter(
          (i) => i.id !== action.payload,
        ),
      };
    case "ERRO":
      return {
        ...state,
        processando: false,
        carregando: false,
        erro: action.payload,
      };
    default:
      return state;
  }
}

export const identificationVM = () => {
  const [state, dispatch] = useReducer(reducer, estadoInicial);

  // Carrega as identificações do Firestore sempre que a tela recebe foco
  useFocusEffect(
    useCallback(() => {
      const carregar = async () => {
        dispatch({ type: "CARREGAR_INICIO" });
        try {
          const dados = await buscarIdentificacoes();
          dispatch({ type: "CARREGAR_SUCESSO", payload: dados });
        } catch (err: any) {
          dispatch({ type: "ERRO", payload: err.message });
        }
      };
      carregar();
    }, []),
  );

  // Identifica a planta via API e adiciona no topo da lista
  // localUri é a foto que o usuário tirou — usada como fallback se a API não retornar foto
  const processarIdentificacao = async (
    base64Input: string,
    localUri?: string,
  ) => {
    if (state.processando) return;
    dispatch({ type: "PROCESSAR_INICIO" });
    try {
      const planta = await identificarESalvarPlanta(base64Input, localUri);
      dispatch({ type: "PROCESSAR_SUCESSO", payload: planta });
    } catch (err: any) {
      dispatch({
        type: "ERRO",
        payload: err.message || "Erro na identificação.",
      });
    }
  };

  // Remove a identificação do Firestore e da lista local
  const deletarIdentificacao = async (id: string) => {
    try {
      await excluirIdentificacao(id);
      dispatch({ type: "EXCLUIR", payload: id });
    } catch (err: any) {
      dispatch({ type: "ERRO", payload: err.message });
    }
  };

  return {
    processando: state.processando,
    carregando: state.carregando,
    erro: state.erro,
    identificacoes: state.identificacoes,
    processarIdentificacao,
    deletarIdentificacao,
  };
};
