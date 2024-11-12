import { Text, Image, FlatList, TouchableOpacity } from "react-native";
import React, { useEffect, useState, useContext } from "react";
import styles from "./estilos";
import { fetchElenco } from "../../../../../servicos/api/tmdb";
import { GlobalContext } from "../../../../../contexts/GlobalContext";
import { useNavigation } from "@react-navigation/native";

const Elenco = ({ conteudoId, onClose, origem, isFilme }) => {
  const navigation = useNavigation();
  const { idioma, isSeries, options } = useContext(GlobalContext);
  const [elenco, setElenco] = useState();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      let endpoint = isSeries ? "tv" : "movie";
      if (origem == "elenco") {
        endpoint = isFilme ? "movie" : "tv";
      }
      const data = await fetchElenco({ endpoint, conteudoId, idioma, options });
      setElenco(data);
    } catch (error) {
      console.error("Erro ao buscar conteúdos:", error);
    }
  };

  return elenco ? (
    <FlatList
      data={elenco}
      horizontal
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Perfil", {
              tipoUsuario: 2,
              integranteId: item.id,
            });
            onClose(); // Chama a função 'fechar' após a navegação
          }}
        >
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w500${item.profile_path}`,
            }}
            style={styles.elencoImagem}
          />
          <Text style={styles.elencoNome}>{item.name}</Text>
          {item.character.split(" / ").map((role, index) => (
            <Text key={index} style={styles.elencoPersonagem}>
              {role}
            </Text>
          ))}
        </TouchableOpacity>
      )}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.elenco}
      initialNumToRender={10}
    />
  ) : (
    <></>
  );
};

export default Elenco;
