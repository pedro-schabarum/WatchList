import { API_KEY, API_URL } from "@env";
import { Linking } from "react-native";

// Configurações para requisição
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

// Catálogo
export const fetchConteudos = async ({
  endpoint,
  pagina,
  idioma,
  categoriaSelecionada,
  searchText,
  options,
}) => {
  try {
    let url = categoriaSelecionada
      ? `${API_URL}/discover/${endpoint}?with_genres=${categoriaSelecionada.id}&page=${pagina}&language=${idioma}`
      : `${API_URL}/${endpoint}/popular?page=${pagina}&language=${idioma}`;

    if (searchText) {
      url = `${API_URL}/search/${endpoint}?query=${searchText}&page=${pagina}&language=${idioma}`;
    }

    const response = await fetch(url, options);
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error; // Rejeitar a promessa com o erro para tratamento posterior
  }
};

// Elenco
export const fetchElenco = async ({
  endpoint,
  conteudoId,
  idioma,
  options,
}) => {
  try {
    const response = await fetch(
      `${API_URL}/${endpoint}/${conteudoId}/credits?language=${idioma}`,
      options
    );
    const data = await response.json();
    if (!data.cast) return null;
    const elenco = data.cast.filter(
      (membro) => membro.known_for_department === "Acting"
    );
    return elenco || [];
  } catch (error) {
    console.error(error);
    return null;
  }
};

// Detalhe pessoa
export const fetchDetalhePessoa = async ({ integranteId, idioma, options }) => {
  try {
    // Requisição dos detalhes principais
    const response = await fetch(
      `${API_URL}/person/${integranteId}?language=${idioma}`,
      options
    );
    const data = await response.json();

    // Requisição dos filmes
    const responseFilmes = await fetch(
      `${API_URL}/person/${integranteId}/movie_credits?language=${idioma}`,
      options
    );

    const filmes = await responseFilmes.json();
    const filmesDados = filmes.cast.map((filme) => ({
      id: filme.id,
      title: filme.title,
      poster_path: filme.poster_path,
    }));

    // Requisição das séries
    const responseSeries = await fetch(
      `${API_URL}/person/${integranteId}/tv_credits?language=${idioma}`,
      options
    );
    const series = await responseSeries.json();
    const seriesDados = series.cast.map((serie) => ({
      id: serie.id,
      title: serie.name,
      poster_path: serie.poster_path,
    }));

    return { ...data, filmes: filmesDados, series: seriesDados };
  } catch (error) {
    console.error("Erro na requisição:", error);
    return null;
  }
};

// Lista de eps
export const fetchDetalhesTemporadas = async ({
  id,
  temporada,
  idioma,
  options,
}) => {
  try {
    // Verifica se 'id' e 'temporada.id' estão disponíveis antes de fazer a requisição
    if (id && temporada?.id) {
      const response = await fetch(
        `${API_URL}/tv/${id}/season/${temporada.season_number}?language=${idioma}`,
        options
      );
      return await response.json();
    }
  } catch (error) {
    console.error("Erro ao buscar os detalhes da temporada:", error);
  }
};

// Pegando categorias
export const fetchCategorias = async ({ endpoint, idioma, options }) => {
  try {
    const response = await fetch(
      `${API_URL}/genre/${endpoint}/list?language=${idioma}`,
      options
    );
    const data = await response.json();
    return data.genres;
  } catch (error) {
    console.error(error);
  }
};

// Pegando detalhes
export const fetchDetalhesConteudo = async ({
  endpoint,
  filmeId,
  idioma,
  options,
}) => {
  try {
    const response = await fetch(
      `${API_URL}/${endpoint}/${filmeId}?&language=${idioma}`,
      options
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
