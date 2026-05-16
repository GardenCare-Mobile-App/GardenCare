import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView,StyleSheet,TouchableOpacity,View, TextInput, Button, Text, ActivityIndicator } from 'react-native';
import { UserGearIcon ,IntersectThreeIcon,AlignTopIcon, ArrowLeftIcon, AtIcon, EnvelopeSimpleIcon, LockKeyIcon, CraneIcon } from 'phosphor-react-native';
// import { useAuthViewModel } from '../../../viewmodels/AuthViewModeels';
import { useAuthViewModel } from '../../../viewmodels/AuthViewModels';
import { styles } from "../../../styles/screens/RegisterScreen.styles"
import { COLORS } from '../../../styles/globalStyles';
import { Dropdown } from 'react-native-element-dropdown';
import { black } from 'react-native-paper/lib/typescript/styles/themes/v2/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const RegisterScreen: React.FC = ({ navigation }: any) => {
// estados locais para controlar o que o usuário digita
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [pronomes, setPronomes] = useState('');
  const [sexo, setSexo] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');

  const { registrar, loading, erro } = useAuthViewModel();

  const dataPronomes = [
    { label: 'Ele/Dele', value: 'ele/dele'},
    { label: 'Ela/Dela', value: 'ela/dela'},
    { label: 'Prefiro não dizer', value: 'n/a'},
  ]  
  const dataSexo = [
    { label: 'Masculino', value: 'masculino'},
    { label: 'Femino', value: 'feminino'},
    { label: 'Outro', value: 'outro'},
  ]  

  const handleRegistro = async () => {
    // validação simples
    if (!nome || !email || !senha){
      alert("preencha os campos obrigatorios");
      return
    }

    if (senha !== confirmarSenha){
      alert("as senhas precisam ser iguais");
      return
    }

    if(!erro){
      // se não deu erro pode navegar
      navigation.navigate('Login')
    }

    try {
      // criando usuário com o PerfilUsuario
      const novoUsuario = {
        uid: Math.random().toString(36).substring(2, 9),
        nome,
        pronomes,
        sexo,
        email,
        senha,
        criadoEm: new Date().toISOString(),
      };

      await AsyncStorage.setItem('@GardenCare:user', JSON.stringify(novoUsuario));
      alert("conta criada!")
      console.log("CRIADO COM SUCESSOOOOOOOOO (localmente")
    } catch (error){
      console.error("error ao salvar", error)
      alert("erro")
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
            
            {/* campo do nome */}
            <View style={styles.content}>
             <View style={styles.contentInput}>
             <AtIcon size={32} color={COLORS.iconesCampo}/>
             <TextInput 
              value={nome}
              onChangeText={setNome}
              placeholder='Seu nome' 
              style={styles.input} 
              placeholderTextColor='#e0e7b9'></TextInput>
            </View>

           </View>
            {/* campo do pronomes */}
            <View style={styles.content}>
             <View style={styles.contentInput}>
            <IntersectThreeIcon size={32} color={COLORS.iconesCampo} />
             <Dropdown 
              data={dataPronomes}
              value={pronomes}
              onChange={item =>{
                setPronomes(item.value)}
              }
              placeholder='Selecione seus pronomes'
              labelField="label"
              valueField="label"
              containerStyle={{ backgroundColor: '#16593A', borderColor: 'black'}}
              style={styles.input}
              itemTextStyle={{ color: '#e0e7b9',fontSize: 16 }}
              placeholderStyle={{ color: '#e0e7b9' }}
              />
            </View>
           </View>
            {/* campo do sexo */}
            <View style={styles.content}>
             <View style={styles.contentInput}>
            <UserGearIcon  size={32} color={COLORS.iconesCampo} />
             <Dropdown 
              data={dataSexo}
              value={sexo}
              onChange={item =>{
                setSexo(item.value)}
              }
              placeholder='Seleicone seuu sexo'
              labelField="label"
              valueField="label"
              containerStyle={{ backgroundColor: '#16593A', borderColor: 'black'}}
              style={styles.input}
              itemTextStyle={{ color: '#e0e7b9',fontSize: 16 }}
              placeholderStyle={{ color: '#e0e7b9' }}
              />
            </View>
           </View>
        
            {/* compo do email */}
            <View style={styles.content}>
              <View style={styles.contentInput}>
                <EnvelopeSimpleIcon size={32} color={COLORS.iconesCampo}/>
                <TextInput 
                  value={email}
                  onChangeText={setEmail}
                  placeholder='Seu e-mail' 
                  style={styles.input} 
                  placeholderTextColor='#e0e7b9'></TextInput>
              </View>
            </View>
        
            {/* campo da senha */}
            <View style={styles.content}>
              <View style={styles.contentInput}>
                <LockKeyIcon size={32} color={COLORS.iconesCampo}/>
                <TextInput
                  value={senha}
                  onChangeText={setSenha} 
                  placeholder='Sua senha' 
                  style={styles.input} 
                  placeholderTextColor='#e0e7b9'></TextInput>
              </View>
            </View>
            {/* campo de confirmar senha */}
            <View style={styles.content}>
              <View style={styles.contentInput}>
                <LockKeyIcon size={32} color={COLORS.iconesCampo}/>
                <TextInput
                  value={confirmarSenha}
                  onChangeText={setConfirmarSenha} 
                  placeholder='Confirma sua senha' 
                  style={styles.input} 
                  placeholderTextColor='#e0e7b9'></TextInput>
              </View>
            </View>


            {/* botão de logar */}
            <TouchableOpacity 
              style={styles.buttonSignIn}
              onPress={handleRegistro}
            >
              <Text style={styles.buttonSignInText}>Criar conta</Text>
            </TouchableOpacity>
        
          </ScrollView>
        </View>
        );
    }
