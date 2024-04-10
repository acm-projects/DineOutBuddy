import React from "react";
import { View, StyleSheet, TouchableOpacity, Text, Image } from "react-native";
import ForYou from "../components/ForYou";
import { useLogin } from "../../context/LoginProvider";

export default function Home() {
  const { chats, fetchChats } = useLogin();
  fetchChats();

  const handleClick = (type) => {
    console.log("Clicked", type);
    // Assuming you're using React Navigation and have passed the `navigation` prop correctly:
    // navigation.navigate('Restaurant');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => handleClick("fish")}
        style={styles.topPickContainer}
      >
        <Text style={styles.title}>Top Picks in Your Area</Text>
        <Image source={require("./fish.png")} style={styles.image} />
        <Text style={styles.restaurantName}>Osaka Hibachi Sushi and Grill</Text>
        <Text style={styles.rating}>4.3 (644) $$</Text>
      </TouchableOpacity>

      {chats.map((chat) => (
        <ForYou key={chat._id} chat={chat} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
  },
  topPickContainer: {
    // Add any styling you need for this container
  },
  text: {
    // Your style for the "Top Picks in Your Area" text
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    color: "blue",
    marginTop: 20,
  },
  image: {
    // Your image style
    alignItems: "center",
  },
  restaurantName: {
    textAlign: "left",
    // Any other styling you want
  },
  rating: {
    fontWeight: "bold",
    // Any other styling you want
  },
});
