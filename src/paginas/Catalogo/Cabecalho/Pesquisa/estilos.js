import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    // Barra de pesquisas
    Pesquisa:{
        marginTop: 48,
        display: 'flex',
        flexDirection: 'row',
        // justifyContent: 'space-around',
        // alignItems: 'stretch',
        marginHorizontal: 8
    },
    barraPesquisa: {
        width: '60%',
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
    },
    buttonPerfil:{
            width: 49,                // Defina a largura (ajuste para o tamanho desejado)
            height: 49,               // Defina a altura igual à largura para fazer o círculo
            borderRadius: 40,         // Metade da largura/altura para fazer o círculo
            justifyContent: 'center', // Centraliza o conteúdo (imagem) verticalmente
            alignItems: 'center',     // Centraliza o conteúdo (imagem) horizontalmente
            backgroundColor: '#1E1E1E',
            overflow: 'hidden',       // Garante que a imagem fique dentro do círculo
            margin: 'auto'
    }
});

export default styles;