//teste de visibilidade: sem foto, exibe a inicial do nome como fallback
import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { AvatarPerfil } from '../../views/components/AvatarPerfil';
import { mockUsuario } from '../mocks/MockUsuario';

describe('AvatarPerfil', () => {
  it('exibe a letra inicial do nome quando não há foto', () => {
    render(<AvatarPerfil nome={mockUsuario.nome} />);
    expect(screen.getByText('J')).toBeTruthy();
  });
});
