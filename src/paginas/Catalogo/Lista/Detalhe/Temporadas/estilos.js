import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    temporadas: {
        paddingHorizontal: 12,
    },
    temporadaNome: {
        fontFamily: 'InterMedium',
        fontSize: 16,             // Tamanho da fonte para o nome da temporada/episódio
        color: '#FFF',            // Cor do texto
        marginBottom: 4,          // Espaçamento inferior entre o nome e o episódio
        maxWidth: '90%'
    },
    episodeCount: {
        fontSize: 14,             // Tamanho da fonte para o contador de episódios
        color: '#939392',         // Cor do texto para menor destaque
        maxWidth: '10%'
    },
    touchableContainer: {
        padding: 12,              // Adiciona um espaçamento interno ao `TouchableOpacity`
        backgroundColor: '#41403E', // Fundo claro para contraste
        borderRadius: 8,          // Bordas arredondadas para cada item
        // shadowColor: '#000',      // Sombra para destacar os itens
        // shadowOffset: { width: 0, height: 2 },
        // shadowOpacity: 0.2,
        // shadowRadius: 4,
        // elevation: 3,             // Sombra para Android
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center' 
    },
    temporadaContainer: {
        // paddingHorizontal: 12,              // Adiciona um espaçamento interno ao `TouchableOpacity`
        backgroundColor: '#41403E', // Fundo claro para contraste
        borderRadius: 8,          // Bordas arredondadas para cada item
        marginBottom: 10,         // Espaçamento entre os itens da lista
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        // gap: 12
    }
});

export default styles;
