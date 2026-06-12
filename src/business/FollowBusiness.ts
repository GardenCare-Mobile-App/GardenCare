import { auth } from './firebaseConfig';
import { FollowRepository } from '../repository/FollowRepository';
import { PerfilUsuario } from '../models/User';

export const FollowBusiness = {

  async seguir(seguidoId: string): Promise<void> {
    const seguidorId = auth.currentUser?.uid;
    if (!seguidorId) throw new Error('Usuário não autenticado.');
    await FollowRepository.seguir(seguidorId, seguidoId);
  },

  async deixarDeSeguir(seguidoId: string): Promise<void> {
    const seguidorId = auth.currentUser?.uid;
    if (!seguidorId) throw new Error('Usuário não autenticado.');
    await FollowRepository.deixarDeSeguir(seguidorId, seguidoId);
  },

  async estaSeguindo(seguidoId: string): Promise<boolean> {
    const seguidorId = auth.currentUser?.uid;
    if (!seguidorId) return false;
    return FollowRepository.estaSeguindo(seguidorId, seguidoId);
  },

  async getSeguidores(uid: string): Promise<PerfilUsuario[]> {
    return FollowRepository.getSeguidores(uid);
  },

  async getSeguindo(uid: string): Promise<PerfilUsuario[]> {
    return FollowRepository.getSeguindo(uid);
  },

  async contarSeguidores(uid: string): Promise<number> {
    return FollowRepository.contarSeguidores(uid);
  },

  async contarSeguindo(uid: string): Promise<number> {
    return FollowRepository.contarSeguindo(uid);
  },

  async buscarUsuarios(texto: string): Promise<PerfilUsuario[]> {
    return FollowRepository.buscarUsuarios(texto);
  },
};
