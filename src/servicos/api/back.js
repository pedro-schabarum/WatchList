export const salvaUsuario = async ({ nome, email, senha, idioma }) => {
  console.log("Enviando dados para o servidor:", {
    nome,
    email,
    senha,
    idioma,
  });
  try {
    const response = await fetch(
      `http://192.168.2.100:8000/api/cadastrarUser`,
      {
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
      }
    );

    // Verifique se a resposta foi bem-sucedida
    if (!response.ok) {
      throw new Error("Falha ao salvar o usuário");
    }

    // Se a resposta for bem-sucedida, trate a resposta (por exemplo, em JSON)
    console.log("response" + Object.keys(response));

    return true;
  } catch (error) {
    console.error("Erro ao salvar o usuário:", error);
    throw error; // Re-throwing the error to propagate it
  }
};
export const updateIdioma = async ({ usuario }) => {
  try {
    const response = await fetch(`http://192.168.2.100:8000/api/updateUser`, {
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
export const adicionarLista = async ({ usuario, item }) => {
  try {
    const response = await fetch(`http://192.168.2.100:8000/api/updateUser`, {
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
