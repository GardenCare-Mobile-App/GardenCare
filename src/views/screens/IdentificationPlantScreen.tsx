import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  ActivityIndicator,
  ScrollView,
  Image,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScanIcon, TrashIcon, WarningIcon } from "phosphor-react-native";
import { identificationVM } from "../../viewmodels/IdentificationPlantViewModel";
import { PlantaIdentificada } from "../../models/IdentificationPlant";
import { PhotoPickerModal } from "../components/PhotoPickerModal";
import { useTheme } from "../../context/Themecontext";
import { useAuth } from "../../context/AuthContext";
import { createStyles } from "../../styles/screens/IdentificationPlantScreen.styles";

function CardIdentificacao({
  item,
  onExcluir,
  styles,
  cores,
}: {
  item: PlantaIdentificada;
  onExcluir: (id: string) => void;
  styles: ReturnType<typeof createStyles>;
  cores: any;
}) {
  function confirmarExclusao() {
    Alert.alert(
      "Excluir identificação",
      `Deseja excluir "${item.nomeComum}"?`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          style: "destructive",
          onPress: () => onExcluir(item.id!),
        },
      ],
    );
  }

  return (
    <View style={styles.card}>
      {item.fotoUrl ? (
        <Image
          source={{ uri: item.fotoUrl }}
          style={styles.fotoPrincipal}
          resizeMode="cover"
        />
      ) : null}

      <View style={styles.cardHeader}>
        <View style={styles.cardHeaderTextos}>
          <Text style={styles.labelEncontrada}>Planta Encontrada</Text>
          <Text style={styles.nomeComum}>{item.nomeComum}</Text>
          <Text style={styles.nomeCientifico}>{item.nomeCientifico}</Text>
        </View>
        <Pressable style={styles.excluirBotao} onPress={confirmarExclusao}>
          <TrashIcon size={22} color={cores.error} />
        </Pressable>
      </View>

      <Text style={styles.labelSobre}>Sobre ela:</Text>
      <Text style={styles.descricao}>{item.descricao}</Text>

      <View style={styles.precisaoBadge}>
        <Text style={styles.precisaoTexto}>
          Precisão da IA: {(item.probabilidade * 100).toFixed(1)}%
        </Text>
      </View>

      {item.fotosSemelhantes && item.fotosSemelhantes.length > 0 && (
        <View>
          <Text style={styles.labelSemelhantes}>Fotos Semelhantes:</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {item.fotosSemelhantes.map((url, index) => (
              <Image
                key={index}
                source={{ uri: url }}
                style={styles.fotoSemelhante}
                resizeMode="cover"
              />
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
}

export default function IdentificationScreen() {
  const { cores } = useTheme();
  useAuth();
  const styles = createStyles(cores);

  const [modalVisivel, setModalVisivel] = useState(false);

  const {
    processando,
    carregando,
    erro,
    identificacoes,
    processarIdentificacao,
    deletarIdentificacao,
  } = identificationVM();

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <View style={styles.header}>
        <ScanIcon size={22} color={cores.white} />
        <Text style={styles.headerTitle}>Identificar Plantas</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        <Pressable
          onPress={() => setModalVisivel(true)}
          disabled={processando}
          style={[
            styles.botaoFoto,
            processando && styles.botaoFotoDesabilitado,
          ]}
        >
          <Text style={styles.botaoFotoTexto}>
            {processando
              ? "Identificando..."
              : "Tirar Foto ou Escolher da Galeria"}
          </Text>
        </Pressable>

        <PhotoPickerModal
          visivel={modalVisivel}
          onFechar={() => setModalVisivel(false)}
          onFotoSelecionada={(uri, base64) => {
            if (!base64) return;
            processarIdentificacao(base64, uri);
          }}
        />

        {processando && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={cores.acao} />
            <Text style={styles.loadingTexto}>
              A IA está identificando sua planta...
            </Text>
          </View>
        )}

        {carregando && !processando && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="small" color={cores.acao} />
          </View>
        )}

        {erro && (
          <View style={styles.erroContainer}>
            <WarningIcon size={20} color={cores.error} />
            <Text style={styles.erroTexto}>{erro}</Text>
          </View>
        )}

        {!carregando && identificacoes.length === 0 && !processando && (
          <Text style={styles.listaVazia}>
            Nenhuma planta identificada ainda.{"\n"}Tire uma foto para começar!
          </Text>
        )}

        {identificacoes.map((item) => (
          <CardIdentificacao
            key={item.id}
            item={item}
            onExcluir={deletarIdentificacao}
            styles={styles}
            cores={cores}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}