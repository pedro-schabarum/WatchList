import React, { useEffect, useContext, useState, useCallback } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { GlobalContext } from "../../../../../../contexts/GlobalContext";
import styles from "./estlios";
import { fetchDetalhesTemporadas } from "../../../../../../servicos/api/tmdb";

const DetalheTemporada = ({ id, temporada }) => {
  const { idioma, options } = useContext(GlobalContext);
  const [detalhesTemporada, setDetalhesTemporada] = useState([]);

  useEffect(() => {
    fetchData();
  }, [id, temporada, idioma]); // Dependências para garantir que o efeito seja reexecutado quando algum valor mudar

  const fetchData = async () => {
    try {
      if (id && temporada?.id) {
        const data = await fetchDetalhesTemporadas({
          id,
          temporada,
          idioma,
          options,
        });
        setDetalhesTemporada(data.episodes);
      }
    } catch (error) {
      console.error("Erro ao buscar conteúdos:", error);
    }
  };

  const renderItem = useCallback(
    ({ item }) => (
      <TouchableOpacity style={styles.episodeContainer}>
        <Text style={styles.episodeTitle}>{item.name}</Text>
        <Text
          style={styles.episodeNumber}
        >{`Episódio ${item.episode_number}`}</Text>
        <Text style={styles.episodeDate}>{`Lançamento: ${new Date(
          item.air_date
        ).toLocaleDateString(idioma, {
          day: "2-digit",
          month: "long",
          year: "numeric",
        })}`}</Text>
        {item.overview && (
          <Text style={styles.episodeOverview}>{item.overview}</Text>
        )}
      </TouchableOpacity>
    ),
    []
  );

  return (
    <View style={styles.container}>
      {detalhesTemporada ? (
        <>
          <FlatList
            data={detalhesTemporada}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
            initialNumToRender={10}
          />
        </>
      ) : (
        <Text>Carregando detalhes da temporada...</Text>
      )}
    </View>
  );
};

export default DetalheTemporada;
