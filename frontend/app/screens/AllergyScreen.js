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
  const { profile, setProfile } = useLogin();

  const [allergies, setAllergies] = useState(profile.allergies);

  const allAllergies = [
    "Eggs",
    "Lactose",
    "Seafood",
    "Wheat",
    "Sesame",
    "Soy",
    "Tree Nuts",
    "Peanuts",
    "Gluten",
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
      setProfile((prev) => {
        return {
          ...prev,
          allergies: data.allergies,
        };
      });

      navigation.navigate("PreferencesScreen");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.blurb}>
        In order to recommend you restaurants, we need to get to know you
        better!
      </Text>
      <Text style={styles.title}>What are your food allergies?</Text>
      <View style={styles.cardWrapper}>
        {allAllergies.map((a) => (
          <TouchableOpacity
            key={a}
            onPress={() => {
              handleChange(a);
            }}
            style={[
              {
                backgroundColor: allergies.includes(a)
                  ? "#0093ED"
                  : "transparent",
              },
              styles.card,
            ]}
          >
            <Text
              style={[
                { color: allergies.includes(a) ? "white" : "#0093ED" },
                styles.cardText,
              ]}
            >
              {a}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.navigationWrapper}>
        <Pressable onPress={handleSubmit} style={styles.button}>
          <View>
            <Text style={styles.buttonText}>Next</Text>
          </View>
        </Pressable>
        <Pressable
          onPress={() => {
            console.log("pressed");
            navigation.navigate("PreferencesScreen");
          }}
          style={styles.exit}
        >
          <View>
            <Text style={styles.exitText}>I have no allergies</Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
};

export default AllergyScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 75,
    backgroundColor: "#F7FAFD",
  },
  blurb: {
    color: "#9DA7CD",
    fontSize: 16,
    maxWidth: "50%",
    marginBottom: 16,
  },
  title: {
    color: "#0093ED",
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 32,
  },
  button: {
    height: 40,
    backgroundColor: "#0093ED",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginBottom: 15,
  },
  buttonText: {
    color: "white",
  },
  cardWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 15,
    marginBottom: 250,
  },
  card: {
    minWidth: 60,
    borderRadius: 40,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 2,
    borderColor: "#0093ED",
    justifyContent: "center",
    alignItems: "center",
  },
  cardText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  exitText: {
    color: "#9DA7CD",
    textAlign: "center",
  },
});
