import React, { useContext } from "react";
import {
  Modal,
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { GlobalContext } from "../../../../../contexts/GlobalContext";

const AdicionarLista = ({ visible, onClose }) => {
  const { isSeries } = useContext(GlobalContext);
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
    paddingTop: 20,
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
    // alignSelf: "center",
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
});

export default AdicionarLista;
