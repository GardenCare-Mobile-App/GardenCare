import { collection, doc, addDoc, getDocs, updateDoc, deleteDoc, query, where } from 'firebase/firestore';
import { db, auth } from '../business/firebaseConfig';
import { Routine } from '../models/Routine';

export class RoutineRepository {

  private collection() {
    return collection(db, 'Routines');
  }

  async getAll(): Promise<Routine[]> {
    const uid = auth.currentUser?.uid;
    if (!uid) return [];

    const q = query(this.collection(), where('uid', '==', uid));
    const snap = await getDocs(q);
    const routines = snap.docs.map(d => ({ id: d.id, ...d.data() } as Routine));
    return routines.sort((a, b) =>
      `${a.date}${a.time}`.localeCompare(`${b.date}${b.time}`)
    );
  }

  async add(routine: Omit<Routine, 'id' | 'uid'>): Promise<string> {
    const uid = auth.currentUser?.uid;
    if (!uid) throw new Error('Usuário não autenticado.');
    const ref = await addDoc(this.collection(), { ...routine, uid });
    return ref.id;
  }

  async update(id: string, data: Partial<Routine>): Promise<void> {
    await updateDoc(doc(db, 'Routines', id), data);
  }

  async delete(id: string): Promise<void> {
    await deleteDoc(doc(db, 'Routines', id));
  }
}
