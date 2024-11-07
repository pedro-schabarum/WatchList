import { StyleSheet } from "react-native";

const styles = StyleSheet.create({

    // Modal
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fundo semitransparente
    },
    modalContent: {
        width: '90%',
        maxHeight: '90%', 
        backgroundColor: '#121011',
        borderRadius: 10,
        alignItems: 'center',
    },
    scrollView: {
        flexGrow: 1, // Para garantir que o ScrollView ocupe o espaço disponível
    },
    scrollViewContent: {
        paddingBottom: 20, // Espaçamento no fundo do ScrollView
        paddingHorizontal: 12
    },
    // Conteudo
    imagemModal:{
        width: '100%',
        height: '40%',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        marginBottom: 10
    },
    modalTitle: {
        paddingHorizontal: 6,
        textAlign: 'justify',
        alignSelf: 'center',
        fontFamily: 'InterSemi',
        fontWeight: 'bold',
        color: '#FFF',
        fontSize: 20,
        
    },
    tagline: {
        alignSelf: 'center',
        fontSize: 14,
        color: '#555',
        marginBottom: 10,
        // paddingTop: 5,
        paddingLeft: 8,
    },
    modalData: {
        alignSelf: 'center',
        fontSize: 14,
        color: '#555',
        marginBottom: 10,
        paddingTop: 5,
        paddingLeft: 8,
    },
    modalOverview : {
        fontSize: 14,
        color: '#FFF',
        marginBottom: 10,
        paddingTop: 5,
        paddingHorizontal: 12,
        textAlign: 'justify',
    },
    modalDuracao: {
        alignSelf: 'justify',
        fontSize: 14,
        color: '#555',
        marginBottom: 10,
        paddingTop: 5,
        paddingHorizontal: 12,
    },
    modalCategorias: {
        fontSize: 12,
        color: '#555',
        marginBottom: 10,
        paddingTop: 5,
        paddingHorizontal: 12
    },
    modalButton: {
        borderBottomRightRadius: 16,
        borderBottomLeftRadius: 16,
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
        width: '100%',
        alignSelf: 'center',
        height: 53,
        justifyContent: 'center',
        // marginTop: 53
    },
    textoBotao: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    toggleButton: {
        position: 'absolute',
        bottom: 20,
        left: '50%',
        transform: [{ translateX: -50 }],
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
        zIndex: 1000,
    },
    toggleButtonText: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
    }
});

export default styles;