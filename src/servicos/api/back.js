const endpoint = "http://192.168.2.100:8000/";

export const salvaUsuario = async ({ nome, email, senha, idioma }) => {
  console.log("Enviando dados para o servidor:", {
    nome,
    email,
    senha,
    idioma,
  });
  try {
    const response = await fetch(`${endpoint}api/cadastrarUser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nome: nome,
        email: email,
        senha: senha,
        idioma: idioma,
      }),
    });
    // Verifique se a resposta foi bem-sucedida
    if (!response.ok) {
      throw new Error("Falha ao salvar o usuário no back");
    }

    return response.json();
  } catch (error) {
    console.error("Erro ao salvar o usuário:", error);
    throw error; // Re-throwing the error to propagate it
  }
};

export const authenticateUser = async ({ email, senha }) => {
  console.log("Enviando dados para o servidor:", {
    email,
    senha,
  });
  try {
    const response = await fetch(`${endpoint}api/authenticateUser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        senha: senha,
      }),
    });

    // Verifique se a resposta foi bem-sucedida
    if (!response.ok) {
      throw new Error("Falha ao salvar o usuário");
    }

    return response.json();
  } catch (error) {
    console.error("Erro ao salvar o usuário:", error);
    throw error; // Re-throwing the error to propagate it
  }
};

export const updateIdioma = async ({ usuario }) => {
  try {
    const response = await fetch(`${endpoint}api/updateUser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: usuario.email,
        idioma: usuario.idioma,
      }),
    });

    // Verifique se a resposta foi bem-sucedida
    if (!response.ok) {
      throw new Error("Falha ao salvar o usuário");
    }

    return true;
  } catch (error) {
    console.error("Erro ao salvar o usuário:", error);
    throw error; // Re-throwing the error to propagate it
  }
};

//--//--//--//--//--//--//--//Funcoes para as listas//--//--//--//--//--//--//--//

export const adicionarLista = async ({ usuario, item, tipo }) => {
  try {
    const response = await fetch(`${endpoint}/api/inserList`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: usuario.email,
        item: item,
        tipo: tipo,
      }),
    });

    // Verifique se a resposta foi bem-sucedida
    if (!response.ok) {
      throw new Error("Falha ao salvar o usuário");
    }

    return true;
  } catch (error) {
    console.error("Erro ao salvar o usuário:", error);
    throw error; // Re-throwing the error to propagate it
  }
};
