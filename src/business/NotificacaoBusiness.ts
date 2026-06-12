import * as Notifications from 'expo-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NotificacaoRepository } from '../repository/NotificacaoRepository';
import { SensorData } from '../models/SensorData';
import { LimitesSensor } from '../repository/SensorLimitesRepository';

export interface PreferenciasNotificacao {
  alertasSensor: boolean;
  rotinas: boolean;
}

const notificacaoRepository = new NotificacaoRepository();

const COOLDOWN_MS = 30 * 60 * 1000;
const DOZE_HORAS_MS = 12 * 60 * 60 * 1000;
const CHAVE_ESCURO_DESDE = '@gardencare:escuro_desde';

const CHAVES = {
  temperaturaAlta: '@gardencare:notif_temp_alta',
  temperaturaBaixa: '@gardencare:notif_temp_baixa',
  umidadeBaixa: '@gardencare:notif_umidade_baixa',
  luminosidadeBaixa: '@gardencare:notif_luz_baixa',
};

type ChaveNotif = keyof typeof CHAVES;

async function deveEnviar(chave: ChaveNotif): Promise<boolean> {
  const ts = await AsyncStorage.getItem(CHAVES[chave]);
  if (!ts) return true;
  return Date.now() - parseInt(ts) > COOLDOWN_MS;
}

async function registrarEnvio(chave: ChaveNotif): Promise<void> {
  await AsyncStorage.setItem(CHAVES[chave], Date.now().toString());
}

async function limpar(chave: ChaveNotif): Promise<void> {
  await AsyncStorage.removeItem(CHAVES[chave]);
}

async function enviar(titulo: string, corpo: string): Promise<void> {
  await Notifications.scheduleNotificationAsync({
    content: { title: titulo, body: corpo },
    trigger: null,
  });
}

export class NotificacaoBusiness {
  async getPreferencias(uid: string): Promise<PreferenciasNotificacao> {
    return notificacaoRepository.getPreferencias(uid);
  }

  async salvarPreferencias(uid: string, preferencias: PreferenciasNotificacao): Promise<void> {
    return notificacaoRepository.salvarPreferencias(uid, preferencias);
  }

  async solicitarPermissao(): Promise<boolean> {
    const { status: existente } = await Notifications.getPermissionsAsync();
    if (existente === 'granted') return true;
    const { status } = await Notifications.requestPermissionsAsync();
    return status === 'granted';
  }

  async verificarEEnviarAlertas(
    sensorData: SensorData,
    limites: LimitesSensor
  ): Promise<void> {
    if (sensorData.temperatura > limites.temperaturaMax) {
      if (await deveEnviar('temperaturaAlta')) {
        await enviar('Temperatura muito alta', 'Mude as plantas para um ambiente mais fresco.');
        await registrarEnvio('temperaturaAlta');
      }
    } else {
      await limpar('temperaturaAlta');
    }

    if (sensorData.temperatura < limites.temperaturaMin) {
      if (await deveEnviar('temperaturaBaixa')) {
        await enviar('Temperatura muito baixa', 'Leve as plantas para um local mais aquecido.');
        await registrarEnvio('temperaturaBaixa');
      }
    } else {
      await limpar('temperaturaBaixa');
    }

    if (sensorData.umidade < limites.umidadeMin) {
      if (await deveEnviar('umidadeBaixa')) {
        await enviar('Umidade do ambiente baixa', 'Considere regar as plantas ou retira-las da chuva.');
        await registrarEnvio('umidadeBaixa');
      }
    } else {
      await limpar('umidadeBaixa');
    }

    if (sensorData.luminosidade === 0) {
      const escuroDesde = await AsyncStorage.getItem(CHAVE_ESCURO_DESDE);
      if (!escuroDesde) {
        await AsyncStorage.setItem(CHAVE_ESCURO_DESDE, Date.now().toString());
      } else if (Date.now() - parseInt(escuroDesde) >= DOZE_HORAS_MS) {
        if (await deveEnviar('luminosidadeBaixa')) {
          await enviar('Plantas sem luz', 'Suas plantas estão no escuro há mais de 12 horas. Leve-as para um local com luz natural.');
          await registrarEnvio('luminosidadeBaixa');
        }
      }
    } else {
      await AsyncStorage.removeItem(CHAVE_ESCURO_DESDE);
      await limpar('luminosidadeBaixa');
    }
  }
}
