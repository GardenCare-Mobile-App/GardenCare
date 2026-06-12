import { useReducer } from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthBusiness, mapFirebaseError } from "../../business/auth/AuthBussines";
import { useAuth } from "../../context/AuthContext";
import { AuthStackParamList } from "../../navigation/AppNavigator";
type AuthNav = NativeStackNavigationProp<AuthStackParamList>;

type State = {
    email: string;
    senha: string;
    senhaVisivel: boolean;
    loading: boolean;
    erro: string | null;
};

type Action =
    | { type: "SET_EMAIL"; payload: string }
    | { type: "SET_SENHA"; payload: string }
    | { type: "TOGGLE_SENHA_VISIVEL" }
    | { type: "INICIO" }
    | { type: "SUCESSO" }
    | { type: "ERRO"; payload: string }
    | { type: "RESETAR" };
    
const estadoInicial: State = {
    email: "",
    senha: "",
    senhaVisivel: false,
    loading: false,
    erro: null,
};


function reducer(state: State, action: Action): State {
    switch (action.type) {
        case "SET_EMAIL":
            return { ...state, email: action.payload };
        case "SET_SENHA":
            return { ...state, senha: action.payload };
        case "TOGGLE_SENHA_VISIVEL":
            // Inverte o valor booleano atual
            return { ...state, senhaVisivel: !state.senhaVisivel };
        case "INICIO":
            return { ...state, loading: true, erro: null };
        case "SUCESSO":
            return { ...state, loading: false };
        case "ERRO":
            return { ...state, loading: false, erro: action.payload };
        case "RESETAR":
            return estadoInicial;
        default:
            return state;
    }
}
export function useLoginViewModel() {
    const navigation = useNavigation<AuthNav>();
    
    const { login } = useAuth();
   
    const [state, dispatch] = useReducer(reducer, estadoInicial);
  
    async function entrar() {
        dispatch({ type: "INICIO" });
        try {
            const usuario = await AuthBusiness.entrar(state.email, state.senha);
            await login(usuario); // salva no AsyncStorage e redireciona automaticamente
            dispatch({ type: "SUCESSO" });
        } catch (e: any) {

            dispatch({ type: "ERRO", payload: mapFirebaseError(e.code) });
        }
    }

    return {
        email: state.email,
        senha: state.senha,
        senhaVisivel: state.senhaVisivel,
        loading: state.loading,
        erro: state.erro,
        setEmail: (v: string) => dispatch({ type: "SET_EMAIL", payload: v }),
        setSenha: (v: string) => dispatch({ type: "SET_SENHA", payload: v }),
        toggleSenhaVisivel: () => dispatch({ type: "TOGGLE_SENHA_VISIVEL" }),
        resetar: () => dispatch({ type: "RESETAR" }),
        voltar: () => navigation.goBack(),
        irParaRegistrar: () => navigation.navigate("Register"),
        entrar,
    };
}