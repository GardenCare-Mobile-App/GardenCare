import axios from "axios";
import { PlantaIdentificada } from "../models/IdentificationPlant";
import { identRepository } from "../repository/IdentificationPlantRepository";

const BASE_URL = "https://plant.id/api/v3/identification";
const PLANT_ID_API_KEY = process.env.EXPO_PUBLIC_PLANT_ID_API_KEY;

// Chama a API Plant.id e retorna os dados da planta
const identificarPlanta = async (base64Image: string): Promise<PlantaIdentificada> => {
  const response = await axios.post(
    `${BASE_URL}?language=pt-BR&details=common_names,description,similar_images`,
    { images: [base64Image] },
    {
      headers: {
        "Api-Key": PLANT_ID_API_KEY,
        "Content-Type": "application/json",
      },
    }
  );

  const resultado = response.data.result;

  if (!resultado?.is_plant?.binary) {
    throw new Error("Imagem não é de uma planta >:(");
  }

  const primeira = resultado.classification?.suggestions?.[0];

  const linkFoto =
    primeira?.details?.similar_images?.[0]?.url_small ||
    primeira?.details?.images?.[0]?.url ||
    primeira?.details?.image?.value ||
    null;

  const imagensAPI: string[] = [];
  if (primeira?.details?.similar_images) {
    primeira.details.similar_images.forEach((img: any) => {
      if (img.url_small || img.url) imagensAPI.push(img.url_small || img.url);
    });
  }

  return {
    nomeCientifico: primeira.name,
    nomeComum: primeira.details.common_names?.[0] || primeira.name || "Nome comum indisponível",
    descricao: primeira.details.description?.value || "Sem descrição disponível.",
    probabilidade: primeira.probability,
    identificadoEm: new Date(),
    fotoUrl: linkFoto,
    fotosSemelhantes: imagensAPI,
  };
};

// Identifica via API, salva no Firestore e retorna a planta com o id gerado
// localUri: foto tirada pelo usuário — usada como fallback se a API não retornar foto
export const identificarESalvarPlanta = async (
  base64Image: string,
  localUri?: string
): Promise<PlantaIdentificada> => {
  const planta = await identificarPlanta(base64Image);
  const plantaComFoto = {
    ...planta,
    fotoUrl: planta.fotoUrl || localUri || undefined,
  };
  const id = await identRepository.salvarIdentPlanta(plantaComFoto);
  return { ...plantaComFoto, id };
};

// Busca todas as identificações salvas do usuário
export const buscarIdentificacoes = () => identRepository.buscarIdentificacoes();

// Exclui uma identificação pelo id
export const excluirIdentificacao = (id: string) => identRepository.excluirIdentificacao(id);
