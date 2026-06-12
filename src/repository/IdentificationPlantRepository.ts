import { db, auth } from "../business/firebaseConfig";
import { collection, addDoc, getDocs, deleteDoc, doc, orderBy, query } from "firebase/firestore";
import { PlantaIdentificada } from "../models/IdentificationPlant";

// Caminho no Firestore: Usuarios/{uid}/Identificacoes
const getColecao = () => {
  const uid = auth.currentUser?.uid;
  if (!uid) throw new Error("Usuário não autenticado.");
  return collection(db, "Usuarios", uid, "Identificacoes");
};

export const identRepository = {
  async salvarIdentPlanta(dados: PlantaIdentificada): Promise<string> {
    const ref = await addDoc(getColecao(), {
      nomeCientifico: dados.nomeCientifico,
      nomeComum: dados.nomeComum,
      descricao: dados.descricao,
      probabilidade: dados.probabilidade,
      identificadoEm: dados.identificadoEm,
      fotoUrl: dados.fotoUrl || "",
    });
    return ref.id;
  },

  // Busca todas as identificações ordenadas da mais recente para a mais antiga
  async buscarIdentificacoes(): Promise<PlantaIdentificada[]> {
    const q = query(getColecao(), orderBy("identificadoEm", "desc"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((d) => ({
      id: d.id,
      ...(d.data() as Omit<PlantaIdentificada, "id">),
    }));
  },

  // Exclui uma identificação pelo id do documento
  async excluirIdentificacao(id: string): Promise<void> {
    const uid = auth.currentUser?.uid;
    if (!uid) throw new Error("Usuário não autenticado.");
    await deleteDoc(doc(db, "Usuarios", uid, "Identificacoes", id));
  },
};
