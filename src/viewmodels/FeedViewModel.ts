import { useState } from 'react';
import { FeedRepository } from '../repository/FeedRepository';
import { Post } from '../models/Post';

const feedRepository = new FeedRepository();

//mock de usuário pra conseguir testar as funcionalidades do feed aq sem precisar logar c/ autenticação
const uid = 'uid-teste-maria';
const autorNome = 'Maria';
const autorFotoURL = 'https://pbs.twimg.com/media/GTTtWQZaYAQuYxN.jpg';

export function useFeedViewModel() {

  const [posts, setPosts] = useState<Post[]>([]);
  const [carregando, setCarregando] = useState(false);    // true enquanto busca posts
  const [erro, setErro] = useState<string | null>(null);
  const [enviando, setEnviando] = useState(false);        // true enquanto publica post


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