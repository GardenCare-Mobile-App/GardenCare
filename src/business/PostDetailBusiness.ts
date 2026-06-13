import { Post } from '../models/Post';
import { Comentario } from '../models/Comentario';
import { PostDetailRepository } from '../repository/PostDetailRepository';

const repo = new PostDetailRepository();

export class PostDetailBusiness {
  async getPost(id: string): Promise<Post | null> {
    return repo.getPost(id);
  }

  async toggleCurtida(postId: string, uid: string, jaCurtiu: boolean): Promise<void> {
    if (jaCurtiu) {
      await repo.descurtir(postId, uid);
    } else {
      await repo.curtir(postId, uid);
    }
  }

  async deletarPost(postId: string): Promise<void> {
    await repo.deletarPost(postId);
  }

  async getComentarios(postId: string): Promise<Comentario[]> {
    return repo.getComentarios(postId);
  }

  async comentarPost(
    postId: string,
    autorId: string,
    autorNome: string,
    autorFotoURL: string | undefined,
    conteudo: string
  ): Promise<void> {
    return repo.comentarPost(postId, autorId, autorNome, autorFotoURL, conteudo);
  }
}