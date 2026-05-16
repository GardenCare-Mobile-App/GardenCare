import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView,StyleSheet,TouchableOpacity,View, TextInput, Button, Text, ActivityIndicator } from 'react-native';
import { ArrowLeftIcon, EnvelopeSimpleIcon, FacebookLogoIcon, GoogleLogoIcon, LockKeyIcon } from 'phosphor-react-native';
// import { useAuthViewModel } from '../../../viewmodels/AuthViewModeels';
import { useAuthViewModel } from '../../../viewmodels/AuthViewModels';
import { styles } from "../../../styles/screens/RegisterScreen.styles"
import { COLORS } from '../../../styles/globalStyles';

export const RegisterScreen: React.FC = ({ navigation }: any) => {
// estados locais para controlar o que o usuário digita
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [pronomes, setPronomes] = useState('');

  const { registrar, loading, erro } = useAuthViewModel();

  const handleRegistro = async () => {
    // validação simples
    if (!nome || !email || !senha){
      alert("preencha os campos obrigatorios");
      return
    }

    // enviando para o business
    await registrar(email, senha, nome, pronomes)

    if(!erro){
      // se não deu erro pode navegar
      navigation.navigate('Login')
    }

  }

  return (
    <View style={styles.container}>
    
          {/* seta de voltar */}
          <TouchableOpacity 
            style={styles.header}
            onPress={() => {navigation.navigate('Inicio')
              console.log('você está tentando voltar para tela de inicio')
            }}
          >
            <ArrowLeftIcon size={32} color="#e0e7b9" weight="regular"/>
          </TouchableOpacity>
            
            {/* texto da tela */}
            <Text style={styles.wellcome}>Faça um novo registro</Text>
          <ScrollView contentContainerStyle={styles.campos}>
        
            {/* compo do email */}
            <View style={styles.content}>
              <View style={styles.contentInput}>
                <EnvelopeSimpleIcon size={32} color={COLORS.iconesCampo}/>
                <TextInput placeholder='Seu e-mail' style={styles.input} placeholderTextColor='#e0e7b9'></TextInput>
              </View>
            </View>
        
            {/* campo da senha */}
            <View style={styles.content}>
              <View style={styles.contentInput}>
                <LockKeyIcon size={32} color={COLORS.iconesCampo}/>
                <TextInput placeholder='Sua senha' style={styles.input} placeholderTextColor='#e0e7b9'></TextInput>
              </View>
            </View>

            {/* campo da pronomes */}
            <View style={styles.content}>
             <View style={styles.contentInput}>
             <LockKeyIcon size={32} color={COLORS.iconesCampo}/>
             <TextInput placeholder='Sua senha' style={styles.input} placeholderTextColor='#e0e7b9'></TextInput>
            </View>
           </View>

            {/* botão de logar */}
            <TouchableOpacity style={styles.buttonSignIn}>
              <Text style={styles.buttonSignInText}>Criar conta</Text>
            </TouchableOpacity>
        
          </ScrollView>
        </View>
        );
    }
