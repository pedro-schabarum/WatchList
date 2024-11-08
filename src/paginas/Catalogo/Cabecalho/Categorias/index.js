import { GlobalContext } from '../../../../contexts/GlobalContext';
import React, { useEffect, useState, useContext } from 'react';
import { FlatList, Text, TouchableOpacity } from 'react-native';
import { API_KEY, API_URL } from '@env';
import styles from './estilos';


export default function Categorias({ categoriaSelecionada, handleSelectCategoria }) {

    const { idioma, isSeries, options } = useContext(GlobalContext);
    const [categorias, setCategorias] = useState([]);

    useEffect(() => {
        fetchCategorias();
    }, [isSeries, idioma]);

    const fetchCategorias = async () => {
        try {
            let endpoint = isSeries ? 'tv' : 'movie';
            const response = await fetch(`${API_URL}/genre/${endpoint}/list?language=${idioma}`, options);
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

