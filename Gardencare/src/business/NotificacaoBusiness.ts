import { NotificacaoRepository } from '../repository/NotificacaoRepository';

export interface PreferenciasNotificacao {
  lembreteDeRega: boolean;
  alertasSensor: boolean;
  novosPosts: boolean;
}

const notificacaoRepository = new NotificacaoRepository();

export class NotificacaoBusiness {
  async getPreferencias(uid: string): Promise<PreferenciasNotificacao> {
    return notificacaoRepository.getPreferencias(uid);
  }

  async salvarPreferencias(uid: string, preferencias: PreferenciasNotificacao): Promise<void> {
    return notificacaoRepository.salvarPreferencias(uid, preferencias);
  }
}