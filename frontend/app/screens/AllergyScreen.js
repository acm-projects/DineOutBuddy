import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Pressable,
} from "react-native";

import CheckBox from "react-native-check-box";
import React, { useState } from "react";
import { useLogin } from "../../context/LoginProvider";
import client from "../api/client";

const AllergyScreen = ({ navigation }) => {
  const { profile } = useLogin();

  console.log(profile.token);

  const [allergies, setAllergies] = useState(profile.allergies);

  const allAllergies = [
    "Dairy Allergy",
    "Egg Allergy",
    "Fish Allergy",
    "Shellfish Allergy",
    "Tree Nuts Allergy",
    "Peanuts Allergy",
    "Wheat Allergy",
    "Soybeans Allergy",
    "Sesame Allergy",
  ];

  const handleChange = (allergy) => {
    if (!allergies.includes(allergy)) {
      setAllergies((prev) => [...prev, allergy]);
    } else {
      setAllergies(allergies.filter((a) => a != allergy));
    }
  };

  const handleSubmit = async () => {
    try {
      const { data } = await client.put(
        "/api/user/allergies",
        {
          userId: profile._id,
          allergies: allergies,
        },
        {
          headers: {
            authorization: `JWT ${profile.token}`,
            accept: "application/json",
          },
        }
      );
      console.log(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Allergy Screen</Text>

      <TouchableOpacity
        onPress={() => {
          console.log("Pressed");
          navigation.navigate("Test");
        }}
        style={{ paddingHorizontal: 5, fontSize: 45 }}
      >
        <Text>Go Home</Text>
      </TouchableOpacity>

      {allAllergies.map((a) => (
        <TouchableOpacity
          key={a}
          onPress={() => {
            handleChange(a);
          }}
          style={{
            backgroundColor: allergies.includes(a) ? "green" : "white",
          }}
        >
          <Text style={styles.label}>{a}</Text>
        </TouchableOpacity>
      ))}

      <Pressable onPress={handleSubmit} style={styles.button}>
        <View>
          <Text style={styles.buttonText}>Add</Text>
        </View>
      </Pressable>
    </View>
  );
};

export default AllergyScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: 100,
    marginLeft: 60,
  },
  button: {
    width: "50%",
    height: 40,
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    color: "black",
    zIndex: 2,
  },
});
