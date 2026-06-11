import { collection, addDoc, getDocs, getDoc, updateDoc, doc, arrayUnion, arrayRemove, orderBy, query, where, serverTimestamp, increment } from 'firebase/firestore';
import { db } from '../business/firebaseConfig';
import { Post } from '../models/Post';
import { Comentario } from '../models/Comentario';

export class FeedRepository {

  async getPosts(): Promise<Post[]> {
    const q = query(collection(db, 'Posts'), orderBy('criadoEm', 'desc'));
    const snapshot = await getDocs(q);
    const posts = snapshot.docs.map((d) => ({ id: d.id, ...d.data() })) as Post[];

    const autorIds = [...new Set(posts.map((p) => p.autorId))];
    const autorExiste = new Map<string, boolean>();
    await Promise.all(
      autorIds.map(async (uid) => {
        const snap = await getDoc(doc(db, 'Usuarios', uid));
        autorExiste.set(uid, snap.exists());
      })
    );

    return posts.filter((p) => autorExiste.get(p.autorId) === true);
  }

  async getPostsByUser(uid: string): Promise<Post[]> {
    const q = query(collection(db, 'Posts'), orderBy('criadoEm', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs
      .map((d) => ({ id: d.id, ...d.data() }) as Post)
      .filter((p) => p.autorId === uid);
  }


  async criarPost(
    autorId: string,
    autorNome: string,
    autorFotoURL: string | undefined,
    conteudo: string,
    imagemUri?: string
  ): Promise<void> {
    let imagemURL: string | undefined = undefined;

    if (imagemUri) {
      imagemURL = await this.converterParaBase64(imagemUri);
    }

    await addDoc(collection(db, 'Posts'), {
      autorId,
      autorNome,
      autorFotoURL: autorFotoURL ?? null,
      conteudo,
      imagemURL: imagemURL ?? null, // null se não tiver imagem
      curtidas: [],
      totalComentarios: 0,
      criadoEm: serverTimestamp(),
    });
  }

  async curtirPost(postId: string, uid: string): Promise<void> {
    await updateDoc(doc(db, 'Posts', postId), {
      curtidas: arrayUnion(uid),   //garante que o mesmo UID não entra duas vezes
    });
  }

  async descurtirPost(postId: string, uid: string): Promise<void> {
    await updateDoc(doc(db, 'Posts', postId), {
      curtidas: arrayRemove(uid),
    });
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

  async getComentarios(postId: string): Promise<Comentario[]> {
    const q = query(
      collection(db, 'Posts', postId, 'comentarios'),
      orderBy('criadoEm', 'asc')
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map((d) => ({ id: d.id, ...d.data() })) as Comentario[];
  }

  async atualizarNomeAutor(uid: string, novoNome: string): Promise<void> {
    const q = query(collection(db, 'Posts'), where('autorId', '==', uid));
    const snap = await getDocs(q);
    await Promise.all(snap.docs.map((d) => updateDoc(d.ref, { autorNome: novoNome })));
  }

  async atualizarFotoAutor(uid: string, novaFotoURL: string): Promise<void> {
    const q = query(collection(db, 'Posts'), where('autorId', '==', uid));
    const snap = await getDocs(q);
    await Promise.all(snap.docs.map((d) => updateDoc(d.ref, { autorFotoURL: novaFotoURL })));
  }

  private async converterParaBase64(imagemUri: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = () => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(xhr.response);
      };
      xhr.onerror = reject;
      xhr.responseType = 'blob';
      xhr.open('GET', imagemUri, true);
      xhr.send(null);
    });
  }
}