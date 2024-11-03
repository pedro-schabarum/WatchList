import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
// import PaginaBase from '../PaginaBase';

export default function Home({navigation}) {
    return (
        <View style={styles.container}>
            <StatusBar/>
            <Image source={require('../../assets/plaqueta_cinema.png')} style={styles.plaqueta}/>
            <View style={styles.containerButton}>
                <TouchableOpacity style={styles.button} onPress={()=> navigation.navigate('Login')}>
                    <Text style={styles.textoBotao}>Logar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={()=> navigation.navigate('Cadastro')}>
                    <Text style={styles.textoBotao}>Cadastrar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const BUTTONWIDTH = 300;
const styles = StyleSheet.create({
    container: {
        backgroundColor : '#EB2F3D', 
        flex: 1
    },
    plaqueta: {
        alignSelf: 'center',
        margin: 'auto'
    },
    containerButton:{
        gap: 16,
        position: 'absolute',
        bottom: 50,
        left: (windowWidth/2) - (BUTTONWIDTH/2) ,
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
        width: BUTTONWIDTH,
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

