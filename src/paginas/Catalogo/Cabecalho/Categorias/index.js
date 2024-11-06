import React, { useEffect, useState } from 'react';
import { FlatList, Text, TouchableOpacity } from 'react-native';
import styles from './estilos';
import { API_KEY, API_URL } from '@env';

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_KEY}`
    }
};

export default function Categorias({idioma, categoriaSelecionada, handleSelectCategoria }) {
    const [categorias, setCategorias] = useState([]);

    useEffect(() => {
        fetchCategorias();
    }, []); 

    const fetchCategorias = async () => {
        try {
            const response = await fetch(`${API_URL}/genre/movie/list?api_key=${API_KEY}&language=${idioma}`, options);
            const data = await response.json();
            setCategorias(data.genres);
        } catch (error) {
            console.error(error);
        }
    };
    return(    
        <FlatList
            data={categorias}
            horizontal
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
                <TouchableOpacity 
                    style={[
                        styles.navItem,
                        categoriaSelecionada?.id === item.id && styles.navItemSelected
                    ]}
                    onPress={() => handleSelectCategoria(item)}
                >
                    <Text style={styles.navText}>{item.name}</Text>
                </TouchableOpacity>
            )}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.navBar}
            extraData={categoriaSelecionada} 
        />
    )
};

