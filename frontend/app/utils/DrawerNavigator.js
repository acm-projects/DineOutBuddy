import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import AppForm from "../screens/AppForm";
import Test from "../screens/Test";
import MessagesScreen from "../screens/MessageScreen";
import ChatScreen from "../screens/ChatScreen";
import { useLogin } from "../../context/LoginProvider";
import LoginProvider from "../../context/LoginProvider";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

const DrawerNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen component={Test} name="Test" />
      <Stack.Screen component={MessagesScreen} name="MessagesScreen" />
      <Stack.Screen component={ChatScreen} name="ChatScreen" />
    </Stack.Navigator>
  );
};

export default DrawerNavigator;
