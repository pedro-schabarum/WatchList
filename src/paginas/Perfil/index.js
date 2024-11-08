import React, { useState, useContext } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { GlobalContext } from '../../contexts/GlobalContext';
import PaginaBase from '../PaginaBase';
import styles from './estilos';

import {updateUserIdioma} from '../../servicos/db/db'

const ProfileScreen = ({ navigation }) => {
  const { usuario, idioma, setIdioma, db } = useContext(GlobalContext);
  const [selectedLanguage, setSelectedLanguage] = useState(idioma);

  // Array local consolidado com códigos e nomes de idiomas
  const languageOptions = [
    { code: 'pt-BR', name: 'Português do Brasil' },
    { code: 'en-US', name: 'Inglês (Estados Unidos)' },
    { code: 'es-ES', name: 'Espanhol (Espanha)' },
    { code: 'fr-FR', name: 'Francês (França)' },
    { code: 'de-DE', name: 'Alemão (Alemanha)' },
    { code: 'ko-KR', name: 'Coreano (Coreia do Sul)' }
    // Adicione outros idiomas conforme necessário
  ];

  const handleSaveLanguage = async (language) => {
      setSelectedLanguage(language);
      setIdioma(language)
    if (usuario) {
      usuario.idioma = language;
      await updateUserIdioma(db, usuario);  // Função para atualizar idioma no banco
    }
  };

  return (
    <PaginaBase>
      {usuario ? (
        <View style={styles.container}>
          <Text style={styles.text}>Nome: {usuario.nome}</Text>
          <Text style={styles.text}>Email: {usuario.email}</Text>
          <Text style={styles.text}>Idioma: {usuario.idioma}</Text>

          <Text style={styles.label}>Escolha seu idioma:</Text>
          
          <Picker
            style={styles.picker}
            selectedValue={selectedLanguage}
            onValueChange={(itemValue) => handleSaveLanguage(itemValue)}
          >
            {languageOptions.map(lang => (
              <Picker.Item
                key={lang.code}
                label={lang.name}
                value={lang.code}
              />
            ))}
          </Picker>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Catalogo')}
            >
            <Text style={styles.buttonText}>Voltar</Text>
            </TouchableOpacity>
                </View>
      ) : (
        <Text>Carregando perfil...</Text>
      )}
    </PaginaBase>
  );
};

export default ProfileScreen;
