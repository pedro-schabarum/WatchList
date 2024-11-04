import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
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
    filmeContainer: {
        marginHorizontal: 0
    },
    // estilo das categorias
    navBar: {
        height: 48,
        marginVertical: 16,
        marginLeft: 8,
        paddingRight: 16,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        gap: 12,    
        alignSelf: 'center'
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

    // Modal
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fundo semitransparente
    },
    modalContent: {
        width: '90%',
        maxHeight: '80%', 
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
    },
    // Barra de pesquisas
    Pesquisa:{
        marginTop: 48,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginHorizontal: 8
    },
    barraPesquisa: {
        width: '80%',
        fontSize: 14,
        color: '#FFF',
        height: 49,
        borderWidth: 1,
        borderColor: '#2A2A2A',
        borderTopLeftRadius: 16,
        borderBottomLeftRadius: 16,
        padding: 16,
    },
    buttonPesquisa: {
        borderTopRightRadius: 16,
        borderBottomRightRadius: 16,
        backgroundColor: '#EB2F3D', // Pode ser ajustado conforme necessário
        shadowColor: 'rgba(0, 0, 0, 0.12)',
        shadowOffset: {
            width: 2,
            height: 2,
        },
        shadowOpacity: 1,
        shadowRadius: 4,
        elevation: 4, // Adiciona a elevação para sombra no Android
        alignSelf: 'center',
        height: 49,
        justifyContent: 'center',
        width: '20%',
    },
    buttonText:{
        color: '#fff',
        alignSelf: 'center'
    }
});

export default styles;

