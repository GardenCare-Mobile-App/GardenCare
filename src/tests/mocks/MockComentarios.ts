import { mockPerfil } from './MockUsuario';

export const mockComentarios = [
  {
    id: 'comentario-1',
    autorId: mockPerfil.uid,
    autorNome: mockPerfil.nome,
    autorFotoURL: undefined,
    conteudo: 'Que planta linda!',
    criadoEm: new Date('2025-06-01T10:00:00'),
  },
  {
    id: 'comentario-2',
    autorId: 'usuario-456',
    autorNome: 'Felipe',
    autorFotoURL: undefined,
    conteudo: 'Parabéns pelo jardim!',
    criadoEm: new Date('2025-06-01T11:00:00'),
  },
];
