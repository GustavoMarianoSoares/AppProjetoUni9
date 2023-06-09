import {
  Alert,
  TouchableOpacity,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { InputTexts } from "../../components/InputTexts";
import { ButtonAction } from "../../components/ButtonAction";
import { ImageLogo } from "../../components/ImageLogo";
import Checkbox from "expo-checkbox";

import styles from "./styles";

import auth from "@react-native-firebase/auth";

export function Register({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isChecked, setChecked] = useState(false);

  function registerValidationAuth(error) {
    if (error === "auth/invalid-email") {
      Alert.alert(
        "E-MAIL MAL INFORMADO",
        "E-mail mal informado, verifique se o e-mail está correto e com todos os caracteres como: @, .com e etc..."
      );
    }

    if (error === "auth/weak-password") {
      Alert.alert(
        "SENHA FRACA",
        "Crie uma senha com pelo menos 6 caracteres para se cadastrar."
      );
    }

    if (error === "auth/email-already-in-use") {
      Alert.alert(
        "E-MAIL JÁ CADASTRADO",
        "Este endereço de e-mail já está cadastrado em outra conta."
      );
    }

    if (error === "auth/network-request-failed") {
      Alert.alert(
        "CONECTE-SE",
        "Verifique se você está conectado a internet e tente novamente."
      );
    }
  }

  function registerValidation() {
    if (email == "" || password == "" || confirmPassword == "" || name == "") {
      Alert.alert(
        "PREENCHA TODOS OS CAMPOS",
        "Para se registrar no sistema informe todos os campos acima."
      );
    } else if (confirmPassword != password) {
      Alert.alert(
        "SENHAS DIFERENTES",
        "As senhas digitadas não correspondem, verifique e tente novamente."
      );
    } else {
      handleNewAccount();
    }
  }

  function handleNewAccount() {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        auth().currentUser.sendEmailVerification();
        auth().currentUser.updateProfile({
          displayName: name,
        });
        Alert.alert(
          "CADASTRADO",
          "Usuário cadastrado no sistema com sucesso, enviamos um e-mail para que você verifique-o somente assim poderá entrar no sistema."
        );
        navigation.goBack();
      })
      .catch((error) => {
        registerValidationAuth(error.code);
      });
  }

  function changePasswordSecure() {
    if (isChecked) {
      setChecked(false);
    } else {
      setChecked(true);
    }
  }

  return (
    <KeyboardAwareScrollView style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <ScrollView>
          <ImageLogo />

          <InputTexts
            placeholder="Nome"
            onChangeText={setName}
            secureTextEntry={undefined}
            keyboardType={undefined}
            value={undefined}
            autoCapitalize={undefined}
          />

          <InputTexts
            placeholder="E-mail"
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            secureTextEntry={undefined}
            value={undefined}
          />

          <InputTexts
            placeholder="Senha"
            onChangeText={setPassword}
            secureTextEntry={!isChecked}
            keyboardType={undefined}
            value={undefined}
            autoCapitalize={undefined}
          />

          <InputTexts
            placeholder="Confirmar senha"
            onChangeText={setConfirmPassword}
            secureTextEntry={!isChecked}
            keyboardType={undefined}
            value={undefined}
            autoCapitalize={undefined}
          />

          <TouchableOpacity
            style={styles.showPassword}
            onPress={changePasswordSecure}
          >
            <Checkbox
              value={isChecked}
              color={isChecked ? "#339FFF" : "#797979"}
            />

            <Text style={styles.showPasswordText}>Mostrar senhas</Text>
          </TouchableOpacity>

          <ButtonAction title="CADASTRAR" onPress={registerValidation} />
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAwareScrollView>
  );
}
