import { doc, getDoc, updateDoc, deleteDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { db } from '../business/firebaseConfig';
import { Post } from '../models/Post';

export class PostDetailRepository {
  async getPost(id: string): Promise<Post | null> {
    const docSnap = await getDoc(doc(db, 'Posts', id));
    if (!docSnap.exists()) return null;
    return { id: docSnap.id, ...docSnap.data() } as Post;
  }

  async curtir(postId: string, uid: string): Promise<void> {
    await updateDoc(doc(db, 'Posts', postId), {
      curtidas: arrayUnion(uid),
    });
  }

  async descurtir(postId: string, uid: string): Promise<void> {
    await updateDoc(doc(db, 'Posts', postId), {
      curtidas: arrayRemove(uid),
    });
  }

  async deletarPost(postId: string): Promise<void> {
    await deleteDoc(doc(db, 'Posts', postId));
  }
}