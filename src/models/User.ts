export interface PerfilUsuario {
  uid: string;
  nome: string;
  pronomes: string;
  sexo: string;
  fotoURL?: string; // opcional a foto
  email: string;
  criadoEm: any;
  bio?: string;
}