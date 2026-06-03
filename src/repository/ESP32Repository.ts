import { ref, get } from 'firebase/database';
import { database } from '../business/firebaseConfig';
import { SensorData } from '../models/SensorData';

export class ESP32Repository {

  async getSensorData(): Promise<SensorData> {
    try {
      const snapshot = await get(ref(database, '/sensores'));

      if (!snapshot.exists()) return { umidade: 0, temperatura: 0, luminosidade: 0, atualizadoEm: new Date(), esp32Online: false };

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
}
