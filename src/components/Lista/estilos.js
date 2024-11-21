import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    filmeContainer: {
        marginHorizontal: 0
    },    
    imagem: {
        width: 200,
        height: 300,
        borderRadius: 10,
    },
    titulo: {
        fontFamily: 'InterMedium',
        color: "#FFF",
        fontSize: 16,
        flexWrap: 'wrap',
        width: 200,
        paddingTop: 8,
        paddingLeft: 8,
    },
    diretor: {
        fontSize: 14,
        color: '#555',
        marginBottom: 10,
        paddingTop: 5,
        paddingLeft: 8,
    },
});

export default styles;