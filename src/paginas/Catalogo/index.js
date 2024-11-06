import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, Modal, ScrollView, TextInput, Keyboard, Alert  } from 'react-native';
import { API_KEY, API_URL } from '@env';
import PaginaBase from '../PaginaBase';
import styles from './estilos';
import Cabecalho from './Cabecalho/Pesquisa';
import Categorias from './Cabecalho/Categorias';
import Lista from './Lista';

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_KEY}`
    }
};

export default function Catalogo({ navigation }) {

    const [filmes, setFilmes] = useState([]);
    const [pagina, setPagina] = useState(1);
    const [categoriaSelecionada, setCategoriaSelecionada] = useState(null);
    const [idioma, setIdioma] = useState('pt-BR');
    const [searchText, setSearchText] = useState('');
    const [searchTriggered, setSearchTriggered] = useState(false);


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
                Keyboard.dismiss();
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

    const handleLoadMore = () => {
        setPagina((prevPagina) => prevPagina + 1);
    };

    const handleSearch = () => {
        if (searchText.trim() == '') return;
        setPagina(1);
        setFilmes([]);
        setCategoriaSelecionada(null) 
        setSearchTriggered((prev) => !prev); // Altera searchTriggered para disparar nova busca
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
                    // categorias={categorias}
                    idioma={idioma}
                    categoriaSelecionada={categoriaSelecionada}
                    handleSelectCategoria={handleSelectCategoria} 
                />
            </View>
            <Lista
                filmes={filmes}
                idioma={idioma}
                handleLoadMore={handleLoadMore}
            />
        </PaginaBase>
    );
}
