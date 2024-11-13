import { GlobalContext } from "../../../../contexts/GlobalContext";
import React, { useEffect, useState, useContext, useCallback } from "react";
import { FlatList, Text, TouchableOpacity } from "react-native";
import styles from "./estilos";
import { fetchCategorias } from "../../../../servicos/api/tmdb";

export default function Categorias({
  categoriaSelecionada,
  handleSelectCategoria,
}) {
  const { idioma, isSeries, options } = useContext(GlobalContext);
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    getCategorias();
  }, [isSeries, idioma]);

  const getCategorias = async () => {
    try {
      const endpoint = isSeries ? "tv" : "movie";
      const response = await fetchCategorias({ endpoint, idioma, options });
      setCategorias(response);
    } catch (error) {
      console.error(error);
    }
  };

  const renderItem = useCallback(
    ({ item }) => (
      <TouchableOpacity
        style={[
          styles.navItem,
          categoriaSelecionada?.id === item.id && styles.navItemSelected,
        ]}
        onPress={() => handleSelectCategoria(item)}
      >
        <Text style={styles.navText}>{item.name}</Text>
      </TouchableOpacity>
    ),
    [categoriaSelecionada, handleSelectCategoria]
  );

  return (
    <FlatList
      data={categorias}
      horizontal
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.navBar}
      extraData={categoriaSelecionada?.id} // Mantém referência apenas ao necessário
      initialNumToRender={10}
      maxToRenderPerBatch={5} // Limite de itens renderizados por lote
    />
  );
}
