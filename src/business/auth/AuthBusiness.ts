import { AuthRepository } from '../../repository/auth/AuthRepository';
import { PerfilUsuario } from '../../models/User';

export function mapFirebaseError(code: string): string {
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

export function validarRegistro(
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

export const AuthBusiness = {

  async registrar(nome: string, email: string, pronomes: string, senha: string): Promise<PerfilUsuario> {
    const user = await AuthRepository.criarUsuarioAuth(email, senha);

    const novoUsuario: PerfilUsuario = {
      uid: user.uid, // id único gerado pelo Firebase
      nome: nome.trim(), // remove espaços extras nas bordas
      email,
      pronomes,
      criadoEm: new Date().toISOString(),
    };

    await AuthRepository.salvarPerfil(novoUsuario);
    return novoUsuario;
  },

  async entrar(email: string, senha: string): Promise<PerfilUsuario> {
    const user = await AuthRepository.loginAuth(email, senha);
    const perfil = await AuthRepository.buscarPerfil(user.uid);
    // Se o usuário existe no Auth mas não no Firestore, lança erro
    if (!perfil) throw { code: 'auth/user-not-found' };
    return perfil;
  },
};