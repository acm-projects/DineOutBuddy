import { StatusBar } from "expo-status-bar";
import { ScrollView, StyleSheet, Text, View, Button } from "react-native";
import FormHeader from "../components/FormHeader";
import FormSelectorBtn from "../components/FormSelectorBtn";
import LoginForm from "../components/LoginForm";
import axios from "axios";
import SignupForm from "../components/SignupForm";
import { useEffect } from "react";

export default function AppForm({ navigation }) {
  const fetchApi = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/");
      // console.log(res);
    } catch (error) {
      // console.log(error.message);
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
        <LoginForm navigation={navigation} />
        {/*<Button
          title="Go to Details"
          onPress={() => navigation.navigate("test")}
      /> */}
        <SignupForm navigation={navigation} />
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
