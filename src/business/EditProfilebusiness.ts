import { doc, updateDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { auth, db, storage } from './firebaseConfig';

export const PRONOMES_VALIDOS = ['ele/dele', 'ela/dela'];

export interface RegraValidacao {
  mensagem: string;
  valida: boolean;
}

export class EditProfileBusiness {
  validarNome(nome: string): RegraValidacao[] {
    return [
      {
        mensagem: 'Mínimo de 3 caracteres',
        valida: nome.trim().length >= 3,
      },
      {
        mensagem: 'Não pode estar vazio',
        valida: nome.trim().length > 0,
      },
      {
        mensagem: 'Apenas letras e espaços (sem números ou caracteres especiais)',
        valida: /^[a-zA-ZÀ-ÿ\s]+$/.test(nome.trim()),
      },
    ];
  }
  validarPronomes(pronomes: string): RegraValidacao[] {
    return [
      {
        mensagem: 'Não pode estar vazio',
        valida: pronomes.trim().length > 0,
      },
      {
        mensagem: `Apenas "${PRONOMES_VALIDOS[0]}" ou "${PRONOMES_VALIDOS[1]}"`,
        valida: PRONOMES_VALIDOS.includes(pronomes.trim()),
      },
    ];
  }
  validarBio(bio: string): RegraValidacao[] {
    return [
      {
        mensagem: 'Máximo de 25 caracteres',
        valida: bio.length <= 25,
      },
    ];
  }
  formularioValido(nome: string, pronomes: string, bio: string): boolean {
    const nomeValido = this.validarNome(nome).every((r) => r.valida);
    const pronomesValido = this.validarPronomes(pronomes).every((r) => r.valida);
    const bioValida = this.validarBio(bio).every((r) => r.valida);
    return nomeValido && pronomesValido && bioValida;
  }
  async nomeJaExiste(nome: string): Promise<boolean> {
    const uid = auth.currentUser?.uid;
    if (!uid) throw new Error('Usuário não autenticado.');

    const q = query(
      collection(db, 'Usuarios'),
      where('nome', '==', nome.trim())
    );
    const snapshot = await getDocs(q);
    const outrosComMesmoNome = snapshot.docs.filter((doc) => doc.id !== uid);
    return outrosComMesmoNome.length > 0;
  }
  async salvarPerfil(dados: {
    nome: string;
    pronomes: string;
    bio: string;
  }): Promise<void> {
    const uid = auth.currentUser?.uid;
    if (!uid) throw new Error('Usuário não autenticado.');

    if (!this.formularioValido(dados.nome, dados.pronomes, dados.bio)) {
      throw new Error('Preencha todos os campos corretamente.');
    }

    const nomeEmUso = await this.nomeJaExiste(dados.nome);
    if (nomeEmUso) {
      throw new Error('Esse nome já está sendo usado por outro usuário.');
    }

    await updateDoc(doc(db, 'Usuarios', uid), {
      nome: dados.nome.trim(),
      pronomes: dados.pronomes.trim(),
      bio: dados.bio.trim(),
    });
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
}