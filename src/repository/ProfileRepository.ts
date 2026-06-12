import {
  doc,
  getDoc,
  updateDoc,
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
} from "firebase/firestore";
import {
  deleteUser,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";
import { auth, db } from "../business/firebaseConfig";
import { PerfilUsuario } from "../models/User";

export class ProfileRepository {
  async getPerfil(): Promise<PerfilUsuario> {
    const uid = auth.currentUser?.uid;
    if (!uid) throw new Error("Usuário não autenticado.");

    const docRef = doc(db, "Usuarios", uid);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) throw new Error("Perfil não encontrado.");

    const dados = docSnap.data();
    return {
      uid,
      nome: dados.nome,
      pronomes: dados.pronomes ?? "",
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
    if (!uid) throw new Error("Usuário não autenticado.");

    await updateDoc(doc(db, "Usuarios", uid), {
      nome: dados.nome.trim(),
      pronomes: dados.pronomes.trim(),
      bio: dados.bio.trim(),
    });
  }

  async nomeJaExiste(nome: string): Promise<boolean> {
    const uid = auth.currentUser?.uid;
    if (!uid) throw new Error("Usuário não autenticado.");

    const q = query(
      collection(db, "Usuarios"),
      where("nome", "==", nome.trim()),
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.filter((doc) => doc.id !== uid).length > 0;
  }

  async uploadFoto(base64: string): Promise<string> {
    const uid = auth.currentUser?.uid;
    if (!uid) throw new Error("Usuário não autenticado.");

    const dataUri = `data:image/jpeg;base64,${base64}`;
    await updateDoc(doc(db, "Usuarios", uid), { fotoURL: dataUri });
    return dataUri;
  }
  async reautenticar(senha: string): Promise<void> {
    const user = auth.currentUser;
    if (!user || !user.email) throw new Error("Usuário não autenticado.");
    const credencial = EmailAuthProvider.credential(user.email, senha);
    await reauthenticateWithCredential(user, credencial);
  }

  async excluirConta(): Promise<void> {
    const user = auth.currentUser;
    if (!user) throw new Error("Usuário não autenticado.");
    const uid = user.uid;

    const [
      plantasSnap,
      postsSnap,
      seguidoresSnap,
      seguindoSnap,
      identificacoesSnap,
      rotinasSnap,
    ] = await Promise.all([
      getDocs(query(collection(db, "Plantas"), where("uid", "==", uid))),
      getDocs(query(collection(db, "Posts"), where("autorId", "==", uid))),
      getDocs(
        query(collection(db, "Seguidores"), where("seguidoId", "==", uid)),
      ),
      getDocs(
        query(collection(db, "Seguidores"), where("seguidorId", "==", uid)),
      ),
      getDocs(collection(db, "Usuarios", uid, "Identificacoes")),
      getDocs(query(collection(db, "Routines"), where("uid", "==", uid))),
    ]);

    await Promise.all([
      ...plantasSnap.docs.map((d) => deleteDoc(d.ref)),
      ...postsSnap.docs.map(async (postDoc) => {
        const comentariosSnap = await getDocs(collection(db, "Posts", postDoc.id, "comentarios"));
        await Promise.all([
          deleteDoc(postDoc.ref),
          ...comentariosSnap.docs.map((d) => deleteDoc(d.ref)),
        ]);
      }),
      ...seguidoresSnap.docs.map((d) => deleteDoc(d.ref)),
      ...seguindoSnap.docs.map((d) => deleteDoc(d.ref)),
      ...identificacoesSnap.docs.map((d) => deleteDoc(d.ref)),
      ...rotinasSnap.docs.map((d) => deleteDoc(d.ref)),
      deleteDoc(doc(db, "Usuarios", uid)),
    ]);

    await deleteUser(user);
  }
}