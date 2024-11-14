import React, { useState, useContext, useEffect, useCallback } from "react";
import {
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  FlatList,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { GlobalContext } from "../../contexts/GlobalContext";
import PaginaBase from "../PaginaBase";
import styles from "./estilos";
import { fetchDetalhePessoa } from "../../servicos/api/tmdb";
import { updateUserIdioma } from "../../servicos/db/db";
import Detalhe from "../Catalogo/Lista/Detalhe";

const ProfileScreen = ({ navigation, route }) => {
  const { tipoUsuario, integranteId } = route.params;
  const { usuario, idioma, setIdioma, db, options, isSeries } =
    useContext(GlobalContext);
  const [selectedLanguage, setSelectedLanguage] = useState(idioma);
  const [pessoa, setPessoa] = useState([]);
  // Array local consolidado com códigos e nomes de idiomas
  const [isFilme, setIsFilme] = useState(isSeries);
  const [itemSelecionado, setItemSelecionado] = useState(null);

  const languageOptions = [
    { code: "pt-BR", name: "Português do Brasil" },
    { code: "en-US", name: "Inglês (Estados Unidos)" },
    { code: "es-ES", name: "Espanhol (Espanha)" },
    { code: "fr-FR", name: "Francês (França)" },
    { code: "de-DE", name: "Alemão (Alemanha)" },
    { code: "ko-KR", name: "Coreano (Coreia do Sul)" },
    // Adicione outros idiomas conforme necessário
  ];

  useEffect(() => {
    setPessoa([]);
    tipoUsuario == 2 ? fetchData() : null;
  }, [integranteId]);

  const fetchData = async () => {
    try {
      console.log(integranteId);
      const data = await fetchDetalhePessoa({
        integranteId,
        idioma,
        options,
      });
      setPessoa(data);
    } catch (error) {
      console.error("Erro ao buscar conteúdos:", error);
    }
  };

  const handleSaveLanguage = async (language) => {
    setSelectedLanguage(language);
    setIdioma(language);
    if (usuario) {
      usuario.idioma = language;
      await updateUserIdioma(db, usuario); // Função para atualizar idioma no banco
    }
  };

  console.log(usuario);

  // console.log(pessoa);

  if (tipoUsuario == 1) {
    return (
      <PaginaBase>
        {usuario ? (
          <ScrollView contentContainerStyle={styles.pessoa}>
            <Text style={styles.text}>Olá, {usuario.nome}</Text>
            <Text style={styles.text}>Email: {usuario.email}</Text>
            <Text style={styles.text}>Idioma: {usuario.idioma}</Text>

            <Text style={styles.label}>Escolha seu idioma:</Text>

            <Picker
              style={styles.picker}
              selectedValue={selectedLanguage}
              onValueChange={(itemValue) => handleSaveLanguage(itemValue)}
              itemStyle={styles.pickerItem}
            >
              {languageOptions.map((lang) => (
                <Picker.Item
                  key={lang.code}
                  label={lang.name}
                  value={lang.code}
                />
              ))}
            </Picker>

            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate("Catalogo")}
            >
              <Text style={styles.buttonText}>Voltar</Text>
            </TouchableOpacity>
          </ScrollView>
        ) : (
          <Text>Carregando perfil...</Text>
        )}
      </PaginaBase>
    );
  } else if (tipoUsuario == 2) {
    // setPessoa([]);
    const dataFormatada = new Date(pessoa.birthday).toLocaleDateString(idioma, {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
    const filmeItem = useCallback(({ item }) => (
      <TouchableOpacity
        onPress={() => {
          setItemSelecionado(item.id);
          setIsFilme(true);
        }}
      >
        <Image
          source={{
            uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
          }}
          style={styles.filmesImagem}
        />
        <Text style={styles.filmesNome}>{item.title}</Text>
      </TouchableOpacity>
    ));

    const serieItem = useCallback(({ item }) => (
      <TouchableOpacity
        onPress={() => {
          setItemSelecionado(item.id);
          setIsFilme(false);
        }}
      >
        <Image
          source={{
            uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
          }}
          style={styles.filmesImagem}
        />
        <Text style={styles.filmesNome}>{item.title}</Text>
      </TouchableOpacity>
    ));

    return (
      <PaginaBase>
        {pessoa ? (
          // <View style={styles.container}>
          <ScrollView contentContainerStyle={styles.pessoa}>
            {pessoa.profile_path && (
              <Image
                source={{
                  uri: `https://image.tmdb.org/t/p/w500${pessoa.profile_path}`,
                }}
                style={styles.profileImage}
              />
            )}
            <Text style={styles.name}>{pessoa.name}</Text>
            {pessoa.birthday && (
              <Text style={styles.dataNasc}>{dataFormatada}</Text>
            )}
            {pessoa.place_of_birth && (
              <Text style={styles.localNasc}>{pessoa.place_of_birth}</Text>
            )}
            {pessoa.biography && (
              <Text style={styles.bio}>{pessoa.biography}</Text>
            )}

            {pessoa.filmes && pessoa.filmes.length > 0 && (
              <>
                <Text style={styles.tituloScroll}>Filmes</Text>
                <FlatList
                  data={pessoa.filmes}
                  horizontal
                  keyExtractor={(item) => `filme-${item.id}`}
                  renderItem={filmeItem}
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.filmes}
                  initialNumToRender={10}
                />
              </>
            )}
            {pessoa.series && pessoa.series.length > 0 && (
              <>
                <Text style={styles.tituloScroll}>Series</Text>
                <FlatList
                  data={pessoa.series}
                  horizontal
                  keyExtractor={(item) => `serie-${item.id}`}
                  renderItem={serieItem}
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.filmes}
                  initialNumToRender={10}
                />
              </>
            )}

            <Detalhe
              itemSelecionado={itemSelecionado}
              onClose={() => setItemSelecionado(null)}
              isFilme={isFilme}
              origem={"elenco"}
            />
          </ScrollView>
        ) : (
          /* </View> */
          <Text>Carregando perfil...</Text>
        )}
      </PaginaBase>
    );
  } else {
    return <></>;
  }
};

export default ProfileScreen;
