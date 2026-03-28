export interface PerfilUsuario {
  uid: string;
  nome: string;
  pronomes: string;
  fotoURL?: string; // o ? significa que é opcional
  email: string;
  criadoEm: any;
}