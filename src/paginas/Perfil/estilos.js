import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
      },
      text: {
        fontSize: 16,
        marginBottom: 10,
        color: '#FFF',
      },
      label: {
        fontSize: 18,
        marginVertical: 10,
        fontWeight: 'bold',
        color: '#555',
      },
      picker: {
        height: 50,
        marginVertical: 10,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: '#41403E',
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
        justifyContent: 'center'
      },
});

export default styles;

