import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth, db } from '../business/firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore'; // Funções para salvar dados
import { useState } from 'react';
import { PerfilUsuario } from '../models/User';

export const useAuthViewModel = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [erro, setError ] = useState<string | null>(null);

  const registrar = async (email: string, senha: string, nome: string, pronomes: string) => {
    setLoading(true);
    setError(null);

    try{

     // cria a conta
      const userCredential = await createUserWithEmailAndPassword (auth, email, senha);
      const user = userCredential.user;

      // cria a tabela usuário seguindo PerfilUsuario 
      const novoUsuario: PerfilUsuario = {
        uid: user.uid,
        nome: nome,
        email: email,
        pronomes: pronomes,
        criadoEm: new Date().toISOString()
      };

      // envia para o firebase
      await setDoc(doc(db, 'usuarios', novoUsuario.uid), novoUsuario);

      // salva no banco nativo
      await AsyncStorage.setItem('@usuario_nome', nome);
      await AsyncStorage.setItem('@usuario_email', email);

    } catch(e) {
      console.log("erro completo:", e)
    }finally{
      setLoading(false)
    }

}
  return {registrar, loading, erro}
  
}