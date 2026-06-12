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
    case 'SET_CONFIRMAR_SENHA': return { ...state, confirmarSenha: action.payload };
    case 'TOGGLE_SENHA_VISIVEL': return { ...state, senhaVisivel: !state.senhaVisivel };
    case 'TOGGLE_CONFIRMAR_SENHA_VISIVEL': return { ...state, confirmarSenhaVisivel: !state.confirmarSenhaVisivel };
    case 'SET_ERRO_LOCAL': return { ...state, erroLocal: action.payload };
    case 'INICIO': return { ...state, loading: true, erro: null, erroLocal: null };
    case 'SUCESSO': return { ...state, loading: false };
    case 'ERRO': return { ...state, loading: false, erro: action.payload };
    case 'SET_MODAL': return { ...state, modalVisivel: action.payload };
    case 'RESETAR': return estadoInicial;
    default: return state;
  }
}

describe('Reducer do RegisterViewModel', () => {
  it('TOGGLE_SENHA_VISIVEL inverte o booleano', () => {
    const estadoFalse = { ...estadoInicial, senhaVisivel: false };
    const resultado = reducer(estadoFalse, { type: 'TOGGLE_SENHA_VISIVEL' });

    expect(resultado.senhaVisivel).toBe(true);

    const resultado2 = reducer(resultado, { type: 'TOGGLE_SENHA_VISIVEL' });
    expect(resultado2.senhaVisivel).toBe(false);
  });

  it('INICIO limpa erroLocal e erro ao mesmo tempo', () => {
    const estado = { ...estadoInicial, erroLocal: 'Informe seu nome.', erro: 'Erro Firebase' };
    const resultado = reducer(estado, { type: 'INICIO' });

    expect(resultado.loading).toBe(true);
    expect(resultado.erroLocal).toBeNull();
    expect(resultado.erro).toBeNull();
  });

  it('SET_ERRO_LOCAL salva mensagem sem afetar outros campos', () => {
    const estado = { ...estadoInicial, nome: 'Gustavo', email: 'gus@test.com' };
    const resultado = reducer(estado, { type: 'SET_ERRO_LOCAL', payload: 'Informe seu nome.' });

    expect(resultado.erroLocal).toBe('Informe seu nome.');
    expect(resultado.nome).toBe('Gustavo');
    expect(resultado.email).toBe('gus@test.com');
  });

  it('RESETAR limpa todos os campos do formulário', () => {
    const estadoModificado: State = {
      nome: 'Gustavo',
      email: 'gus@test.com',
      pronomes: 'ele/dele',
      senha: 'senha167',
      confirmarSenha: 'senha167',
      senhaVisivel: true,
      confirmarSenhaVisivel: true,
      erroLocal: 'algum erro local',
      loading: true,
      erro: 'algum erro',
      modalVisivel: true,
    };
    const resultado = reducer(estadoModificado, { type: 'RESETAR' });

    expect(resultado).toEqual(estadoInicial);
  });
});