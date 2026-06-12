export interface PlantaIdentificada{
    id?: string;
    nomeCientifico: string;
    nomeComum: string;
    descricao: string;
    probabilidade: number;
    identificadoEm: any;
    fotoUrl?: string;
    fotosSemelhantes: string[];
}