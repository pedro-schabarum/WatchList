import { View, Text, Image, FlatList, TouchableOpacity, Modal, ScrollView, TextInput, Keyboard  } from 'react-native';
import styles from './estilos';

const Lista = ({ filmes, openModal, handleLoadMore }) => {
    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.filmeContainer} onPress={() => openModal(item.id)}>
            <Image
                source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
                style={styles.imagem}
            />
            <Text style={styles.titulo}>{item.title}</Text>
            <Text style={styles.diretor}>Diretor: {item.diretor || "Indisponível"}</Text>
        </TouchableOpacity>
    );
    return(<FlatList
        data={filmes}
        keyExtractor={(item) => item.id.toString()} 
        renderItem={renderItem}
        numColumns={2}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.7}   
    />)
};

export default Lista;