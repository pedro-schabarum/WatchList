import React, {useEffect} from 'react';
import {StyleSheet, Text, View, TextInput, KeyboardAvoidingView, TouchableOpacity, StatusBar, Platform, Alert } from 'react-native';
import PaginaBase from '../PaginaBase';
import { initializeDatabase, insertUser, getAllUsers } from '../../servicos/db/db';
import { CommonActions } from '@react-navigation/native';

export default function Cadastro({navigation}) {
    const [nome, onChangeNome] = React.useState('');
    const [senha, onChangeSenha] = React.useState('');
    const [confirmaSenha, onChangeConfirmaSenha] = React.useState('');
    const [email, onChangeEmail] = React.useState('');
    const [db, setDb] = React.useState(null);

    useEffect(() => {
        const setupDatabase = async () => {
            const database = await initializeDatabase(); // Inicializa o banco de dados
            setDb(database); // Armazena a instância do banco de dados
        };
        setupDatabase();
    }, []);

    const handleNavigate = async () => {
        const userData = await getAllUsers(db); // função que busca os dados
        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{ name: 'Home' }], // Mude 'Home' para o nome da sua tela inicial
            })
        );
        navigation.navigate('Catalogo', { userData }); // passando os dados
    };

    const salvarUsuario = async () => {
        if (senha !== confirmaSenha) {
            Alert.alert("Erro", "As senhas não coincidem");
            return;
        }

        try {
            if (db) {
                await insertUser(db, nome, email, senha); // Chama a função para inserir usuário
                Alert.alert("Sucesso", "Usuário salvo com sucesso!");
                
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
            <StatusBar/>
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignSelf: 'center',
        justifyContent: 'center',
        padding: 22,
        gap: 32,
    },
    input:{
        width: 300,
        fontSize: 14,
        color: '#FFF',
        height: 49,
        borderWidth: 1,
        borderColor: '#2A2A2A',
        borderRadius: 16,
        padding: 16,
    },
    texto:{
        color: '#FFF',
        fontFamily: 'PoppinsMedium',
        fontSize: 22
    }, 
    button: {
        borderRadius: 16,
        backgroundColor: '#EB2F3D', // Pode ser ajustado conforme necessário
        shadowColor: 'rgba(0, 0, 0, 0.12)',
        shadowOffset: {
            width: 2,
            height: 2,
        },
        shadowOpacity: 1,
        shadowRadius: 4,
        elevation: 4, // Adiciona a elevação para sombra no Android
        padding: 10, // Pode ser ajustado conforme necessário
        width: 300,
        alignSelf: 'center',
        height: 53,
        justifyContent: 'center',
        // marginTop: 53
    },
    textoBotao: {
        color: 'white',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '600'
    },
    textoSenha:{
        color: '#FFF',
        fontFamily: 'PoppinsRegular',
        fontSize: 14,
        alignSelf: 'flex-end'
    }
});