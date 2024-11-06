import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, Modal, ScrollView, TextInput, Keyboard, Alert  } from 'react-native';
import { API_KEY, API_URL } from '@env';
import PaginaBase from '../PaginaBase';
import Cabecalho from './Cabecalho/Pesquisa';
import Categorias from './Cabecalho/Categorias';
import Lista from './Lista';
import styles from './estilos';
import filmeImage from '../../assets/movies.png';
import serieImage from '../../assets/series.png';

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_KEY}`
    }
};

export default function Catalogo({ navigation }) {

    const [conteudos, setConteudos] = useState([]);
    const [pagina, setPagina] = useState(1);
    const [categoriaSelecionada, setCategoriaSelecionada] = useState(null);
    const [idioma, setIdioma] = useState('pt-BR');
    const [searchText, setSearchText] = useState('');
    const [searchTriggered, setSearchTriggered] = useState(false);
    const [isSeries, setIsSeries] = useState(false); // Novo estado para controlar filmes/séries

    useEffect(() => {
        fetchConteudos();
    }, [pagina, categoriaSelecionada, searchTriggered, isSeries]); 

    // Buscas na API
    const fetchConteudos = async () => {

        try {
            let endpoint = isSeries ? 'tv' : 'movie';
            let url = categoriaSelecionada
                ? `${API_URL}/discover/${endpoint}?api_key=${API_KEY}&with_genres=${categoriaSelecionada.id}&page=${pagina}&language=${idioma}`
                : `${API_URL}/${endpoint}/popular?page=${pagina}&language=${idioma}`;
            
            if (searchText) {
                Keyboard.dismiss();
                // URL de pesquisa com o termo digitado
                url = `${API_URL}/search/${endpoint}?api_key=${API_KEY}&query=${searchText}&page=${pagina}&language=${idioma}`;
            }

            const response = await fetch(url, options);
            const data = await response.json();
            setConteudos((prevConteudos) => {
                const novosConteudos = data.results.filter(filme => 
                    !prevConteudos.some(prevFilme => prevFilme.id === filme.id)
                );
                return pagina === 1 ? novosConteudos : [...prevConteudos, ...novosConteudos];
            });
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
            setConteudos([]);
        }
    };

    const handleLoadMore = () => {
        setPagina((prevPagina) => prevPagina + 1);
    };

    const handleSearch = () => {
        if (searchText.trim() == '') return;
        setPagina(1);
        setConteudos([]);
        setCategoriaSelecionada(null);
        setSearchTriggered((prev) => !prev);
    };

    const toggleIsSeries = () => {
        setIsSeries(prev => !prev);
        setPagina(1);
        setConteudos([]);
        setSearchText('');
    };

    return (
        <PaginaBase>
            <View>
                <Cabecalho
                    value={searchText}
                    onChangeText={setSearchText}
                    onSearch={handleSearch}
                    navigation={navigation}
                />
                <Categorias 
                    idioma={idioma}
                    categoriaSelecionada={categoriaSelecionada}
                    handleSelectCategoria={handleSelectCategoria} 
                />
            </View>
            <Lista
                conteudos={conteudos}
                idioma={idioma}
                handleLoadMore={handleLoadMore}
                isSeries={isSeries}
            />
            <TouchableOpacity style={styles.toggle} onPress={toggleIsSeries}>
                <Image
                    style={styles.imageToggle}
                    source={isSeries ? serieImage : filmeImage}
                />
            </TouchableOpacity>
        </PaginaBase>
    );
}
