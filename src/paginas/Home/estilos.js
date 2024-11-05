import { StyleSheet, Dimensions } from "react-native";

const windowWidth = Dimensions.get('window').width;
const BUTTONWIDTH = 300;

const styles = StyleSheet.create({
    container: {
        backgroundColor : '#EB2F3D', 
        flex: 1
    },
    plaqueta: {
        alignSelf: 'center',
        margin: 'auto'
    },
    containerButton:{
        gap: 16,
        position: 'absolute',
        bottom: 50,
        left: (windowWidth/2) - (BUTTONWIDTH/2) ,
    },
    button: {
        borderRadius: 16,
        backgroundColor: '#121011', // Pode ser ajustado conforme necessário
        shadowColor: 'rgba(0, 0, 0, 0.12)',
        shadowOffset: {
            width: 2,
            height: 2,
        },
        shadowOpacity: 1,
        shadowRadius: 4,
        elevation: 4, // Adiciona a elevação para sombra no Android
        padding: 10, // Pode ser ajustado conforme necessário
        width: BUTTONWIDTH,
        alignSelf: 'center',
        height: 53,
        justifyContent: 'center'
    },
    textoBotao: {
        color: 'white',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '600'
    },
})

export default styles