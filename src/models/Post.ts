export interface Post {
  id: string; 
  autorId: string;
  autorNome: string;
  autorFotoURL?: string;
  conteudo: string;
  imagemURL?: string; 
  curtidas: string[]; 
  criadoEm: any;
}