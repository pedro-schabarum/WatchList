import { API_KEY, API_URL } from '@env';
import { Linking } from 'react-native';

let requestToken = ''; // Armazena o request_token
let sessionId = '';    // Armazena o session_id

// Configurações para requisição
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_KEY}`
    }
};

// 1. Obter o request_token
const getRequestToken = async () => {
    const url = `${API_URL}/authentication/token/new`;
    try {
        const response = await fetch(url, options);
        const data = await response.json();
        requestToken = data.request_token;
        console.log("Request Token:", requestToken);
        return requestToken;
    } catch (error) {
        console.error('Erro ao obter request_token', error);
    }
};

// 2. Redirecionar o usuário para a autorização
const redirectToAuthPage = () => {
    const authUrl = `https://www.themoviedb.org/authenticate/${requestToken}`;
    Linking.openURL(authUrl).catch((err) => {
        console.error("Erro ao tentar abrir a URL:", err);
    });
};

// 3. Listener para capturar o redirecionamento e continuar o fluxo de autenticação
const listenForAuthResponse = () => {
    const handleAuthRedirect = ({ url }) => {
        console.log('URL capturada:', url); // Log para depuração
        if (url && url.startsWith("meuapp://auth")) {
            // Agora que o usuário autorizou, use o request_token para obter o session_id
            getSessionId();
        }
    };

    // Adicionar o listener para o evento URL
    const subscription = Linking.addEventListener('url', handleAuthRedirect);
    
    // Retorne a função de remoção do listener
    return () => subscription.remove();
};

// 4. Trocar o request_token autorizado por uma session_id
const getSessionId = async () => {
    const url = `${API_URL}/authentication/session/new`;
    const opcoes = {
        method: 'POST',
        headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            Authorization: `Bearer ${API_KEY}`
        },
        body: JSON.stringify({ "request_token": requestToken })
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
        console.error('Erro ao obter session_id:', error);
    }
};

// 5. Fluxo completo de autenticação
const authenticateUser = async () => {
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
        console.error('Erro no fluxo de autenticação', error);
    }
};

// Exportar funções caso necessário
export {
    getRequestToken,
    redirectToAuthPage,
    authenticateUser
};
