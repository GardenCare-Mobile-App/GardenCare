import React from 'react'; // Sempre bom importar o React
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import { styles } from "../../../styles/screens/InitialScreen.styles"

export const InitialScreen = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <Text style={styles.texto}>Bem-vindo ao GardenCare</Text>

      <View style={styles.content}>
        <TouchableOpacity 
          style={styles.botao}
          onPress={() => {navigation.navigate('Login')
            console.log('indo para tela de login')
          }} // Chama o nome que está no App.tsx
        >
          <Text style={styles.textoBotao}>ENTRAR</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.botao}
          onPress={() => {navigation.navigate('Register')
            console.log('indo para tela de registro')
          }} // Chama o nome que está no App.tsx
        >
         
        <Text style={styles.textoBotao}>CRIAR CONTA</Text>


        </TouchableOpacity>
      </View>
    </View>
  );
};