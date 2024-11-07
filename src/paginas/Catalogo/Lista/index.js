import { View, Text, Image, FlatList, TouchableOpacity} from 'react-native';
import React, { useEffect, useState, useContext } from 'react';
import styles from './estilos';
import Detalhe from './Detalhe';


import { GlobalContext } from '../../../contexts/GlobalContext';

const Lista = ({ conteudos, handleLoadMore }) => {
    const { isSeries } = useContext(GlobalContext);

    const [itemSelecionado, setItemSelecionado] = useState(null);

    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.filmeContainer} onPress={() => setItemSelecionado(item.id)}>
            <Image
                source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
                style={styles.imagem}
                />
            <Text style={styles.titulo}>{ isSeries? item.name : item.title }</Text>
            {/* <Text style={styles.diretor}>Média de avaliação: {item.vote_average.toFixed(1) || "Indisponível"}</Text> */}
            <Text style={styles.diretor}>Média de avaliação: {item.vote_average.toFixed(1) || "Indisponível"}</Text>
        </TouchableOpacity>
    );

    return(
        <View style={{flex: 1}}>
            <FlatList
                data={conteudos}
                keyExtractor={(item) => item.id.toString()} 
                renderItem={renderItem}
                numColumns={2}
                onEndReached={handleLoadMore}
                onEndReachedThreshold={0.4}   
            />
            <Detalhe
                itemSelecionado={itemSelecionado}
                onClose={() => setItemSelecionado(null)}
            />
        </View>
    )
};

export default Lista;