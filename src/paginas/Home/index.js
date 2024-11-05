import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { Image, Text, View, TouchableOpacity } from 'react-native';
import styles from './estilos';

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
