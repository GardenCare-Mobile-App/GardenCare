import { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../business/firebaseConfig';
import { PerfilUsuario } from '../models/User';
import { useAuth } from '../context/AuthContext';

// traduz os códigos de erro do Firebase para português
function mapFirebaseError(code: string): string {
  switch (code) {
    case 'auth/email-already-in-use': return 'Este e-mail já está em uso.';
    case 'auth/invalid-email': return 'E-mail inválido.';
    case 'auth/weak-password': return 'Senha fraca. Use ao menos 6 caracteres.';
    case 'auth/user-not-found':
    case 'auth/wrong-password':
    case 'auth/invalid-credential': return 'E-mail ou senha incorretos.';
    case 'auth/too-many-requests': return 'Muitas tentativas. Tente mais tarde.';
    default: return 'Ocorreu um erro. Tente novamente.';
  }
}

export function useAuthViewModel() {
  // pega a função login do AuthContext para salvar a sessão no AsyncStorage
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  // cria conta no Firebase Auth + salva perfil no Firestore + salva sessão no AsyncStorage
  async function registrar(nome: string, email: string, pronomes: string, senha: string) {
    setLoading(true);
    setErro(null);
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, senha);

      const novoUsuario: PerfilUsuario = {
        uid: user.uid,
        nome: nome.trim(),
        email,
        pronomes,
        criadoEm: new Date().toISOString(),
      };

      // salva o perfil na coleção Usuarios do Firestore
      await setDoc(doc(db, 'Usuarios', user.uid), novoUsuario);

      // salva no AuthContext + AsyncStorage para manter sessão ativa
      await login(novoUsuario);
    } catch (e: any) {
      setErro(mapFirebaseError(e.code));
    } finally {
      setLoading(false);
    }
  }

  // faz login no Firebase Auth + busca perfil no Firestore + salva sessão no AsyncStorage
  async function entrar(email: string, senha: string) {
    setLoading(true);
    setErro(null);
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, senha);

      // busca os dados completos do perfil no Firestore
      const docSnap = await getDoc(doc(db, 'Usuarios', user.uid));
      if (!docSnap.exists()) throw { code: 'auth/user-not-found' };

      const usuario = { uid: user.uid, ...docSnap.data() } as PerfilUsuario;

      // salva no AuthContext + AsyncStorage para manter sessão ativa
      await login(usuario);
    } catch (e: any) {
      setErro(mapFirebaseError(e.code));
    } finally {
      setLoading(false);
    }
  }

  return { registrar, entrar, loading, erro };
}
