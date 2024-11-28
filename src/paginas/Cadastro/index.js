import React, { useEffect, useState, useContext } from "react";
import {
  Text,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  Platform,
  Alert,
} from "react-native";
import PaginaBase from "../PaginaBase";
import { insertUser, getUserLogado } from "../../servicos/db/db";
import { CommonActions } from "@react-navigation/native";
import styles from "./estilos";
// import { getRequestToken, redirectToAuthPage, getAccessTokenAndSessionId, isTokenExpired, authenticateUser} from '../../servicos/api/tmdb'
import { GlobalContext } from "../../contexts/GlobalContext";
import i18n from "../../hooks/I18n";

export default function Cadastro({ navigation }) {
  const [nome, onChangeNome] = useState("");
  const [senha, onChangeSenha] = useState("");
  const [confirmaSenha, onChangeConfirmaSenha] = useState("");
  const [email, onChangeEmail] = useState("");

  const { setUsuario, idioma, db } = useContext(GlobalContext);

  const handleNavigate = async () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: "Catalogo" }], // Mude 'Home' para o nome da sua tela inicial
      })
    );
    navigation.navigate("Catalogo"); // passando os dados
  };

  const salvarUsuario = async () => {
    if (
      email.trim().length < 1 ||
      nome.trim().length < 1 ||
      senha.trim().length < 1
    ) {
      Alert.alert("Dados Invalidos", "Preencha todos os campos");
      return;
    }

    if (senha !== confirmaSenha) {
      Alert.alert("Erro", "As senhas não coincidem");
      return;
    }

    try {
      if (db) {
        await insertUser(db, nome, email, senha, idioma, true); // Chama a função para inserir usuário
        Alert.alert("Sucesso", "Usuário salvo com sucesso!");
        const resultado = await getUserLogado(db); // Usa `database` diretamente aqui
        setUsuario(resultado);
        handleNavigate(); // Navega para a tela Catalogo após salvar
      } else {
        Alert.alert("Erro", "Banco de dados não inicializado");
      }
    } catch (error) {
      // console.log(error);
      Alert.alert("Erro", "Erro ao salvar usuário");
    }
  };

  return (
    <PaginaBase>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <Text style={styles.texto}>{i18n.t("cadastrar")}</Text>

        <TextInput
          style={styles.input}
          onChangeText={onChangeNome}
          value={nome}
          placeholder={i18n.t("nome")}
          placeholderTextColor={"#575757"}
        />

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
          placeholder={i18n.t("criarSenha")}
          placeholderTextColor={"#575757"}
        />

        <TextInput
          style={styles.input}
          onChangeText={onChangeConfirmaSenha}
          value={confirmaSenha}
          placeholder={i18n.t("confirmaSenha")}
          placeholderTextColor={"#575757"}
        />

        <TouchableOpacity style={styles.button} onPress={salvarUsuario}>
          <Text style={styles.textoBotao}>Cadastrar</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </PaginaBase>
  );
}
