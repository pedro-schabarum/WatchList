import * as SQLite from 'expo-sqlite';
import * as FileSystem from 'expo-file-system';

const dbPath = `${FileSystem.documentDirectory}SQLite/WatchList.db`;

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

const openDatabase = async () => {
    const db = await SQLite.openDatabaseAsync('WatchList.db');

    // Definindo o modo de journal
    await db.execAsync(`PRAGMA journal_mode = WAL;`);

    // Criando a tabela Users, se não existir
    await db.execAsync(`
        CREATE TABLE IF NOT EXISTS Users (
            id INTEGER PRIMARY KEY NOT NULL,
            nome TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE,
            senha TEXT NOT NULL
        );
    `);
    
    return db;
};

// Função para inserir usuário
export const insertUser = async (db, nome, email, senha) => {
    try {
        const result = await db.runAsync('INSERT INTO Users (nome, email, senha) VALUES (?, ?, ?)', nome, email, senha);
        return result;  
    } catch (error) {
        if (error.message.includes('UNIQUE constraint failed: Users.email')) {
            throw new Error('E-mail já cadastrado.');
        }
    }
};

// Função para obter todos os usuários
export const getAllUsers = async (db) => {
    const allRows = await db.getAllAsync('SELECT * FROM Users');
    return allRows; 
};

// Função para obter um usuário específico
export const getUser = async (db, email, senha) => {
    const user = await db.getAllAsync('SELECT email, senha FROM Users WHERE email = ? AND senha = ?', email, senha);
    return user.length > 0 ? user : false; 
};

// Inicializar o banco de dados
export const initializeDatabase = async () => {
    const db = await openDatabase();
    return db;
};

// Limpar o banco de dados
export const clearDatabase = async (db) => {
    // Exclui a tabela Users, se existir
    await db.execAsync('DROP TABLE IF EXISTS Users');

    // Opcional: recria a tabela
    await db.execAsync(`
        CREATE TABLE IF NOT EXISTS Users (
            id INTEGER PRIMARY KEY NOT NULL,
            nome TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE,
            senha TEXT NOT NULL
        );
    `);
};

// Chame clearDatabase(db) para limpar o banco e recriá-lo vazio.
