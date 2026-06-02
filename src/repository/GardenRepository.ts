import { collection, addDoc, getDocs, getDoc, updateDoc, doc, deleteDoc, query, where } from 'firebase/firestore';
import { auth, db } from '../business/firebaseConfig';
import { Plant } from '../models/Plant';

export class GardenRepository {

  async getPlantas(): Promise<Plant[]> {
    const uid = auth.currentUser?.uid;
    if (!uid) return [];
    const q = query(collection(db, 'Plantas'), where('uid', '==', uid));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((d) => ({ id: d.id, ...d.data() })) as Plant[];
  }

  async adicionarPlanta(
    planta: Omit<Plant, 'id' | 'uid' | 'statusSaude' | 'ultimaRega'>,
    imagemBase64?: string,
    ultimaRega?: string
  ): Promise<Plant> {
    const uid = auth.currentUser?.uid;
    if (!uid) throw new Error('Usuário não autenticado.');
    const imagemUrl = imagemBase64 ? `data:image/jpeg;base64,${imagemBase64}` : null;
    const novaPlanta = {
      ...planta,
      uid,
      imagemUrl,
      statusSaude: 'saudavel',
      ultimaRega: ultimaRega ?? new Date().toISOString().split('T')[0],
    };
    const docRef = await addDoc(collection(db, 'Plantas'), novaPlanta);
    return { id: docRef.id, ...novaPlanta } as Plant;
  }

  async getPlanta(id: string): Promise<Plant | null> {
    const docSnap = await getDoc(doc(db, 'Plantas', id));
    if (!docSnap.exists()) return null;
    return { id: docSnap.id, ...docSnap.data() } as Plant;
  }

  async atualizarFavorita(id: string, valor: boolean): Promise<void> {
    await updateDoc(doc(db, 'Plantas', id), { favorita: valor });
  }

  async registrarRega(id: string, novoStatus: 'saudavel' | 'atencao' | 'critico'): Promise<void> {
    await updateDoc(doc(db, 'Plantas', id), {
      ultimaRega: new Date().toISOString().split('T')[0],
      statusSaude: novoStatus,
    });
  }

  async deletarPlanta(id: string): Promise<void> {
    await deleteDoc(doc(db, 'Plantas', id));
  }
}
