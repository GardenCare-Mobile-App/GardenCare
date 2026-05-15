import { auth, db } from './firebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { PerfilUsuario } from '../models/User';

// para o sistema não esquecer de enviar todos os dados obrigatorio
export const AuthService = {
  
  // salvando no firebase
  async salvarPerfilFire(perfil: PerfilUsuario){
    try {

      const userRef = doc(db, "usuarios", perfil.uid);

      // enviando dados para o firebase
      await setDoc(userRef, perfil);
      console.log("dados enviados!")
      return true
    
    }catch(error){
      console.error("erro ao salvar no firestore:", error);
      throw error; // 
    }
  }
  
};