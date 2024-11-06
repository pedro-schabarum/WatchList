import { View, Text, Image, FlatList, TouchableOpacity, Modal, ScrollView, TextInput, Keyboard  } from 'react-native';
import React, { useEffect, useState } from 'react';
import { API_KEY, API_URL } from '@env';
import styles from './estilos';
import Detalhe from './Detelhe';

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_KEY}`
    }
};

const Lista = ({ filmes, handleLoadMore, idioma }) => {
    const [itemSelecionado, setItemSelecionado] = useState(null);

    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.filmeContainer} onPress={() => setItemSelecionado(item.id)}>
            <Image
                source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
                style={styles.imagem}
                />
            <Text style={styles.titulo}>{item.title}</Text>
            <Text style={styles.diretor}>Diretor: {item.diretor || "Indisponível"}</Text>
        </TouchableOpacity>
    );

    return(
        <View>
            <FlatList
                data={filmes}
                keyExtractor={(item) => item.id.toString()} 
                renderItem={renderItem}
                numColumns={2}
                onEndReached={handleLoadMore}
                onEndReachedThreshold={0.4}   
            />
            <Detalhe
                itemSelecionado={itemSelecionado}
                idioma={idioma}
                onClose={() => setItemSelecionado(null)}
            />
        </View>
    )
};

export default Lista;