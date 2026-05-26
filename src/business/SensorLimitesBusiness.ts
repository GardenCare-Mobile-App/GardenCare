import { SensorLimitesRepository, LimitesSensor, LIMITES_PADRAO } from '../repository/SensorLimitesRepository';

export { LimitesSensor, LIMITES_PADRAO };

const sensorLimitesRepository = new SensorLimitesRepository();

export class SensorLimitesBusiness {

  async getLimites(): Promise<LimitesSensor> {
    return sensorLimitesRepository.getLimites();
  }
  validarLimites(limites: LimitesSensor): string | null {
    if (limites.temperaturaMin >= limites.temperaturaMax) {
      return 'A temperatura mínima deve ser menor que a máxima.';
    }
    if (limites.temperaturaMin < -10 || limites.temperaturaMax > 60) {
      return 'Temperatura deve estar entre -10°C e 60°C.';
    }
    if (limites.umidadeMin < 0 || limites.umidadeMin > 100) {
      return 'Umidade mínima deve estar entre 0% e 100%.';
    }
    if (limites.luminosidadeMin < 0 || limites.luminosidadeMin > 10000) {
      return 'Luminosidade mínima deve estar entre 0 e 10000 lx.';
    }
    return null;
  }

  async salvarLimites(limites: LimitesSensor): Promise<void> {
    const erro = this.validarLimites(limites);
    if (erro) throw new Error(erro);
    return sensorLimitesRepository.salvarLimites(limites);
  }
}