import { Post } from '../models/Post';
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
}