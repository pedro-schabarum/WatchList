import React from 'react';
import {StyleSheet, Text, View, TextInput, KeyboardAvoidingView, TouchableOpacity, StatusBar, Platform } from 'react-native';
import PaginaBase from '../PaginaBase';

export default function Cadastro({navigation}) {
    const [nome, onChangeNome] = React.useState('');
    const [senha, onChangeSenha] = React.useState('');
    const [confirmaSenha, onChangeConfirmaSenha] = React.useState('');
    const [email, onChangeEmail] = React.useState('');

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
                        placeholder="Repita a senha criada acima"
                        placeholderTextColor={'#575757'}
                    />

                <TouchableOpacity style={styles.button} onPress={()=>{navigation.navigate('Catalogo')}}>
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