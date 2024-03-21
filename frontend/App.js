import { StatusBar } from "expo-status-bar";
import { ScrollView, StyleSheet, View } from "react-native";
import AppForm from "./app/screens/AppForm";
import axios from "axios";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect } from "react";
import LoginForm from "./app/components/LoginForm";
import * as SplashScreen from 'expo-splash-screen';
import useCustomFonts from "./app/hooks/useCustomFonts";
import SignupForm from "./app/components/SignupForm";

const Stack = createNativeStackNavigator();
SplashScreen.preventAutoHideAsync();

export default function App() {
  const fetchApi = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/");
      console.log(res);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchApi();
  }, []);

  let {fontsLoaded, fontError} = useCustomFonts(fontsLoaded, fontError);
  if (!fontsLoaded && !fontError) { // This executes if fonts are still loading (ie. both fontsLoaded and fontError are both null)
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen component={LoginForm} name="LoginForm" />
        <Stack.Screen component={SignupForm} name="SignupForm"/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}