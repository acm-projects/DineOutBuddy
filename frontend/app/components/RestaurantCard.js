import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import React from "react";
import Tag from "./Tag";
import { lavenderColor } from "./ComponentColors";

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

  const findTagCount = (count) => {
    if (count > 4) return 4;
    else return count;
  };

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
        <Image
          style={{ width: 100, height: 100, borderRadius: 10 }}
          source={{ uri: photoUrl }}
        />
        <View style={styles.content}>
          <Text style={styles.title}>{data.name}</Text>
          <View style={styles.info}>
            <Icon name="star" size={10} color={"#A2A6B5"} />

            <Text style={styles.infoText}>
              {data.rating} (40) | {priceLevelToDollarSign(data.price_level)} |
              5.6 mi
            </Text>
            <Text style={styles.infoText}>Open Now</Text>
          </View>
          <Text style={styles.subHeading}> Tags </Text>
          <View style={styles.tagWrapper}>
            {[...Array(findTagCount(data.category.length))].map((star, i) => {
              return <Tag content={data.category[i]} key={i} />;
            })}
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
    fontFamily: "Metropolis-SemiBold"
  },
  info: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
    marginBottom: 10,
  },
  infoText: {
    color: lavenderColor,
    fontFamily: "Metropolis-Medium"
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
    fontSize: 14,
  },
  subHeading: {
    fontSize: 15,
    fontFamily: "Metropolis-SemiBold",
    marginBottom: 5,
  },
  divider: {
    backgroundColor: "#C4DDEF",
    height: 1,
    width: "80%",
    alignSelf: "center",
    marginBottom: 20,
  },
});
