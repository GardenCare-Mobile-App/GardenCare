import React, { useCallback } from 'react';
import { KeyboardAvoidingView, Platform, Modal, View, Text, TextInput, TouchableOpacity,
ScrollView, ActivityIndicator } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { ArrowLeftIcon, EnvelopeSimpleIcon, LockKeyIcon, UserIcon, EyeIcon,
EyeClosedIcon } from 'phosphor-react-native';
import { useRegisterViewModel } from '../../../viewmodels/auth/AuthRegisterViewModel';
import { styles } from '../../../styles/screens/auth/RegisterScreen.styles';
import { COLORS } from '../../../styles/globalStyles';

const PRONOMES = ['ele/dele', 'ela/dela', 'elu/delu', 'Prefiro não dizer'];

export const RegisterScreen: React.FC = () => {

const vm = useRegisterViewModel();
  useFocusEffect(
  useCallback(() => {
  vm.resetar();
  }, [])
);

return (
  <KeyboardAvoidingView
    style={styles.container}
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
  >
    
    <TouchableOpacity style={styles.header} onPress={vm.voltar}>
      <ArrowLeftIcon size={32} color="#e0e7b9" weight="regular" />
    </TouchableOpacity>
    
    <Text style={styles.wellcome}>Faça um novo registro</Text>
    
    <ScrollView
      contentContainerStyle={styles.campos}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.contentInput}>
        <UserIcon size={32} color={COLORS.iconesCampo} />
        <TextInput
          style={styles.input}
          placeholder="Seu nome"
          placeholderTextColor="#e0e7b9"
          value={vm.nome}
          onChangeText={vm.setNome}
        />
      </View>

      <View style={styles.contentInput}>
        <EnvelopeSimpleIcon size={32} color={COLORS.iconesCampo} />
        <TextInput
          style={styles.input}
          placeholder="Seu e-mail"
          placeholderTextColor="#e0e7b9"
          value={vm.email}
          onChangeText={vm.setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      <Text style={styles.label}>PRONOMES</Text>
      <View style={styles.chips}>
        {PRONOMES.map((op) => (
          <TouchableOpacity
            key={op}
            style={[styles.chip, vm.pronomes === op && styles.chipAtivo]}
            onPress={() => vm.setPronomes(op)}
          >
            <Text style={[styles.chipTexto, vm.pronomes === op && styles.chipTextoAtivo]}>
              {op}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.contentInput}>
        <LockKeyIcon size={32} color={COLORS.iconesCampo} />
        <TextInput
          style={styles.input}
          placeholder="Sua senha"
          placeholderTextColor="#e0e7b9"
          value={vm.senha}
          onChangeText={vm.setSenha}
          secureTextEntry={!vm.senhaVisivel}
        />
        <TouchableOpacity onPress={vm.toggleSenhaVisivel}>
          {vm.senhaVisivel
          ? <EyeIcon size={32} color={COLORS.iconesCampo} />
          : <EyeClosedIcon size={32} color={COLORS.iconesCampo} />
          }
        </TouchableOpacity>
      </View>

      <View style={styles.contentInput}>
        <LockKeyIcon size={32} color={COLORS.iconesCampo} />
        <TextInput
          style={styles.input}
          placeholder="Confirme sua senha"
          placeholderTextColor="#e0e7b9"
          value={vm.confirmarSenha}
          onChangeText={vm.setConfirmarSenha}
          secureTextEntry={!vm.confirmarSenhaVisivel}
        />
        <TouchableOpacity onPress={vm.toggleConfirmarSenhaVisivel}>
          {vm.confirmarSenhaVisivel
          ? <EyeIcon size={32} color={COLORS.iconesCampo} />
          : <EyeClosedIcon size={32} color={COLORS.iconesCampo} />
          }
        </TouchableOpacity>
      </View>

      {vm.mensagemErro ? (
      <Text style={{ color: '#f39797', textAlign: 'center' }}>{vm.mensagemErro}</Text>
      ) : null}
      
      <TouchableOpacity
        style={styles.buttonSignIn}
        onPress={vm.handleCriarConta}
        disabled={vm.loading}
      >

        {vm.loading
        ? <ActivityIndicator color={COLORS.black} />
        : <Text style={styles.buttonSignInText}>Criar conta</Text>
        }

      </TouchableOpacity>
      
      <View style={styles.footer}>
        <Text style={styles.footerText}>Já tem conta?</Text>
        <TouchableOpacity onPress={vm.irParaLogin}>
          <Text style={styles.footerButtonText}>Entrar</Text>
        </TouchableOpacity>
      </View>

    </ScrollView>
    
    <Modal
      animationType="slide"
      transparent={true}
      visible={vm.modalVisivel}
      onRequestClose={() => vm.setModalVisivel(false)}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContent}>
          <Text>Este é o seu Modal!</Text>
          <TouchableOpacity onPress={() => vm.setModalVisivel(false)}>
            <Text>Fechar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  </KeyboardAvoidingView>
  );
};