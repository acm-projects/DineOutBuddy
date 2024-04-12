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

const PreferencesScreen = ({ navigation }) => {
  const { profile } = useLogin();

  const [preferences, setPreferences] = useState([]);

  const allPreferences = [
    "Vegetarian",
    "Halal",
    "Vegan",
    "Kosher",
    "Pescatarianism",
    "Keto",
  ];

  const handleChange = (preference) => {
    if (!preferences.includes(preference)) {
      setPreferences((prev) => [...prev, preference]);
    } else {
      setPreferences(preferences.filter((a) => a != preference));
    }
  };

  const handleSubmit = async () => {
    try {
      const { data } = await client.put(
        "/api/user/preferences",
        {
          userId: profile._id,
          preferences: preferences,
        },
        {
          headers: {
            authorization: `JWT ${profile.token}`,
            accept: "application/json",
          },
        }
      );
      console.log(data);
      navigation.navigate("CravingsScreen");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        What is your dietary preference or restriction?
      </Text>
      <View style={styles.cardWrapper}>
        {allPreferences.map((p) => (
          <TouchableOpacity
            key={p}
            onPress={() => {
              handleChange(p);
            }}
            style={[
              {
                backgroundColor: preferences.includes(p)
                  ? "#0093ED"
                  : "transparent",
              },
              styles.card,
            ]}
          >
            <Text
              style={[
                { color: preferences.includes(p) ? "white" : "#0093ED" },
                styles.cardText,
              ]}
            >
              {p}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={{flex: 1}} />
      <View style={styles.navigationWrapper}>
        <Pressable onPress={handleSubmit} style={styles.button}>
          <View>
            <Text style={styles.buttonText}>Next</Text>
          </View>
        </Pressable>
        <Pressable
          onPress={() => {
            console.log("pressed");
            navigation.navigate("CravingsScreen");
          }}
          style={styles.exit}
        >
          <View>
            <Text style={styles.exitText}>
              I have no special preferences or restrictions{" "}
            </Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
};

export default PreferencesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 60,
    paddingBottom: 16,
    backgroundColor: "#F7FAFD",
  },
  blurb: {
    color: "#9DA7CD",
    fontSize: 16,
    maxWidth: "70%",
    marginBottom: 16,
    fontFamily: "Metropolis-Medium"
  },
  title: {
    color: "#0093ED",
    fontSize: 32,
    fontFamily: "Metropolis-Black",
    marginBottom: 48,
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
    fontFamily: "Metropolis-Medium"
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
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderWidth: 2,
    borderColor: "#0093ED",
    justifyContent: "center",
    alignItems: "center",
  },
  cardText: {
    fontSize: 16,
    fontFamily: "Metropolis-SemiBold"
  },
  exitText: {
    color: "#9DA7CD",
    textAlign: "center",
    fontFamily: "Metropolis-Medium"
  },
});

