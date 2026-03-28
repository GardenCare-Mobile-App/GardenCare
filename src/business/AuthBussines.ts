import { auth, db } from './firebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

// para o sistema não esquecer de enviar todos os dados obrigatorio
export const AuthService = {
  // nosso codigo de se registrar 
  registrar: async (email: string, senha: string, nome: string) => {
    try {
      // cria um usuário auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, senha);

      // salva no firestore
      await setDoc(doc(db, "Usuarios", userCredential.user.uid), {
        nome: nome,
        email: email,
        criadoEm: serverTimestamp(),
      });
      console.log("usuário registrado e salvo AHAHA")
    } catch (error: any) {
      console.error("não funcionou :( ", error.code, error.message);
      throw error;
    }
  }
};