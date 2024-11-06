import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    toggle:{
        width: 75,                // Defina a largura (ajuste para o tamanho desejado)
        height: 75,               // Defina a altura igual à largura para fazer o círculo
        borderRadius: 40,         // Metade da largura/altura para fazer o círculo
        justifyContent: 'center', // Centraliza o conteúdo (imagem) verticalmente
        alignItems: 'center',     // Centraliza o conteúdo (imagem) horizontalmente
        backgroundColor: '#EB2F3D',
        overflow: 'hidden',       // Garante que a imagem fique dentro do círculo
        margin: 'auto',
        position: 'absolute',
        bottom: 20,
        right: 20
    },
    imageToggle: {
        width: 50,
        height: 50
    }
});

export default styles;

