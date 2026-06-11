import { mockCadastro, mockPerfil } from '../mocks/MockUsuario';

function validarRegistro(
  nome: string,
  email: string,
  pronomes: string,
  senha: string,
  confirmarSenha: string,
): string | null {
  if (!nome.trim()) return 'Informe seu nome.';
  if (!email.trim()) return 'Informe seu e-mail.';
  if (!pronomes) return 'Selecione seus pronomes.';
  if (senha.length < 6) return 'Senha deve ter ao menos 6 caracteres.';
  if (senha !== confirmarSenha) return 'As senhas não coincidem.';
  return null;
}

const registrar = jest.fn();

describe('Register', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('validarRegistro', () => {
    it('retorna null quando todos os campos são válidos', () => {
      const resultado = validarRegistro(
        mockCadastro.nome,
        mockCadastro.email,
        mockCadastro.pronomes,
        mockCadastro.senha,
        mockCadastro.confirmarSenha,
      );

      expect(resultado).toBeNull();
    });

    it('retorna erro quando nome está vazio', () => {
      const resultado = validarRegistro('', mockCadastro.email, mockCadastro.pronomes, mockCadastro.senha, mockCadastro.confirmarSenha);

      expect(resultado).toBe('Informe seu nome.');
    });

    it('retorna erro quando e-mail está vazio', () => {
      const resultado = validarRegistro(mockCadastro.nome, '', mockCadastro.pronomes, mockCadastro.senha, mockCadastro.confirmarSenha);

      expect(resultado).toBe('Informe seu e-mail.');
    });

    it('retorna erro quando pronomes não foram selecionados', () => {
      const resultado = validarRegistro(mockCadastro.nome, mockCadastro.email, '', mockCadastro.senha, mockCadastro.confirmarSenha);

      expect(resultado).toBe('Selecione seus pronomes.');
    });

    it('retorna erro quando senha tem menos de 6 caracteres', () => {
      const resultado = validarRegistro(mockCadastro.nome, mockCadastro.email, mockCadastro.pronomes, '123', '123');

      expect(resultado).toBe('Senha deve ter ao menos 6 caracteres.');
    });

    it('retorna erro quando senhas não coincidem', () => {
      const resultado = validarRegistro(mockCadastro.nome, mockCadastro.email, mockCadastro.pronomes, mockCadastro.senha, 'outraSenha');

      expect(resultado).toBe('As senhas não coincidem.');
    });
  });

  describe('registrar', () => {
    it('cria o usuário com sucesso e retorna o perfil', async () => {
      registrar.mockResolvedValue(mockPerfil);

      const perfil = await registrar(mockCadastro.nome, mockCadastro.email, mockCadastro.pronomes, mockCadastro.senha);

      expect(registrar).toHaveBeenCalled();
      expect(perfil).toHaveProperty('uid', mockPerfil.uid);
      expect(perfil).toHaveProperty('nome', mockPerfil.nome);
      expect(perfil).toHaveProperty('email', mockPerfil.email);
    });

    it('lança erro quando e-mail já está em uso', async () => {
      registrar.mockRejectedValue(new Error('Este e-mail já está em uso.'));

      await expect(
        registrar(mockCadastro.nome, mockCadastro.email, mockCadastro.pronomes, mockCadastro.senha)
      ).rejects.toThrow('Este e-mail já está em uso.');
    });
  });
});
