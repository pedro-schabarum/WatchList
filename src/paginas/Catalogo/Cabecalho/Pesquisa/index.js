import React from 'react';
import { View, Text, Image, TouchableOpacity, TextInput } from 'react-native';
import styles from './estilos';

const Cabecalho = ({ value, onChangeText, onSearch }) => (
    <View style={styles.Pesquisa}>
        <TextInput
            style={styles.barraPesquisa}
            placeholder="Buscar filmes..."
            placeholderTextColor={'#575757'}
            value={value}                  
            onChangeText={onChangeText} 
        />
        <TouchableOpacity style={styles.buttonPesquisa} onPress={onSearch}>
            <Text style={styles.buttonText}>Buscar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonPerfil}>
            <Image source={require('../../../../assets/user.png')}/>
        </TouchableOpacity>
    </View>
);

export default Cabecalho;
