import { ArrowLeftIcon, EnvelopeSimpleIcon, FacebookLogoIcon, GoogleLogoIcon, LockKeyIcon } from 'phosphor-react-native';
import { StyleSheet, TouchableOpacity, View, Text, SafeAreaViewBase, TextInput } from "react-native";
import { styles } from "../../../styles/screens/LoginScreen.styles"

export const LoginScreen = () => {
    return ( 
    <View style={styles.container}>

      {/* seta de voltar */}
      <TouchableOpacity style={styles.header}>
        <ArrowLeftIcon size={32} color="#e0e7b9" weight="regular"/>
      </TouchableOpacity>

      {/* texto da tela */}
      <Text style={styles.wellcome}>Faça login na sua conta</Text>

      {/* compo do email */}
      <View style={styles.content}>
        <View style={styles.contentInput}>
          <EnvelopeSimpleIcon size={32} color='#e0e7b9'/>
          <TextInput placeholder='Seu e-mail' style={styles.input} placeholderTextColor='#e0e7b9'></TextInput>
        </View>
      </View>

      {/* campo da senha */}
      <View style={styles.content}>
        <View style={styles.contentInput}>
          <LockKeyIcon size={32} color='#e0e7b9'/>
          <TextInput placeholder='Sua senha' style={styles.input} placeholderTextColor='#e0e7b9'></TextInput>
        </View>
      </View>

      {/* botão de logar */}
      <TouchableOpacity style={styles.buttonSignIn}>
        <Text style={styles.buttonSignInText}>Entrar</Text>
      </TouchableOpacity>

      {/* linha antes de conectar com outras redes */}
      <View style={styles.containerSeparator}>
        <View style={styles.separator}></View>
        <Text style={styles.separatorText}>ou continuar com</Text>
        <View style={styles.separator}></View>
      </View>

      {/* conectar com facebook e google */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerButton}>
          <GoogleLogoIcon size={32} color='#143110' weight='fill'/>
        </TouchableOpacity>

        <TouchableOpacity style={styles.footerButton}>
          <FacebookLogoIcon size={32} color='#143110' weight='fill'/>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Não possui conta?</Text>
        <TouchableOpacity>
          <Text style={styles.footerButtonText}>Cadastre-se</Text>
        </TouchableOpacity>
      </View>

    </View>
    );
}