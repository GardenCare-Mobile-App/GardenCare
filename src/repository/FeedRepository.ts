import { collection, addDoc, getDocs, updateDoc, doc, arrayUnion, arrayRemove, orderBy, query, serverTimestamp} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../business/firebaseConfig';
import { Post } from '../models/Post';

export class FeedRepository {

  //busca todos os posts e ordena do mais recente pro mais antigo
  async getPosts(): Promise<Post[]> {
    const q = query(collection(db, 'Posts'), orderBy('criadoEm', 'desc'));
    const snapshot = await getDocs(q);

    // p/ cada documento do firestore, monta um objeto Post com o id + os dados
    return snapshot.docs.map((d) => ({
      id: d.id,
      ...d.data(),
    })) as Post[];
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

  private async uploadImagemPost(imagemUri: string): Promise<string> {
    const response = await fetch(imagemUri);
    const blob = await response.blob();

    const storageRef = ref(storage, `posts/${Date.now()}.jpg`);

    await uploadBytes(storageRef, blob);

    return await getDownloadURL(storageRef);
  }
}