export const mockPerfil = {
  uid: 'usuario-123',
  nome: 'Gustavo Monteiro',
  email: 'gus@test.com',
  pronomes: 'ele/dele',
  bio: 'Amo plantas!',
  fotoURL: undefined,
  criadoEm: new Date('2025-06-03'),
};

export const mockUsuario = {
  uid: 'usuario-456',
  nome: 'Julia Santos',
  email: 'julia@test.com',
  pronomes: 'ela/dela',
  bio: 'Jardineira apaixonada!',
  fotoURL: undefined,
  criadoEm: new Date('2025-06-03'),
};

export const mockRegras = [
  { mensagem: 'Mínimo 8 caracteres', valida: false },
  { mensagem: 'Uma letra maiúscula', valida: true },
  { mensagem: 'Um número', valida: false },
];

export const mockCadastro = {
  nome: 'Gustavo Monteiro',
  email: 'gus@test.com',
  pronomes: 'ele/dele',
  senha: 'senha167',
  confirmarSenha: 'senha167',
};
