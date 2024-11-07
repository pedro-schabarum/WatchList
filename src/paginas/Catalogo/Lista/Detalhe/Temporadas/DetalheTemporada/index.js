import React, { useEffect, useContext, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { API_KEY, API_URL } from '@env';
import { GlobalContext } from '../../../../../../contexts/GlobalContext';
import styles from './estlios';

const DetalheTemporada = ({ id, temporada }) => {

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

    return (
        <View style={styles.container}>
            {detalhesTemporada ? (
                <>
                    <FlatList
                        data={detalhesTemporada}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <TouchableOpacity style={styles.episodeContainer}>
                                <Text style={styles.episodeTitle}>{item.name}</Text>
                                <Text style={styles.episodeNumber}>{`Episódio ${item.episode_number}`}</Text>
                                <Text style={styles.episodeDate}>{`Lançamento: ${new Date(item.air_date).toLocaleDateString(idioma, { day: "2-digit", month: "long",  year: "numeric"})}`}</Text>
                                {item.overview && (<Text style={styles.episodeOverview}>{item.overview}</Text>)}
                            </TouchableOpacity>
                        )}
                    />
                </>
            ) : (
                <Text>Carregando detalhes da temporada...</Text>
            )}
        </View>
    );
};

export default DetalheTemporada;
