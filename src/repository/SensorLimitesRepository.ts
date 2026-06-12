import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../business/firebaseConfig';

export interface LimitesSensor {
  temperaturaMin: number;
  temperaturaMax: number;
  umidadeMin: number;
}

export const LIMITES_PADRAO: LimitesSensor = {
  temperaturaMin: 10,
  temperaturaMax: 35,
  umidadeMin: 30,
};

export class SensorLimitesRepository {

  async getLimites(): Promise<LimitesSensor> {
    const uid = auth.currentUser?.uid;
    if (!uid) return LIMITES_PADRAO;

    const docSnap = await getDoc(doc(db, 'Usuarios', uid));
    if (docSnap.exists() && docSnap.data().limitesSensor) {
      return docSnap.data().limitesSensor as LimitesSensor;
    }
    return LIMITES_PADRAO;
  }

  async salvarLimites(limites: LimitesSensor): Promise<void> {
    const uid = auth.currentUser?.uid;
    if (!uid) throw new Error('Usuário não autenticado.');

    await setDoc(
      doc(db, 'Usuarios', uid),
      { limitesSensor: limites },
      { merge: true }
    );
  }
}