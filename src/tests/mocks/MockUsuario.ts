import { RegraValidacao } from '../../models/RegraValidacao';

export const mockUsuario = {
  nome: 'Julia',
  fotoURL: 'https://example.com/foto.jpg',
};

export const mockRegras: RegraValidacao[] = [
  { mensagem: 'Mínimo 6 caracteres', valida: true },
  { mensagem: 'Contém número', valida: false },
];
