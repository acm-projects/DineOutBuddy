import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import AppForm from "./app/screens/AppForm";
import Test from "./app/screens/Test";
import MessagesScreen from "./app/screens/MessageScreen";
import ChatScreen from "./app/screens/ChatScreen";
import GlobalState from "./context";
import LoginProvider from "./context/LoginProvider";
import MainNavigator from "./app/utils/MainNavigator";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <GlobalState>
      <LoginProvider>
        <NavigationContainer>
          <MainNavigator />
        </NavigationContainer>
      </LoginProvider>
    </GlobalState>
  );
}