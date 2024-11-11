import React, { useEffect, useState, useContext } from 'react';
import { View, Image, TouchableOpacity, Keyboard, Alert  } from 'react-native';
import PaginaBase from '../PaginaBase';
import Cabecalho from './Cabecalho/Pesquisa';
import Categorias from './Cabecalho/Categorias';
import Lista from './Lista';
import styles from './estilos';
import filmeImage from '../../assets/movies.png';
import serieImage from '../../assets/series.png';
import { fetchConteudos } from '../../servicos/api/tmdb'

import { GlobalContext } from '../../contexts/GlobalContext';

export default function Catalogo({ navigation }) {

    const { idioma, isSeries, setIsSeries, options } = useContext(GlobalContext);

    const [conteudos, setConteudos] = useState([]);
    const [pagina, setPagina] = useState(1);
    const [categoriaSelecionada, setCategoriaSelecionada] = useState(null);
    const [searchText, setSearchText] = useState('');
    const [searchTriggered, setSearchTriggered] = useState(false);

    useEffect(() => {
        fetchData();
    }, [pagina, categoriaSelecionada, searchTriggered, isSeries, idioma]); 

    // Buscas na API
    const fetchData = async () => {
        try {
            const endpoint = isSeries ? 'tv' : 'movie';
            const data = await fetchConteudos({ endpoint, pagina, idioma, categoriaSelecionada, searchText, options });
            if (data.results.length === 0) {
                return; // Não há mais dados
            }
            setConteudos((prevConteudos) => {
                const novosConteudos = data.results.filter(filme =>
                    !prevConteudos.some(prevFilme => prevFilme.id === filme.id)
                );
                return pagina === 1 ? novosConteudos : [...prevConteudos, ...novosConteudos];
            });
        } catch (error) {
            console.error('Erro ao buscar conteúdos:', error);
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
        setCategoriaSelecionada(null);
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
                    categoriaSelecionada={categoriaSelecionada}
                    handleSelectCategoria={handleSelectCategoria} 
                />
            </View>
            <Lista
                conteudos={conteudos}
                handleLoadMore={handleLoadMore}
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
