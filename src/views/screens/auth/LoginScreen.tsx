import { ArrowLeftIcon, EnvelopeSimpleIcon, FacebookLogoIcon, GoogleLogoIcon, LockKeyIcon } from 'phosphor-react-native';
import { StyleSheet, TouchableOpacity, View, Text, SafeAreaViewBase, TextInput } from "react-native";

export const LoginScreen = () => {
    return ( 
    <View style={styles.container}>

      {/* seta de voltar */}
      <TouchableOpacity style={styles.header}>
        <ArrowLeftIcon size={32} color="#f4f4f4" weight="regular"/>
      </TouchableOpacity>

      {/* texto da tela */}
      <Text style={styles.wellcome}>Faça login na sua conta</Text>

      {/* compo do email */}
      <View style={styles.content}>
        <View style={styles.contentInput}>
          <EnvelopeSimpleIcon size={32} color='#a0a0a0'/>
          <TextInput placeholder='Seu e-mail' style={styles.input} placeholderTextColor='#757575'></TextInput>
        </View>
      </View>

      {/* campo da senha */}
      <View style={styles.content}>
        <View style={styles.contentInput}>
          <LockKeyIcon size={32} color='#a0a0a0'/>
          <TextInput placeholder='Sua senha' style={styles.input} placeholderTextColor='#757575'></TextInput>
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

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#ebffe4",
      alignItems: 'center',
      paddingHorizontal: 20,
    },
    header:{
      alignSelf: "flex-start",
      marginTop: 50,
    },
    wellcome:{
      color: "#143110",
      marginTop: 50,
      fontSize: 24,
      fontWeight: "600",
    },
    content:{
      width: '100%',
      marginTop: 50,
      alignItems: 'center',
      gap: 20,
    },
    contentInput:{
      width: '100%',
      height: 56,
      backgroundColor: "#4a5349",
      borderRadius: 12,
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 20,
      gap: 10,
      elevation: 10,
    },
    input:{
      flex: 1,
      color: "#a0a0a0"
    },
    buttonSignIn:{
      backgroundColor: "#1ab55c",
      width: '100%',
      height: 56,
      borderRadius: 36,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 40,
    },
    buttonSignInText:{
      color: '#143110',
      fontSize: 16,
      fontWeight: '800'
    },
    containerSeparator:{
      width: '100%',
      marginTop:50,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 10,
    },
    separator:{
      height: 1,
      backgroundColor: '#a0a0a0',
      flex: 1,
    },
    separatorText: {
      color: '#143110',
      fontSize: 16,
      fontWeight: '400'
    },
    footer:{
      marginTop: 50,
      flexDirection: 'row',
      gap: 10
    },
    footerButton:{
      width: 100,
      height: 60,
      backgroundColor: "#9fd3a4",
      justifyContent: 'center',
      alignItems: 'center'
    },
    footerText:{
      color: '#143110',
      fontSize: 16,
      fontWeight: "400"
    },
    footerButtonText:{
      color: "#1ab55c",
      fontSize: 16,
      fontWeight: "400"
    }
})