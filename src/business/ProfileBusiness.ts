import { PerfilUsuario } from '../models/User';
import { ProfileRepository } from '../repository/ProfileRepository';

const profileRepository = new ProfileRepository();

export class ProfileBusiness {

  async getPerfil(): Promise<PerfilUsuario> {
    return profileRepository.getPerfil();
  }
  getUidAtual(): string | undefined {
    const { auth } = require('./firebaseConfig');
    return auth.currentUser?.uid;
  }
}