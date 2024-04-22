import React from "react";
import { View, TouchableOpacity } from "react-native";
import { accentColor } from "../components/ComponentColors";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PreferencesScreen from "../screens/PreferencesScreen";
import AllergyScreen from "../screens/AllergyScreen";
import CravingsScreen from "../screens/CravingsScreen";

const Stack = createNativeStackNavigator();

export default function AllergiesStack() {
  <Stack.Navigator>
    <Stack.Screen component={AllergyScreen} name="AllergyScreen" />
    <Stack.Screen component={PreferencesScreen} name="PreferencesScreen" />
    <Stack.Screen component={CravingsScreen} name="CravingsScreen" />
  </Stack.Navigator>;
}
