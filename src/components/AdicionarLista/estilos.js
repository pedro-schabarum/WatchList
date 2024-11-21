import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  scrollView: {
    maxHeight: "50%",
  },
  scrollContent: {
    padding: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 40,
    // borderRadius: 10,
  },
  modalContent: {
    width: "90%",
    maxHeight: "90%",
    // paddingTop: 20,
    backgroundColor: "#121011",
    borderRadius: 16,
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

export default styles;
