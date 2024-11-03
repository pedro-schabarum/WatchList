import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, Dimensions, KeyboardAvoidingView, Platform } from 'react-native';
import { API_KEY, API_URL } from '@env';
import PaginaBase from '../PaginaBase';
import styles from './estilos';

export default function Catalogo() {
    const [filmes, setFilmes] = useState([]);
    const [pagina, setPagina] = useState(1);
    const [categorias, setCategorias] = useState([]);
    const [categoriaSelecionada, setCategoriaSelecionada] = useState(null);
    const [idioma, setIdioma] = useState('pt-BR');

    useEffect(() => {
        fetchCategorias();
    }, []); 

    useEffect(() => {
        fetchFilmes();
    }, [pagina, categoriaSelecionada]); 

    const fetchFilmes = async () => {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${API_KEY}`
            }
        };

        try {
            // Verificar se a pesquisa é por categoria
            const url = categoriaSelecionada
                ? `${API_URL}/discover/movie?api_key=${API_KEY}&with_genres=${categoriaSelecionada.id}&page=${pagina}&language=${idioma}`
                : `${API_URL}/movie/popular?page=${pagina}&language=${idioma}`; // Corrigido aqui

            // Buscar lista de filmes
            const response = await fetch(url, options); // Utilize a URL definida acima
            const data = await response.json();
            const filmesComDiretores = await Promise.all(
                data.results.map(async (filme) => {
                    // Buscar o diretor para cada filme
                    const diretor = await fetchDiretor(filme.id, options);
                    return {
                        ...filme,
                        diretor: diretor || 'Desconhecido',
                    };
                })
            );
            setFilmes((prevFilmes) => {
                const novosFilmes = data.results.filter(filme => 
                    !prevFilmes.some(prevFilme => prevFilme.id === filme.id)
                );
                return [...prevFilmes, ...novosFilmes];
            });
        } catch (error) {
            console.error(error);
        }
    };

    // Função para buscar o diretor de um filme específico
    const fetchDiretor = async (filmeId, options) => {
        try {
            const response = await fetch(`${API_URL}/movie/${filmeId}/credits`, options);
            const data = await response.json();
            const diretorInfo = data.crew.find((membro) => membro.job === 'Director');
            return diretorInfo ? diretorInfo.name : null;
        } catch (error) {
            console.error(error);
            return null;
        }
    };

    const fetchCategorias = async () => {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${API_KEY}`
            }
        };

        try {
            const response = await fetch(`${API_URL}/genre/movie/list?api_key=${API_KEY}&language=${idioma}`, options);
            const data = await response.json();
            setCategorias(data.genres); // Define as categorias retornadas
        } catch (error) {
            console.error(error);
        }
    };

    const handleSelectCategoria = (categoria) => {
        if (categoriaSelecionada?.id === categoria.id) return;
        setCategoriaSelecionada(categoria); // Define a categoria selecionada
        setPagina(1); // Reinicia a página
        setFilmes([]); // Limpa a lista de filmes
    };

    useEffect(() => {
        fetchFilmes();
    }, []);

    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.filmeContainer}>
            <Image
                source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
                style={styles.imagem}
            />
            <Text style={styles.titulo}>{item.title}</Text>
            <Text style={styles.diretor}>Diretor: {item.diretor || "Desconhecido"}</Text>
        </TouchableOpacity>
    );

    const renderCategoria = ({ item }) => (
        <TouchableOpacity 
            style={[styles.navItem, categoriaSelecionada?.id === item.id && styles.navItemSelected]}
            onPress={() => handleSelectCategoria(item)}
        >
            <Text style={styles.navText}>{item.name}</Text>
        </TouchableOpacity>
    );

    const NavBar = ({ categorias, onSelectCategoria }) => {
        return (
            <FlatList
                data={categorias}
                horizontal // Permite rolagem horizontal
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderCategoria}
                showsHorizontalScrollIndicator={false} // Remove a barra de rolagem
                contentContainerStyle={styles.navBar} // Para centralizar e estilizar a navBar
            />
        );
    };

    const handleLoadMore = () => {
        // Incrementa a página para buscar mais filmes
        setPagina((prevPagina) => prevPagina + 1);
    };

    return (
        <PaginaBase>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                <NavBar categorias={categorias} onSelectCategoria={handleSelectCategoria} />
                <FlatList
                    style={styles.listaFilmes}
                    data={filmes}
                    keyExtractor={(item) => item.id.toString()} 
                    renderItem={renderItem}
                    numColumns={2}  // Define duas colunas
                    contentContainerStyle={styles.lista}
                    onEndReached={handleLoadMore} // Chama a função quando chega ao final
                    onEndReachedThreshold={0.1} // Define o quanto antes deve ser chamado (0 a 1)   
                />
            </KeyboardAvoidingView>
        </PaginaBase>
    );
}
