import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { ScrollView, StyleSheet, View } from "react-native";
import FormHeader from "./app/components/FormHeader";
import FormSelectorBtn from "./app/components/FormSelectorBtn";
import LoginForm from "./app/components/LoginForm";
import SignupForm from "./app/components/SignupForm";
import HomePage from "./app/components/HomePage";
import axios from "axios";
import { useEffect } from "react";

export default function App() {
  const [activePage, setActivePage] = useState("LoginForm");

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

  const renderHeader = () => {
    if (activePage != "HomePage") {
      return (
        <View style={{ height: 140 }}>
          <FormHeader
            leftHeading="Welcome!"
            rightHeading=""
            subHeading="Dine Out Buddy"
          />
        </View>
      );
    }
    return null; // No header for HomePage
  };

  return (
    <View style={styles.container}>
      {renderHeader()}

      <View
        style={{
          flexDirection: "row",
          paddingHorizontal: 20,
          marginBottom: 20,
        }}
      >
      </View>

      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        style={{ backgroundColor: "white" }}
        onMomentumScrollEnd={(event) => {
          // Determine the active page based on the scroll position
          const currentPage = Math.round(
            event.nativeEvent.contentOffset.x / event.nativeEvent.layoutMeasurement.width
          );
          setActivePage(currentPage === 0 ? "LoginForm" : "SignupForm");
        }}
      >
        <LoginForm />
        <SignupForm />
        <HomePage />
      </ScrollView>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    backgroundColor: '#1E90FF', // Set the background color to blue
    marginBottom: 50,
  },
  borderLeft: {
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  borderRight: {
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
});
