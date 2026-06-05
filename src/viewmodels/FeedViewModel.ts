import { useState } from 'react';
import { FeedRepository } from '../repository/FeedRepository';
import { Post } from '../models/Post';
import { useAuth } from '../context/AuthContext';

const feedRepository = new FeedRepository();

export function useFeedViewModel() {
  const { usuario } = useAuth();

  const uid = usuario?.uid ?? '';
  const autorNome = usuario?.nome ?? '';
  const autorFotoURL = usuario?.fotoURL;

  const [posts, setPosts] = useState<Post[]>([]);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [enviando, setEnviando] = useState(false);

  async function carregarPosts() {
    setCarregando(true);
    setErro(null);
    try {
      const dados = await feedRepository.getPosts();
      setPosts(dados);
    } catch (e) {
      setErro('Não foi possível carregar o feed.');
    } finally {
      setCarregando(false);
    }
  }

  async function publicar(conteudo: string, imagemUri?: string) {
    if (!conteudo.trim()) return;
    setEnviando(true);
    try {
      await feedRepository.criarPost(uid, autorNome, autorFotoURL, conteudo, imagemUri);
      await carregarPosts();
    } catch (e) {
      setErro('Erro ao publicar. Tente novamente.');
    } finally {
      setEnviando(false);
    }
  }

  async function toggleCurtida(post: Post) {
    const jaCurtiu = post.curtidas.includes(uid);
    try {
      if (jaCurtiu) {
        await feedRepository.descurtirPost(post.id, uid);
      } else {
        await feedRepository.curtirPost(post.id, uid);
      }
      await carregarPosts();
    } catch (e) {
      setErro('Erro ao curtir. Tente novamente.');
    }
  }

  return { posts, carregando, erro, enviando, uid, carregarPosts, publicar, toggleCurtida };
}