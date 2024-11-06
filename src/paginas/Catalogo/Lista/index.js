import { View, Text, Image, FlatList, TouchableOpacity} from 'react-native';
import React, { useEffect, useState } from 'react';
import styles from './estilos';
import Detalhe from './Detalhe';

const Lista = ({ conteudos, handleLoadMore, idioma, isSeries }) => {
    const [itemSelecionado, setItemSelecionado] = useState(null);

    console.log(JSON.stringify(conteudos[0], null, 2));
    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.filmeContainer} onPress={() => setItemSelecionado(item.id)}>
            <Image
                source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
                style={styles.imagem}
                />
            <Text style={styles.titulo}>{ isSeries? item.name : item.title }</Text>
            <Text style={styles.diretor}>Média de avaliação: {item.vote_average.toFixed(1) || "Indisponível"}</Text>
        </TouchableOpacity>
    );

    return(
        <View>
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
                idioma={idioma}
                isSeries={isSeries}
                onClose={() => setItemSelecionado(null)}
            />
        </View>
    )
};

export default Lista;