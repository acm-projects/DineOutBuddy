import React from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { accentColor, darkColor, primaryColor } from "./ComponentColors";
import fish from "../../assets/fish.png";

export default function RestaurantHomeWrapper({ category }) {
  function handlePress() {
    console.log("Hello again");
  }

  /*category.restaurants.forEach((res) => {
    console.log(res);
  }); */

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{category.Cuisine}:</Text>
      <ScrollView
        horizontal={true}
        contentContainerStyle={styles.scrollViewContent}
        showsHorizontalScrollIndicator={false}
        snapToInterval={118}
        decelerationRate={"fast"}
      >
        {category.restaurants.map((restaurant) => {
          return (
            <TouchableOpacity onPress={handlePress} key={restaurant.name}>
              <Image
                source={{
                  uri:
                    "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=" +
                    restaurant.photo +
                    "&key=AIzaSyDlu9r4NNFvcpgeb1ggv4BK0HyYEh5cl-c",
                }}
                style={styles.image}
              />
              <Text style={styles.nameText}>{restaurant.name}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 14,
    alignItems: "flex-start",
    gap: 9,
    backgroundColor: primaryColor,
  },
  title: {
    fontSize: 24,
    fontFamily: "Metropolis-Bold",
    color: darkColor,
    paddingLeft: 16,
  },
  scrollViewContent: {
    gap: 18,
    paddingLeft: 16,
  },
  image: {
    width: 130,
    height: 100,
    borderRadius: 8,
  },
  nameText: {
    textAlign: "center",
    fontFamily: "Metropolis-Medium",
    fontSize: 14,
    color: darkColor,
  },
});
