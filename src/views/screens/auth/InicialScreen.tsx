import React, { useCallback } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useInicialViewModel } from '../../../viewmodels/auth/AuthInicialViewModel';
import { styles } from '../../../styles/screens/auth/InicialScreen.styles';

export const InitialScreen = () => {
  const { irParaLogin, irParaRegistrar } = useInicialViewModel();
  useFocusEffect(useCallback(() => {}, []));
  return (
    <View style={styles.container}>
      <View style={styles.containerLogo}>
        <Image
        style={styles.logo}
        source={require('../../../../assets/logoGardenCare.png')}
        />
      </View>
      <Text style={styles.texto}>Bem-vindo ao GardenCare</Text>
      <View style={styles.content}>
      
        <TouchableOpacity style={styles.botao} onPress={irParaLogin}>
          <Text style={styles.textoBotao}>ENTRAR</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.botao} onPress={irParaRegistrar}>
          <Text style={styles.textoBotao}>CRIAR CONTA</Text>
        </TouchableOpacity>
      
      </View>
    </View>
  );
};