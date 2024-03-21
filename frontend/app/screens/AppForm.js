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
    <View style={styles.container}>
      <View style={{ height: 140 }}>
        <FormHeader
          leftHeading="Welcome!"
          rightHeading=""
          subHeading="Dine Out Buddy"
        />
      </View>

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
      >
        <LoginForm navigation={navigation} />
        {/*<Button
          title="Go to Details"
          onPress={() => navigation.navigate("test")}
      /> */}
        <SignupForm navigation={navigation} />
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