import React from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { accentColor, darkColor, lavenderColor, primaryColor } from "./ComponentColors";
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
      <Text style={styles.title}>{category.Cuisine}</Text>
      <ScrollView
        horizontal={true}
        contentContainerStyle={styles.scrollViewContent}
        showsHorizontalScrollIndicator={false}
        snapToInterval={245}
        decelerationRate={"fast"}
      >
        {category.restaurants.map((restaurant) => {
          return (
            <TouchableOpacity onPress={handlePress} key={restaurant.name} style={styles.restaurantContainer}>
              <Image
                source={{
                  uri:
                    "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=" +
                    restaurant.photo +
                    "&key=AIzaSyDlu9r4NNFvcpgeb1ggv4BK0HyYEh5cl-c",
                }}
                style={styles.image}
              />
              <View>
                <Text style={styles.nameText} numberOfLines={1}>{restaurant.name}</Text>
                <Text style={styles.infoText}>4.5 ★ (233) | $$</Text>
              </View>
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
    gap: 25,
    paddingHorizontal: 16,
  },
  restaurantContainer: {
    width: 220,
    gap: 6
  },
  image: {
    width: 220,
    height: 130,
    borderRadius: 8,
  },
  nameText: {
    fontFamily: "Metropolis-SemiBold",
    fontSize: 17,
    color: darkColor
  },
  infoText: {
    fontFamily: "Metropolis-SemiBold",
    fontSize: 14,
    color: lavenderColor
  }
});
