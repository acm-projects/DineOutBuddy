import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import React from "react";

const RestaurantCard = ({ data, navigation }) => {
  const priceLevelToDollarSign = (level) => {
    const levels = {
      1: "$",
      2: "$$",
      3: "$$$",
    };
    return levels[level] || "?";
  };

  //console.log(data.photos[0].photo_reference);
  let photoUrl =
    "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=" +
    data.photo +
    "&key=AIzaSyDlu9r4NNFvcpgeb1ggv4BK0HyYEh5cl-c";

  return (
    <Pressable
      style={styles.restaurantCard}
      onPress={() => {
        navigation.navigate("RestaurantScreen", {
          data: data,
        });
      }}
    >
      <View style={styles.main}>
        <Image style={{ width: 100, height: 100 }} source={{ uri: photoUrl }} />
        <View style={styles.content}>
          <Text style={styles.title}>{data.name}</Text>
          <View style={styles.info}>
            <Icon name="star" size={10} color={"#A2A6B5"} />

            <Text style={styles.infoText}>
              {data.rating} (644) | {priceLevelToDollarSign(data.price_level)} |
              5.6 mi
            </Text>
          </View>
          <View style={styles.tagWrapper}>
            <View style={styles.tag}>
              <Text style={styles.tagText}>{data.category[0]}</Text>
            </View>
            <View style={styles.tag}>
              <Text style={styles.tagText}>{data.category[1]}</Text>
            </View>
            <View style={styles.tag}>
              <Text style={styles.tagText}>{data.category[2]}</Text>
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
    </Pressable>
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
