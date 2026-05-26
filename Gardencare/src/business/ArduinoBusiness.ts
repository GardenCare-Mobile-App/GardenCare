import { SensorData } from '../models/SensorData';
import { ArduinoRepository } from '../repository/ArduinoRepository';

const arduinoRepository = new ArduinoRepository();

export class ArduinoBusiness {
  async getSensorData(): Promise<SensorData> {
    return arduinoRepository.getSensorData();
  }
}