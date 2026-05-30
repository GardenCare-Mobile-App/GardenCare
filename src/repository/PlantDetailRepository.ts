import { doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { ref, get } from 'firebase/database';
import { db, database } from '../business/firebaseConfig';
import { Plant } from '../models/Plant';
import { SensorData } from '../models/SensorData';

export class PlantDetailRepository {

  async getPlanta(id: string): Promise<Plant | null> {
    const docSnap = await getDoc(doc(db, 'Plantas', id));
    if (!docSnap.exists()) return null;
    return { id: docSnap.id, ...docSnap.data() } as Plant;
  }

  async getSensorData(): Promise<SensorData> {
    try {
      const snapshot = await get(ref(database, '/sensores'));
      if (!snapshot.exists()) {
        return { umidade: 0, temperatura: 0, luminosidade: 0, atualizadoEm: new Date(), esp32Online: false };
      }
      const dados = snapshot.val();
      return {
        umidade: dados.umidadeAr ?? 0,
        temperatura: dados.temperatura ?? 0,
        luminosidade: dados.luminosidade ?? 0,
        atualizadoEm: new Date(),
        esp32Online: dados.online ?? false,
      };
    } catch {
      return { umidade: 0, temperatura: 0, luminosidade: 0, atualizadoEm: new Date(), esp32Online: false };
    }
  }

  async atualizarFavorita(id: string, valor: boolean): Promise<void> {
    await updateDoc(doc(db, 'Plantas', id), { favorita: valor });
  }

  async registrarRega(id: string, ultimaRega: string, novoStatus: Plant['statusSaude']): Promise<void> {
    await updateDoc(doc(db, 'Plantas', id), { ultimaRega, statusSaude: novoStatus });
  }

  async deletarPlanta(id: string): Promise<void> {
    await deleteDoc(doc(db, 'Plantas', id));
  }
}
