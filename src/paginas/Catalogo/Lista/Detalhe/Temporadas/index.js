import { Text, FlatList, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import styles from "./estilos";
import DetalheTemporada from "./DetalheTemporada";
const Temporadas = ({ detalhes }) => {
  const [temporadaSelecionada, setTemporadaSelecionada] = useState(null);

  const handlePress = (item) => {
    temporadaSelecionada
      ? temporadaSelecionada.id == item.id
        ? setTemporadaSelecionada(null)
        : setTemporadaSelecionada(item)
      : setTemporadaSelecionada(item);
  };

  return (
    <>
      <FlatList
        data={detalhes.seasons}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.temporadaContainer}>
            {item.air_date != null ? (
              <TouchableOpacity
                style={styles.touchableContainer}
                onPress={() => handlePress(item)}
              >
                <Text style={styles.temporadaNome}>{item.name}</Text>
                <Text style={styles.episodeCount}>{item.episode_count}</Text>
              </TouchableOpacity>
            ) : null}
            {temporadaSelecionada && temporadaSelecionada.id == item.id && (
              <DetalheTemporada id={detalhes.id} temporada={item} />
            )}
          </View>
        )}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.temporadas}
        nestedScrollEnabled={true}
        initialNumToRender={10}
      />
    </>
  );
};

export default Temporadas;
