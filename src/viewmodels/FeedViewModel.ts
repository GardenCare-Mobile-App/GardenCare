import { useState } from 'react';
import { FeedRepository } from '../repository/FeedRepository';
import { Post } from '../models/Post';
import { useAuth } from '../context/AuthContext';

const feedRepository = new FeedRepository();

export function useFeedViewModel() {
  const { usuario } = useAuth();

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
    if (!conteudo.trim() || !usuario) return;
    setEnviando(true);
    try {
      await feedRepository.criarPost(usuario.uid, usuario.nome, usuario.fotoURL, conteudo, imagemUri);
      await carregarPosts();
    } catch (e) {
      setErro('Erro ao publicar. Tente novamente.');
    } finally {
      setEnviando(false);
    }
  }

  async function toggleCurtida(post: Post) {
    if (!usuario) return;
    const jaCurtiu = post.curtidas.includes(usuario.uid);
    try {
      if (jaCurtiu) {
        await feedRepository.descurtirPost(post.id, usuario.uid);
      } else {
        await feedRepository.curtirPost(post.id, usuario.uid);
      }
      await carregarPosts();
    } catch (e) {
      setErro('Erro ao curtir. Tente novamente.');
    }
  }

  return { posts, carregando, erro, enviando, uid: usuario?.uid, carregarPosts, publicar, toggleCurtida };
}