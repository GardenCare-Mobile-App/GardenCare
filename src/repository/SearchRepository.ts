import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../business/firebaseConfig';
import { PerfilUsuario } from '../models/User';

export class SearchRepository {

  async buscarUsuariosPorNome(termo: string): Promise<PerfilUsuario[]> {
    if (!termo.trim()) return [];

    const q = query(collection(db, 'Usuarios'), orderBy('nome'));
    const snapshot = await getDocs(q);

    const termoLower = termo.toLowerCase();

    return snapshot.docs
      .map((d) => {
        const dados = d.data();
        return {
          uid: d.id,
          nome: dados.nome,
          pronomes: dados.pronomes ?? '',
          fotoURL: dados.fotoURL ?? undefined,
          email: dados.email,
          criadoEm: dados.criadoEm,
          bio: dados.bio ?? undefined,
        } as PerfilUsuario;
      })
      .filter((u) => u.nome.toLowerCase().includes(termoLower));
  }
}