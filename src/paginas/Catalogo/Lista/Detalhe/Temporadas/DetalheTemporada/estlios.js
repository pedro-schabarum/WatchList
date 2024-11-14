import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  episodeContainer: {
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  container: {
    paddingHorizontal: 10,
    // backgroundColor: '#f9f9f9',
    // marginTop: 20,
  },
  normal: {
    episodeTitle: {
      color: "#FFF",
      fontSize: 18,
      fontFamily: "InterMedium",
    },
    episodeNumber: {
      color: "#939392",
      fontSize: 14,
    },
    episodeDate: {
      color: "#939392",
      fontSize: 14,
    },
    episodeOverview: {
      marginVertical: 10,
      // fontStyle: 'italic',
      color: "#FFF",
      textAlign: "justify",
    },
  },
  assistido: {
    episodeTitle: {
      color: "#FFF",
      fontSize: 18,
      fontFamily: "InterMedium",
      textShadowColor: "#4CAF50", // Cor da sombra
      textShadowOffset: { width: 3, height: 3 }, // Deslocamento da sombra
      textShadowRadius: 3,
    },
    episodeNumber: {
      color: "#939392",
      fontSize: 14,
      textShadowColor: "#4CAF50", // Cor da sombra
      textShadowOffset: { width: 3, height: 3 }, // Deslocamento da sombra
      textShadowRadius: 3,
    },
    episodeDate: {
      color: "#939392",
      fontSize: 14,
      textShadowColor: "#4CAF50", // Cor da sombra
      textShadowOffset: { width: 3, height: 3 }, // Deslocamento da sombra
      textShadowRadius: 3,
    },
    episodeOverview: {
      marginVertical: 10,
      // fontStyle: 'italic',
      color: "#FFF",
      textAlign: "justify",
      textShadowColor: "#4CAF50", // Cor da sombra
      textShadowOffset: { width: 3, height: 3 }, // Deslocamento da sombra
      textShadowRadius: 3,
    },
  },
});

export default styles;
