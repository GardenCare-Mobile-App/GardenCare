import {
  doc, getDoc, updateDoc, deleteDoc,
  arrayUnion, arrayRemove,
  collection, addDoc, getDocs, orderBy, query, serverTimestamp, increment,
} from 'firebase/firestore';
import { db } from '../business/firebaseConfig';
import { Post } from '../models/Post';
import { Comentario } from '../models/Comentario';

export class PostDetailRepository {
  async getPost(id: string): Promise<Post | null> {
    const docSnap = await getDoc(doc(db, 'Posts', id));
    if (!docSnap.exists()) return null;
    return { id: docSnap.id, ...docSnap.data() } as Post;
  }

  async curtir(postId: string, uid: string): Promise<void> {
    await updateDoc(doc(db, 'Posts', postId), { curtidas: arrayUnion(uid) });
  }

  async descurtir(postId: string, uid: string): Promise<void> {
    await updateDoc(doc(db, 'Posts', postId), { curtidas: arrayRemove(uid) });
  }

  async deletarPost(postId: string): Promise<void> {
    await deleteDoc(doc(db, 'Posts', postId));
  }

  async getComentarios(postId: string): Promise<Comentario[]> {
    const q = query(
      collection(db, 'Posts', postId, 'comentarios'),
      orderBy('criadoEm', 'asc')
    );
    const snap = await getDocs(q);
    return snap.docs.map(d => ({ id: d.id, ...d.data() } as Comentario));
  }

  async comentarPost(
    postId: string,
    autorId: string,
    autorNome: string,
    autorFotoURL: string | undefined,
    conteudo: string
  ): Promise<void> {
    await addDoc(collection(db, 'Posts', postId, 'comentarios'), {
      autorId,
      autorNome,
      autorFotoURL: autorFotoURL ?? null,
      conteudo,
      criadoEm: serverTimestamp(),
    });
    await updateDoc(doc(db, 'Posts', postId), {
      totalComentarios: increment(1),
    });
  }
}