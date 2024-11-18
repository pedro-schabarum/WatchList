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
      color: "#C0C0C0",
      fontSize: 14,
    },
    episodeDate: {
      color: "#C0C0C0",
      fontSize: 14,
    },
    episodeOverview: {
      marginVertical: 10,
      // fontStyle: 'italic',
      color: "#C0C0C0",
      textAlign: "justify",
    },
  },
  assistido: {
    episodeTitle: {
      color: "#939392",
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
      color: "#939392",
      textAlign: "justify",
    },
  },
});

export default styles;
