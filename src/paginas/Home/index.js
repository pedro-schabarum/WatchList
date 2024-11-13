import { StatusBar } from "expo-status-bar";
import React, { useContext, useEffect } from "react";
import { Image, Text, View, TouchableOpacity } from "react-native";
import styles from "./estilos";
import { CommonActions } from "@react-navigation/native";
import { GlobalContext } from "../../contexts/GlobalContext";

import {
  initializeDatabase,
  clearDatabaseFile,
  getUserLogado,
} from "../../servicos/db/db";

export default function Home({ navigation }) {
  const { usuario, setUsuario, setDb, setIdioma } = useContext(GlobalContext);

  const handleNavigate = async () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: "Catalogo" }], // Mude 'Home' para o nome da sua tela inicial
      })
    );
    navigation.navigate("Catalogo"); // passando os dados
  };

  useEffect(() => {
    const setupDatabase = async () => {
      const database = await initializeDatabase(); // Inicializa o banco de dados
      setDb(database); // Armazena a instância do banco de dados

      const resultado = await getUserLogado(database); // Usa `database` diretamente aqui
      console.log(resultado);
      setUsuario(resultado);
    };

    setupDatabase();
    // clearDatabaseFile(); // Remova ou adicione aqui se realmente for necessário
  }, []);

  // Este useEffect será chamado quando o estado `usuario` for atualizado
  useEffect(() => {
    if (usuario) {
      // Verifica se `usuario` não é null ou undefined
      if (usuario.statusLogin === 1 || usuario.statusLogin === true) {
        setIdioma(usuario.idioma);
        handleNavigate(); // Navega se o usuário logado for encontrado
      }
    }
  }, [usuario]); // Dependência no estado `usuario`

  return (
    <View style={styles.container}>
      <StatusBar />
      <Image
        source={require("../../assets/plaqueta_cinema.png")}
        style={styles.plaqueta}
      />
      <View style={styles.containerButton}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={styles.textoBotao}>Logar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Cadastro")}
        >
          <Text style={styles.textoBotao}>Cadastrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
