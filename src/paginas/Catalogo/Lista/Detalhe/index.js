import { View, Text, Image, FlatList, TouchableOpacity, Modal, ScrollView, TextInput, Keyboard  } from 'react-native';
import React, { useEffect, useState, useContext } from 'react';
import { API_KEY, API_URL } from '@env';
import styles from './estlios';
import Elenco from './Elenco';
import Temporadas from './Temporadas';

import { GlobalContext } from '../../../../contexts/GlobalContext';

const Detalhe = ({ itemSelecionado, onClose }) => {

    const { idioma, isSeries, options } = useContext(GlobalContext);
    const [detalhes, setDetalhes] = useState(null);
    
    useEffect(()=>{
        // Busca detalhes do filme
        const fetchDetalhesFilme = async (filmeId) => {
            try {
                let endpoint = isSeries ? 'tv' : 'movie';
                const response = await fetch(`${API_URL}/${endpoint}/${filmeId}?&language=${idioma}`, options);
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

    const duracaoMinutos = detalhes[isSeries ? 'episode_run_time' : 'runtime'];
    const horas = Math.floor(duracaoMinutos / 60);
    const minutos = duracaoMinutos % 60;
    
    const duracaoFormatada = `${horas > 0 ? `${horas}h ` : ''}${minutos > 0 ? `${minutos}m ` : ''}`;

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
                            <Text style={styles.modalTitle}>
                                {isSeries? detalhes. name : detalhes.title}
                            </Text>
                            {detalhes.tagline && (<Text style={styles.tagline}>{detalhes.tagline}</Text>)}
                            <Text style={styles.modalData}>
                                {dataFormatada}
                            </Text>
                            <Text style={styles.modalOverview}>
                                {detalhes.overview}
                            </Text>
                            {duracaoFormatada.length>0? (<Text style={styles.modalDuracao}>
                                Duração {isSeries?"por episódio": ""}: {duracaoFormatada}
                            </Text>) : ''}
                            {detalhes.seasons && (<Temporadas temporadas={detalhes.seasons}/>)}
                            <Text style={styles.modalCategorias}>
                                Categorias: {detalhes.genres.map(genre => genre.name).join(", ")}
                            </Text>
                            <Elenco
                                conteudoId={itemSelecionado} 
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