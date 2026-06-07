import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  TextInput,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useEditProfileViewModel } from '../../viewmodels/EditProfileViewModel';
import { PerfilUsuario } from '../../models/User';
import { PRONOMES_VALIDOS } from '../../business/EditProfilebusiness';
import { AvatarPerfil } from '../components/AvatarPerfil';
import { PhotoPickerModal } from '../components/PhotoPickerModal';
import { ValidationRules } from '../components/InputValidationRules';
import { styles } from '../../styles/screens/EditProfileScreen.styles';
import { COLORS } from '../../styles/globalStyles';

type RootStackParamList = {
  Profile: undefined;
  EditarPerfil: { perfil: PerfilUsuario };
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'EditarPerfil'>;
type RoutePropType = RouteProp<RootStackParamList, 'EditarPerfil'>;

export default function EditarPerfilScreen() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RoutePropType>();
  const { perfil } = route.params;

  const {
    nome,
    pronomes,
    bio,
    fotoUri,
    modalVisivel,
    salvando,
    erro,
    sucesso,
    limiteBio,
    regrasNome,
    regrasPronomes,
    regrasBio,
    formularioValido,
    nomeTocado,
    pronomesTocado,
    bioTocado,
    setNome,
    setPronomes,
    setBio,
    abrirModal,
    fecharModal,
    onFotoSelecionada,
    salvar,
  } = useEditProfileViewModel(perfil);

  React.useEffect(() => {
    if (sucesso) navigation.goBack();
  }, [sucesso]);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >

          <View style={styles.header}>
            <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
              <Ionicons name="arrow-back" size={24} color={COLORS.white} />
            </Pressable>
            <Text style={styles.headerTitle}>Editar Perfil</Text>
          </View>

          <View style={styles.fotoContainer}>
            <Pressable style={styles.fotoWrapper} onPress={abrirModal}>
              <AvatarPerfil fotoURL={fotoUri} nome={nome} />
              <View style={styles.cameraButton}>
                <Ionicons name="camera" size={14} color={COLORS.white} />
              </View>
            </Pressable>
            <Text style={styles.fotoLabel}>Toque para alterar a foto</Text>
          </View>

          <PhotoPickerModal
            visivel={modalVisivel}
            onFechar={fecharModal}
            onFotoSelecionada={onFotoSelecionada}
          />

          <View style={styles.form}>

            <View style={styles.campo}>
              <Text style={styles.label}>Nome</Text>
              <TextInput
                style={styles.input}
                value={nome}
                onChangeText={setNome}
                placeholder="Seu nome"
                placeholderTextColor={COLORS.textPLaceholder}
              />
              <ValidationRules regras={regrasNome} tocado={nomeTocado} />
            </View>

            <View style={styles.campo}>
              <Text style={styles.label}>Pronomes</Text>
              <TextInput
                style={styles.input}
                value={pronomes}
                onChangeText={setPronomes}
                placeholder={PRONOMES_VALIDOS.join(' ou ')}
                placeholderTextColor={COLORS.textPLaceholder}
              />
              <ValidationRules regras={regrasPronomes} tocado={pronomesTocado} />
            </View>

            <View style={styles.campo}>
              <Text style={styles.label}>Bio</Text>
              <TextInput
                style={[styles.input, styles.inputBio]}
                value={bio}
                onChangeText={setBio}
                placeholder="Fale um pouco sobre você..."
                placeholderTextColor={COLORS.textPLaceholder}
                multiline
                maxLength={limiteBio}
              />
              <Text style={[
                styles.contadorBio,
                bio.length === limiteBio && styles.contadorBioLimite,
              ]}>
                {bio.length}/{limiteBio}
              </Text>
              <ValidationRules regras={regrasBio} tocado={bioTocado} />
            </View>

            {erro ? <Text style={styles.erroTexto}>{erro}</Text> : null}

          </View>

          <Pressable
            style={[
              styles.salvarButton,
              !formularioValido && { opacity: 0.5 },
            ]}
            onPress={salvar}
            disabled={salvando || !formularioValido}
          >
            {salvando ? (
              <ActivityIndicator color={COLORS.white} />
            ) : (
              <Text style={styles.salvarButtonTexto}>Salvar alterações</Text>
            )}
          </Pressable>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}