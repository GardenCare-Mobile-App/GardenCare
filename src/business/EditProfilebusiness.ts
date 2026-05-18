import { ProfileRepository } from '../repository/ProfileRepository';
import { RegraValidacao } from '../models/RegraValidacao';

export { RegraValidacao };

export const PRONOMES_VALIDOS = ['ele/dele', 'ela/dela'];

const profileRepository = new ProfileRepository();

export class EditProfileBusiness {
  validarNome(nome: string): RegraValidacao[] {
    return [
      {
        mensagem: 'Não pode estar vazio',
        valida: nome.trim().length > 0,
      },
      {
        mensagem: 'Mínimo de 3 caracteres',
        valida: nome.trim().length >= 3,
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
  async salvarPerfil(dados: {
    nome: string;
    pronomes: string;
    bio: string;
  }): Promise<void> {
    if (!this.formularioValido(dados.nome, dados.pronomes, dados.bio)) {
      throw new Error('Preencha todos os campos corretamente.');
    }

    const nomeEmUso = await profileRepository.nomeJaExiste(dados.nome);
    if (nomeEmUso) {
      throw new Error('Esse nome já está sendo usado por outro usuário.');
    }

    await profileRepository.atualizarPerfil(dados);
  }

  async uploadFoto(imagemUri: string): Promise<string> {
    return profileRepository.uploadFoto(imagemUri);
  }
}