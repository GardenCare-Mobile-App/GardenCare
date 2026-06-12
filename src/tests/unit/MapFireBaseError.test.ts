function mapFirebaseError(code: string): string {
  switch (code) {
    case 'auth/email-already-in-use': return 'Este e-mail já está em uso.';
    case 'auth/invalid-email': return 'E-mail inválido.';
    case 'auth/weak-password': return 'Senha fraca. Use ao menos 6 caracteres.';
    case 'auth/user-not-found':
    case 'auth/wrong-password':
    case 'auth/invalid-credential': return 'E-mail ou senha incorretos.';
    case 'auth/too-many-requests': return 'Muitas tentativas. Tente mais tarde.';
    default: return 'Ocorreu um erro. Tente novamente.';
  }
}

describe('mapFirebaseError', () => {
  it('retorna mensagem correta para e-mail já em uso', () => {
    expect(mapFirebaseError('auth/email-already-in-use')).toBe('Este e-mail já está em uso.');
  });

  it('retorna mensagem correta para e-mail inválido', () => {
    expect(mapFirebaseError('auth/invalid-email')).toBe('E-mail inválido.');
  });

  it('retorna mensagem correta para senha fraca', () => {
    expect(mapFirebaseError('auth/weak-password')).toBe('Senha fraca. Use ao menos 6 caracteres.');
  });

  it('retorna mensagem correta para credenciais incorretas', () => {
    expect(mapFirebaseError('auth/invalid-credential')).toBe('E-mail ou senha incorretos.');
  });

  it('retorna mensagem correta para muitas tentativas', () => {
    expect(mapFirebaseError('auth/too-many-requests')).toBe('Muitas tentativas. Tente mais tarde.');
  });

  it('retorna mensagem genérica para código desconhecido', () => {
    expect(mapFirebaseError('auth/codigo-desconhecido')).toBe('Ocorreu um erro. Tente novamente.');
  });
});