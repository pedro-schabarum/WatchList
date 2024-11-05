import * as SQLite from 'expo-sqlite';
import * as Hash from '../senha/hash';

const openDatabase = async () => {
    const db = await SQLite.openDatabaseAsync('MyAppDatabase.db');
    
    // Criação da tabela e inserção inicial de dados
    await db.execAsync(`
        PRAGMA journal_mode = WAL;
        CREATE TABLE IF NOT EXISTS Users (
            id INTEGER PRIMARY KEY NOT NULL,
            nome TEXT NOT NULL,
            email TEXT NOT NULL,
            senha TEXT NOT NULL
        );
    `);
    
    return db;
};

// Função para inserir usuário
export const insertUser = async (db, nome, email, senha) => {
    const senhaHash = await Hash.hashPassword(senha);
    console.log(senhaHash)
    const result = await db.runAsync('INSERT INTO Users (nome, email, senha) VALUES (?, ?, ?)', nome, email, senhaHash);
    return result; // Retorna o resultado da inserção
};

// Função para obter todos os usuários
export const getAllUsers = async (db) => {
    const allRows = await db.getAllAsync('SELECT * FROM Users');
    return allRows; // Retorna todos os usuários como um array de objetos
};

// Função para obter um usuário específico
export const getUser = async (db, id) => {
    const user = await db.getFirstAsync('SELECT * FROM Users WHERE id = ?', id);
    return user; // Retorna o usuário encontrado
};

export const initializeDatabase = async () => {
    const db = await openDatabase();
    return db; // Retorna a instância do banco de dados
};
