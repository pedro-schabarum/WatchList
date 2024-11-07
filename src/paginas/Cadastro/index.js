import React, {useEffect, useState, useContext} from 'react';
import { Text, TextInput, KeyboardAvoidingView, TouchableOpacity, Platform, Alert } from 'react-native';
import PaginaBase from '../PaginaBase';
import { initializeDatabase, insertUser, getAllUsers, clearDatabaseFile } from '../../servicos/db/db';
import { CommonActions } from '@react-navigation/native';
import styles from './estilos';
import { getRequestToken, redirectToAuthPage, getAccessTokenAndSessionId, isTokenExpired, authenticateUser} from '../../servicos/api/tmdb'
import { GlobalContext } from '../../contexts/GlobalContext';

export default function Cadastro({navigation}) {
    const [nome, onChangeNome] = useState('');
    const [senha, onChangeSenha] = useState('');
    const [confirmaSenha, onChangeConfirmaSenha] = useState('');
    const [email, onChangeEmail] = useState('');
    const [db, setDb] = useState(null);

    const { setUsuario, idioma } = useContext(GlobalContext);

    useEffect(() => {
        const setupDatabase = async () => {
            const database = await initializeDatabase(); // Inicializa o banco de dados
            setDb(database); // Armazena a instância do banco de dados
        };
        setupDatabase();
        // clearDatabaseFile();
    }, []);

    const handleNavigate = async () => {
        const userData = await getAllUsers(db); // função que busca os dados
        
        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{ name: 'Catalogo' }], // Mude 'Home' para o nome da sua tela inicial
            })
        );
        navigation.navigate('Catalogo', { userData }); // passando os dados
    };

    const salvarUsuario = async () => {
        if(email.trim().length<1 || nome.trim().length<1 || senha.trim().length<1){
            Alert.alert("Dados Invalidos", "Preencha todos os campos");
            return;
        }

        if (senha !== confirmaSenha) {
            Alert.alert("Erro", "As senhas não coincidem");
            return;
        }

        try {
            if (db) {
                let user = await insertUser(db, nome, email, senha, idioma); // Chama a função para inserir usuário
                Alert.alert("Sucesso", "Usuário salvo com sucesso!");
                setUsuario(user)
                handleNavigate(); // Navega para a tela Catalogo após salvar
                
            } else {
                Alert.alert("Erro", "Banco de dados não inicializado");
            }
        } catch (error) {
            Alert.alert("Erro", "Erro ao salvar usuário");
        }
    };

    return (
        <PaginaBase>
            <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                <Text style={styles.texto}>Cadastrar</Text>

                <TextInput
                    style={styles.input}
                    onChangeText={onChangeNome}
                    value={nome}
                    placeholder='Nome'
                    placeholderTextColor={'#575757'}
                />

                <TextInput
                    style={styles.input}
                    onChangeText={onChangeEmail}
                    value={email}
                    placeholder="E-mail"
                    placeholderTextColor={'#575757'}
                    keyboardType="email-address" // Sugere o tipo de teclado adequado para emails
                    autoCapitalize="none"
                    />

                <TextInput
                    style={styles.input}
                    onChangeText={onChangeSenha}
                    value={senha}
                    placeholder="Crie sua senha"
                    placeholderTextColor={'#575757'}
                />

                <TextInput
                    style={styles.input}
                    onChangeText={onChangeConfirmaSenha}
                    value={confirmaSenha}
                    placeholder="Confirme a senha"
                    placeholderTextColor={'#575757'}
                />

                <TouchableOpacity style={styles.button} onPress={salvarUsuario}>
                    <Text style={styles.textoBotao}>Cadastrar</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </PaginaBase>
    );
}