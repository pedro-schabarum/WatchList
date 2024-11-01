import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Image, StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
// import PaginaBase from '../PaginaBase';

export default function Home({navigation}) {
    return (
        <View style={styles.container}>
            <StatusBar/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor : '#121011', 
        flex: 1
    },
    plaqueta: {
        alignSelf: 'center',
        margin: 'auto'
    },
    containerButton:{
        marginBottom: 100,
        gap: 16
    },
    button: {
        borderRadius: 16,
        backgroundColor: '#121011', // Pode ser ajustado conforme necessário
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
        justifyContent: 'center'
    },
    textoBotao: {
        color: 'white',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '600'
    },
})

