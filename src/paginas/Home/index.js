import { StatusBar } from 'expo-status-bar';
import React, { useContext, useEffect } from 'react';
import { Image, Text, View, TouchableOpacity } from 'react-native';
import styles from './estilos';
import { GlobalContext } from '../../contexts/GlobalContext';



export default function Home({navigation}) {

    const { usuario } = useContext(GlobalContext);

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

    useEffect(()=>{
        if(usuario){
            handleNavigate()
        }
    })

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
