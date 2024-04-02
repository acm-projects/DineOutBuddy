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

const CravingsScreen = ({ navigation }) => {
  const { profile } = useLogin();

  const [cravings, setCravings] = useState([]);

  const allCravings = [
    "Italian",
    "Japanese",
    "Chinese",
    "Mediterranean",
    "Seafood",
    "Mexican",
    "American",
    "Indian",
    "Middle Eastern",
    "Korean",
    "Indonesian",
    "+",
  ];

  const handleChange = (craving) => {
    if (!cravings.includes(craving)) {
      setCravings((prev) => [...prev, craving]);
    } else {
      setCravings(cravings.filter((c) => c != craving));
    }
  };

  const handleSubmit = async () => {
    try {
      const { data } = await client.put(
        "/api/user/cravings",
        {
          userId: profile._id,
          cravings: cravings,
        },
        {
          headers: {
            authorization: `JWT ${profile.token}`,
            accept: "application/json",
          },
        }
      );
      console.log(data);
      navigation.navigate("HomeTabs");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Finally, are you craving any types of food right now?
      </Text>
      <View style={styles.cardWrapper}>
        {allCravings.map((c) => (
          <TouchableOpacity
            key={c}
            onPress={() => {
              handleChange(c);
            }}
            style={[
              {
                backgroundColor: cravings.includes(c)
                  ? "#0093ED"
                  : "transparent",
              },
              styles.card,
            ]}
          >
            <Text
              style={[
                { color: cravings.includes(c) ? "white" : "#0093ED" },
                styles.cardText,
              ]}
            >
              {c}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.navigationWrapper}>
        <Pressable onPress={handleSubmit} style={styles.button}>
          <View>
            <Text style={styles.buttonText}>Submit</Text>
          </View>
        </Pressable>
        <Pressable
          onPress={() => {
            console.log("pressed");
            navigation.navigate("HomeTabs");
          }}
          style={styles.exit}
        >
          <View>
            <Text style={styles.exitText}>
              I'm not craving anything right now
            </Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
};

export default CravingsScreen;

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
