//teste de visibilidade: mensagem de erro do viewmodel é exibida na tela
import React from 'react';
import { render } from '@testing-library/react-native';
import { RegisterScreen } from '../../views/screens/auth/RegisterScreen';

jest.mock('phosphor-react-native', () => ({
  ArrowLeftIcon: () => null,
  EnvelopeSimpleIcon: () => null,
  LockKeyIcon: () => null,
  UserIcon: () => null,
  EyeIcon: () => null,
  EyeClosedIcon: () => null,
}));

jest.mock('../../viewmodels/auth/AuthRegisterViewModel', () => ({
  useRegisterViewModel: () => ({
    nome: '',
    email: '',
    pronomes: '',
    senha: '',
    confirmarSenha: '',
    senhaVisivel: false,
    confirmarSenhaVisivel: false,
    mensagemErro: 'Informe seu nome.',
    loading: false,
    modalVisivel: false,
    setNome: jest.fn(),
    setEmail: jest.fn(),
    setPronomes: jest.fn(),
    setSenha: jest.fn(),
    setConfirmarSenha: jest.fn(),
    toggleSenhaVisivel: jest.fn(),
    toggleConfirmarSenhaVisivel: jest.fn(),
    setModalVisivel: jest.fn(),
    resetar: jest.fn(),
    voltar: jest.fn(),
    irParaLogin: jest.fn(),
    handleCriarConta: jest.fn(),
  }),
}));

describe('RegisterScreen', () => {
  it('exibe mensagem de erro retornada pelo viewmodel', async () => {
    const { getByText } = await render(<RegisterScreen />);
    expect(getByText('Informe seu nome.')).toBeTruthy();
  });
});
