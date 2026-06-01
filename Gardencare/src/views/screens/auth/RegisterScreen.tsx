import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView,StyleSheet,TouchableOpacity,View, TextInput, Button, Text, ActivityIndicator } from 'react-native';
import { ArrowLeftIcon, EnvelopeSimpleIcon, FacebookLogoIcon, GoogleLogoIcon, LockKeyIcon } from 'phosphor-react-native';
// import { useAuthViewModel } from '../../../viewmodels/AuthViewModeels';
import { styles } from "../../../styles/screens/RegisterScreen.styles"
import { COLORS } from '../../../styles/globalStyles';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore'
import { getFirestore } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { auth, db } from '../../../business/firebaseConfig'; // ajuste o caminho para o seu arquivo de config
import { createUserWithEmailAndPassword } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';


const SEXOS = ['Masculino', 'Feminino', 'Não-binário', 'Prefiro não dizer'];
const PRONOMES = ['ele/dele', 'ela/dela', 'elu/delu', 'they/them', 'Prefiro não dizer'];


export const RegisterScreen: React.FC = ({ navigation }: any) => {

  const [campos, setCampos] = useState({
    nome: '', email: '', sexo: '',
    pronomes: '', senha: '', confirmarSenha:'',
  });
  const [foco, setFoco] = useState(null);
  const [senhaVisivel, setSenhaVisivel] = useState(null)
  const [confirmarSenhaVisivel, setConfirmarSenhaVisivel] = useState(null)

  const set = (campo: string, val: any) => setCampos(c => ({ ...c, [campo]: val }));

  // salvando localmente
  const salvarLocal = async () => {
    const dados = {nome: campos.nome, sexo: campos.sexo, pronomes: campos.pronomes}
    await AsyncStorage.setItem('perfil', JSON.stringify(dados))
  };

  // enviando para o firebase
  const cadastrarFirebase = async () => {
    if (campos.senha!==campos.confirmarSenha) {
      alert("as senhas não coincidem")
      return;
    }

    try {

      const userCredential = await createUserWithEmailAndPassword(auth, campos.email, campos.senha);
      const user = userCredential.user;

      // salvando o resto no fire
      await setDoc(doc(db, "usuario", user.uid), {
        nome: campos.nome,  
        sexo: campos.sexo,  
        pronomes: campos.pronomes,  
        email: campos.email,  
        criadoEm: serverTimestamp(),  
      });

      await salvarLocal();
      alert("usuário cadastrado com sucesso!")

    } catch (error) {
      console.error(error);
      // alert("erro ao cadastrar: " + error.message)
    }

  }

  // const inputStyle = (campo) => [
  //   styles.input,
  //   foco === campo && styles.inputFoco
  // ];

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

            {/* Sexo — campo de seleção */}
            <Text style={styles.label}>SEXO</Text>
            <View style={styles.chips}>
              {SEXOS.map(op => (
                <TouchableOpacity key={op}
                  style={[styles.chip, campos.sexo === op && styles.chipAtivo]}
                  onPress={() => set('sexo', op)}>
                  <Text style={[styles.chipTexto, campos.sexo === op && styles.chipTextoAtivo]}>
                    {op}
                  </Text>
                </TouchableOpacity>
              ))}
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
        
            {/* Senha com censura (secureTextEntry) */}
      <Text style={styles.label}>SENHA</Text>
      <View style={styles.senhaRow}>
        <TextInput
          // style={[inputStyle('senha'), { flex: 1 }]}
          style={styles.input}
          placeholder="Digite sua senha"
          value={campos.senha}
          secureTextEntry={!senhaVisivel}   // ← CENSURA AQUI!
          onChangeText={v => set('senha', v)}
          // onFocus={() => setFoco('senha')} onBlur={() => setFoco(null)}
        />
        {/* <TouchableOpacity onPress={() => setSenhaVisivel(v => !v)} style={styles.olho}>
          <Text>{senhaVisivel ? '🙈' : '👁️'}</Text>
        </TouchableOpacity> */}
      </View>

          </ScrollView>
        </View>
        );
    }