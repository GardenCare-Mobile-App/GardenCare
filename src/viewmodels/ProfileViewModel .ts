import { useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PerfilUsuario } from "../models/User";
import { Plant } from "../models/Plant";
import { ProfileBusiness } from "../business/ProfileBusiness";
import { GardenBusiness } from "../business/MyGardenBusiness";
import { NotificacaoBusiness, PreferenciasNotificacao } from "../business/NotificacaoBusiness";

const profileBusiness = new ProfileBusiness();
const gardenBusiness = new GardenBusiness();
const notificacaoBusiness = new NotificacaoBusiness();

const UID_MOCK = "1";

export function useProfileViewModel() {
  const [perfil, setPerfil] = useState<PerfilUsuario | null>(null);
  const [plantas, setPlantas] = useState<Plant[]>([]);
  const [totalPosts, setTotalPosts] = useState(34);
  const [totalSeguidores, setTotalSeguidores] = useState(210);
  const [notificacoes, setNotificacoes] = useState<PreferenciasNotificacao>({
    lembreteDeRega: true,
    alertasSensor: true,
    novosPosts: false,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    carregarPerfil(UID_MOCK);
  }, []);

  async function carregarPerfil(uid: string) {
    try {
      setLoading(true);
      setError(null);

      // buscando do fire base
      const [dadosPerfil, dadosPlantas, dadosNotificacoes] = await Promise.all([
        profileBusiness.getPerfil(uid),
        gardenBusiness.getPlants(),
        notificacaoBusiness.getPreferencias(uid),
      ]);

      // salvando no local
      if (dadosPerfil){
        await AsyncStorage.setItem('@usuario_perfil', JSON.stringify(dadosPerfil));
      }

      setPerfil(dadosPerfil);
      setPlantas(dadosPlantas);
      setNotificacoes(dadosNotificacoes);
      
    } catch (e) {
      setError("Erro ao carregar perfil. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  async function toggleFavorita(id: string, valor: boolean) {
    await gardenBusiness.toggleFavorita(id, valor);
    setPlantas((anterior) =>
      anterior.map((p) => (p.id === id ? { ...p, favorita: valor } : p)),
    );
  }

  async function alterarNotificacao(
    chave: keyof PreferenciasNotificacao,
    valor: boolean,
  ) {
    const novasPreferencias = { ...notificacoes, [chave]: valor };
    setNotificacoes(novasPreferencias);
    await notificacaoBusiness.salvarPreferencias(UID_MOCK, novasPreferencias);
  }

  const plantasFavoritas = plantas.filter((p) => p.favorita);
  const totalPlantas = plantas.length;

  return {
    perfil,
    totalPlantas,
    totalPosts,
    totalSeguidores,
    plantasFavoritas,
    notificacoes,
    toggleFavorita,
    alterarNotificacao,
    loading,
    error,
    recarregar: () => carregarPerfil(UID_MOCK),
  };
}
