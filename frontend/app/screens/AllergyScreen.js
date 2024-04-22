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
import { accentColor, lavenderColor, primaryColor } from "../components/ComponentColors";

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
                  ? accentColor
                  : "transparent",
              },
              styles.card,
            ]}
          >
            <Text
              style={[
                { color: allergies.includes(a) ? primaryColor : accentColor },
                styles.cardText,
              ]}
            >
              {a}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={{flex: 1}}/>
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
    paddingTop: 75,
    paddingBottom: 30,
    backgroundColor: "#F7FAFD",
  },
  blurb: {
    color: lavenderColor,
    fontSize: 16,
    fontFamily: "Metropolis-Medium",
    maxWidth: "70%",
    marginBottom: 16,
  },
  title: {
    color: accentColor,
    fontSize: 32,
    fontFamily: "Metropolis-Black",
    marginBottom: 32,
  },
  button: {
    height: 40,
    backgroundColor: accentColor,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginBottom: 15,
  },
  buttonText: {
    color: primaryColor,
    fontFamily: "Metropolis-Medium"
  },
  cardWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 15
  },
  card: {
    minWidth: 60,
    borderRadius: 40,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 2,
    borderColor: accentColor,
    justifyContent: "center",
    alignItems: "center",
  },
  cardText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  exitText: {
    color: lavenderColor,
    textAlign: "center",
    fontFamily: "Metropolis-Medium"
  },
});
