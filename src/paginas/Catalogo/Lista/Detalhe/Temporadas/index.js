import { Text, FlatList, TouchableOpacity } from 'react-native';
import React from 'react';
import styles from './estilos';

const Temporadas = ({ temporadas }) => {
    return (
        <FlatList
            data={temporadas}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
                item.air_date != null ? ( // Condição para exibir o item apenas se `air_date` for `null`
                    <TouchableOpacity style={styles.touchableContainer}>
                        <Text style={styles.temporadaNome}>{item.name}</Text>
                        <Text style={styles.episodeCount}>{item.episode_count}</Text>
                    </TouchableOpacity>
                ) : null
            )}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.temporadas}
            nestedScrollEnabled={true}
        />
    );
};

export default Temporadas;