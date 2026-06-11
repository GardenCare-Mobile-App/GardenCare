//teste de visibilidade: regras de validação ficam ocultas até o usuário tocar no campo
import React from 'react';
import { render } from '@testing-library/react-native';
import { ValidationRules } from '../../views/components/InputValidationRules';
import { mockRegras } from '../mocks/MockUsuario';

jest.mock('@expo/vector-icons', () => ({
  Ionicons: () => null,
}));

describe('ValidationRules', () => {
  it('não renderiza nada quando tocado é false', () => {
    const { toJSON } = render(<ValidationRules regras={mockRegras} tocado={false} />);
    expect(toJSON()).toBeNull();
  });
});
