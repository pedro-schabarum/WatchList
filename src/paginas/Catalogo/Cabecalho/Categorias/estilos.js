import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    // Barra de categorias
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
});

export default styles;