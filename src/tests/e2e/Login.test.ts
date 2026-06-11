import { mockPerfil, mockCadastro } from '../mocks/MockUsuario';

const autenticar = jest.fn();
const getPerfil = jest.fn();

describe('Login', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('autenticar', () => {
    it('autentica com email e senha corretos e retorna o perfil', async () => {
      autenticar.mockResolvedValue(mockPerfil);

      const perfil = await autenticar(mockCadastro.email, mockCadastro.senha);

      expect(autenticar).toHaveBeenCalledWith(mockCadastro.email, mockCadastro.senha);
      expect(perfil).toHaveProperty('uid', mockPerfil.uid);
      expect(perfil).toHaveProperty('email', mockPerfil.email);
    });

    it('lança erro quando a senha está incorreta', async () => {
      autenticar.mockRejectedValue(new Error('Senha incorreta. Tente novamente.'));

      await expect(autenticar(mockCadastro.email, 'senhaErrada')).rejects.toThrow(
        'Senha incorreta. Tente novamente.',
      );
    });

    it('lança erro quando o e-mail não está cadastrado', async () => {
      autenticar.mockRejectedValue(new Error('E-mail não encontrado.'));

      await expect(autenticar('naoexiste@test.com', mockCadastro.senha)).rejects.toThrow(
        'E-mail não encontrado.',
      );
    });
  });

  describe('getPerfil', () => {
    it('carrega o perfil do usuário autenticado com sucesso', async () => {
      getPerfil.mockResolvedValue(mockPerfil);

      const perfil = await getPerfil();

      expect(getPerfil).toHaveBeenCalled();
      expect(perfil).toHaveProperty('uid', mockPerfil.uid);
      expect(perfil).toHaveProperty('nome', mockPerfil.nome);
      expect(perfil).toHaveProperty('email', mockPerfil.email);
    });

    it('lança erro quando usuário não está autenticado', async () => {
      getPerfil.mockRejectedValue(new Error('Usuário não autenticado.'));

      await expect(getPerfil()).rejects.toThrow('Usuário não autenticado.');
    });

    it('lança erro quando perfil não é encontrado no banco', async () => {
      getPerfil.mockRejectedValue(new Error('Perfil não encontrado.'));

      await expect(getPerfil()).rejects.toThrow('Perfil não encontrado.');
    });
  });
});
