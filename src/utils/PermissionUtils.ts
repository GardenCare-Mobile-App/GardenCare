import * as ImagePicker from 'expo-image-picker';
import { Linking, Alert } from 'react-native';
import {  MENSAGENS_PERMISSAO } from './MessagesUtils';

async function jaTemPermissoes(): Promise<boolean> {
  const camera = await ImagePicker.getCameraPermissionsAsync();
  const galeria = await ImagePicker.getMediaLibraryPermissionsAsync();
  return camera.status === 'granted' && galeria.status === 'granted';
}
async function solicitarPermissoes(): Promise<boolean> {
  const camera = await ImagePicker.requestCameraPermissionsAsync();
  const galeria = await ImagePicker.requestMediaLibraryPermissionsAsync();
  return camera.status === 'granted' && galeria.status === 'granted';
}
export async function verificarPermissoesParaFoto(): Promise<boolean> {

  const jaTemTudo = await jaTemPermissoes();
  if (jaTemTudo) return true;

  const concedido = await solicitarPermissoes();
  if (concedido) return true;

  Alert.alert(
    'Permissão necessária',
    'O GardenCare precisa acessar sua câmera e galeria para que você possa adicionar uma foto de perfil. Você pode permitir nas configurações do seu celular.',
    [
      { text: 'Agora não', style: 'cancel' },
      { text: 'Abrir configurações', onPress: () => Linking.openSettings() },
    ]
  );

  return false;
}

export async function checkCameraPermission(): Promise<boolean> {
  const { status } = await ImagePicker.getCameraPermissionsAsync();
  return status === 'granted';
}
export async function checkGalleryPermission(): Promise<boolean> {
  const { status } = await ImagePicker.getMediaLibraryPermissionsAsync();
  return status === 'granted';
}