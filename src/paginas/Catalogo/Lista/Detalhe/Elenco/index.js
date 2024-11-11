import { Text, Image, FlatList, TouchableOpacity } from 'react-native';
import React, { useEffect, useState, useContext } from 'react';
import styles from './estilos';
import { fetchElenco } from  '../../../../../servicos/api/tmdb'
import { GlobalContext } from '../../../../../contexts/GlobalContext';

const Elenco = ({conteudoId}) => {

    const { idioma, isSeries, options } = useContext(GlobalContext);
    const [elenco, setElenco] = useState()

    useEffect(() => {
        fetchData();
    }, []); 

    const fetchData = async () => {
        try {
            let endpoint = isSeries ? 'tv' : 'movie';
            const data = await fetchElenco({endpoint, conteudoId, idioma, options});
            setElenco(data);
        } catch (error) {
            console.error('Erro ao buscar conteúdos:', error);
        }
    };

    return(
        elenco ? (
        <FlatList
            data={elenco}
            horizontal
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
                <TouchableOpacity 
                    // onPress={() => handleSelectCategoria(item)}
                >
                    <Image
                        source={{ uri: `https://image.tmdb.org/t/p/w500${item.profile_path}` }}
                        style={styles.elencoImagem}
                    />
                    <Text style={styles.elencoNome}>{item.name}</Text>
                    {item.character.split(" / ").map((role, index) => (
        <Text key={index} style={styles.elencoPersonagem}>{role}</Text>
    ))}
                </TouchableOpacity>
            )}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.elenco}
        />) : null
    )
};

export default Elenco;