import { mockPerfil } from './MockUsuario';

export const mockPosts = [
  {
    id: 'post-1',
    conteudo: 'Minha planta está crescendo!',
    autorId: mockPerfil.uid,
    autorNome: mockPerfil.nome,
    autorFotoURL: undefined,
    curtidas: [],
    criadoEm: new Date('2025-06-01'),
  },
  {
    id: 'post-2',
    conteudo: 'Reguei hoje de manhã!',
    autorId: 'usuario-456',
    autorNome: 'Felipe',
    autorFotoURL: undefined,
    curtidas: [mockPerfil.uid],
    criadoEm: new Date('2025-06-02'),
  },
];
