import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, ActivityIndicator,
} from 'react-native';
import { ArrowLeftIcon, EnvelopeSimpleIcon, LockKeyIcon } from 'phosphor-react-native';
import { useAuthViewModel } from '../../../viewmodels/AuthViewModel';
import { styles } from '../../../styles/screens/LoginScreen.styles';
import { COLORS } from '../../../styles/globalStyles';

export const LoginScreen = ({ navigation }: any) => {
  // campos controlados pelo estado local
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  // hook que faz o login no Firebase e salva sessão no AuthContext
  const { entrar, loading, erro } = useAuthViewModel();

  return (
    <View style={styles.container}>

      {/* botão voltar */}
      <TouchableOpacity style={styles.header} onPress={() => navigation.goBack()}>
        <ArrowLeftIcon size={32} color="#e0e7b9" weight="regular" />
      </TouchableOpacity>

      <Text style={styles.wellcome}>Faça login na sua conta</Text>

      {/* campo e-mail */}
      <View style={styles.content}>
        <View style={styles.contentInput}>
          <EnvelopeSimpleIcon size={32} color={COLORS.iconesCampo} />
          <TextInput
            style={styles.input}
            placeholder="Seu e-mail"
            placeholderTextColor="#e0e7b9"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
      </View>

      {/* campo senha */}
      <View style={styles.content}>
        <View style={styles.contentInput}>
          <LockKeyIcon size={32} color={COLORS.iconesCampo} />
          <TextInput
            style={styles.input}
            placeholder="Sua senha"
            placeholderTextColor="#e0e7b9"
            value={senha}
            onChangeText={setSenha}
            secureTextEntry
          />
        </View>
      </View>

      {/* exibe erro do Firebase traduzido */}
      {erro ? <Text style={{ color: '#ffcccc', marginTop: 12, textAlign: 'center' }}>{erro}</Text> : null}

      {/* botão de login — chama entrar() do AuthViewModel */}
      <TouchableOpacity
        style={styles.buttonSignIn}
        onPress={() => entrar(email, senha)}
        disabled={loading}
      >
        {loading
          ? <ActivityIndicator color={COLORS.black} />
          : <Text style={styles.buttonSignInText}>Entrar</Text>
        }
      </TouchableOpacity>

      <View style={styles.containerSeparator}>
        <View style={styles.separator} />
        <View style={styles.separator} />
      </View>

      {/* link para cadastro */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Não possui conta?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.footerButtonText}>Cadastre-se</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
};
