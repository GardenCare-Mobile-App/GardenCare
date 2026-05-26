import { ref, get } from 'firebase/database';
import { database } from '../business/firebaseConfig';
import { SensorData } from '../models/SensorData';

export class ArduinoRepository {

  async getSensorData(): Promise<SensorData> {
    try {
      const snapshot = await get(ref(database, '/sensores'));

      if (!snapshot.exists()) return { umidade: 0, temperatura: 0, luminosidade: 0, atualizadoEm: new Date(), arduinoOnline: false };

      const dados = snapshot.val();
      return {
        umidade: dados.umidadeSolo ?? 0,
        temperatura: dados.temperatura ?? 0,
        luminosidade: dados.luminosidade ?? 0,
        atualizadoEm: new Date(),
        arduinoOnline: dados.online ?? false,
      };
    } catch {
      return { umidade: 0, temperatura: 0, luminosidade: 0, atualizadoEm: new Date(), arduinoOnline: false };
    }
  }
}