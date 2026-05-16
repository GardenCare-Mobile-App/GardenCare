import { Platform, StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../globalStyles';

export const styles = StyleSheet.create({
  container: {  
    flex: 1, 
    backgroundColor: COLORS.primary,
    padding: 16,
    justifyContent: 'center', 
  },
  logo: {
    flex: 0.3,
    transform:[
      // {scale:1.3}, // aumenta o tamanho
      {rotate: '-19deg'} // rodopia a imagem
    ],
    width: 400,
    height: 30,
    marginRight: 5,
    borderRadius: 50, // Metade do tamanho para ficar redondo
    // borderWidth: 2,
  },
  content: {
    alignItems: 'center',
    gap: 15
  },
  botao: {
    borderStyle: 'dotted',
    backgroundColor: COLORS.verdeClaro,
    color: COLORS.white,
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
    width: '80%', // Deixa o botão mais apresentável
    alignItems: 'center',
    borderWidth: 5,
    borderColor: COLORS.verdeEscuro
  },
  texto: { 
    color: COLORS.amarelo,
    fontSize: 24, 
    fontWeight: 'bold', 
    textAlign: 'center',
    marginBottom: 20 
  },
  textoBotao: {
    color: 'black',
    fontWeight: '600'
  }
});