import { FeedRepository } from '../repository/FeedRepository';
import { Post } from '../models/Post';
import { Comentario } from '../models/Comentario';

const feedRepository = new FeedRepository();

export class FeedBusiness {

  async getPosts(): Promise<Post[]> {
    return feedRepository.getPosts();
  }

  async getPostsByUser(uid: string): Promise<Post[]> {
    return feedRepository.getPostsByUser(uid);
  }

  async criarPost(
    autorId: string,
    autorNome: string,
    autorFotoURL: string | undefined,
    conteudo: string,
    imagemUri?: string
  ): Promise<void> {
    if (!conteudo.trim()) throw new Error('O post não pode estar vazio.');
    return feedRepository.criarPost(autorId, autorNome, autorFotoURL, conteudo, imagemUri);
  }

  async curtirPost(postId: string, uid: string): Promise<void> {
    return feedRepository.curtirPost(postId, uid);
  }

  async descurtirPost(postId: string, uid: string): Promise<void> {
    return feedRepository.descurtirPost(postId, uid);
  }

  async comentarPost(
    postId: string,
    autorId: string,
    autorNome: string,
    autorFotoURL: string | undefined,
    conteudo: string
  ): Promise<void> {
    return feedRepository.comentarPost(postId, autorId, autorNome, autorFotoURL, conteudo);
  }

  async getComentarios(postId: string): Promise<Comentario[]> {
    return feedRepository.getComentarios(postId);
  }
}