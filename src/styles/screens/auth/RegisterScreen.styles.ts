import { StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../globalStyles';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  header: {
    alignSelf: "flex-start",
    marginTop: 50,
  },
  campos: {
    flexGrow: 1,
    width: '100%',
    alignItems: 'center',
    gap: 20
  },
  wellcome: {
    color: COLORS.amarelo,
    marginTop: 50,
    marginBottom: 50,
    fontSize: 24,
    fontWeight: "600",
  },
  content: {
    width: '100%',
    alignItems: 'center',
    gap: 20,
  },
  contentInput: {
    width: '100%',
    height: 56,
    backgroundColor: COLORS.fundoCampo,
    borderRadius: 12,
    justifyContent: 'flex-end',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    gap: 10,
    elevation: 10,
  },
  input: {
    flex: 1,
    color: COLORS.white,
  },
  buttonSignIn: {
    color: COLORS.white,
    borderWidth: 5,
    borderColor: COLORS.verdeEscuro,
    borderStyle: 'dotted',
    backgroundColor: COLORS.verdeClaro,
    width: 110,
    height: 56,
    borderRadius: 36,
    alignItems: 'center',
    justifyContent: 'center',
    // marginTop: 40,
  },
  buttonSignInText: {
    color: COLORS.black,
    fontSize: 16,
    fontWeight: '800'
  },
  containerSeparator: {
    width: '100%',
    marginTop: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  separator: {
    height: 1,
    backgroundColor: '#e0e7b9',
    flex: 1,
  },
  separatorText: {
    color: COLORS.amareloMuitoClaro,
    fontSize: 16,
    fontWeight: '400'
  },
  footer: {
    flexDirection: 'row',
    gap: 10
  },
  footerButton: {
    width: 100,
    height: 60,
    backgroundColor: "#e0e7b9",
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  footerText: {
    color: COLORS.amareloMuitoClaro,
    fontSize: 16,
    fontWeight: "400"
  },
  footerButtonText: {
    color: "#1ab55c",
    fontSize: 16,
    fontWeight: "400"
  },
  label: {
    fontSize: 13,
    color: COLORS.amarelo,
    fontWeight: '600',
    // marginBottom: 4,
    letterSpacing: 0.5
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 14
  },
  chip: {
    borderWidth: 2, 
    borderColor: COLORS.amareloMuitoClaro, 
    borderRadius: 20,
    paddingHorizontal: 12, 
    paddingVertical: 8, 
    backgroundColor: COLORS.verdeClaro,
  },
  chipAtivo: { 
    borderColor: COLORS.verdeClaro, 
    backgroundColor: COLORS.amarelo 
  },
  chipTexto: { 
    fontSize: 15, 
    color: COLORS.black 
  },
  chipTextoAtivo: { 
    color: '#333', 
    fontWeight: 'bold' 
  },


  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)', // Escurece o fundo
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    elevation: 5, // Sombra no Android
  },

});