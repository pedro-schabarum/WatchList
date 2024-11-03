import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    // container: {
    //     flex: 1,
    //     justifyContent: 'center',
    //     // padding: 22,
    //     // gap: 32,
    //     alignSelf: 'center',
    // },
    input:{
        width: 300,
        fontSize: 14,
        color: '#FFF',
        height: 49,
        borderWidth: 1,
        borderColor: '#2A2A2A',
        borderRadius: 16,
        padding: 16,
    },
    button: {
        borderRadius: 16,
        backgroundColor: '#EB2F3D', // Pode ser ajustado conforme necessário
        shadowColor: 'rgba(0, 0, 0, 0.12)',
        shadowOffset: {
            width: 2,
            height: 2,
        },
        shadowOpacity: 1,
        shadowRadius: 4,
        elevation: 4, // Adiciona a elevação para sombra no Android
        padding: 10, // Pode ser ajustado conforme necessário
        width: 300,
        alignSelf: 'center',
        height: 53,
        justifyContent: 'center',
        // marginTop: 53
    },
    listaFilmes: {
        // marginTop: 32
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
    imagem: {
        width: 200,
        height: 300,
        borderRadius: 10,
    },
    // estilo das categorias
    navBar: {
        height: 48,
        marginTop: 40,
        marginBottom: 20,
        marginLeft: 8,
        flexDirection: 'row',
        justifyContent: 'space-around',
        gap: 16
    },
    navItem: {
        backgroundColor: '#1E1E1E',
        borderRadius: 4,
        // height: 32,
        alignSelf: 'center',

    },
    navItemSelected: {
        backgroundColor: '#EB2F3D', // Cor para o botão selecionado
    },
    navText: {
        color: '#ffffff',
        fontSize: 16,
        fontFamily: 'PoppinsMedium',
        alignSelf: 'center',
        paddingHorizontal: 10,
        paddingVertical: 8
    },
    // Inclua outros estilos existentes aqui
});

export default styles;

