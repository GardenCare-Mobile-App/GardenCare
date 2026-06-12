//teste de interação: pressionar "Cadastre-se" navega para a tela de registro
//teste de visibilidade: erro do viewmodel é exibido na tela
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { LoginScreen } from '../../views/screens/auth/LoginScreen';

const mockNavigate = jest.fn();

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({ navigate: mockNavigate, goBack: jest.fn() }),
  useFocusEffect: (cb: () => void) => cb(),
}));

jest.mock('phosphor-react-native', () => ({
  ArrowLeftIcon: () => null,
  EnvelopeSimpleIcon: () => null,
  LockKeyIcon: () => null,
  EyeIcon: () => null,
  EyeClosedIcon: () => null,
}));

jest.mock('../../viewmodels/auth/AuthLoginViewModel', () => ({
  useLoginViewModel: () => ({
    entrar: jest.fn(),
    resetar: jest.fn(),
    voltar: jest.fn(),
    toggleSenhaVisivel: jest.fn(),
    setEmail: jest.fn(),
    setSenha: jest.fn(),
    irParaRegistrar: () => mockNavigate('Register'),
    email: '',
    senha: '',
    senhaVisivel: false,
    loading: false,
    erro: 'E-mail ou senha incorretos',
  }),
}));

beforeEach(() => {
  jest.clearAllMocks();
});

describe('LoginScreen', () => {
  it('navega para a tela de cadastro ao pressionar "Cadastre-se"', async () => {
    const { getByText } = await render(<LoginScreen />);
    fireEvent.press(getByText('Cadastre-se'));
    expect(mockNavigate).toHaveBeenCalledWith('Register');
  });

  it('exibe mensagem de erro retornada pelo viewmodel', async () => {
    const { getByText } = await render(<LoginScreen />);
    expect(getByText('E-mail ou senha incorretos')).toBeTruthy();
  });
});
