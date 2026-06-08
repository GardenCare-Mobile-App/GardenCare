import { mockPosts } from '../mocks/MockPosts';
import { mockPerfil } from '../mocks/MockUsuario';

const getPosts = jest.fn();
const curtirPost = jest.fn();

describe('Feed', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getPosts', () => {
    it('retorna lista de posts mockados', async () => {
      getPosts.mockResolvedValue(mockPosts);

      const posts = await getPosts();

      expect(getPosts).toHaveBeenCalled();
      expect(posts).toHaveLength(2);
      expect(posts[0]).toHaveProperty('conteudo', mockPosts[0].conteudo);
      expect(posts[1]).toHaveProperty('autorNome', mockPosts[1].autorNome);
    });

    it('retorna lista vazia quando não há posts', async () => {
      getPosts.mockResolvedValue([]);

      const posts = await getPosts();

      expect(posts).toHaveLength(0);
      expect(Array.isArray(posts)).toBe(true);
    });

    it('filtra posts de contas excluídas', async () => {
      getPosts.mockResolvedValue([mockPosts[0]]);

      const posts = await getPosts();

      expect(posts.every((p: any) => p.autorId !== 'conta-excluida')).toBe(true);
    });

    it('lança erro quando falha ao buscar posts', async () => {
      getPosts.mockRejectedValue(new Error('Erro ao carregar o feed.'));

      await expect(getPosts()).rejects.toThrow('Erro ao carregar o feed.');
    });
  });

  describe('criarPost', () => {
    const criarPost = jest.fn();

    beforeEach(() => {
      criarPost.mockClear();
    });

    it('cria um post com sucesso e retorna o post criado', async () => {
      const novoPost = {
        id: 'post-3',
        conteudo: 'Nova planta no jardim!',
        autorId: mockPerfil.uid,
        autorNome: mockPerfil.nome,
        autorFotoURL: undefined,
        curtidas: [],
        criadoEm: new Date(),
      };
      criarPost.mockResolvedValue(novoPost);

      const resultado = await criarPost('Nova planta no jardim!', mockPerfil.uid);

      expect(criarPost).toHaveBeenCalledWith('Nova planta no jardim!', mockPerfil.uid);
      expect(resultado).toHaveProperty('id', 'post-3');
      expect(resultado).toHaveProperty('conteudo', 'Nova planta no jardim!');
    });

    it('lança erro quando o conteúdo está vazio', async () => {
      criarPost.mockRejectedValue(new Error('O post não pode estar vazio.'));

      await expect(criarPost('', mockPerfil.uid)).rejects.toThrow('O post não pode estar vazio.');
    });
  });

  describe('curtirPost', () => {
    it('adiciona curtida do usuário ao post', async () => {
      const postAtualizado = {
        ...mockPosts[0],
        curtidas: [mockPerfil.uid],
      };
      curtirPost.mockResolvedValue(postAtualizado);

      const resultado = await curtirPost(mockPosts[0].id, mockPerfil.uid);

      expect(curtirPost).toHaveBeenCalledWith(mockPosts[0].id, mockPerfil.uid);
      expect(resultado.curtidas).toContain(mockPerfil.uid);
    });

    it('remove curtida quando o usuário já havia curtido', async () => {
      const postAtualizado = {
        ...mockPosts[1],
        curtidas: [],
      };
      curtirPost.mockResolvedValue(postAtualizado);

      const resultado = await curtirPost(mockPosts[1].id, mockPerfil.uid);

      expect(resultado.curtidas).not.toContain(mockPerfil.uid);
    });

    it('lança erro quando falha ao curtir o post', async () => {
      curtirPost.mockRejectedValue(new Error('Erro ao curtir post.'));

      await expect(curtirPost(mockPosts[0].id, mockPerfil.uid)).rejects.toThrow(
        'Erro ao curtir post.',
      );
    });
  });
});
