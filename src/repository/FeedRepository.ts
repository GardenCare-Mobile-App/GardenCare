import { collection, addDoc, getDocs, getDoc, updateDoc, doc, arrayUnion, arrayRemove, orderBy, query, where, serverTimestamp} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../business/firebaseConfig';
import { Post } from '../models/Post';

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
      imagemURL = await this.uploadImagemPost(imagemUri);
    }

    await addDoc(collection(db, 'Posts'), {
      autorId,
      autorNome,
      autorFotoURL: autorFotoURL ?? null,
      conteudo,
      imagemURL: imagemURL ?? null, // null se não tiver imagem
      curtidas: [],                 // começa sem nenhuma curtida
      criadoEm: serverTimestamp(),  // timestamp gerado pelo servidor
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

  private async uploadImagemPost(imagemUri: string): Promise<string> {
    const response = await fetch(imagemUri);
    const blob = await response.blob();

    const storageRef = ref(storage, `posts/${Date.now()}.jpg`);

    await uploadBytes(storageRef, blob);

    return await getDownloadURL(storageRef);
  }
}