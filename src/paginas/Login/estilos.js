import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 22,
        gap: 32,
        alignSelf: 'center',
    },
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
    texto:{
        color: '#FFF',
        fontFamily: 'PoppinsMedium',
        fontSize: 22
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
    textoBotao: {
        color: 'white',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '600'
    },
    textoSenha:{
        color: '#FFF',
        fontFamily: 'PoppinsRegular',
        fontSize: 14,
        alignSelf: 'flex-end'
    }
});

export default styles;