// RESPONSABILIDADE: única camada que fala diretamente com o firebase nenhuma outra camada importa firebase aqui 

import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../../business/firebaseConfig';
import { PerfilUsuario } from '../../models/User';

export const AuthRepository = {

    async criarUsuarioAuth(email: string, senha: string) {
        const { user } = await createUserWithEmailAndPassword(auth, email, senha);
        return user;
    },

    async loginAuth(email: string, senha: string) {
        const { user } = await signInWithEmailAndPassword(auth, email, senha);
        return user;
    },

    async salvarPerfil(perfil: PerfilUsuario): Promise<void> {
        await setDoc(doc(db, 'Usuarios', perfil.uid), perfil);
    },

    async buscarPerfil(uid: string): Promise<PerfilUsuario | null> {
        const docSnap = await getDoc(doc(db, 'Usuarios', uid));
        if (!docSnap.exists()) return null;
        return { uid, ...docSnap.data() } as PerfilUsuario;
    },
};