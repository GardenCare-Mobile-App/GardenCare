import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useSearchViewModel } from '../../viewmodels/SearchViewModel';
import { PerfilUsuario } from '../../models/User';
import { createStyles } from '../../styles/screens/SearchScreen.styles';
import { useTheme } from '../../context/Themecontext';

export default function SearchScreen() {
  const navigation = useNavigation();
  const { cores } = useTheme();
  const styles = createStyles(cores);

  const { resultados, carregando, erro, buscou, buscar, limpar } = useSearchViewModel();
  const [termo, setTermo] = useState('');

  function handleChangeTermo(texto: string) {
    setTermo(texto);
    if (!texto.trim()) {
      limpar();
    }
  }

  function handleBuscar() {
    buscar(termo);
  }

  function handleLimpar() {
    setTermo('');
    limpar();
  }

  function renderUsuario({ item }: { item: PerfilUsuario }) {
    return (
      <TouchableOpacity
        style={styles.itemUsuario}
        onPress={() => (navigation as any).navigate('UserProfile', { uid: item.uid })}
      >
        {item.fotoURL ? (
          <Image source={{ uri: item.fotoURL }} style={styles.avatar} />
        ) : (
          <View style={styles.avatarPlaceholder}>
            <Text style={styles.avatarLetra}>
              {item.nome[0].toUpperCase()}
            </Text>
          </View>
        )}

        <View style={styles.infoUsuario}>
          <Text style={styles.nomeUsuario}>{item.nome}</Text>
          {item.pronomes ? (
            <Text style={styles.pronomes}>{item.pronomes}</Text>
          ) : null}
          {item.bio ? (
            <Text style={styles.bio} numberOfLines={1}>{item.bio}</Text>
          ) : null}
        </View>

        <Ionicons name="chevron-forward-outline" size={18} color={cores.textSecondary} />
      </TouchableOpacity>
    );
  }

  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.header}>
        <Text style={styles.headerTitle}>Buscar Usuários</Text>
      </View>

      <View style={styles.inputContainer}>
        <Ionicons name="search-outline" size={20} color={cores.textSecondary} style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Digite um nome..."
          placeholderTextColor={cores.textPLaceholder}
          value={termo}
          onChangeText={handleChangeTermo}
          onSubmitEditing={handleBuscar}
          returnKeyType="search"
          autoCapitalize="none"
        />
        {termo.length > 0 && (
          <TouchableOpacity onPress={handleLimpar}>
            <Ionicons name="close-circle-outline" size={20} color={cores.textSecondary} />
          </TouchableOpacity>
        )}
      </View>

      <TouchableOpacity
        style={[styles.btnBuscar, !termo.trim() && styles.btnDesabilitado]}
        onPress={handleBuscar}
        disabled={!termo.trim()}
      >
        <Text style={styles.btnBuscarTexto}>Buscar</Text>
      </TouchableOpacity>

      {erro ? <Text style={styles.erro}>{erro}</Text> : null}

      {carregando ? (
        <ActivityIndicator color={cores.primary} style={{ marginTop: 32 }} />
      ) : (
        <FlatList
          data={resultados}
          keyExtractor={(item) => item.uid}
          renderItem={renderUsuario}
          contentContainerStyle={styles.lista}
          ListEmptyComponent={
            buscou ? (
              <Text style={styles.vazio}>Nenhum usuário encontrado.</Text>
            ) : null
          }
        />
      )}

    </SafeAreaView>
  );
}