import { useEffect, useState } from 'react';
import { auth } from '../business/firebaseConfig';
import { AuthService } from '../business/AuthBussines';

export const useAuthViewModel = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [erro, setErro ] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);

  const registrar = async (email: string, senha: string, nome: string) => {
    setLoading(true);
    try{
      await AuthService.registrar(email, senha, nome);
    } catch(error){
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // parte do vigia, que ve se usuário esta logado
  useEffect(() => {
    const sairConta = auth.onAuthStateChanged((userFound) => {
      setUser(userFound);
      setLoading(false);
    });
    return sairConta; // limpando o vigia
  },[]);


  return {registrar, loading, erro, user};

}