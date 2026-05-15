import { Platform, StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../globalStyles';

export const styles = StyleSheet.create({
  container: {  
    flex: 1, 
    backgroundColor: COLORS.primary,
    padding: 16,
    justifyContent: 'center', 
  },
  content: {
    alignItems: 'center',
    gap: 15
  },
  botao: {
    backgroundColor: '#aaaaaa',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
    width: '80%', // Deixa o botão mais apresentável
    alignItems: 'center',
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