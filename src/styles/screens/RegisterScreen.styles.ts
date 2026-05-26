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
    campos:{
        flexGrow: 1,
        width: '100%',
        alignItems: 'center',
        gap: 20
    },
    wellcome:{
      color: COLORS.amarelo,
      marginTop: 50,
      marginBottom: 50,
      fontSize: 24,
      fontWeight: "600",
    },
    content:{
      width: '100%',
      alignItems: 'center',
      gap: 20,
    },
    contentInput:{
      width: '100%',
      height: 56,
      backgroundColor: COLORS.fundoCampo,
      borderRadius: 12,
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 20,
      gap: 10,
      elevation: 10,
    },
    input:{
      flex: 1,
      color: COLORS.white,
    },
    buttonSignIn:{
      color: COLORS.white,
      borderWidth: 5,
      borderColor: COLORS.verdeEscuro,
      borderStyle: 'dotted',
      backgroundColor: COLORS.verdeClaro,
      width: '100%',
      height: 56,
      borderRadius: 36,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 40,
    },
    buttonSignInText:{
      color: COLORS.black,
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
    },

    
  titulo: { fontSize: 20, fontWeight: 'bold', color: '#6C5CE7', marginBottom: 16 },
  label: { fontSize: 10, color: '#888', fontWeight: '600', marginBottom: 4, letterSpacing: 0.5 },
    inputFocado: { borderColor: '#6C5CE7', backgroundColor: '#F5F3FF' },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginBottom: 14 },
  chip: {
    borderWidth: 1.5, borderColor: '#ddd', borderRadius: 20,
    paddingHorizontal: 12, paddingVertical: 5, backgroundColor: 'white',
  },
  chipAtivo: { borderColor: '#6C5CE7', backgroundColor: '#EDE9FE' },
  chipAtivoRosa: { borderColor: '#e84393', backgroundColor: '#FFF0F8' },
  chipTexto: { fontSize: 12, color: '#666' },
  chipTextoAtivo: { color: '#333', fontWeight: 'bold' },
  senhaRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 12 },
  olho: { padding: 8 },
  btnLocal: {
    backgroundColor: '#00B894', borderRadius: 12,
    padding: 14, alignItems: 'center', marginBottom: 8,
  },
  btnFirebase: {
    backgroundColor: '#6C5CE7', borderRadius: 12,
    padding: 14, alignItems: 'center', marginBottom: 20,
  },
  btnTexto: { color: 'white', fontWeight: 'bold', fontSize: 14 },


});