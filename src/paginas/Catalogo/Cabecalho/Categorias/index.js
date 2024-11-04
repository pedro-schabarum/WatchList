import React from 'react';
import { FlatList, Text, TouchableOpacity } from 'react-native';
import styles from './estilos';

const Categorias = ({ categorias, categoriaSelecionada, handleSelectCategoria }) => (
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
);

export default Categorias;
