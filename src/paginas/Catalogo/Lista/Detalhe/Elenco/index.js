import { View, Text, Image, FlatList, TouchableOpacity, Modal, ScrollView, TextInput, Keyboard  } from 'react-native';
import React, { useEffect, useState } from 'react';
import { API_KEY, API_URL } from '@env';
import styles from './estilos';

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_KEY}`
    }
};

const Elenco = ({filmeId, idioma}) => {

    const [elenco, setElenco] = useState()

    useEffect(() => {
        fetchElenco(filmeId);
    }, []); 

    const fetchElenco = async (filmeId) => {
        try {
            const response = await fetch(`${API_URL}/movie/${filmeId}/credits?language=${idioma}`, options);
            const data = await response.json();
            if(!data.cast) return null
            const elenco = data.cast.filter((membro) => membro.known_for_department === 'Acting');
            
            setElenco(elenco || []);
        } catch (error) {
            console.error(error);
            return null;
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