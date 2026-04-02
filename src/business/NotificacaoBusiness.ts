export interface PreferenciasNotificacao {
  lembreteDeRega: boolean;
  alertasSensor: boolean;
  novosPosts: boolean;
}

export class NotificacaoBusiness {
  async getPreferencias(uid: string): Promise<PreferenciasNotificacao> {
    return Promise.resolve({
      lembreteDeRega: true,
      alertasSensor: true,
      novosPosts: false,
    });
  }

  async salvarPreferencias(
    uid: string,
    preferencias: PreferenciasNotificacao
  ): Promise<void> {
    console.log('Preferências salvas:', preferencias);
  }
}