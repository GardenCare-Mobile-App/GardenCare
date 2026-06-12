import { SensorData } from '../models/SensorData';
import { ESP32Repository } from '../repository/ESP32Repository';

const esp32Repository = new ESP32Repository();

export class ESP32Business {
  escutarSensores(callback: (data: SensorData) => void): () => void {
    return esp32Repository.escutarSensores(callback);
  }

  async solicitarLeitura(): Promise<void> {
    return esp32Repository.solicitarLeitura();
  }
}
