import { View, Text, Image, FlatList, TouchableOpacity, Modal, ScrollView, TextInput, Keyboard  } from 'react-native';
import React, { useEffect, useState } from 'react';
import { API_KEY, API_URL } from '@env';
import styles from './estlios';
import Elenco from './Elenco';

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_KEY}`
    }
};

const Detalhe = ({ itemSelecionado, idioma, onClose, isSeries }) => {
    const [detalhes, setDetalhes] = useState(null);
    
    useEffect(()=>{
        
        // Busca detalhes do filme
        const fetchDetalhesFilme = async (filmeId) => {
            try {
                let endpoint = isSeries ? 'tv' : 'movie';
                const response = await fetch(`${API_URL}/${endpoint}/${filmeId}?api_key=${API_KEY}&language=${idioma}`, options);
                const data = await response.json();
                return setDetalhes(data);
            } catch (error) {
                console.error(error);
                return null;
            }
        };  

        if (itemSelecionado) {
            fetchDetalhesFilme(itemSelecionado);
        }
    }, [itemSelecionado, idioma])

    if (!itemSelecionado || !detalhes) {
        return null;
    }

    const dataFormatada = new Date(detalhes[isSeries? 'first_air_date' : 'runtime'])
        .toLocaleDateString(idioma, {
            day: "2-digit",
            month: "long", 
            year: "numeric"
        });

        const duracaoFormatada = `${Math.floor(detalhes[isSeries ? 'first_air_date' : 'runtime'] / 60)}h ${detalhes[isSeries ? 'first_air_date' : 'runtime'] % 60}m`;


    console.log("detalhe" + JSON.stringify(detalhes, null, 2))

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
                            source={{ uri: `https://image.tmdb.org/t/p/w500${detalhes.backdrop_path}` }}
                            style={styles.imagemModal}
                        />

                        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent}>
                            <Text style={styles.modalTitle}>{isSeries? detalhes. name : detalhes.title}</Text>
                            {detalhes.tagline && (<Text style={styles.tagline}>{detalhes.tagline}</Text>)}
                            <Text style={styles.modalData}>{dataFormatada}</Text>
                            <Text style={styles.modalOverview}>{detalhes.overview}</Text>
                            <Text style={styles.modalDuracao}>Duração: {duracaoFormatada}</Text>
                            <Text style={styles.modalCategorias}>Categorias: {detalhes.genres.map(genre => genre.name).join(", ")}</Text>
                            <Elenco
                                filmeId={itemSelecionado}
                                idioma={idioma}
                            />
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