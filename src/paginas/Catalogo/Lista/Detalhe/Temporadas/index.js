import { Text, FlatList, TouchableOpacity, View } from "react-native";
import React, { useState, useCallback, useEffect } from "react";
import styles from "./estilos";
import DetalheTemporada from "./DetalheTemporada";
import { checkIfMovieExists } from "../../../../../servicos/db/db"; // Função para verificar se o filme está salvo

const Temporadas = ({ detalhes }) => {
  const [temporadaSelecionada, setTemporadaSelecionada] = useState(null);
  const [seasonsWithFlags, setSeasonsWithFlags] = useState([]);

  useEffect(() => {
    const fetchFlags = async () => {
      const updatedSeasons = await Promise.all(
        detalhes.seasons.map(async (season) => {
          const isSaved = await checkIfMovieExists(season.id); // verifica se está salvo
          return { ...season, isSaved };
        })
      );
      setSeasonsWithFlags(updatedSeasons);
    };
    fetchFlags();
  }, [detalhes.seasons]);

  const handlePress = (item) => {
    setTemporadaSelecionada(
      temporadaSelecionada && temporadaSelecionada.id === item.id ? null : item
    );
  };

  const renderItem = useCallback(
    ({ item }) => (
      <View style={styles.temporadaContainer}>
        {item.air_date != null ? (
          <TouchableOpacity
            style={styles.touchableContainer}
            onPress={() => handlePress(item)}
          >
            <Text style={styles.temporadaNome}>{item.name}</Text>
            <Text style={styles.episodeCount}>{item.episode_count}</Text>
            {item.isSaved && <Text style={styles.savedFlag}>Salvo</Text>}{" "}
            {/* Flag visual */}
          </TouchableOpacity>
        ) : null}
        {temporadaSelecionada && temporadaSelecionada.id === item.id && (
          <DetalheTemporada id={detalhes.id} temporada={item} />
        )}
      </View>
    ),
    [temporadaSelecionada]
  );

  return (
    <FlatList
      data={seasonsWithFlags}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.temporadas}
      nestedScrollEnabled={true}
      initialNumToRender={10}
    />
  );
};

export default Temporadas;
