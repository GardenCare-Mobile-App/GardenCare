import axios from 'axios';
import { PerfilUsuario } from '../models/User';
 
export class ProfileBusiness {
  async getPerfil(uid: string): Promise<PerfilUsuario> {
    const response = await axios.get(`/api/usuarios/${uid}`);
    return response.data;
  }
}