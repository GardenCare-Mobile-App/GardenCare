import { collection, addDoc, deleteDoc, getDocs, query, where, serverTimestamp, limit } from 'firebase/firestore';
import { db } from '../business/firebaseConfig';
import { PerfilUsuario } from '../models/User';
import { AuthRepository } from './auth/AuthRepository';

export const FollowRepository = {

  async seguir(seguidorId: string, seguidoId: string): Promise<void> {
    await addDoc(collection(db, 'Seguidores'), {
      seguidorId,
      seguidoId,
      criadoEm: serverTimestamp(),
    });
  },

  async deixarDeSeguir(seguidorId: string, seguidoId: string): Promise<void> {
    const q = query(
      collection(db, 'Seguidores'),
      where('seguidorId', '==', seguidorId),
      where('seguidoId', '==', seguidoId)
    );
    const snap = await getDocs(q);
    await Promise.all(snap.docs.map((d) => deleteDoc(d.ref)));
  },

  async estaSeguindo(seguidorId: string, seguidoId: string): Promise<boolean> {
    const q = query(
      collection(db, 'Seguidores'),
      where('seguidorId', '==', seguidorId),
      where('seguidoId', '==', seguidoId)
    );
    const snap = await getDocs(q);
    return !snap.empty;
  },

  async getSeguidores(uid: string): Promise<PerfilUsuario[]> {
    const q = query(collection(db, 'Seguidores'), where('seguidoId', '==', uid));
    const snap = await getDocs(q);
    const perfis = await Promise.all(
      snap.docs.map((d) => AuthRepository.buscarPerfil(d.data().seguidorId))
    );
    return perfis.filter((p): p is PerfilUsuario => p !== null);
  },

  async getSeguindo(uid: string): Promise<PerfilUsuario[]> {
    const q = query(collection(db, 'Seguidores'), where('seguidorId', '==', uid));
    const snap = await getDocs(q);
    const perfis = await Promise.all(
      snap.docs.map((d) => AuthRepository.buscarPerfil(d.data().seguidoId))
    );
    return perfis.filter((p): p is PerfilUsuario => p !== null);
  },

  async contarSeguidores(uid: string): Promise<number> {
    const q = query(collection(db, 'Seguidores'), where('seguidoId', '==', uid));
    const snap = await getDocs(q);
    return snap.size;
  },

  async contarSeguindo(uid: string): Promise<number> {
    const q = query(collection(db, 'Seguidores'), where('seguidorId', '==', uid));
    const snap = await getDocs(q);
    return snap.size;
  },

  async buscarUsuarios(texto: string): Promise<PerfilUsuario[]> {
    if (!texto.trim()) return [];
    const snap = await getDocs(collection(db, 'Usuarios'));
    const textoLower = texto.toLowerCase();
    return snap.docs
      .map((d) => ({ uid: d.id, ...d.data() }) as PerfilUsuario)
      .filter((u) => u.nome.toLowerCase().includes(textoLower))
      .slice(0, 15);
  },
};
