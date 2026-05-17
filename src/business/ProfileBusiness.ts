import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from './firebaseConfig';
import { PerfilUsuario } from '../models/User';

export class ProfileBusiness {
  async getPerfil(): Promise<PerfilUsuario> {
    const uid = auth.currentUser?.uid;

    if (!uid) {
      throw new Error('Usuário não autenticado.');
    }

    const docRef = doc(db, 'Usuarios', uid);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      throw new Error('Perfil não encontrado.');
    }

    const dados = docSnap.data();

    return {
      uid,
      nome: dados.nome,
      pronomes: dados.pronomes ?? '',
      fotoURL: dados.fotoURL ?? undefined,
      email: dados.email,
      criadoEm: dados.criadoEm,
      bio: dados.bio ?? undefined,
    };
  }
}