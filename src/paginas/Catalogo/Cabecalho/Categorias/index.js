import { GlobalContext } from '../../../../contexts/GlobalContext';
import React, { useEffect, useState, useContext } from 'react';
import { FlatList, Text, TouchableOpacity } from 'react-native';
import styles from './estilos';
import {fetchCategorias} from '../../../../servicos/api/tmdb'

export default function Categorias({ categoriaSelecionada, handleSelectCategoria }) {

    const { idioma, isSeries, options } = useContext(GlobalContext);
    const [categorias, setCategorias] = useState([]);

    useEffect(() => {
        getCategorias();
    }, [isSeries, idioma]);

    const getCategorias = async () => {
        try {
            let endpoint = isSeries ? 'tv' : 'movie';
            const response = await fetchCategorias({endpoint, idioma, options});
            setCategorias(response);
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

