import { useState } from 'react';
import { SearchRepository } from '../repository/SearchRepository';
import { PerfilUsuario } from '../models/User';

const searchRepository = new SearchRepository();

export function useSearchViewModel() {
  const [resultados, setResultados] = useState<PerfilUsuario[]>([]);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [buscou, setBuscou] = useState(false);

  async function buscar(termo: string) {
    if (!termo.trim()) {
      setResultados([]);
      setBuscou(false);
      return;
    }
    setCarregando(true);
    setErro(null);
    try {
      const usuarios = await searchRepository.buscarUsuariosPorNome(termo);
      setResultados(usuarios);
      setBuscou(true);
    } catch {
      setErro('Erro ao buscar usuários. Tente novamente.');
    } finally {
      setCarregando(false);
    }
  }

  function limpar() {
    setResultados([]);
    setBuscou(false);
    setErro(null);
  }

  return { resultados, carregando, erro, buscou, buscar, limpar };
}