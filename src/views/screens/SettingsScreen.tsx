import React, { useState } from 'react';
import {
  View,
  Text,
  Pressable,
  ScrollView,
  Alert,
  TextInput,
  ActivityIndicator,
  Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useSettingsViewModel } from '../../viewmodels/SettingsViewModel';
import { useTheme, TipoTema } from '../../context/Themecontext';
import { LimitesSensor } from '../../business/SensorLimitesBusiness';
import { createStyles } from '../../styles/screens/SettingsScreen.styles';

export default function SettingsScreen() {
  const navigation = useNavigation();
  const {
    limites,
    salvandoLimites,
    erroLimites,
    sucessoLimites,
    excluindo,
    erro,
    tipoTema,
    mudarTema,
    logout,
    salvarLimites,
    excluirConta,
    setLimite,
  } = useSettingsViewModel();

  const { cores } = useTheme();
  const styles = createStyles(cores);

  const [modalExcluirVisivel, setModalExcluirVisivel] = useState(false);
  const [senhaExclusao, setSenhaExclusao] = useState('');

  const opcoesTema: { tipo: TipoTema; label: string; icone: string }[] = [
    { tipo: 'claro', label: 'Claro', icone: 'sunny-outline' },
    { tipo: 'auto', label: 'Auto', icone: 'phone-portrait-outline' },
    { tipo: 'escuro', label: 'Escuro', icone: 'moon-outline' },
  ];

  function confirmarLogout() {
    Alert.alert(
      'Sair da conta',
      'Tem certeza que deseja sair? Você precisará fazer login novamente.',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Sair', style: 'destructive', onPress: logout },
      ]
    );
  }

  function abrirModalExclusao() {
    Alert.alert(
      'Excluir conta',
      'Esta ação é irreversível! Todos os seus dados, plantas e perfil serão apagados permanentemente.',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Continuar', style: 'destructive', onPress: () => setModalExcluirVisivel(true) },
      ]
    );
  }

  function fecharModalExclusao() {
    setSenhaExclusao('');
    setModalExcluirVisivel(false);
  }

  function confirmarExclusaoComSenha() {
    if (!senhaExclusao.trim()) return;
    excluirConta(senhaExclusao);
    fecharModalExclusao();
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>

        <View style={styles.header}>
          <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color={cores.white} />
          </Pressable>
          <Text style={styles.headerTitle}>Configurações</Text>
        </View>

        <View style={styles.card}>
          <View style={styles.cardTitulo}>
            <Ionicons name="color-palette-outline" size={18} color={cores.primary} />
            <Text style={styles.cardTituloTexto}>Tema</Text>
          </View>
          <View style={styles.temaOpcoes}>
            {opcoesTema.map((opcao) => (
              <Pressable
                key={opcao.tipo}
                style={[
                  styles.temaOpcao,
                  tipoTema === opcao.tipo && styles.temaOpcaoAtiva,
                ]}
                onPress={() => mudarTema(opcao.tipo)}
              >
                <Ionicons
                  name={opcao.icone as any}
                  size={18}
                  color={tipoTema === opcao.tipo ? cores.verdeClaro : cores.textSecondary}
                />
                <Text style={[
                  styles.temaOpcaoTexto,
                  tipoTema === opcao.tipo && styles.temaOpcaoTextoAtiva,
                ]}>
                  {opcao.label}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.cardTitulo}>
            <Ionicons name="speedometer-outline" size={18} color={cores.primary} />
            <Text style={styles.cardTituloTexto}>Limites dos sensores</Text>
          </View>

          {(
            [
              { campo: 'temperaturaMin', label: 'Temperatura mínima (°C)', icone: 'thermometer-outline', cor: cores.textSecondary },
              { campo: 'temperaturaMax', label: 'Temperatura máxima (°C)', icone: 'thermometer-outline', cor: cores.error },
              { campo: 'umidadeMin', label: 'Umidade mínima (%)', icone: 'water-outline', cor: cores.textSecondary },
            ] as { campo: keyof LimitesSensor; label: string; icone: string; cor: string }[]
          ).map((item, index, arr) => (
            <View
              key={item.campo}
              style={[styles.limiteItem, index === arr.length - 1 && styles.limiteItemUltimo]}
            >
              <View style={styles.limiteLabelRow}>
                <Ionicons name={item.icone as any} size={16} color={item.cor} />
                <Text style={styles.limiteLabel}>{item.label}</Text>
              </View>
              <TextInput
                style={styles.limiteInput}
                keyboardType="numeric"
                value={String(limites[item.campo])}
                onChangeText={(v) => setLimite(item.campo, Number(v))}
                placeholderTextColor={cores.textPLaceholder}
              />
            </View>
          ))}

          {erroLimites ? <Text style={styles.limiteErro}>{erroLimites}</Text> : null}

          <Pressable style={styles.salvarLimitesButton} onPress={salvarLimites}>
            {salvandoLimites ? (
              <ActivityIndicator color={cores.white} size="small" />
            ) : (
              <Text style={styles.salvarLimitesTexto}>
                {sucessoLimites ? '✓ Salvo!' : 'Salvar limites'}
              </Text>
            )}
          </Pressable>
        </View>

        <View style={styles.card}>
          <Pressable style={styles.privacidadeRow}>
            <View style={styles.privacidadeTitulo}>
              <Ionicons name="shield-checkmark-outline" size={18} color={cores.primary} />
              <Text style={styles.cardTituloTexto}>Privacidade e segurança</Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color={cores.textSecondary} />
          </Pressable>
        </View>

        <View style={styles.card}>
          <View style={styles.cardTitulo}>
            <Ionicons name="leaf-outline" size={18} color={cores.primary} />
            <Text style={styles.cardTituloTexto}>Sobre o GardenCare</Text>
          </View>
          <View style={styles.itemLinha}>
            <Text style={styles.itemLabel}>Versão</Text>
            <Text style={styles.itemValor}>1.0.0</Text>
          </View>
          <View style={[styles.itemLinha, styles.itemLinhaUltimo]}>
            <Text style={styles.itemLabel}>Desenvolvido por</Text>
            <Text style={styles.itemValor}>Grupo GardenCare</Text>
          </View>
        </View>

        <Pressable style={styles.logoutCard} onPress={confirmarLogout}>
          <Ionicons name="log-out-outline" size={20} color={cores.error} />
          <Text style={styles.logoutTexto}>Sair da conta</Text>
        </Pressable>

        <Pressable style={styles.excluirCard} onPress={abrirModalExclusao}>
          {excluindo ? (
            <ActivityIndicator color={cores.error} size="small" />
          ) : (
            <>
              <Ionicons name="trash-outline" size={20} color={cores.error} />
              <View>
                <Text style={styles.excluirTexto}>Excluir conta</Text>
                <Text style={styles.excluirDescricao}>Remove todos os seus dados permanentemente</Text>
              </View>
            </>
          )}
        </Pressable>

      </ScrollView>

      <Modal
        visible={modalExcluirVisivel}
        transparent
        animationType="fade"
        onRequestClose={fecharModalExclusao}
      >
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', paddingHorizontal: 24 }}>
          <View style={{ backgroundColor: cores.cardBackground, borderRadius: 16, padding: 24, gap: 16 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: cores.textPrimary }}>
              Confirmar exclusão
            </Text>
            <Text style={{ fontSize: 14, color: cores.textSecondary }}>
              Digite sua senha para confirmar a exclusão permanente da conta.
            </Text>
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: cores.border,
                borderRadius: 10,
                padding: 12,
                fontSize: 15,
                color: cores.textPrimary,
                backgroundColor: cores.background,
              }}
              placeholder="Sua senha"
              placeholderTextColor={cores.textSecondary}
              secureTextEntry
              value={senhaExclusao}
              onChangeText={setSenhaExclusao}
              autoFocus
            />
            {erro ? (
              <Text style={{ fontSize: 13, color: cores.error }}>{erro}</Text>
            ) : null}
            <View style={{ flexDirection: 'row', gap: 12 }}>
              <Pressable
                style={{ flex: 1, padding: 12, borderRadius: 10, borderWidth: 1, borderColor: cores.border, alignItems: 'center' }}
                onPress={fecharModalExclusao}
              >
                <Text style={{ color: cores.textSecondary, fontWeight: '600' }}>Cancelar</Text>
              </Pressable>
              <Pressable
                style={{ flex: 1, padding: 12, borderRadius: 10, backgroundColor: cores.error, alignItems: 'center', opacity: senhaExclusao.trim() ? 1 : 0.4 }}
                onPress={confirmarExclusaoComSenha}
                disabled={!senhaExclusao.trim()}
              >
                {excluindo ? (
                  <ActivityIndicator color="#fff" size="small" />
                ) : (
                  <Text style={{ color: '#fff', fontWeight: 'bold' }}>Excluir conta</Text>
                )}
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

     </SafeAreaView>
    );
}