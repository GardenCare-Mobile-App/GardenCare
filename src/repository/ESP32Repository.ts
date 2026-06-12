import { ref, update, onValue } from 'firebase/database';
import { database } from '../business/firebaseConfig';
import { SensorData } from '../models/SensorData';

export class ESP32Repository {
  escutarSensores(callback: (data: SensorData) => void): () => void {
    const sensorRef = ref(database, '/sensores');
    const unsubscribe = onValue(
      sensorRef,
      (snapshot) => {
        if (!snapshot.exists()) {
          callback({ umidade: 0, temperatura: 0, luminosidade: 0, atualizadoEm: new Date(), esp32Online: false });
          return;
        }
        const dados = snapshot.val();
        callback({
          umidade: dados.umidadeAr ?? 0,
          temperatura: dados.temperatura ?? 0,
          luminosidade: dados.luminosidade ?? 0,
          atualizadoEm: new Date(),
          esp32Online: dados.online ?? false,
        });
      },
      () => {
        callback({ umidade: 0, temperatura: 0, luminosidade: 0, atualizadoEm: new Date(), esp32Online: false });
      }
    );
    return unsubscribe;
  }

  async solicitarLeitura(): Promise<void> {
    const comandoRef = ref(database, '/comandos');
    await update(comandoRef, { solicitarLeitura: true, atualizadoEm: Date.now() });
  }
}
