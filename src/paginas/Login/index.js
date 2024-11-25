import React, { useEffect, useState } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import PaginaBase from "../PaginaBase";
import { getUser, initializeDatabase, getAllUsers } from "../../servicos/db/db";
import { CommonActions } from "@react-navigation/native";
import styles from "./estilos";
import i18n from "../../hooks/I18n";

export default function Home({ navigation }) {
  const [email, onChangeEmail] = useState("");
  const [senha, onChangeSenha] = useState("");
  const [db, setDb] = useState(null);

  useEffect(() => {
    const setupDatabase = async () => {
      const database = await initializeDatabase(); // Inicializa o banco de dados
      setDb(database); // Armazena a instância do banco de dados
    };
    setupDatabase();
  }, []);

  const handleNavigate = async () => {
    const userData = await getAllUsers(db); // função que busca os dados
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: "Catalogo" }], // Mude 'Home' para o nome da sua tela inicial
      })
    );
    navigation.navigate("Catalogo", { userData }); // passando os dados
  };

  const autenticarSessao = async () => {
    if (email.trim().length < 1 || senha.trim().length < 1) {
      return;
    }
    try {
      if (db) {
        const user = await getUser(db, email, senha); // Chama a função para inserir usuário
        if (user) {
          handleNavigate(); // Navega para a tela Catalogo após salvar
        } else {
          Alert.alert("Erro", "Não foi possivel iniciar sessão");
        }
      } else {
        Alert.alert("Erro", "Banco de dados não inicializado");
      }
    } catch (error) {
      Alert.alert("Erro", "Erro ao salvar o usuário");
    }
  };

  return (
    <PaginaBase>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <StatusBar />
        <Text style={styles.texto}>Login</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeEmail}
          value={email}
          placeholder={i18n.t("email")}
          placeholderTextColor={"#575757"}
          keyboardType="email-address" // Sugere o tipo de teclado adequado para emails
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          onChangeText={onChangeSenha}
          value={senha}
          placeholder={i18n.t("senha")}
          placeholderTextColor={"#575757"}
        />

        <Text style={styles.textoSenha}>Esqueceu sua senha?</Text>
        <TouchableOpacity style={styles.button} onPress={autenticarSessao}>
          <Text style={styles.textoBotao}>Entrar</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </PaginaBase>
  );
}
