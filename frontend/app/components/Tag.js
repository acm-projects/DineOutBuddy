import { StyleSheet, Text, View } from "react-native";
import React from "react";

const Tag = ({ content }) => {
  let bgColor = "";

  switch (content.trim()) {
    case "Chinese":
    case "Indian":
    case "Korean":
    case "Japanese":
      bgColor = "#FFCCCB";
      break;
    case "Asian":
      bgColor = "#FFD8E1";
      break;
    case "Asian Fusion":
      bgColor = "#FFA500";
      break;
    case "Vegetarian":
    case "Avocado":
      bgColor = "#2DAE51";
      break;
    case "Tuna":
      bgColor = "#FF6347";
      break;
    case "Deep Fried":
      bgColor = "#D2B48C";
      break;
    case "Spicy Mayo":
      bgColor = "#FFA500";
      break;
    case "Salmon":
      bgColor = "#FA8072";
      break;
    case "Cheese":
      bgColor = "#FFD700";
      break;
    case "Spicy Tuna":
      bgColor = "#FFA07A";
      break;
    case "Crabmeat":
    case "Spicy Kani":
      bgColor = "#FF7F50";
      break;
    case "Raw":
      bgColor = "#B0E0E6";
      break;
    case "Lobster":
    case "King Crab":
      bgColor = "#E27A3F";
      break;
    case "Eel Tempura":
    case "Eel":
      bgColor = "#556B2F";
      break;
    case "Cooked":
      bgColor = "#E96A57";
      break;
    case "Shrimp Tempura":
      bgColor = "#F7C46C";
      break;
    case "Cooked":
      bgColor = "#E96A57";
      break;
    case "Cooked":
      bgColor = "#E96A57";
      break;
    case "Sushi":
      bgColor = "#FF9966";
      break;
    case "Family Friendly":
      bgColor = "#66CC99";
      break;
    case "Seafood":
      bgColor = "#0099CC";
      break;
    default:
      bgColor = "#2287D0";
  }

  return (
    <View
      style={{
        backgroundColor: bgColor,
        paddingVertical: 3,
        paddingHorizontal: 7,
        borderRadius: 10,
      }}
    >
      <Text style={styles.tagText}>{content.trim()}</Text>
    </View>
  );
};

export default Tag;

const styles = StyleSheet.create({
  tag: {
    backgroundColor: "#2287D0",
    paddingVertical: 3,
    paddingHorizontal: 7,
    borderRadius: 10,
  },
  tagText: {
    color: "white",
    fontFamily: "Metropolis-Medium",
    fontSize: 14,
  },
});
