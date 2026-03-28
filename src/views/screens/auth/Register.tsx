import React, { useState } from 'react';
import { StyleSheet,TouchableOpacity,View, TextInput, Button, Text, ActivityIndicator } from 'react-native';
import { useAuthViewModel } from '../../../viewmodels/AuthViewModeels';

export const RegisterScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [nome, setNome] = useState('');
  const [pronomes, setPronomes] = useState('');

  const { registrar, loading, erro } = useAuthViewModel();

  return (
    <View style={{ padding: 20 }}>
      <TextInput placeholder="Nome" value={nome} onChangeText={setNome} />
      <TextInput placeholder="E-mail" value={email} onChangeText={setEmail} keyboardType="email-address" />
      <TextInput placeholder="Senha" value={senha} onChangeText={setSenha} secureTextEntry />
      
      <TouchableOpacity 
        style={styles.botao} 
        disabled={loading}
        onPress={() => registrar(email, senha, nome)}
      >
        {/* se estiver carregando, mostra o Spinner */}
        {loading ? (
        <ActivityIndicator size="small" color="#FFF" />
        ) : (
        // se não mostra do texto normal
        <Text style={styles.textoBotao}>Cadastrar</Text>
        )}
      </TouchableOpacity>
      
      {erro && <Text style={{ color: 'red' }}>{erro}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  botao: {
    backgroundColor: '#4CAF50', // Cor de planta!
    padding: 15,
    borderRadius: 10,
    height: 55, // Definir uma altura fixa ajuda a não "pular" quando o spinner aparece
    justifyContent: 'center',
    alignItems: 'center',
  },
  textoBotao: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});