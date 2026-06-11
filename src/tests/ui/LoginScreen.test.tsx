//teste de interação: pressionar "Cadastre-se" navega para a tela de registro
//teste de visibilidade: erro do viewmodel é exibido na tela
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import { LoginScreen } from '../../views/screens/auth/LoginScreen';
import { mockNavigation } from '../mocks/MockNavigation';

jest.mock('phosphor-react-native', () => ({
  ArrowLeftIcon: () => null,
  EnvelopeSimpleIcon: () => null,
  LockKeyIcon: () => null,
}));

jest.mock('../../viewmodels/AuthViewModels', () => ({
  useAuthViewModel: () => ({
    entrar: jest.fn(),
    loading: false,
    erro: 'E-mail ou senha incorretos',
  }),
}));

beforeEach(() => {
  jest.clearAllMocks();
});

describe('LoginScreen', () => {
  it('navega para a tela de cadastro ao pressionar "Cadastre-se"', () => {
    render(<LoginScreen navigation={mockNavigation} />);
    fireEvent.press(screen.getByText('Cadastre-se'));
    expect(mockNavigation.navigate).toHaveBeenCalledWith('Register');
  });

  it('exibe mensagem de erro retornada pelo viewmodel', () => {
    render(<LoginScreen navigation={mockNavigation} />);
    expect(screen.getByText('E-mail ou senha incorretos')).toBeTruthy();
  });
});
