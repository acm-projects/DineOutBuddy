import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";

const FoodCard = () => {
  return (
    <View style={styles.foodCard}>
      <Image source={require("../../assets/restaurantPic.png")}></Image>
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>Las Vegas Roll</Text>
        <View style={styles.cardInfo}>
          <Text style={styles.cardText}>$14.95</Text>
        </View>
        <View style={styles.tagWrapper}>
          <View style={styles.tag}>
            <Text style={styles.tagText}>Japanese</Text>
          </View>
          <View style={styles.tag}>
            <Text style={styles.tagText}>Sushi</Text>
          </View>
          <View style={styles.tag}>
            <Text style={styles.tagText}>Asian</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default FoodCard;

const styles = StyleSheet.create({
  foodCard: {
    flexDirection: "row",
    gap: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  cardInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
    marginBottom: 10,
  },
  cardText: {
    color: "#A2A6B5",
  },
  tagWrapper: {
    flexDirection: "row",
    gap: 6,
  },
  tag: {
    backgroundColor: "#2287D0",
    paddingVertical: 3,
    paddingHorizontal: 5,
    borderRadius: 10,
  },
  tagText: {
    color: "white",
    fontSize: 10,
  },
});
