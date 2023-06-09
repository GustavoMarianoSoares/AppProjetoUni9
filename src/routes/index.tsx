import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";

import { StackHome } from "./stack.routes/stack.home";

import { StackInitial } from "./stack.routes/stack.initial";

import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { StatusBar } from "expo-status-bar";

export function Routes() {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

  useEffect(() => {
    const subscriber = auth().onUserChanged(setUser);

    return subscriber;
  });

  const signIn = user ? (
    user.emailVerified == true ? (
      <StackHome />
    ) : (
      <StackInitial />
    )
  ) : (
    <StackInitial />
  );

  return (
    <NavigationContainer>
      <StatusBar />
      {signIn}
    </NavigationContainer>
  );
}
