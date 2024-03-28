import { StyleSheet, Text, View, Image } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import React from "react";

const RestaurantCard = () => {
  return (
    <View style={styles.restaurantCard}>
      <View style={styles.main}>
        <Image source={require("../../assets/restaurantPic.png")}></Image>
        <View style={styles.content}>
          <Text style={styles.title}>Osaka Hibachi Sushi & Bar</Text>
          <View style={styles.info}>
            <Icon name="star" size={10} color={"#A2A6B5"} />

            <Text style={styles.infoText}>4.3 (644) | $$ | 5.6 mi</Text>
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

          <Text style={styles.subHeading}> Dietary Restrictions</Text>
          <View style={styles.tagWrapper}>
            <View style={styles.tag}>
              <Text style={styles.tagText}>Vegetarin Options</Text>
            </View>
            <View style={styles.tag}>
              <Text style={styles.tagText}>Non-Pork Options</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.divider}></View>
    </View>
  );
};

export default RestaurantCard;

const styles = StyleSheet.create({
  restaurantCard: {
    flexDirection: "column",
    gap: 20,
  },
  main: {
    flexDirection: "row",
    gap: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  info: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
  infoText: {
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
  subHeading: {
    fontSize: 10,
    fontWeight: "semibold",
  },
  divider: {
    backgroundColor: "#C4DDEF",
    height: 1,
    width: "80%",
    alignSelf: "center",
    marginBottom: 20,
  },
});
