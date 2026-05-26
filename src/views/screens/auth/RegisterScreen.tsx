import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, ScrollView, ActivityIndicator,
} from 'react-native';
import { ArrowLeftIcon, EnvelopeSimpleIcon, LockKeyIcon, UserIcon } from 'phosphor-react-native';
import { useAuthViewModel } from '../../../viewmodels/AuthViewModel';
import { styles } from '../../../styles/screens/RegisterScreen.styles';
import { COLORS } from '../../../styles/globalStyles';

// opções de pronomes disponíveis para seleção
const PRONOMES = ['ele/dele', 'ela/dela', 'elu/delu', 'they/them', 'Prefiro não dizer'];

export const RegisterScreen: React.FC = ({ navigation }: any) => {
  // campos controlados pelo estado local
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [pronomes, setPronomes] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [erroLocal, setErroLocal] = useState<string | null>(null);

  // hook que cria conta no Firebase e salva sessão no AuthContext
  const { registrar, loading, erro } = useAuthViewModel();

  function handleCriarConta() {
    // validação local antes de chamar o Firebase
    if (!nome.trim()) { setErroLocal('Informe seu nome.'); return; }
    if (!email.trim()) { setErroLocal('Informe seu e-mail.'); return; }
    if (!pronomes) { setErroLocal('Selecione seus pronomes.'); return; }
    if (senha.length < 6) { setErroLocal('Senha deve ter ao menos 6 caracteres.'); return; }
    if (senha !== confirmarSenha) { setErroLocal('As senhas não coincidem.'); return; }
    setErroLocal(null);
    registrar(nome, email, pronomes, senha);
  }

  // mensagem a exibir: erro local (validação) ou erro do Firebase
  const mensagemErro = erroLocal ?? erro;

  return (
    <View style={styles.container}>

      {/* botão voltar */}
      <TouchableOpacity style={styles.header} onPress={() => navigation.goBack()}>
        <ArrowLeftIcon size={32} color="#e0e7b9" weight="regular" />
      </TouchableOpacity>

      <Text style={styles.wellcome}>Faça um novo registro</Text>

      <ScrollView contentContainerStyle={styles.campos} showsVerticalScrollIndicator={false}>

        {/* campo nome */}
        <View style={styles.contentInput}>
          <UserIcon size={32} color={COLORS.iconesCampo} />
          <TextInput
            style={styles.input}
            placeholder="Seu nome"
            placeholderTextColor="#e0e7b9"
            value={nome}
            onChangeText={setNome}
          />
        </View>

        {/* campo e-mail */}
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

        {/* seleção de pronomes por chips */}
        <Text style={styles.label}>PRONOMES</Text>
        <View style={styles.chips}>
          {PRONOMES.map((op) => (
            <TouchableOpacity
              key={op}
              style={[styles.chip, pronomes === op && styles.chipAtivo]}
              onPress={() => setPronomes(op)}
            >
              <Text style={[styles.chipTexto, pronomes === op && styles.chipTextoAtivo]}>
                {op}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* campo senha */}
        <Text style={styles.label}>SENHA</Text>
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

        {/* campo confirmar senha */}
        <View style={styles.contentInput}>
          <LockKeyIcon size={32} color={COLORS.iconesCampo} />
          <TextInput
            style={styles.input}
            placeholder="Confirme sua senha"
            placeholderTextColor="#e0e7b9"
            value={confirmarSenha}
            onChangeText={setConfirmarSenha}
            secureTextEntry
          />
        </View>

        {/* exibe erro de validação local ou erro do Firebase */}
        {mensagemErro
          ? <Text style={{ color: '#ffcccc', textAlign: 'center' }}>{mensagemErro}</Text>
          : null
        }

        {/* botão criar conta — chama registrar() do AuthViewModel */}
        <TouchableOpacity
          style={styles.buttonSignIn}
          onPress={handleCriarConta}
          disabled={loading}
        >
          {loading
            ? <ActivityIndicator color={COLORS.black} />
            : <Text style={styles.buttonSignInText}>Criar conta</Text>
          }
        </TouchableOpacity>

        {/* link para login */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Já tem conta?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.footerButtonText}>Entrar</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </View>
  );
};
