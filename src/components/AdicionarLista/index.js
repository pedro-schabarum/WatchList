import React, { useContext } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import styles from "./estilos";
import { GlobalContext } from "../../contexts/GlobalContext";
import i18n from "../../hooks/I18n";
import { adicionarLista } from "../../servicos/api/back";

const AdicionarLista = ({ visible, onClose, item }) => {
  const { isSeries, idioma, usuario } = useContext(GlobalContext);
  console.log(item);

  const duracaoMinutos = item.runtime;
  const horas = Math.floor(duracaoMinutos / 60);
  const minutos = duracaoMinutos % 60;

  const duracaoFormatada = `${horas > 0 ? `${horas}h ` : ""}${
    minutos > 0 ? `${minutos}m ` : ""
  }`;

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <>
            {isSeries && (
              <>
                {item.still_path && (
                  <Image
                    source={{
                      uri: `https://image.tmdb.org/t/p/w500${item.still_path}`,
                    }}
                    style={styles.episodeImage}
                  />
                )}
                <ScrollView
                  style={styles.scrollView}
                  contentContainerStyle={styles.scrollContent}
                >
                  <Text style={styles.episodeTitle}>{item.name}</Text>
                  <Text style={styles.episodeNumber}>{`${i18n.t("episodio")} ${
                    item.episode_number
                  }`}</Text>
                  <Text style={styles.episodeDate}>{`${i18n.t(
                    "lancamento"
                  )}: ${new Date(item.air_date).toLocaleDateString(idioma, {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}`}</Text>
                  {item.overview && (
                    <Text style={styles.episodeOverview}>{item.overview}</Text>
                  )}
                  {duracaoFormatada.length > 0 ? (
                    <Text style={styles.modalDuracao}>
                      {i18n.t("duracao")}: {duracaoFormatada}
                    </Text>
                  ) : (
                    <></>
                  )}
                </ScrollView>
              </>
            )}

            {!isSeries && (
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  adicionarLista({ usuario, item });
                }}
              >
                <Text style={styles.buttonText}>{i18n.t("interesses")}</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>{i18n.t("assistidos")}</Text>
            </TouchableOpacity>
          </>
          <TouchableOpacity
            style={styles.modalButton}
            onPress={() => {
              onClose();
            }}
          >
            <Text style={styles.buttonText}>{i18n.t("fechar")}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default AdicionarLista;
