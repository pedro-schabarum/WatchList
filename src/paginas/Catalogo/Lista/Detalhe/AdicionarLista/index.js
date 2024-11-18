import React, { useContext } from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { GlobalContext } from "../../../../../contexts/GlobalContext";

const AdicionarLista = ({ visible, onClose, item }) => {
  const { isSeries, idioma } = useContext(GlobalContext);
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
                <Image
                  source={{
                    uri: `https://image.tmdb.org/t/p/w500${item.still_path}`,
                  }}
                  style={styles.episodeImage}
                />
                <Text style={styles.episodeTitle}>{item.name}</Text>
                <Text
                  style={styles.episodeNumber}
                >{`Episódio ${item.episode_number}`}</Text>
                <Text style={styles.episodeDate}>{`Lançamento: ${new Date(
                  item.air_date
                ).toLocaleDateString(idioma, {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}`}</Text>
                {item.overview && (
                  <Text style={styles.episodeOverview}>{item.overview}</Text>
                )}
                {duracaoFormatada.length > 0 ? (
                  <Text style={styles.modalDuracao}>
                    Duração: {duracaoFormatada}
                  </Text>
                ) : (
                  <></>
                )}
              </>
            )}

            {!isSeries && (
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Interesses</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Assistidos</Text>
            </TouchableOpacity>
          </>
          <TouchableOpacity
            style={styles.modalButton}
            onPress={() => {
              onClose();
            }}
          >
            <Text style={styles.buttonText}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 40,
  },
  modalContent: {
    width: "90%",
    // paddingTop: 20,
    backgroundColor: "#121011",
    borderRadius: 10,
    alignItems: "center",
    gap: 8,
  },
  button: {
    borderRadius: 16,
    backgroundColor: "#EB2F3D", // Pode ser ajustado conforme necessário
    shadowColor: "rgba(0, 0, 0, 0.12)",
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 4, // Adiciona a elevação para sombra no Android
    padding: 10, // Pode ser ajustado conforme necessário
    width: 200,
    alignSelf: "center",
    height: 53,
    justifyContent: "center",
  },
  buttonText: {
    color: "#FFF",
    textAlign: "center",
    fontFamily: "InterMedium",
    fontSize: 16,
  },
  modalButton: {
    borderBottomRightRadius: 16,
    borderBottomLeftRadius: 16,
    backgroundColor: "#EB2F3D", // Pode ser ajustado conforme necessário
    shadowColor: "rgba(0, 0, 0, 0.12)",
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 4, // Adiciona a elevação para sombra no Android
    padding: 10, // Pode ser ajustado conforme necessário
    width: "100%",
    alignSelf: "center",
    height: 53,
    justifyContent: "center",
    marginTop: 53,
  },
  episodeTitle: {
    color: "#FFF",
    fontSize: 18,
    fontFamily: "InterMedium",
    paddingHorizontal: 12,
  },
  episodeNumber: {
    color: "#C0C0C0",
    fontSize: 14,
    paddingHorizontal: 6,
    textAlign: "left",
    paddingHorizontal: 12,
  },
  episodeDate: {
    color: "#C0C0C0",
    fontSize: 14,
    paddingHorizontal: 6,
    paddingHorizontal: 12,
  },
  episodeOverview: {
    marginVertical: 10,
    // fontStyle: 'italic',
    color: "#C0C0C0",
    paddingHorizontal: 6,
    textAlign: "justify",
  },
  episodeImage: {
    width: "100%",
    height: 200,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  modalDuracao: {
    alignSelf: "justify",
    fontSize: 14,
    color: "#C0C0C0",
    marginBottom: 10,
    paddingTop: 5,
    paddingHorizontal: 12,
  },
});

export default AdicionarLista;
