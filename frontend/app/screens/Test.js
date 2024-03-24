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

const requestLocationPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: "Geolocation Permission",
        message: "Can we access your location?",
        buttonNeutral: "Ask Me Later",
        buttonNegative: "Cancel",
        buttonPositive: "OK",
      }
    );
    console.log("granted", granted);
    if (granted === "granted") {
      console.log("You can use Geolocation");
      return true;
    } else {
      console.log("You cannot use Geolocation");
      return false;
    }
  } catch (err) {
    return false;
  }
};

const Test = ({ navigation }) => {
  const { setIsLoggedIn, profile } = useLogin();
  const [location, setLocation] = useState("");
  // console.log(profile);

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
      <Button title="Get Location" onPress={getLocation} />

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
