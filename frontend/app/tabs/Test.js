import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  Image,
  PermissionsAndroid,
} from "react-native";
import React from "react";
import { useState } from "react";
import { useLogin } from "../../context/LoginProvider";
// import GetLocation from "react-native-get-location";
import * as Location from "expo-location";

const Test = ({ navigation }) => {
  const { setIsLoggedIn, profile } = useLogin();
  const [location, setLocation] = useState("");

  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();

    if (status == "granted") {
      try {
        currLocation = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = currLocation.coords;
        console.log(latitude);
        console.log(longitude);
      } catch (error) {
        console.log(error.message);
      }
    } else {
      console.log("please grant permission");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Test</Text>
      <View>
        <Text> Fullname: {profile.fullname}</Text>
        <Text>Email: {profile.email}</Text>
        {profile.avatar && (
          <Image
            source={{ uri: profile.avatar }}
            style={{ width: 100, height: 100, borderRadius: 100 }}
          />
        )}
      </View>
      <Button title="Get Location" onPress={getLocation} />
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
