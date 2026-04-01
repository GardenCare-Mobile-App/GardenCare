import { useState, useEffect } from 'react';
import { PerfilUsuario } from '../models/User';
import { ProfileBusiness } from '../business/ProfileBusiness';

const profileBusiness = new ProfileBusiness();

export function useProfileViewModel(uid: string) {
  const [perfil, setPerfil] = useState<PerfilUsuario | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    carregarPerfil();
  }, [uid]);

  async function carregarPerfil() {
    try {
      setLoading(true);
      setError(null);
      const dados = await profileBusiness.getPerfil(uid);
      setPerfil(dados);
    } catch (e) {
      setError('Erro ao carregar perfil. Tente novamente.');
    } finally {
      setLoading(false);
    }
  }

  return { perfil, loading, error, recarregar: carregarPerfil };
}