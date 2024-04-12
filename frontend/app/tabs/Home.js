import React from "react";
import { View, StyleSheet, TouchableOpacity, Text, Image, ScrollView } from "react-native";
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
      <View
    style={{
      borderBottomColor: 'skyblue',
      borderBottomWidth: 80,
      marginTop: -30,
      marginBottom: 20,
    }}
  />
  <Text style={styles.title}>Top Picks in Your Area</Text>
  <ScrollView horizontal={true} style={{ marginBottom: 0 }}>
    <TouchableOpacity
        onPress={() => handleClick("fish")}
        style={styles.topPickContainer}
      >
        
        <Image source={require("./fish.png")} style={styles.image} />
        <Text style={styles.restaurantName}>Osaka Hibachi Sushi and Grill</Text>
        <Text style={styles.rating}>4.3 (644) $$</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => handleClick("fish")}
        style={styles.topPickContainer}
      >
        
        <Image source={require("./fish.png")} style={styles.image} />
        <Text style={styles.restaurantName}>Osaka Hibachi Sushi and Grill</Text>
        <Text style={styles.rating}>4.3 (644) $$</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => handleClick("fish")}
        style={styles.topPickContainer}
      >
        
        <Image source={require("./fish.png")} style={styles.image} />
        <Text style={styles.restaurantName}>Osaka Hibachi Sushi and Grill</Text>
        <Text style={styles.rating}>4.3 (644) $$</Text>
      </TouchableOpacity>

  </ScrollView>
      
        {chats.map((chat, index) => (
  <ForYou key={chat._id} chat={chat} style={{ marginBottom: 0, marginTop: 0 }} />
))}
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 0,
  },
  topPickContainer: {
    // Add any styling you need for this container
    marginBottom: -245,
  },
  text: {
    // Your style for the "Top Picks in Your Area" text
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "blue",
    marginTop: 0,
    textAlign: "center",
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

