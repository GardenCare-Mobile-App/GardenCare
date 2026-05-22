import { doc, getDoc, updateDoc, collection, query, where, getDocs, deleteDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { deleteUser } from 'firebase/auth';
import { auth, db, storage } from '../business/firebaseConfig';
import { PerfilUsuario } from '../models/User';

export class ProfileRepository {

  async getPerfil(): Promise<PerfilUsuario> {
    const uid = auth.currentUser?.uid;
    if (!uid) throw new Error('Usuário não autenticado.');

    const docRef = doc(db, 'Usuarios', uid);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) throw new Error('Perfil não encontrado.');

    const dados = docSnap.data();
    return {
      uid,
      nome: dados.nome,
      pronomes: dados.pronomes ?? '',
      fotoURL: dados.fotoURL ?? undefined,
      email: dados.email,
      criadoEm: dados.criadoEm,
      bio: dados.bio ?? undefined,
    };
  }

  async atualizarPerfil(dados: {
    nome: string;
    pronomes: string;
    bio: string;
  }): Promise<void> {
    const uid = auth.currentUser?.uid;
    if (!uid) throw new Error('Usuário não autenticado.');

    await updateDoc(doc(db, 'Usuarios', uid), {
      nome: dados.nome.trim(),
      pronomes: dados.pronomes.trim(),
      bio: dados.bio.trim(),
    });
  }

  async nomeJaExiste(nome: string): Promise<boolean> {
    const uid = auth.currentUser?.uid;
    if (!uid) throw new Error('Usuário não autenticado.');

    const q = query(collection(db, 'Usuarios'), where('nome', '==', nome.trim()));
    const snapshot = await getDocs(q);
    return snapshot.docs.filter((doc) => doc.id !== uid).length > 0;
  }

  async uploadFoto(imagemUri: string): Promise<string> {
    const uid = auth.currentUser?.uid;
    if (!uid) throw new Error('Usuário não autenticado.');

    const response = await fetch(imagemUri);
    const blob = await response.blob();
    const storageRef = ref(storage, `avatares/${uid}.jpg`);
    await uploadBytes(storageRef, blob);
    const url = await getDownloadURL(storageRef);

    await updateDoc(doc(db, 'Usuarios', uid), { fotoURL: url });
    return url;
  }
  async excluirConta(): Promise<void> {
    const uid = auth.currentUser?.uid;
    if (!uid) throw new Error('Usuário não autenticado.');

    const plantasSnap = await getDocs(collection(db, 'Plantas'));
    const deletarPlantas = plantasSnap.docs.map((d) =>
      deleteDoc(doc(db, 'Plantas', d.id))
    );
    await Promise.all(deletarPlantas);
  
    await deleteDoc(doc(db, 'Usuarios', uid));

    await deleteUser(auth.currentUser!);
  }
}