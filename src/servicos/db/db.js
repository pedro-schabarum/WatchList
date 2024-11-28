import * as SQLite from "expo-sqlite";
import * as FileSystem from "expo-file-system";
import { salvaUsuario, updateIdioma, authenticateUser } from "../api/back";

//--//--//--//--//--//--//--//Funcoes do banco SQLite//--//--//--//--//--//--//--//

const dbPath = `${FileSystem.documentDirectory}SQLite/WatchList.db`;

// Limpando o banco de dados
export const clearDatabaseFile = async () => {
  // Verifica se o arquivo do banco de dados existe e, se sim, remove-o
  const fileExists = await FileSystem.getInfoAsync(dbPath);
  if (fileExists.exists) {
    await FileSystem.deleteAsync(dbPath, { idempotent: true });
    console.log("Banco de dados excluído com sucesso.");
  } else {
    console.log("Banco de dados já estava vazio.");
  }
};
// Abrindo o banco
const openDatabase = async () => {
  console.log("abrindo base");
  const db = await SQLite.openDatabaseAsync("WatchList.db");

  // Definindo o modo de journal
  await db.execAsync(`PRAGMA journal_mode = WAL;`);

  // Criando a tabela Users, se não existir
  await db.execAsync(`CREATE TABLE IF NOT EXISTS usuario (
    id INTEGER PRIMARY KEY,
    nome TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    idioma TEXT NOT NULL,
    fotoPerfil VARCHAR,
    dataNascimento DATE,
    statusLogin BOOLEAN DEFAULT FALSE
  )`);

  return db;
};
// Inicializar o banco de dados
export const initializeDatabase = async () => {
  console.log("iniciando base");
  const db = await openDatabase();
  return db;
};
// Limpar o banco de dados
export const clearDatabase = async (db) => {
  // Exclui a tabela Users, se existir
  await db.execAsync("DROP TABLE IF EXISTS usuario");
};

//--//--//--//--//--//--//--//Funcoes para usuarios//--//--//--//--//--//--//--//

// Função para inserir usuário
export const insertUser = async (db, nome, email, senha, idioma, novo) => {
  try {
    // console.log("Tentando inserir usuário com dados:", nome, email, senha, idioma);
    if (novo) {
      await salvaUsuario({ nome, email, senha, idioma });
    }

    await db.runAsync("DELETE FROM usuario WHERE email = ?;", [email]);
    const result = await db.runAsync(
      "INSERT INTO usuario ( nome, email, idioma, statusLogin) VALUES ( ?, ?, ?, TRUE)",
      [nome, email, idioma]
    );

    return result;
  } catch (error) {
    if (error.message.includes("UNIQUE constraint failed: usuario.email")) {
      throw new Error("E-mail já cadastrado.");
    }
  }
};

// Função para obter todos os usuários
export const getAllUsers = async (db) => {
  const allRows = await db.getAllAsync("SELECT * FROM usuario");
  return allRows;
};

// Função para obter um usuário específico
export const getUser = async (email, senha) => {
  const resposta = await authenticateUser({ email, senha });
  // console.log("usuario " + JSON.stringify(user.user, null, 2));
  return resposta.user ? resposta.user : false;
};

export const getUserLogado = async (db) => {
  try {
    const user = await db.getFirstAsync(
      "SELECT * FROM usuario WHERE statusLogin = TRUE;"
    );
    // console.log('Usuário logado:', user);
    return user || false; // Retorna o usuário encontrado ou `false` se não houver nenhum
  } catch (error) {
    console.error("Erro ao buscar usuário logado:", error);
    return false;
  }
};

// Função para atualizar o idioma do usuário no banco local
export const updateUserIdioma = async (db, usuario) => {
  try {
    // console.log("Tentando inserir usuário com dados:", nome, email, senha, idioma);
    const result = await db.runAsync(
      "UPDATE usuario SET idioma = ? WHERE email = ?",
      usuario.idioma,
      usuario.email
    );
    // console.log(result)
    await updateIdioma({ usuario });

    return;
  } catch (error) {
    if (error.message.includes("UNIQUE constraint failed: Users.email")) {
      throw new Error("E-mail já cadastrado.");
    }
  }
};
