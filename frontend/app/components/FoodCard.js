import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import Tag from "./Tag";

const FoodCard = ({ item }) => {
  return (
    <View style={styles.foodCard}>
      {item.uri ? (
        <Image source={item.uri} style={styles.image}></Image>
      ) : (
        <Image
          source={require("../../assets/restaurantPic.png")}
          style={styles.image}
        ></Image>
      )}

      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{item.name}</Text>
        <View style={styles.cardInfo}>
          <Text style={styles.cardText}>${item.price}</Text>
        </View>
        <View style={styles.tagWrapper}>
          {item.tags &&
            [...Array(item.tags.length)].map((star, i) => {
              return <Tag content={item.tags[i]} key={i} />;
            })}
        </View>
      </View>
    </View>
  );
};

export default FoodCard;

const styles = StyleSheet.create({
  foodCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    maxWidth: "100%",
    maxHeight: 150,
    borderRadius: 20,
  },
  cardTitle: {
    fontSize: 16,
    fontFamily: "Metropolis-Bold",
    maxWidth: "90%",
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
    flexWrap: "wrap",
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
    fontSize: 12,
  },
  image: {
    width: "50%",
    maxHeight: "100%",
    borderRadius: 20,
  },
  cardContent: {
    width: "50%",
  },
});
