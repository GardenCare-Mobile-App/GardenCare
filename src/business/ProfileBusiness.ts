import { PerfilUsuario } from '../models/User';
import { ProfileRepository } from '../repository/ProfileRepository';

const profileRepository = new ProfileRepository();

export class ProfileBusiness {
  async getPerfil(): Promise<PerfilUsuario> {
    const perfil = await profileRepository.getPerfil();

    const erro = this.validarPerfil(perfil);
    if (erro) throw new Error(erro);

    return perfil;
  }
  async excluirConta(): Promise<void> {
    return profileRepository.excluirConta();
  }
  validarPerfil(perfil: PerfilUsuario): string | null {
    if (!perfil.nome || perfil.nome.trim().length === 0) {
      return 'O perfil precisa ter um nome.';
    }
    if (!perfil.email || !perfil.email.includes('@')) {
      return 'O perfil precisa ter um email válido.';
    }
    if (!perfil.uid) {
      return 'O perfil precisa ter um identificador único.';
    }
    return null;
  }
}