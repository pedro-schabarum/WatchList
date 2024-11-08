import React from 'react';
import { View, Text, Image, TouchableOpacity, TextInput } from 'react-native';
import styles from './estilos';

const Cabecalho = ({ value, onChangeText, onSearch, navigation }) => (
    <View style={styles.Pesquisa}>
        <TextInput
            style={styles.barraPesquisa}
            placeholder="Buscar..."
            placeholderTextColor={'#575757'}
            value={value}                  
            onChangeText={onChangeText}
            returnKeyType="search"
            onSubmitEditing={onSearch}
        />
        <TouchableOpacity style={styles.buttonPesquisa} onPress={onSearch}>
            <Text style={styles.buttonText}>Buscar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonPerfil} onPress={()=> navigation.navigate('Perfil')}>
            <Image source={require('../../../../assets/user.png')}/>
        </TouchableOpacity>
    </View>
);

export default Cabecalho;
