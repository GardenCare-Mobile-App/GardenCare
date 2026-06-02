import { SensorData } from '../models/SensorData';
import { ESP32Repository } from '../repository/ESP32Repository';

const esp32Repository = new ESP32Repository();

export class ESP32Business {
  async getSensorData(): Promise<SensorData> {
    return esp32Repository.getSensorData();
  }
}