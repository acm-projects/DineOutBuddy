import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import AppForm from "../tabs/AppForm";
import Test from "../tabs/Test";
import MessagesScreen from "../screens/MessageScreen";
import ChatScreen from "../screens/ChatScreen";
import { useLogin } from "../../context/LoginProvider";
import LoginProvider from "../../context/LoginProvider";
import { createStackNavigator } from "@react-navigation/stack";
import GroupProfileScreen from "../screens/GroupProfileScreen";
import AllergyScreen from "../screens/AllergyScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import GroupScreen from "../tabs/GroupScreen";


const Tab = createBottomTabNavigator();

const Stack = createStackNavigator();

const DrawerNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen component={Test} name="Test" />
      <Tab.Screen component={AllergyScreen} name="AllergyScreen" />
      <Tab.Screen component={GroupScreen} name="GroupScreen" />
    </Tab.Navigator>
  );
};

export default DrawerNavigator;
