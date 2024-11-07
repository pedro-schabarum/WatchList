import React, { useEffect, useContext, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { API_KEY, API_URL } from '@env';
import { GlobalContext } from '../../../../../../contexts/GlobalContext';

const DetalheTemporada = ({ id, temporada }) => {
    // console.log(JSON.stringify(id, null, 2) + '  ' + JSON.stringify(temporada, null, 2));

    const { idioma, isSeries, options } = useContext(GlobalContext);
    const [detalhesTemporada, setDetalhesTemporada] = useState([])

    useEffect(() => {
        const fetchDetalhesTemporadas = async () => {
            try {
                // Verifica se 'id' e 'temporada.id' estão disponíveis antes de fazer a requisição
                if (id && temporada?.id) {
                    const response = await fetch(
                        `${API_URL}/tv/${id}/season/${temporada.season_number}?language=${idioma}`,
                        options
                    );
                    const data = await response.json();
                    // console.log(JSON.stringify(data.episodes, null, 2)); // Log para verificar os dados recebidos
                    setDetalhesTemporada(data.episodes); // Atualiza o estado com os detalhes
                }
            } catch (error) {
                console.error('Erro ao buscar os detalhes da temporada:', error);
            }
        };

        // Chama a função de fetch apenas quando o id e temporada.id estiverem disponíveis
        if (id && temporada?.id) {
            fetchDetalhesTemporadas();
        }
    }, [id, temporada, idioma]); // Dependências para garantir que o efeito seja reexecutado quando algum valor mudar

    console.log(JSON.stringify(detalhesTemporada, null, 2));
    return (
        <View style={styles.container}>
            {detalhesTemporada ? (
                <>
                    <FlatList
                        data={detalhesTemporada}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <View style={styles.episodeContainer}>
                                <Text style={styles.episodeTitle}>{item.name}</Text>
                                <Text>{`Episódio ${item.episode_number}`}</Text>
                                <Text>{`Lançamento: ${new Date(item.air_date).toLocaleDateString(idioma, { day: "2-digit", month: "long",  year: "numeric"})}`}</Text>
                                {item.name && (<Text style={styles.episodeOverview}>{item.overview}</Text>)}
                            </View>
                        )}
                    />
                </>
            ) : (
                <Text>Carregando detalhes da temporada...</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
        // backgroundColor: '#f9f9f9',
        // marginTop: 20,
    },
    temporadaNome: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    overview: {
        marginVertical: 10,
        fontStyle: 'italic',
    },
    episodeContainer: {
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    episodeTitle: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    episodeOverview: {
        marginTop: 5,
        color: '#939392',
    },
});

export default DetalheTemporada;
