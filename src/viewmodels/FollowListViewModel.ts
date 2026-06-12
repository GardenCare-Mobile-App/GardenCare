import { useReducer, useCallback, useEffect } from "react";
import {
  useNavigation,
  useRoute,
  RouteProp,
  useFocusEffect,
  CommonActions,
} from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { FollowBusiness } from "../business/FollowBusiness";
import { PerfilUsuario } from "../models/User";
import { AppStackParamList } from "../navigation/AppNavigator";
import { useAuth } from "../context/AuthContext";

type Nav = NativeStackNavigationProp<AppStackParamList>;
type RouteP = RouteProp<AppStackParamList, "FollowList">;

type State = {
  lista: PerfilUsuario[];
  loading: boolean;
  erro: string | null;
  searchText: string;
  searchResultados: PerfilUsuario[];
  buscando: boolean;
};

type Action =
  | { type: "INICIO" }
  | { type: "SUCESSO"; lista: PerfilUsuario[] }
  | { type: "ERRO"; erro: string }
  | { type: "SET_SEARCH"; texto: string }
  | { type: "BUSCA_INICIO" }
  | { type: "BUSCA_SUCESSO"; resultados: PerfilUsuario[] };

const estadoInicial: State = {
  lista: [],
  loading: true,
  erro: null,
  searchText: "",
  searchResultados: [],
  buscando: false,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "INICIO":
      return { ...state, loading: true, erro: null };
    case "SUCESSO":
      return { ...state, loading: false, lista: action.lista };
    case "ERRO":
      return { ...state, loading: false, erro: action.erro };
    case "SET_SEARCH":
      return {
        ...state,
        searchText: action.texto,
        searchResultados: action.texto === "" ? [] : state.searchResultados,
        buscando: action.texto === "" ? false : state.buscando,
      };
    case "BUSCA_INICIO":
      return { ...state, buscando: true };
    case "BUSCA_SUCESSO":
      return { ...state, buscando: false, searchResultados: action.resultados };
    default:
      return state;
  }
}

export function useFollowListViewModel() {
  const navigation = useNavigation<Nav>();
  const route = useRoute<RouteP>();
  const { usuario } = useAuth();
  const [state, dispatch] = useReducer(reducer, estadoInicial);

  const { tipo, uid } = route.params;
  const targetUid = uid ?? usuario?.uid;

  useFocusEffect(
    useCallback(() => {
      dispatch({ type: "SET_SEARCH", texto: "" });
      carregar();
    }, [tipo, uid]),
  );

  useEffect(() => {
    if (!state.searchText.trim()) return;
    const texto = state.searchText.toLowerCase().trim();
    const resultados = state.lista.filter((u) =>
      u.nome.toLowerCase().includes(texto),
    );
    dispatch({ type: "BUSCA_SUCESSO", resultados });
  }, [state.searchText, state.lista]);

  async function carregar() {
    if (!targetUid) return;
    dispatch({ type: "INICIO" });
    try {
      const lista =
        tipo === "seguidores"
          ? await FollowBusiness.getSeguidores(targetUid)
          : await FollowBusiness.getSeguindo(targetUid);
      dispatch({ type: "SUCESSO", lista });
    } catch {
      dispatch({ type: "ERRO", erro: "Não foi possível carregar a lista." });
    }
  }

  const estaBuscando = state.searchText.trim().length > 0;

  return {
    lista: estaBuscando ? state.searchResultados : state.lista,
    loading: state.loading,
    buscando: state.buscando,
    erro: state.erro,
    searchText: state.searchText,
    estaBuscando,
    titulo: tipo === "seguidores" ? "Seguidores" : "Seguindo",
    setSearchText: (texto: string) => dispatch({ type: "SET_SEARCH", texto }),
    irParaPerfil: (uid: string) => {
      if (uid === usuario?.uid) {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [
              {
                name: "MainTabs",
                state: {
                  index: 3,
                  routes: [
                    { name: "Feed" },
                    { name: "MyGarden" },
                    { name: "Rotina" },
                    { name: "Profile" },
                  ],
                },
              },
            ],
          }),
        );
      } else {
        navigation.navigate("UserProfile", { uid });
      }
    },
    voltar: () => navigation.goBack(),
  };
}