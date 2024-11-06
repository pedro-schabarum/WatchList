import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    // Barra de categorias
    elenco: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        gap: 12,
        paddingHorizontal: 12,
        height: 'auto'
    },
    elencoItem: {
        borderRadius: 4,
        width:  120,
    },
    elencoNome: {
        color: '#ffffff',
        fontSize: 14,
        fontFamily: 'PoppinsMedium',
        alignSelf: 'center',
        width:  120,
        // flexWrap: 'wrap',
        textAlign: 'center'
    },
    elencoPersonagem: {
        color: '#555',
        fontSize: 10,
        fontFamily: 'PoppinsMedium',
        alignSelf: 'center',
    },
    elencoImagem: {
        height: 150,
        width:  120,
        alignSelf: 'center'
    }
});

export default styles;