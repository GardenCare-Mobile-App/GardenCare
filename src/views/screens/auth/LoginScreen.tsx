import React, { useCallback } from 'react';
import { KeyboardAvoidingView, Platform, View, Text, TextInput, TouchableOpacity,
ActivityIndicator } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { ArrowLeftIcon, EnvelopeSimpleIcon, LockKeyIcon, EyeIcon, EyeClosedIcon } from
'phosphor-react-native';
import { useLoginViewModel } from '../../../viewmodels/auth/AuthLoginViewModel';
import { styles } from '../../../styles/screens/auth/LoginScreen.styles';
import { COLORS } from '../../../styles/globalStyles';

export const LoginScreen = () => {

  const { state, entrarComGoogle } = useLoginViewModel();

  const vm = useLoginViewModel();

  useFocusEffect(
    useCallback(() => {
    vm.resetar();
    }, [])
  );
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      
      <View style={styles.container}>
      
        <TouchableOpacity style={styles.header} onPress={vm.voltar}>
          <ArrowLeftIcon size={32} color="#e0e7b9" weight="regular" />
        </TouchableOpacity>
        
        <Text style={styles.wellcome}>Faça login na sua conta</Text>
        
        <View style={styles.content}>
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
        </View>
        
        <View style={styles.content}>
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
        </View>
        
        {vm.erro ? (
        <Text style={{ color: '#ffcccc', marginTop: 12, textAlign: 'center' }}>{vm.erro}</Text>
        ) : null}
        
        <TouchableOpacity
        style={styles.buttonSignIn}
        onPress={vm.entrar}
        disabled={vm.loading}
        >
          {vm.loading
          ? <ActivityIndicator color={COLORS.black} />
          : <Text style={styles.buttonSignInText}>Entrar</Text>
          }
        </TouchableOpacity>
        
        <View style={styles.containerSeparator}>
          <View style={styles.separator} />
          <View style={styles.separator} />
        </View>

          <View>
      {/* 3. NOVO BOTÃO DO GOOGLE (Garante que também respeita o loading do state) */}
      {state.loading ? (
        <ActivityIndicator size="small" color="#4CAF50" />
      ) : (
        <TouchableOpacity  onPress={entrarComGoogle}>
          <Text >Entrar com o Google</Text>
        </TouchableOpacity>
      )}

      {/* Exibição de erros centralizada do Reducer */}
      {state.erro && <Text >{state.erro}</Text>}
    </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Não possui conta?</Text>
            <TouchableOpacity onPress={vm.irParaRegistrar}>
            <Text style={styles.footerButtonText}>Cadastre-se</Text>
          </TouchableOpacity>
          </View>
      </View>
    
    </KeyboardAvoidingView>
  );
}

