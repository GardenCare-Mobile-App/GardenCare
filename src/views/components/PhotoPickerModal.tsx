import React from 'react';
import { Modal, View, Text, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { MENSAGENS_FOTO_PICKER } from '../../utils/MessagesUtils';
import { createStyles } from '../../styles/components/PhotoPickerModal.styles';
import { useTheme } from '../../context/Themecontext';

interface PhotoPickerModalProps {
  visivel: boolean;
  onFechar: () => void;
  onFotoSelecionada: (uri: string, base64: string) => void;
}

export function PhotoPickerModal({
  visivel,
  onFechar,
  onFotoSelecionada,
}: PhotoPickerModalProps) {
  const { cores } = useTheme();
  const styles = createStyles(cores);

  async function abrirCamera() {
    const resultado = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
      base64: true,
    });
    if (!resultado.canceled && resultado.assets[0].base64) {
      onFotoSelecionada(resultado.assets[0].uri, resultado.assets[0].base64);
      onFechar();
    }
  }

  async function abrirGaleria() {
    const resultado = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
      mediaTypes: ['images'],
      base64: true,
    });
    if (!resultado.canceled && resultado.assets[0].base64) {
      onFotoSelecionada(resultado.assets[0].uri, resultado.assets[0].base64);
      onFechar();
    }
  }

  return (
    <Modal
      visible={visivel}
      transparent
      animationType="slide"
      onRequestClose={onFechar}
    >
      <Pressable style={styles.overlay} onPress={onFechar}>
        <Pressable style={styles.container} onPress={() => {}}>

          <Pressable onPress={onFechar}>
            <View style={styles.handle} />
          </Pressable>

          <Text style={styles.titulo}>{MENSAGENS_FOTO_PICKER.titulo}</Text>
          <Text style={styles.subtitulo}>{MENSAGENS_FOTO_PICKER.subtitulo}</Text>

          <Pressable style={styles.opcao} onPress={abrirCamera}>
            <Ionicons name="camera-outline" size={24} color={cores.acao} />
            <Text style={styles.opcaoTexto}>{MENSAGENS_FOTO_PICKER.camera}</Text>
          </Pressable>

          <Pressable style={styles.opcao} onPress={abrirGaleria}>
            <Ionicons name="images-outline" size={24} color={cores.acao} />
            <Text style={styles.opcaoTexto}>{MENSAGENS_FOTO_PICKER.galeria}</Text>
          </Pressable>

        </Pressable>
      </Pressable>
    </Modal>
  );
}