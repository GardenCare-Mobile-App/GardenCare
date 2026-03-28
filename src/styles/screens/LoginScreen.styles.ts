import { StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../globalStyles';

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.primary,
      alignItems: 'center',
      paddingHorizontal: 20,
    },
    header:{
      alignSelf: "flex-start",
      marginTop: 50,
    },
    wellcome:{
      color: COLORS.amarelo,
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
      backgroundColor: "#677765ff",
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
      backgroundColor: '#e0e7b9',
      flex: 1,
    },
    separatorText: {
      color: COLORS.amareloMuitoClaro ,
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
      backgroundColor: "#e0e7b9",
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 20,
    },
    footerText:{
      color: COLORS.amareloMuitoClaro,
      fontSize: 16,
      fontWeight: "400"
    },
    footerButtonText:{
      color: "#1ab55c",
      fontSize: 16,
      fontWeight: "400"
    }
});