import { View, Text, Image, FlatList, TouchableOpacity, Modal, ScrollView, TextInput, Keyboard  } from 'react-native';
import React, { useEffect, useState } from 'react';
import { API_KEY, API_URL } from '@env';
import styles from './estlios';

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_KEY}`
    }
};

const Detalhe = ({ itemSelecionado, idioma, onClose }) => {
    const [detalheFilme, setDetalheFilme] = useState(null);
    
    useEffect(()=>{
        
        // Busca detalhes do filme
        const fetchDetalhesFilme = async (filmeId) => {
            try {
                const response = await fetch(`${API_URL}/movie/${filmeId}?api_key=${API_KEY}&language=${idioma}`, options);
                const data = await response.json();
                return setDetalheFilme(data);
            } catch (error) {
                console.error(error);
                return null;
            }
        };  

        if (itemSelecionado) {
            fetchDetalhesFilme(itemSelecionado);
        }
    }, [itemSelecionado, idioma])

    if (!itemSelecionado || !detalheFilme) {
        return null;
    }

    const dataFormatada = new Date(detalheFilme.release_date)
        .toLocaleDateString(idioma, {
            day: "2-digit",
            month: "long", 
            year: "numeric"
        });

    const duracaoFormatada = `${Math.floor(detalheFilme.runtime / 60)}h ${detalheFilme.runtime % 60}m`;


    return(<View>
            <Modal
            visible={true}
            animationType="slide"
            transparent={true}
            onRequestClose={onClose}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Image
                            source={{ uri: `https://image.tmdb.org/t/p/w500${detalheFilme.backdrop_path}` }}
                            style={styles.imagemModal}
                        />

                        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent}>
                            <Text style={styles.modalTitle}>{detalheFilme.title}</Text>
                            {detalheFilme.tagline && (<Text style={styles.tagline}>{detalheFilme.tagline}</Text>)}
                            <Text style={styles.modalData}>{dataFormatada}</Text>
                            <Text style={styles.modalOverview}>{detalheFilme.overview}</Text>
                            <Text style={styles.modalDuracao}>Duração: {duracaoFormatada}</Text>
                            <Text style={styles.modalCategorias}>Categorias: {detalheFilme.genres.map(genre => genre.name).join(", ")}</Text>
                        </ScrollView>

                        <TouchableOpacity style={styles.modalButton} onPress={onClose}>
                            <Text style={styles.textoBotao}>Fechar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>)
};

export default Detalhe;