//teste de mudança de estado: criar conta sem nome exibe mensagem de erro
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import { RegisterScreen } from '../../views/screens/auth/RegisterScreen';
import { mockNavigation } from '../mocks/MockNavigation';

jest.mock('phosphor-react-native', () => ({
  ArrowLeftIcon: () => null,
  EnvelopeSimpleIcon: () => null,
  LockKeyIcon: () => null,
  UserIcon: () => null,
}));

jest.mock('../../viewmodels/AuthViewModels', () => ({
  useAuthViewModel: () => ({
    registrar: jest.fn(),
    loading: false,
    erro: null,
  }),
}));

const Screen = RegisterScreen as React.ComponentType<any>;

describe('RegisterScreen', () => {
  it('exibe mensagem de erro ao tentar criar conta sem preencher o nome', () => {
    render(<Screen navigation={mockNavigation} />);
    fireEvent.press(screen.getByText('Criar conta'));
    expect(screen.getByText('Informe seu nome.')).toBeTruthy();
  });
});
