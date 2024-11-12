import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 20,
    paddingTop: 28,
    // justifyContent: "center",
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
    color: "#FFF",
  },
  label: {
    fontSize: 18,
    marginVertical: 10,
    fontWeight: "bold",
    color: "#555",
  },
  picker: {
    height: 50,
    marginVertical: 10,
    backgroundColor: "#FFF",
    width: 300,
    fontFamily: "InterSemi",
    color: "#121011",
  },
  pickerItem: {
    fontSize: 14, // Tamanho do texto dos itens (funciona apenas no iOS)
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
    width: 300,
    alignSelf: "center",
    height: 53,
    justifyContent: "center",
  },
  buttonText: {
    color: "#FFF",
    alignSelf: "center",
    fontFamily: "InterSemi",
    fontSize: 18,
  },

  //  Ator
  pessoa: {
    padding: 20,
    alignItems: "center",
  },
  profileImage: {
    width: 300,
    height: 450,
    borderRadius: 16,
    marginBottom: 20,
  },
  name: {
    fontFamily: "InterSemi",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#FFF",
  },
  bio: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 10,
    color: "#939392",
    textAlign: "justify",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    color: "#FFF",
  },
  dataNasc: {
    alignSelf: "center",
    fontSize: 14,
    color: "#555",
    paddingVertical: 5,
  },
  localNasc: {
    alignSelf: "center",
    fontSize: 14,
    color: "#555",
    marginBottom: 18,
  },
  alias: {
    fontSize: 14,
    marginTop: 5,
    textAlign: "center",
    color: "#FFF",
  },
  info: {
    fontSize: 16,
    marginTop: 5,
    textAlign: "center",
    color: "#FFF",
  },
  // Creditos
  filmes: {
    flexDirection: "row",
    // alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 5,
    height: "auto",
    gap: 18,
  },
  filmesImagem: {
    height: 210,
    width: 140,
    // marginRight: 10,
    borderRadius: 8,
    // backgroundColor: "#e0e0e0", // Cor de fundo para caso a imagem não carregue
  },
  filmesNome: {
    fontSize: 14,
    color: "#FFF",
    width: 100, // Largura para limitar o texto ao tamanho da imagem
    textAlign: "center",
    marginTop: 5,
    alignSelf: "center",
  },
  tituloScroll: {
    alignSelf: "center",
    fontSize: 16,
    color: "#555",
    // paddingVertical: 5,
  },
});

export default styles;
