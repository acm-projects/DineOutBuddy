import { StatusBar } from "expo-status-bar";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import FormHeader from "./app/components/FormHeader";
import FormSelectorBtn from "./app/components/FormSelectorBtn";
import LoginForm from "./app/components/LoginForm";
import axios from "axios";
import SignupForm from "./app/components/SignupForm";
import { useEffect } from "react";

export default function App() {
  const fetchApi = async () => {
    try {
      const res = await axios.get("http://192.168.50.21:8000/"); // my IP address
      console.log(res);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchApi();
  }, []);

  return (
    <View style={{ flex: 2, paddingTop: 60 }}>
      <View style={{ height: 80 }}>
        <FormHeader
          leftHeading="Welcome"
          rightHeading="Back"
          subHeading="DineOutBuddy"
        />
      </View>

      <View
        style={{
          flexDirection: "row",
          paddingHorizontal: 20,
          marginBottom: 20,
        }}
      >
        <FormSelectorBtn
          backgroundColor="#0093ED"
          title="Log In"
          style={styles.borderLeft}
        />
        <FormSelectorBtn
          backgroundColor="rgba(27,27,51,0.4)"
          title="Sign Up"
          style={styles.borderRight}
        />
      </View>

      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        style={{ backgroundColor: "white" }}
      >
        <LoginForm />
        <SignupForm />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
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
