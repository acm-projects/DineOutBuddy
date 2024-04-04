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
import * as Location from "expo-location";

const Test = ({ navigation }) => {
  const { setIsLoggedIn, profile, coordinates } = useLogin();
  // const [location, setLocation] = useState("");

  /* const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();

    if (status === "granted") {
      try {
        const currLocation = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = currLocation.coords;

        const preferences = profile.preferences.join(" and ");
        const allergies = profile.allergies.join(" and ");
        console.log(preferences);
        console.log(latitude);
        console.log(longitude);

        try {
          //const response = await fetch(`http://192.168.1.81:8000/findRestaurants?lat=32.99116507104899&lng=-96.75371033272737`);
          //const response = await fetch(`http://192.168.1.81:8000/findRestaurants?lat=${latitude}&lng=${longitude}`);
          //http://192.168.1.81:8000/findRestaurants?lat=${latitude}&lng=${longitude}

          const response = await fetch(
            `http://10.162.166.136:8000/restaurantsByDiet?lat=${latitude}&lng=${longitude}&restrictions=${preferences}`
          );
          const data = await response.json();
          console.log(data);

          // 32.94310199846829 -96.96419053678457
        } catch (error) {
          console.error("Error:", error);
        }
      } catch (error) {
        console.error(error.message);
      }
    } else {
      console.log("Please grant permission");
    }
  }; */

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
      {/*<Button title="Get Location" onPress={getLocation} /> */}
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
