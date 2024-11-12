import { API_KEY, API_URL } from "@env";
import { Linking } from "react-native";

// Autenticacao usuario

let requestToken = ""; // Armazena o request_token
let sessionId = ""; // Armazena o session_id

// Configurações para requisição
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

// 1. Obter o request_token
export const getRequestToken = async () => {
  const url = `${API_URL}/authentication/token/new`;
  try {
    const response = await fetch(url, options);
    const data = await response.json();
    requestToken = data.request_token;
    console.log("Request Token:", requestToken);
    return requestToken;
  } catch (error) {
    console.error("Erro ao obter request_token", error);
  }
};

// 2. Redirecionar o usuário para a autorização
export const redirectToAuthPage = () => {
  const authUrl = `https://www.themoviedb.org/authenticate/${requestToken}`;
  Linking.openURL(authUrl).catch((err) => {
    console.error("Erro ao tentar abrir a URL:", err);
  });
};

// 3. Listener para capturar o redirecionamento e continuar o fluxo de autenticação
const listenForAuthResponse = () => {
  const handleAuthRedirect = ({ url }) => {
    console.log("URL capturada:", url); // Log para depuração
    if (url && url.startsWith("meuapp://auth")) {
      // Agora que o usuário autorizou, use o request_token para obter o session_id
      getSessionId();
    }
  };

  // Adicionar o listener para o evento URL
  const subscription = Linking.addEventListener("url", handleAuthRedirect);

  // Retorne a função de remoção do listener
  return () => subscription.remove();
};

// 4. Trocar o request_token autorizado por uma session_id
const getSessionId = async () => {
  const url = `${API_URL}/authentication/session/new`;
  const opcoes = {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({ request_token: requestToken }),
  };

  try {
    const response = await fetch(url, opcoes);
    const data = await response.json();

    if (data.success) {
      sessionId = data.session_id;
      console.log("Session ID:", sessionId);
    } else {
      console.error("Erro ao obter session_id:", data.status_message);
    }
  } catch (error) {
    console.error("Erro ao obter session_id:", error);
  }
};

// 5. Fluxo completo de autenticação
export const authenticateUser = async () => {
  try {
    // Obter o request_token
    await getRequestToken();

    // Adicionar listener para capturar o redirecionamento
    const removeListener = listenForAuthResponse();

    // Redirecionar o usuário para a página de autorização
    redirectToAuthPage();

    // Remover o listener após a autorização
    removeListener();
  } catch (error) {
    console.error("Erro no fluxo de autenticação", error);
  }
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
