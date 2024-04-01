import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import MessagesScreen from "../screens/MessageScreen";
import ChatScreen from "../screens/ChatScreen";
import { useLogin } from "../../context/LoginProvider";
import LoginProvider from "../../context/LoginProvider";
import { createStackNavigator } from "@react-navigation/stack";
import DrawerNavigator from "./DrawerNavigator";
import AppForm from "../tabs/AppForm";
import HomeNavigator from "./DrawerNavigator";

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen component={AppForm} name="AppForm" />
    </Stack.Navigator>
  );
};

const MainNavigator = () => {
  const { isLoggedIn } = useLogin();
  return isLoggedIn ? <HomeNavigator /> : <StackNavigator />;
};

export default MainNavigator;
