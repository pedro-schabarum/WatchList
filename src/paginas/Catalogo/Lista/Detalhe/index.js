import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  ScrollView,
} from "react-native";
import React, { useEffect, useState, useContext } from "react";
import styles from "./estlios";
import Elenco from "./Elenco";
import Temporadas from "./Temporadas";
import add from "../../../../assets/plus.png";
import { fetchDetalhesConteudo } from "../../../../servicos/api/tmdb";
import { GlobalContext } from "../../../../contexts/GlobalContext";
import AdicionarLista from "./AdicionarLista";

const Detalhe = ({ itemSelecionado, onClose, isFilme, origem }) => {
  const { idioma, isSeries, options } = useContext(GlobalContext);
  const [detalhes, setDetalhes] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    // Busca detalhes do filme
    if (itemSelecionado) {
      getDetalhe(itemSelecionado);
    }
  }, [itemSelecionado, idioma]);

  const getDetalhe = async (filmeId) => {
    try {
      let endpoint = isSeries ? "tv" : "movie";
      if (origem == "elenco") {
        endpoint = isFilme ? "movie" : "tv";
      }
      const response = await fetchDetalhesConteudo({
        endpoint,
        filmeId,
        idioma,
        options,
      });
      setDetalhes(response);
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const handleAddMovie = (movieName) => {
    setMovies([...movies, { id: Date.now().toString(), name: movieName }]);
  };

  if (!itemSelecionado || !detalhes) {
    return null;
  }

  const dataFormatada = new Date(
    detalhes[isSeries ? "first_air_date" : "release_date"]
  ).toLocaleDateString(idioma, {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const duracaoMinutos = detalhes[isSeries ? "episode_run_time" : "runtime"];
  const horas = Math.floor(duracaoMinutos / 60);
  const minutos = duracaoMinutos % 60;

  const duracaoFormatada = `${horas > 0 ? `${horas}h ` : ""}${
    minutos > 0 ? `${minutos}m ` : ""
  }`;

  return (
    <View>
      <Modal
        visible={true}
        animationType="slide"
        transparent={true}
        onRequestClose={onClose}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Image
              source={{
                uri: `https://image.tmdb.org/t/p/w500${detalhes.backdrop_path}`,
              }}
              style={styles.imagemModal}
            />
            <ScrollView
              style={styles.scrollView}
              contentContainerStyle={styles.scrollViewContent}
            >
              {(detalhes.name || detalhes.title) && (
                <Text style={styles.modalTitle}>
                  {isSeries ? detalhes.name : detalhes.title}
                </Text>
              )}

              {detalhes.tagline && (
                <Text style={styles.tagline}>{detalhes.tagline}</Text>
              )}
              {(detalhes.episode_run_time || detalhes.runtime) && (
                <Text style={styles.modalData}>{dataFormatada}</Text>
              )}
              {detalhes.overview && (
                <Text style={styles.modalOverview}>{detalhes.overview}</Text>
              )}
              {duracaoFormatada.length > 0 ? (
                <Text style={styles.modalDuracao}>
                  Duração {isSeries ? "por episódio" : ""}: {duracaoFormatada}
                </Text>
              ) : (
                ""
              )}
              {detalhes.seasons && <Temporadas detalhes={detalhes} />}
              <Text style={styles.modalCategorias}>
                Categorias:{" "}
                {detalhes.genres.map((genre) => genre.name).join(", ")}
              </Text>
              <Elenco
                conteudoId={itemSelecionado}
                onClose={onClose}
                origem={origem}
                isFilme={isFilme}
              />
            </ScrollView>
            {!isSeries && (
              <TouchableOpacity
                style={styles.adicionar}
                onPress={() => {
                  setModalVisible(true);
                }}
              >
                <Image style={styles.imageToggle} source={add} />
              </TouchableOpacity>
            )}

            {modalVisible && (
              <AdicionarLista
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
              />
            )}
            <TouchableOpacity style={styles.modalButton} onPress={onClose}>
              <Text style={styles.textoBotao}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Detalhe;
