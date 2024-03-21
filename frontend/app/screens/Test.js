import { StyleSheet, Text, View, Button, TouchableOpacity } from "react-native";
import React from "react";
import { useLogin } from "../../context/LoginProvider";

const Test = ({ navigation }) => {
  const { setIsLoggedIn, profile } = useLogin();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Test</Text>
      <View>
        <Text> Fullname: {profile.fullname}</Text>
        <Text>Username: {profile.email}</Text>
      </View>
      <Button
        title="Go to GroupPage"
        onPress={() => navigation.navigate("MessagesScreen")}
      />
      <Button
        title="Go to AllergyScreen"
        onPress={() => navigation.navigate("AllergyScreen")}
      />
      <TouchableOpacity onPress={() => setIsLoggedIn(false)}>
        <Text style={{ fontSize: 18, color: "white" }}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Test;

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
  },
  title: {
    fontSize: 40,
  },
});
