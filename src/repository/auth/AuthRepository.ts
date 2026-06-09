<<<<<<< Updated upstream
// RESPONSABILIDADE: única camada que fala diretamente com o firebase nenhuma outra camada importa firebase aqui 

import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
=======
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithCredential, GoogleAuthProvider, User } from 'firebase/auth';
>>>>>>> Stashed changes
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../../business/firebaseConfig';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import firebaseAuth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { PerfilUsuario } from '../../models/User';

export const AuthRepository = {

    async loginComGoogle(): Promise<User | null> {
        try{
            // verifica se tem google play
            await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true});
            // abrindo a janelinha das contas
            const signInResult = await GoogleSignin.signIn();
            if (signInResult.type === 'success' && signInResult.data) {

                const idToken = signInResult.data.idToken

                if (!idToken){
                    throw new Error('Token n foi gerado');
                }
                
                const googleCredential = GoogleAuthProvider.credential(idToken);
                const userCredetial = await signInWithCredential(auth , googleCredential);
                
                return userCredetial.user;
            } else {
                throw new Error('login cancelado')
            }

        } catch(erro) {
            console.error("erro ao logar com google", erro)
            throw erro
        }
    },

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