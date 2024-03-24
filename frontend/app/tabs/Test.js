import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";
import { useLogin } from "../../context/LoginProvider";

const Test = ({ navigation }) => {
  const { setIsLoggedIn, profile } = useLogin();
  console.log(profile);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Test</Text>
      <View>
        <Text> Fullname: {profile.fullname}</Text>
        <Text>Email: {profile.email}</Text>
        {profile.avatar && (
          <Image
            source={{ uri: profile.avatar }}
            style={{ width: 100, height: 100, borderRadius: "100%" }}
          />
        )}
      </View>
      <Button
        title="Go to GroupPage"
        onPress={() => navigation.navigate("MessagesScreen")}
      />
      <Button
        title="Go to AllergyScreen"
        onPress={() => navigation.navigate("AllergyScreen")}
      />
      <Button
        title="Go to ImageUpload"
        onPress={() => navigation.navigate("ImageUpload")}
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
