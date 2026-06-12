import { useReducer } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthBusiness, mapFirebaseError, validarRegistro } from 
    '../../business/auth/AuthBussines';
import { useAuth } from '../../context/AuthContext';
import { AuthStackParamList } from '../../navigation/AppNavigator';
type AuthNav = NativeStackNavigationProp<AuthStackParamList>;

type State = {
    nome: string;
    email: string;
    pronomes: string;
    senha: string;
    confirmarSenha: string;
    senhaVisivel: boolean;
    confirmarSenhaVisivel: boolean;
    erroLocal: string | null;
    loading: boolean;
    erro: string | null;
    modalVisivel: boolean;
};

type Action =
    | { type: 'SET_NOME'; payload: string }
    | { type: 'SET_EMAIL'; payload: string }
    | { type: 'SET_PRONOMES'; payload: string }
    | { type: 'SET_SENHA'; payload: string }
    | { type: 'SET_CONFIRMAR_SENHA'; payload: string }
    | { type: 'TOGGLE_SENHA_VISIVEL' }
    | { type: 'TOGGLE_CONFIRMAR_SENHA_VISIVEL' }
    | { type: 'SET_ERRO_LOCAL'; payload: string | null }
    | { type: 'INICIO' }
    | { type: 'SUCESSO' }
    | { type: 'ERRO'; payload: string }
    | { type: 'SET_MODAL'; payload: boolean }
    | { type: 'RESETAR' };
    
const estadoInicial: State = {
    nome: '',
    email: '',
    pronomes: '',
    senha: '',
    confirmarSenha: '',
    senhaVisivel: false,
    confirmarSenhaVisivel: false,
    erroLocal: null,
    loading: false,
    erro: null,
    modalVisivel: false,
};

function reducer(state: State, action: Action): State {
    switch (action.type) {
        case 'SET_NOME': return { ...state, nome: action.payload };
        case 'SET_EMAIL': return { ...state, email: action.payload };
        case 'SET_PRONOMES': return { ...state, pronomes: action.payload };
        case 'SET_SENHA': return { ...state, senha: action.payload };
        case 'SET_CONFIRMAR_SENHA': return {
            ...state, confirmarSenha: action.payload
        };
        case 'TOGGLE_SENHA_VISIVEL': return { ...state, senhaVisivel: !state.senhaVisivel };
        case 'TOGGLE_CONFIRMAR_SENHA_VISIVEL': return {
            ...state, confirmarSenhaVisivel:
                !state.confirmarSenhaVisivel
        };
        case 'SET_ERRO_LOCAL': return { ...state, erroLocal: action.payload };
        case 'INICIO':
            return { ...state, loading: true, erro: null, erroLocal: null };
        case 'SUCESSO':
            return { ...state, loading: false };
        case 'ERRO':
            return { ...state, loading: false, erro: action.payload };
        case 'SET_MODAL':
            return { ...state, modalVisivel: action.payload };
        case 'RESETAR':
            return estadoInicial;
        default:
            return state;
    }
}
export function useRegisterViewModel() {
    const navigation = useNavigation<AuthNav>();
    
    const { login } = useAuth();
    const [state, dispatch] = useReducer(reducer, estadoInicial);
    
    function handleCriarConta() {
        const erro = validarRegistro(state.nome, state.email, state.pronomes, state.senha,
            state.confirmarSenha);
        if (erro) {
            dispatch({ type: 'SET_ERRO_LOCAL', payload: erro });
            return;
        }
        registrar();
    }
    
    async function registrar() {
        dispatch({ type: 'INICIO' });
        try {
            const novoUsuario = await AuthBusiness.registrar(state.nome, state.email,
                state.pronomes, state.senha);
            await login(novoUsuario); // salva no AsyncStorage e redireciona automaticamente
            dispatch({ type: 'SUCESSO' });
        } catch (e: any) {
            dispatch({ type: 'ERRO', payload: mapFirebaseError(e.code) });
        }
    }
    
    return {
        nome: state.nome,
        email: state.email,
        pronomes: state.pronomes,
        senha: state.senha,
        confirmarSenha: state.confirmarSenha,
        senhaVisivel: state.senhaVisivel,
        confirmarSenhaVisivel: state.confirmarSenhaVisivel,
        mensagemErro: state.erroLocal ?? state.erro,
        loading: state.loading,
        modalVisivel: state.modalVisivel,
        setNome: (v: string) => dispatch({ type: 'SET_NOME', payload: v }),
        setEmail: (v: string) => dispatch({ type: 'SET_EMAIL', payload: v }),
        setPronomes: (v: string) => dispatch({ type: 'SET_PRONOMES', payload: v }),
        setSenha: (v: string) => dispatch({ type: 'SET_SENHA', payload: v }),
        setConfirmarSenha: (v: string) => dispatch({
            type: 'SET_CONFIRMAR_SENHA', payload: v
        }),
        toggleSenhaVisivel: () => dispatch({ type: 'TOGGLE_SENHA_VISIVEL' }),
        toggleConfirmarSenhaVisivel: () => dispatch({
            type:
                'TOGGLE_CONFIRMAR_SENHA_VISIVEL'
        }),
        setModalVisivel: (v: boolean) => dispatch({ type: 'SET_MODAL', payload: v }),
        resetar: () => dispatch({ type: 'RESETAR' }),
        voltar: () => navigation.goBack(),
        irParaLogin: () => navigation.navigate('Login'),
        handleCriarConta,
    };
}