import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import AppForm from "./app/screens/AppForm";
import Test from "./app/screens/Test";
import MessagesScreen from "./app/screens/MessageScreen";
import ChatScreen from "./app/screens/ChatScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen component={AppForm} name="AppForm" />
        <Stack.Screen component={Test} name="test" />
        <Stack.Screen component={MessagesScreen} name="MessagesScreen" />
        <Stack.Screen component={ChatScreen} name="ChatScreen" />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
