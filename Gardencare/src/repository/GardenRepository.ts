import { collection, addDoc, getDocs, getDoc, updateDoc, doc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../business/firebaseConfig';
import { Plant } from '../models/Plant';

export class GardenRepository {

  async getPlantas(): Promise<Plant[]> {
    const snapshot = await getDocs(collection(db, 'Plantas'));
    return snapshot.docs.map((d) => ({
      id: d.id,
      ...d.data(),
    })) as Plant[];
  }

  async adicionarPlanta(
    planta: Omit<Plant, 'id' | 'statusSaude' | 'ultimaRega'>,
    imagemUri?: string
  ): Promise<Plant> {
    let imagemUrl: string | undefined = undefined;
    if (imagemUri) {
      imagemUrl = await this.uploadImagemPlanta(imagemUri);
    }
    const novaPlanta = {
      ...planta,
      imagemUrl,
      statusSaude: 'saudavel',
      ultimaRega: new Date().toISOString().split('T')[0],
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

  private async uploadImagemPlanta(imagemUri: string): Promise<string> {
    const response = await fetch(imagemUri);
    const blob = await response.blob();
    const storageRef = ref(storage, `plantas/${Date.now()}.jpg`);
    await uploadBytes(storageRef, blob);
    return await getDownloadURL(storageRef);
  }
}
