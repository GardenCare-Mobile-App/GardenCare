import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../business/firebaseConfig';
import { PreferenciasNotificacao } from '../business/NotificacaoBusiness';

export class NotificacaoRepository {

  async getPreferencias(uid: string): Promise<PreferenciasNotificacao> {
    const docSnap = await getDoc(doc(db, 'Usuarios', uid));
    if (docSnap.exists() && docSnap.data().notificacoes) {
      return docSnap.data().notificacoes as PreferenciasNotificacao;
    }
    return { alertasSensor: true, rotinas: true };
  }

  async salvarPreferencias(uid: string, preferencias: PreferenciasNotificacao): Promise<void> {
    await updateDoc(doc(db, 'Usuarios', uid), { notificacoes: preferencias });
  }
}
