import { PerfilUsuario } from "../models/User";

// import axios from 'axios';

const mockPerfil: PerfilUsuario = {
  uid: "1",
  nome: "Gustavo Monteiro",
  pronomes: "ele/dele",
  fotoURL: undefined,
  email: "gustavo@email.com",
  criadoEm: new Date("2024-03-01"),
};

export class ProfileBusiness {
  async getPerfil(uid: string): Promise<PerfilUsuario> {
    return Promise.resolve(mockPerfil);
  }
}
