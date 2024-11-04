import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, KeyboardAvoidingView, Platform, Modal, ScrollView, TextInput, Button } from 'react-native';
import { API_KEY, API_URL } from '@env';
import PaginaBase from '../PaginaBase';
import styles from './estilos';

const DEBOUNCE_DELAY = 500;

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_KEY}`
    }
};

export default function Catalogo() {

    const [filmes, setFilmes] = useState([]);
    const [pagina, setPagina] = useState(1);
    const [categorias, setCategorias] = useState([]);
    const [categoriaSelecionada, setCategoriaSelecionada] = useState(null);
    const [idioma, setIdioma] = useState('pt-BR');
    const [searchText, setSearchText] = useState('');
    const [searchTriggered, setSearchTriggered] = useState(false);

    // Estados para controlar o modal
    const [modalContent, setModalContent] = useState(null);

    useEffect(() => {
        fetchCategorias();
    }, []); 

    useEffect(() => {
        fetchFilmes();
    }, [pagina, categoriaSelecionada, searchTriggered]); 

    // Buscas na API
    const fetchFilmes = async () => {

        try {
            let url = categoriaSelecionada
                ? `${API_URL}/discover/movie?api_key=${API_KEY}&with_genres=${categoriaSelecionada.id}&page=${pagina}&language=${idioma}`
                : `${API_URL}/movie/popular?page=${pagina}&language=${idioma}`;
            
            if (searchText) {
                setCategoriaSelecionada(null)
                // URL de pesquisa com o termo digitado
                url = `${API_URL}/search/movie?api_key=${API_KEY}&query=${searchText}&page=${pagina}&language=${idioma}`;
            }

            const response = await fetch(url, options);
            const data = await response.json();
            const filmesComDiretores = await Promise.all(
                data.results.map(async (filme) => {
                    const diretor = await fetchDiretor(filme.id, options);
                    return {
                        ...filme,
                        diretor: diretor || 'Indisponível',
                    };
                })
            );
            setFilmes((prevFilmes) => {
                const novosFilmes = data.results.filter(filme => 
                    !prevFilmes.some(prevFilme => prevFilme.id === filme.id)
                );
                return pagina === 1 ? novosFilmes : [...prevFilmes, ...novosFilmes];
            });
        } catch (error) {
            console.error(error);
        }
    };

    const fetchDiretor = async (filmeId, options) => {
        try {
            const response = await fetch(`${API_URL}/movie/${filmeId}/credits`, options);
            const data = await response.json();
            const diretorInfo = data.crew.find((membro) => membro.job === 'Writing');
            return diretorInfo ? diretorInfo.name : null;
        } catch (error) {
            console.error(error);
            return null;
        }
    };

    const fetchCategorias = async () => {
        try {
            const response = await fetch(`${API_URL}/genre/movie/list?api_key=${API_KEY}&language=${idioma}`, options);
            const data = await response.json();
            setCategorias(data.genres);
        } catch (error) {
            console.error(error);
        }
    };

    const handleSelectCategoria = (categoria) => {
        if (categoriaSelecionada?.id === categoria.id){
            setCategoriaSelecionada(null);
        } else {
            setCategoriaSelecionada(categoria);
            setSearchText('')
            setPagina(1);
            setFilmes([]);
        }
    };

    // Busca detalhes do filme
    const fetchDetalhesFilme = async (filmeId, options) => {
        try {
            const response = await fetch(`${API_URL}/movie/${filmeId}?api_key=${API_KEY}&language=${idioma}`, options);
            const data = await response.json();
            return {
                ...data,
                runtime: data.runtime // Duração em minutos
            };
        } catch (error) {
            console.error(error);
            return null;
        }
    };
    
    // Filme da lista
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

    // Categorias
    const renderCategoria = ({ item }) => (
        <TouchableOpacity 
            style={[styles.navItem, categoriaSelecionada?.id === item.id && styles.navItemSelected]}
            onPress={() => handleSelectCategoria(item)}
        >
            <Text style={styles.navText}>{item.name}</Text>
        </TouchableOpacity>
    );

    // Lista de categorias
    const NavBar = ({ categorias }) => {
        return (
            <FlatList
                data={categorias}
                horizontal
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderCategoria}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.navBar}
                extraData={categoriaSelecionada} 
            />
        );
    };

    // Detalhe do filme
    const openModal = async (filme) => {
        const detalheFilme = await fetchDetalhesFilme(filme, options);
        
        const dataFormatada = new Date(detalheFilme.release_date)
        .toLocaleDateString(idioma, {
            day: "2-digit",
            month: "long", 
            year: "numeric"
        });

        setModalContent(
            <Modal
            visible={true}
            animationType="slide"
            transparent={true}
            onRequestClose={() => setModalContent(null)}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Image
                        source={{ uri: `https://image.tmdb.org/t/p/w500${detalheFilme.poster_path}` }}
                        style={styles.imagemModal}
                    />

                    {/* ScrollView para textos */}
                    <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent}>
                        <Text style={styles.modalTitle}>{detalheFilme.title}</Text>
                        {detalheFilme.tagline && (<Text style={styles.modalData}>{detalheFilme.tagline}</Text>)}
                        <Text style={styles.modalData}>{dataFormatada}</Text>
                        <Text style={styles.modalOverview}>{detalheFilme.overview}</Text>
                        <Text style={styles.modalCategorias}>Categorias: {detalheFilme.genres.map(genre => genre.name).join(", ")}</Text>
                    </ScrollView>

                    <TouchableOpacity style={styles.modalButton} onPress={() => setModalContent(null)}>
                        <Text style={styles.textoBotao}>Fechar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
        );
    };


    const handleLoadMore = () => {
        setPagina((prevPagina) => prevPagina + 1);
    };

    const handleSearch = () => {
        if (searchText.trim() == '') return;
        setPagina(1);
        setFilmes([]);
        setSearchTriggered((prev) => !prev); // Altera searchTriggered para disparar nova busca
    };

    return (
        <PaginaBase>
            <View>
                <View style={styles.Pesquisa}>
                    <TextInput
                        style={styles.barraPesquisa} // Adicione um estilo adequado para a barra de pesquisa
                        placeholder="Buscar filmes..."
                        placeholderTextColor={'#575757'}
                        value={searchText}
                        onChangeText={setSearchText}
                    />
                    <TouchableOpacity style={styles.buttonPesquisa} onPress={handleSearch}>
                        <Text style={styles.buttonText}>Buscar</Text>
                    </TouchableOpacity>
                </View>
                <NavBar categorias={categorias} />
            </View>
            <FlatList
                data={filmes}
                keyExtractor={(item) => item.id.toString()} 
                renderItem={renderItem}
                numColumns={2}
                onEndReached={handleLoadMore}
                onEndReachedThreshold={0.7}   
            />
            {modalContent}
        </PaginaBase>
    );
}
