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
import { primaryColor, lavenderColor, accentColor } from "../components/ComponentColors";


const CravingsScreen = ({ navigation }) => {
  const { profile, setProfile } = useLogin();

  const [cravings, setCravings] = useState(profile.cravings);

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
      setProfile((prev) => {
        return {
          ...prev,
          cravings: data.cravings,
        };
      });
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
      <View style={{flex: 1}}/>
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
