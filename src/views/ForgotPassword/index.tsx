import {
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { InputTexts } from "../../components/InputTexts";
import { ButtonAction } from "../../components/ButtonAction";
import { ImageLogo } from "../../components/ImageLogo";

import auth from "@react-native-firebase/auth";

export function ForgotPassword({ navigation }) {
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");

  function forgotPasswordValidationAuth(error) {
    if (error === "auth/invalid-email") {
      Alert.alert(
        "E-MAIL MAL INFORMADO",
        "E-mail mal informado, verifique se o e-mail está correto e com todos os caracteres como: @, .com e etc..."
      );
    }

    if (error === "auth/user-not-found") {
      Alert.alert(
        "E-MAIL",
        "E-mail não encontrado, verifique se está correto e tente novamente."
      );
    }

    if (error === "auth/network-request-failed") {
      Alert.alert(
        "CONECTE-SE",
        "Verifique se você está conectado a internet e tente novamente."
      );
    }
  }

  function forgotPasswordValidation() {
    if (email == "" || confirmEmail == "") {
      Alert.alert(
        "PREENCHA TODOS OS CAMPOS",
        "Para se registrar no sistema informe todos os campos acima."
      );
    } else if (confirmEmail != email) {
      Alert.alert(
        "E-MAILS DIFERENTES",
        "Os e-mails digitados não correspondem, verifique e tente novamente."
      );
    } else {
      handleForgotPassword();
    }
  }

  function handleForgotPassword() {
    auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        Alert.alert(
          "REDEFINIR SENHA",
          "Enviamos um e-mail para você, para redefinir sua senha."
        );
        navigation.goBack();
      })
      .catch((error) => {
        forgotPasswordValidationAuth(error.code);
      });
  }

  return (
    <KeyboardAwareScrollView style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <ScrollView>
          <ImageLogo />

          <InputTexts
            placeholder="E-mail"
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            secureTextEntry={undefined}
            value={undefined}
          />

          <InputTexts
            placeholder="Confirmar e-mail"
            onChangeText={setConfirmEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            secureTextEntry={undefined}
            value={undefined}
          />

          <ButtonAction
            title="ENVIAR E-MAIL"
            onPress={forgotPasswordValidation}
          />
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAwareScrollView>
  );
}
