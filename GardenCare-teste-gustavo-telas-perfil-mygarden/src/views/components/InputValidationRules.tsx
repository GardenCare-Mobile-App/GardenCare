import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { RegraValidacao } from '../../models/RegraValidacao';
import { styles } from '../../styles/components/InputValidationrules.styles';
import { COLORS } from '../../styles/globalStyles';

interface ValidationRulesProps {
  regras: RegraValidacao[];
  tocado: boolean; 
}

export function ValidationRules({ regras, tocado }: ValidationRulesProps) {
  if (!tocado) return null;

  return (
    <View style={styles.container}>
      {regras.map((regra, index) => (
        <View key={index} style={styles.item}>
          <Ionicons
            name={regra.valida ? 'checkmark-circle' : 'close-circle'}
            size={14}
            color={regra.valida ? COLORS.verdeClaro : COLORS.error}
          />
          <Text style={[
            styles.texto,
            { color: regra.valida ? COLORS.verdeClaro : COLORS.error },
          ]}>
            {regra.mensagem}
          </Text>
        </View>
      ))}
    </View>
  );
}