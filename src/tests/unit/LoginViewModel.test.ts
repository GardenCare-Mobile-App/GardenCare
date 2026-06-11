type State = {
  email: string;
  senha: string;
  senhaVisivel: boolean;
  loading: boolean;
  erro: string | null;
};

type Action =
  | { type: 'SET_EMAIL'; payload: string }
  | { type: 'SET_SENHA'; payload: string }
  | { type: 'TOGGLE_SENHA_VISIVEL' }
  | { type: 'INICIO' }
  | { type: 'SUCESSO' }
  | { type: 'ERRO'; payload: string }
  | { type: 'RESETAR' };

const estadoInicial: State = {
  email: '',
  senha: '',
  senhaVisivel: false,
  loading: false,
  erro: null,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_EMAIL':
      return { ...state, email: action.payload };
    case 'SET_SENHA':
      return { ...state, senha: action.payload };
    case 'TOGGLE_SENHA_VISIVEL':
      return { ...state, senhaVisivel: !state.senhaVisivel };
    case 'INICIO':
      return { ...state, loading: true, erro: null };
    case 'SUCESSO':
      return { ...state, loading: false };
    case 'ERRO':
      return { ...state, loading: false, erro: action.payload };
    case 'RESETAR':
      return estadoInicial;
    default:
      return state;
  }
}

describe('Reducer do LoginViewModel', () => {
  it('SET_EMAIL atualiza só o email', () => {
    const estado = { ...estadoInicial, senha: 'senha123' };
    const resultado = reducer(estado, { type: 'SET_EMAIL', payload: 'novo@email.com' });

    expect(resultado.email).toBe('novo@email.com');
    expect(resultado.senha).toBe('senha123');
  });

  it('INICIO ativa loading e limpa erro', () => {
    const estado = { ...estadoInicial, erro: 'Erro anterior', loading: false };
    const resultado = reducer(estado, { type: 'INICIO' });

    expect(resultado.loading).toBe(true);
    expect(resultado.erro).toBeNull();
  });

  it('ERRO desativa loading e salva mensagem', () => {
    const estado = { ...estadoInicial, loading: true };
    const resultado = reducer(estado, { type: 'ERRO', payload: 'E-mail ou senha incorretos.' });

    expect(resultado.loading).toBe(false);
    expect(resultado.erro).toBe('E-mail ou senha incorretos.');
  });

  it('RESETAR volta ao estado inicial', () => {
    const estadoModificado: State = {
      email: 'teste@email.com',
      senha: 'senha123',
      senhaVisivel: true,
      loading: true,
      erro: 'algum erro',
    };
    const resultado = reducer(estadoModificado, { type: 'RESETAR' });

    expect(resultado).toEqual(estadoInicial);
  });
});